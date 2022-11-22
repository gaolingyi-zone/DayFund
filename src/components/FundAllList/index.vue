<template>
    <div>
        <div>
            <a-form layout="inline" class="form">
                <a-form-item>
                    <a-input placeholder="基金名称,all搜索全部" v-model="searchVal">
                        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" @click="handleSubmit">
                        搜索
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
        <a-spin :spinning="spinning">
            <div class="table">
                <div class="tr table-title">
                    <td width=50>序号</td>
                    <td width=90>代码</td>
                    <td width=180>名称</td>
                    <td width=100>日增长率</td>
                    <td width=100>近一周</td>
                    <td width=100>近一月</td>
                    <td width=100>近三月</td>
                    <td width=100>近六月</td>
                    <td width=100>近一年</td>
                    <td width=100>近二年</td>
                    <td width=100>近三年</td>
                    <td width=100>今年来</td>
                    <td width=100>成立来</td>
                    <td width=100>自定义时间</td>
                    <td width=100>成立时间</td>
                    <td width=100>更新时间</td>
                </div>
                <div class="tr table-body" v-for="(item, index) in currentList" :key="item.code">
                    <td width=50>{{ index + 1 }}</td>
                    <td width=90>{{ item.code }}</td>
                    <td width=180>
                        <a :href="`http://fund.eastmoney.com/${item.code}.html`">{{ item.name }}</a>
                    </td>
                    <td width=100>
                        <div :style="getColor(item.daily_growth)">
                            {{ getText(item.daily_growth) }}
                        </div>
                    </td>
                    <td width=100>
                        <div :style="getColor(item.nearly_week_1)">
                            {{ getText(item.nearly_week_1) }}
                        </div>
                    </td>
                    <td width=100>
                        <div :style="getColor(item.nearly_month_1)">
                            {{ getText(item.nearly_month_1) }}
                        </div>
                        <div v-html="getRatioTemplate(item.nearly_month_1, 1)"></div>
                    </td>
                    <td width=100>
                        <div :style="getColor(item.nearly_month_3)">
                            {{ getText(item.nearly_month_3) }}
                        </div>
                        <div v-html="getRatioTemplate(item.nearly_month_3, 3)"></div>
                    </td>
                    <td width=100>
                        <div :style="getColor(item.nearly_month_6)">
                            {{ getText(item.nearly_month_6) }}
                        </div>
                        <div v-html="getRatioTemplate(item.nearly_month_6, 6)"></div>
                    </td>
                    <td width=100>
                        <div :style="getColor(item.nearly_year_1)">
                            <strong>{{ getText(item.nearly_year_1) }}</strong>
                        </div>
                        <div v-html="getRatioTemplate(item.nearly_year_1, 12)"></div>
                    </td>
                    <td width=100>
                        <div :style="getColor(item.nearly_year_2)">
                            <strong>{{ getText(item.nearly_year_2) }}</strong>
                        </div>
                        <div v-html="getRatioTemplate(item.nearly_year_2, 12 * 2)"></div>
                    </td>
                    <td width=100>
                        <div :style="getColor(item.nearly_year_3)">
                            <strong>{{ getText(item.nearly_year_3) }}</strong>
                        </div>
                        <div v-html="getRatioTemplate(item.nearly_year_3, 12 * 3)"></div>
                    </td>
                    <td width=100>
                        <div :style="getColor(item.this_year)">
                            {{ getText(item.this_year) }}
                        </div>
                    </td>
                    <td width=100>
                        <div :style="getColor(item.all_year)">
                            {{ getText(item.all_year) }}
                        </div>
                    </td>
                    <td width=100>
                        <div :style="getColor(item.custom_time)">
                            {{ getText(item.custom_time) }}
                        </div>
                    </td>
                    <td width=100>{{ item.create_time }}</td>
                    <td width=100>{{ item.update_time }}</td>
                </div>
            </div>
        </a-spin>
        <a-back-top />
        <div class="statistics-box">
            <p>总数: {{ allList.length }} </p>
            <p>当前: {{ currentList.length }}</p>
        </div>
    </div>
</template>
<script>
import { getFundAllList } from "@/api/fund";
import { defaultFilter } from "./filterPolicy";

export default {
    data() {
        return {
            currentList: [],
            allList: getFundAllList(),
            searchVal: "all",
            spinning: false,
            num: 0,
        };
    },
    computed: {
        list: function () {
            return defaultFilter(this.allList).filter((r) => {
                const year_1 = r.nearly_year_1 > 0; //一年涨幅大于60
                const year_2 = r.nearly_year_2 > 0; //二年涨幅大于0
                const custom_time = r.custom_time > -10; //三年涨幅大于0
                const name = !r.name.includes('黄金'); //三年涨幅大于0
                const condition = []
                return !condition.some((res) => !res)
            });
        },
    },
    methods: {
        handleSubmit() {
            const { searchVal } = this;
            this.spinning = true;
            setTimeout(() => {
                if (searchVal === "all") {
                    this.currentList = this.list;
                } else if (searchVal !== "") {
                    this.currentList = this.list.filter((item) => {
                        return item.name.includes(searchVal)
                    });
                }
                this.spinning = false
            })

        },
        getColor(num) {
            if (num > 0) {
                return "color:red"
            } else if (num < 0) {
                return "color:green"
            }
            return "";
        },
        //获取平均每天工作日收益率
        getRatio(num, month) {
            return (num / (26 * month)).toFixed(3);
        },
        getRatioTemplate(num, month) {
            const ratio = this.getRatio(num, month);
            const test = ratio < 0 ? ratio : `+${ratio}`;
            const clolr = this.getRatioClolr(num, month);
            const className = clolr ? `class="${clolr}"` : "";
            return `<div ${className}> ${test} </div>`;
        },
        getRatioClolr(num, month) {
            return this.getRatio(num, month) >= 0.2 && "redBg";
        },
        filterRatio(num, month) {
            console.log(this.getRatio(num, month) >= 0.4);
            return this.getRatio(num, month) >= 0.2;
        },
        getText(num) {
            return num === 0 ? '——' : num + '%'
        }
    },
};
</script>
<style scoped>
table {
    margin: auto;
}

td,
th {
    padding: 5px 10px;
}

tbody tr:hover {
    background: #eee;
}

.form {
    padding: 20px 0;
}

.statistics-box {
    position: fixed;
    left: 0;
    top: 50px;
    padding: 20px;
}
.table{
    margin-top: 55px;
}
.table-title {
    background-color: #1890ff;
    position: fixed;
    top: 100px;
    display: flex;
    justify-content: center;
}


</style>
<template>
  <div>
    <div>
      <a-form layout="inline" class="form">
        <a-form-item>
          <a-input placeholder="基金名称,all搜索全部" v-model="searchVal">
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
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
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>代码</th>
            <th>名称</th>
            <th>日增长率</th>
            <th>近一周</th>
            <th>近一月</th>
            <th>近三月</th>
            <th>近六月</th>
            <th>近一年</th>
            <th>近二年</th>
            <th>近三年</th>
            <th>今年来</th>
            <th>成立来</th>
            <th>自定义时间</th>
            <th>成立时间</th>
            <th>更新时间</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in currentList" :key="item[0]">
            <td>{{ index + 1 }}</td>
            <td>{{ item[0] }}</td>
            <td>
              <a :href="`http://fund.eastmoney.com/${item[0]}.html`">{{
                item[1]
              }}</a>
            </td>
            <td>
              <div :style="getColor(item[6])">
                {{ item[6] }}{{ item[6] == 0 ? "" : "%" }}
              </div>
            </td>
            <td>
              <div :style="getColor(item[7])">
                {{ item[7] }}{{ item[7] == 0 ? "" : "%" }}
              </div>
            </td>
            <td>
              <div :style="getColor(item[8])">
                {{ item[8] }}{{ item[8] == 0 ? "" : "%" }}
              </div>
              <div v-html="getRatioTemplate(item[8], 1)"></div>
            </td>
            <td>
              <div :style="getColor(item[9])">
                {{ item[9] }}{{ item[9] == 0 ? "" : "%" }}
              </div>
              <div v-html="getRatioTemplate(item[9], 3)"></div>
            </td>
            <td>
              <div :style="getColor(item[10])">
                {{ item[10] }}{{ item[10] == 0 ? "" : "%" }}
              </div>
              <div v-html="getRatioTemplate(item[10], 6)"></div>
            </td>
            <td>
              <div :style="getColor(item[11])">
                <strong>{{ item[11] }}{{ item[11] == 0 ? "" : "%" }}</strong>
              </div>
              <div v-html="getRatioTemplate(item[11], 12)"></div>
            </td>
            <td>
              <div :style="getColor(item[12])">
                {{ item[12] }}{{ item[12] == 0 ? "" : "%" }}
              </div>
              <div v-html="getRatioTemplate(item[12], 12 * 2)"></div>
            </td>
            <td>
              <div :style="getColor(item[13])">
                {{ item[13] }}{{ item[13] == 0 ? "" : "%" }}
              </div>
              <div v-html="getRatioTemplate(item[13], 12 * 3)"></div>
            </td>
            <td>
              <div :style="getColor(item[14])">
                {{ item[14] }}{{ item[14] == 0 ? "" : "%" }}
              </div>
            </td>
            <td>
              <div :style="getColor(item[15])">
                {{ item[15] }}{{ item[15] == 0 ? "" : "%" }}
              </div>
            </td>
            <td>
              <div :style="getColor(item[18])">
                {{ item[18] }}{{ item[18] == 0 ? "" : "%" }}
              </div>
            </td>
            <td>{{ item[16] }}</td>
            <td>{{ item[3] }}</td>
          </tr>
        </tbody>
      </table>
    </a-spin>
    <a-back-top />
  </div>
</template>
<script>
import rankData from "./data.js";
import headers from "./Headers.js";
import axios from "axios";
export default {
  data() {
    return {
      currentList: [],
      searchVal: "",
      spinning: false,
      num: 0,
      rankData,
      average: 0,
    };
  },
  computed: {
    list: function () {
      const res = [];
      for (let i in this.rankData.datas) {
        let item = this.rankData.datas[i].split(",");
        const year_1 = Number(item[11]) > 0; //一年涨幅大于60
        const year_2 = Number(item[12]) > 0; //二年涨幅大于0
        const year_3 = Number(item[13]) > 0; //三年涨幅大于0
        const custom_time = Number(item[18]) > -10; //三年涨幅大于0
        console.log(item[12]);
        const zhanzhi = [year_1, year_2, year_3];
        // const zhanzhi = [true];
        if (!zhanzhi.some((res) => !res)) {
          res.push(item);
        }
      }
      return res;
    },
  },
  methods: {
    handleSubmit() {
      if (this.searchVal == "all") {
        this.currentList = this.list;
      } else if (this.searchVal !== "") {
        // this.spinning = true;
        this.getFilterList(this.searchVal);
      }
      console.log("搜索结束");
    },
    getFilterList(val, hide) {
      let average = 0;
      this.currentList = this.list.filter((item) => {
        const res = item[1].indexOf(val) !== -1;
        console.log(item[10] - 0);
        // if (res) {
        average += Number(item[14]);
        // }
        return res;
      });
      this.average = (average / this.currentList.length).toFixed(2);
    },
    getColor(num) {
      return "color:" + (num >= 0 ? "red" : "green");
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
  },
  mounted() {},
  updated() {},
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
</style>

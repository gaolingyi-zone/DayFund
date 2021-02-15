<template>
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
            <th>成立时间</th>
            <th>更新时间</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in currentList"
            v-if="
              (filterRatio(item[11], 12) && filterRatio(item[12], 12 * 2)) ||
              filterRatio(item[13], 12 * 3)
            "
          >
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
              <div :class="getRatioClolr(item[8], 1)">
                +{{ getRatio(item[8], 1) }}
              </div>
            </td>
            <td>
              <div :style="getColor(item[9])">
                {{ item[9] }}{{ item[9] == 0 ? "" : "%" }}
              </div>
              <div :class="getRatioClolr(item[9], 3)">
                +{{ getRatio(item[9], 3) }}
              </div>
            </td>
            <td>
              <div :style="getColor(item[10])">
                {{ item[10] }}{{ item[10] == 0 ? "" : "%" }}
              </div>
              <div :class="getRatioClolr(item[10], 6)">
                +{{ getRatio(item[10], 6) }}
              </div>
            </td>
            <td>
              <div :style="getColor(item[11])">
                <strong>{{ item[11] }}{{ item[11] == 0 ? "" : "%" }}</strong>
              </div>
              <div :class="getRatioClolr(item[11], 12)">
                +{{ getRatio(item[11], 12) }}
              </div>
            </td>
            <td>
              <div :style="getColor(item[12])">
                {{ item[12] }}{{ item[12] == 0 ? "" : "%" }}
              </div>
              <div :class="getRatioClolr(item[12], 12 * 2)">
                +{{ getRatio(item[12], 12 * 2) }}
              </div>
            </td>
            <td>
              <div :style="getColor(item[13])">
                {{ item[13] }}{{ item[13] == 0 ? "" : "%" }}
              </div>
              <div :class="getRatioClolr(item[13], 12 * 3)">
                +{{ getRatio(item[13], 12 * 3) }}
              </div>
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
        // if (item[14]) {
        res.push(item);
        // }
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
    },
    getFilterList(val, hide) {
      let average = 0;
      this.currentList = this.list.filter((item) => {
        const res = item[1].indexOf(val) !== -1;
        if (res) {
          average += Number(item[14]);
        }
        return res;
      });
      this.average = (average / this.currentList.length).toFixed(2);
    },
    getColor(num) {
      return "color:" + (num >= 0 ? "red" : "green");
    },
    //获取平均
    getRatio(num, month) {
      return (num / (26 * month)).toFixed(2);
    },
    getRatioClolr(num, month) {
      return this.getRatio(num, month) >= 0.4 && "red";
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
  margin: 20px 0;
}
.red {
  color: #f00;
}
</style>

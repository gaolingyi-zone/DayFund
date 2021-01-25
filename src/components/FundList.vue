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
            <th>手续费</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in currentList">
            <td>{{ index + 1 }}</td>
            <td>{{ item[0] }}</td>
            <td>{{ item[1] }}</td>
            <td :style="'color:' + (item[6] >= 0 ? 'red' : 'green')">
              {{ item[6] }}{{ item[6] == 0 ? "" : "%" }}
            </td>
            <td :style="'color:' + (item[7] >= 0 ? 'red' : 'green')">
              {{ item[7] }}{{ item[7] == 0 ? "" : "%" }}
            </td>
            <td :style="'color:' + (item[8] >= 0 ? 'red' : 'green')">
              {{ item[8] }}{{ item[8] == 0 ? "" : "%" }}
            </td>
            <td :style="'color:' + (item[9] >= 0 ? 'red' : 'green')">
              {{ item[9] }}{{ item[9] == 0 ? "" : "%" }}
            </td>
            <td :style="'color:' + (item[10] >= 0 ? 'red' : 'green')">
              {{ item[10] }}{{ item[10] == 0 ? "" : "%" }}
            </td>
            <td :style="'color:' + (item[11] >= 0 ? 'red' : 'green')">
              <strong>{{ item[11] }}{{ item[11] == 0 ? "" : "%" }}</strong>
            </td>
            <td :style="'color:' + (item[12] >= 0 ? 'red' : 'green')">
              {{ item[12] }}{{ item[12] == 0 ? "" : "%" }}
            </td>
            <td :style="'color:' + (item[13] >= 0 ? 'red' : 'green')">
              {{ item[13] }}{{ item[13] == 0 ? "" : "%" }}
            </td>
            <td :style="'color:' + (item[14] >= 0 ? 'red' : 'green')">
              {{ item[14] }}{{ item[14] == 0 ? "" : "%" }}
            </td>
            <td :style="'color:' + (item[15] >= 0 ? 'red' : 'green')">
              {{ item[15] }}{{ item[15] == 0 ? "" : "%" }}
            </td>
            <td>{{ item[16] }}</td>
            <td>{{ item[3] }}</td>
            <td>{{ item[20] }}</td>
          </tr>
        </tbody>
      </table>
    </a-spin>
  </div>
</template>
<script>
import rankData from "./data.js";

export default {
  data() {
    return {
      currentList: [],
      searchVal: "",
      spinning: false,
      num: 0,
    };
  },
  computed: {
    list: function () {
      return rankData.datas.map((item, index) => (item = item.split(",")));
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
      this.currentList = this.list.filter(
        (tiem) => tiem[1].indexOf(val) !== -1
      );
    },
  },
  mounted() {
    console.log(this.list[1]);
  },
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
</style>

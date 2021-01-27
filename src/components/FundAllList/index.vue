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
import headers from "./Headers.js";
import axios from "axios";
export default {
  data() {
    return {
      currentList: [],
      searchVal: "",
      spinning: false,
      num: 0,
      rankDataD: [],
    };
  },
  computed: {
    list: function () {
      return this.rankDataD.datas.map(
        (item, index) => (item = item.split(","))
      );
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
    randHeader() {
      const head_connection = ["Keep-Alive", "close"];
      const head_accept = ["text/html, application/xhtml+xml, */*"];
      const head_accept_language = [
        "zh-CN,fr-FR;q=0.5",
        "en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3",
      ];
      const head_user_agent = [
        "Opera/8.0 (Macintosh; PPC Mac OS X; U; en)",
        "Opera/9.27 (Windows NT 5.2; U; zh-cn)",
        "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Win64; x64; Trident/4.0)",
        "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)",
        "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C; .NET4.0E)",
        "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C; .NET4.0E; QQBrowser/7.3.9825.400)",
        "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; BIDUBrowser 2.x)",
        "Mozilla/5.0 (Windows; U; Windows NT 5.1) Gecko/20070309 Firefox/2.0.0.3",
        "Mozilla/5.0 (Windows; U; Windows NT 5.1) Gecko/20070803 Firefox/1.5.0.12",
        "Mozilla/5.0 (Windows; U; Windows NT 5.2) Gecko/2008070208 Firefox/3.0.1",
        "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.12) Gecko/20080219 Firefox/2.0.0.12 Navigator/9.0.0.6",
        "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; rv:11.0) like Gecko)",
        "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0 ",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Maxthon/4.0.6.2000 Chrome/26.0.1410.43 Safari/537.1 ",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.92 Safari/537.1 LBBROWSER",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.11 TaoBrowser/3.0 Safari/536.11",
        "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
        "Mozilla/5.0 (Macintosh; PPC Mac OS X; U; en) Opera 8.0",
      ];
      const result = {
        Connection: head_connection[0],
        Accept: head_accept[0],
        "Accept-Language": head_accept_language[1],
        "User-Agent": head_user_agent[Math.floor(Math.random() * 10)],
      };
      return result;
    },
  },
  mounted() {
    console.log(123);
    let _this = this;

    axios.get(`http://localhost:8888/`).then(({ data: { data } }) => {
      // console.log( new Function(data));
      function looseJsonParse() {
        return Function(data + "; return rankData")();
      }
      this.rankDataD = looseJsonParse();
      // _this.rankDataD = rankData;
      // console.log(rankData);
    });
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

<template>
  <div>
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="基金名称" v-model="searchVal">
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
    <a-table
      :columns="columns"
      :data-source="currentList"
      :pagination="false"
      :rowKey="(record) => record[25]"
    >
      <span slot="i0" slot-scope="i0">
        <a :href="`http://fund.eastmoney.com/${i0}.html`">{{ i0 }}</a>
      </span>

      <span slot="i6" slot-scope="i6">
        <span :style="'color:' + (i6 >= 0 ? 'red' : 'green')"
          >{{ i6 }}{{ i6 == 0 ? "" : "%" }}</span
        >
      </span>
      <span slot="i7" slot-scope="i7">
        <span :style="'color:' + (i7 >= 0 ? 'red' : 'green')"
          >{{ i7 }}{{ i7 == 0 ? "" : "%" }}</span
        >
      </span>
      <span slot="i8" slot-scope="i8">
        <span :style="'color:' + (i8 >= 0 ? 'red' : 'green')"
          >{{ i8 }}{{ i8 == 0 ? "" : "%" }}</span
        >
      </span>
      <span slot="i9" slot-scope="i9">
        <span :style="'color:' + (i9 >= 0 ? 'red' : 'green')"
          >{{ i9 }}{{ i9 == 0 ? "" : "%" }}</span
        >
      </span>
      <span slot="i10" slot-scope="i10">
        <span :style="'color:' + (i10 >= 0 ? 'red' : 'green')"
          >{{ i10 }}{{ i10 == 0 ? "" : "%" }}</span
        >
      </span>
      <span slot="i11" slot-scope="i11">
        <span :style="'color:' + (i11 >= 0 ? 'red' : 'green')"
          >{{ i11 }}{{ i11 == 0 ? "" : "%" }}</span
        >
      </span>
      <span slot="i12" slot-scope="i12">
        <span :style="'color:' + (i12 >= 0 ? 'red' : 'green')"
          >{{ i12 }}{{ i12 == 0 ? "" : "%" }}</span
        >
      </span>
      <span slot="i13" slot-scope="i13">
        <span :style="'color:' + (i13 >= 0 ? 'red' : 'green')"
          >{{ i13 }}{{ i13 == 0 ? "" : "%" }}</span
        >
      </span>
      <span slot="i14" slot-scope="i14">
        <span :style="'color:' + (i14 >= 0 ? 'red' : 'green')"
          >{{ i14 }}{{ i14 == 0 ? "" : "%" }}</span
        >
      </span>
      <span slot="i15" slot-scope="i15">
        <span :style="'color:' + (i15 >= 0 ? 'red' : 'green')"
          >{{ i15 }}{{ i15 == 0 ? "" : "%" }}</span
        >
      </span>
    </a-table>
  </div>
</template>
<script>
import rankData from "./data.js";

const columns = [
  {
    title: "代码",
    dataIndex: "0",
    key: "0",
    scopedSlots: { customRender: "i0" },
  },
  {
    title: "名称",
    dataIndex: "1",
    key: "1",
    scopedSlots: { customRender: "i1" },
  },
  {
    title: "日增长率",
    dataIndex: "6",
    key: "6",
    scopedSlots: { customRender: "i6" },
  },
  {
    title: "近一周",
    dataIndex: "7",
    key: "7",
    scopedSlots: { customRender: "i7" },
  },
  {
    title: "近一月",
    dataIndex: "8",
    key: "8",
    scopedSlots: { customRender: "i8" },
  },
  {
    title: "近三月",
    dataIndex: "9",
    key: "9",
    scopedSlots: { customRender: "i9" },
  },
  {
    title: "近六月",
    dataIndex: "10",
    key: "10",
    scopedSlots: { customRender: "i10" },
  },
  {
    title: "近一年",
    dataIndex: "11",
    key: "11",
    scopedSlots: { customRender: "i11" },
  },
  {
    title: "近二年",
    dataIndex: "12",
    key: "12",
    scopedSlots: { customRender: "i12" },
  },
  {
    title: "近三年",
    dataIndex: "13",
    key: "13",
    scopedSlots: { customRender: "i13" },
  },
  ,
  {
    title: "今年来",
    dataIndex: "14",
    key: "14",
    scopedSlots: { customRender: "i14" },
  },
  ,
  {
    title: "成立来",
    dataIndex: "15",
    key: "15",
    scopedSlots: { customRender: "i15" },
  },
  {
    title: "成立时间",
    dataIndex: "16",
    key: "16",
  },
  {
    title: "手续费",
    dataIndex: "20",
    key: "20",
  },
];

const data = [
  [
    "005968",
    "创金合信工业周期股票A",
    "CJHXGYZQGPA",
    "2021-01-22",
    "3.4165",
    "3.4165",
    "3.30",
    "9.61",
    "29.57",
    "59.48",
    "84.88",
    "166.04",
    "312.97",
    "",
    "21.46",
    "241.65",
    "2018-05-17",
    "1",
    "51.2454",
    "1.50%",
    "0.15%",
    "1",
    "0.15%",
    "1",
    "",
  ],
];

export default {
  data() {
    return {
      columns,
      currentList: [],
      searchVal: "",
    };
  },
  computed: {
    list: function () {
      return rankData.datas.map((item, index) => (item = item.split(",")));
    },
  },
  methods: {
    handleSubmit() {
      // const hide = this.$message.loading("搜索中.....", 0);

      this.getFilterList(this.searchVal);
      // hide();
    },
    getFilterList(val, hide) {
      this.currentList = this.list.filter(
        (tiem) => tiem[1].indexOf(val) !== -1
      );
    },
  },
  mounted() {},
  updated() {
    console.log("------------------,有", this.currentList.length);
  },
};
</script>

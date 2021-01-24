<template>
  <el-table
    :data="list"
    style="width: 100%"
    :default-sort="{ prop: '0', order: 'descending' }"
  > 
    <el-table-column type="index" label="序号" width="90"></el-table-column>
    <el-table-column sortable label="代码" width="90" >
      <template slot-scope="scope">
        {{ scope.row[0] }}
      </template>
    </el-table-column>
    <el-table-column label="名称" >
      <template slot-scope="scope">
        {{ scope.row[1] }}
      </template>
    </el-table-column>
     <el-table-column label="日增长率" width="90" >
      <template slot-scope="scope">
        {{ scope.row[6] }}
      </template>
    </el-table-column> <el-table-column label="近一周" width="90" >
      <template slot-scope="scope">
        {{ scope.row[7] }}
      </template>
    </el-table-column> <el-table-column label="近一月" width="90" >
      <template slot-scope="scope">
        {{ scope.row[8] }}
      </template>
    </el-table-column> <el-table-column label="近三月"width="90"  >
      <template slot-scope="scope">
        {{ scope.row[9] }}
      </template>
    </el-table-column> <el-table-column label="近六月" width="90" >
      <template slot-scope="scope">
        {{ scope.row[10] }}
      </template>
    </el-table-column> <el-table-column label="近一年" width="90" >
      <template slot-scope="scope">
        {{ scope.row[11] }}
      </template>
    </el-table-column>
     </el-table-column> <el-table-column label="近二年" width="90" >
      <template slot-scope="scope">
        {{ scope.row[12] }}
      </template>
    </el-table-column>
     </el-table-column> <el-table-column label="近三年" width="90" >
      <template slot-scope="scope">
        {{ scope.row[13] }}
      </template>
    </el-table-column>
     </el-table-column> <el-table-column label="今年来" width="90" >
      <template slot-scope="scope">
        {{ scope.row[14] }}
      </template>
    </el-table-column>
     </el-table-column> <el-table-column label="成立来" width="90" >
      <template slot-scope="scope">
        {{ scope.row[15] }}
      </template>
    </el-table-column>
     </el-table-column> <el-table-column label="成立时间"  width="100">
      <template slot-scope="scope">
        {{ scope.row[16] }}
      </template>
    </el-table-column>
     </el-table-column> <el-table-column label="手续费"width="90">
      <template slot-scope="scope">
        {{ scope.row[20] }}
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
let t1 = performance.now();

import rankData from "./data.js";
export default {
  data() {
    return {};
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
  },
  computed: {
    list: function () {
      return rankData.datas.map((item, index) => (item = item.split(",")));
    },
  },
  mounted() {
    console.log(this.list.length);
    const t2 = performance.now();
    console.log("执行了" + (t2 - t1) + "毫秒.");
  },
};
</script>
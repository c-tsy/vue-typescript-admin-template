<template>
  <el-row>
    <el-col :span="24">
      <el-table :data="List.L">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="账号" prop="Accounts">
          <template slot-scope="scope">
            <span v-for="(v,k) in scope.row.Accounts" :key="k">{{v.Account}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="Name"></el-table-column>
        <el-table-column label="昵称" prop="Nick"></el-table-column>
        <el-table-column label="操作">
          <!-- <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>-->
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="NChange"
        @current-change="PChange"
        :current-page="List.P"
        :page-sizes="[1,10, 20, 50, 100]"
        :page-size.sync="Where.N"
        layout="total, sizes, prev, pager, next, jumper"
        :total="List.T"
      ></el-pagination>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { SearchWhere } from "@ctsy/api-sdk/dist/lib";
@Component({})
export default class UserList extends Vue {
  Where: SearchWhere = new SearchWhere();
  get List() {
    return this.$store.state.users.Result;
  }
  NChange(v: number) {
    this.Where.N = v;
  }
  PChange(v: number) {
    this.Where.P = v;
  }
  @Watch("Where", { deep: true })
  getList() {
    this.$store.dispatch("get_users_list", this.Where);
  }
  created() {
    this.$store.dispatch("get_users_list");
  }
}
</script>

<style lang="less" scoped>
</style>
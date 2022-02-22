<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="90px">
          <el-form-item label="客户姓名" prop="customerName">
            <el-input v-model="queryParams.customerName" placeholder="请输入客户姓名" clearable size="small" style="width: 150px" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="客户编码" prop="customerCode">
            <el-input v-model="queryParams.customerCode" placeholder="请输入客户编码" clearable size="small" style="width: 150px" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone1">
            <el-input v-model="queryParams.phone1" placeholder="请输入手机号码" clearable size="small" style="width: 150px" @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="是否子客户" prop="status">
            <el-select v-model="queryParams.isChild" placeholder="用户是否子客户" clearable size="small" style="width: 150px">
              <el-option key="" label="请选择" value="" />
              <el-option key="1" label="子客户" value="1" />
              <el-option key="0" label="非子客户" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否展销" prop="status">
            <el-select v-model="queryParams.isExhibition" placeholder="用户是否展销" clearable size="small" style="width: 150px">
              <el-option key="1" label="是" value="1" />
              <el-option key="0" label="否" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['customer:customerList:add']">新增</el-button>
          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="客户编码" align="center" key="customerCode" min-width="120" prop="customerCode" v-if="columns[0].visible" />
          <el-table-column label="客户姓名" align="center" key="customerName" min-width="120" prop="customerName" v-if="columns[1].visible" :show-overflow-tooltip="true" />
          <el-table-column label="主客户名称" align="center" key="parentCustomerName" min-width="120" prop="parentCustomerName" v-if="columns[2].visible" :show-overflow-tooltip="true" />
          <el-table-column label="主客户编码" align="center" key="parentCustomerCode" min-width="120" prop="parentCustomerCode" v-if="columns[3].visible" :show-overflow-tooltip="true" />
          <el-table-column label="是否子客户" align="center" key="isChild" prop="isChild" min-width="90" v-if="columns[4].visible" >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isChild == 1">是</el-tag>
              <el-tag v-if="scope.row.isChild == 0" type="info">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否展销" align="center" key="isExhibition" min-width="80" v-if="columns[5].visible">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isExhibition == 1">是</el-tag>
              <el-tag v-if="scope.row.isExhibition == 0" type="info">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否折扣" align="center" key="isDiscount" min-width="80" prop="isDiscount" v-if="columns[6].visible">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isDiscount == 1">是</el-tag>
              <el-tag v-if="scope.row.isDiscount == 0" type="info">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否字印" align="center" key="isEngrave" min-width="80" prop="isEngrave" v-if="columns[7].visible">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isEngrave == 1">是</el-tag>
              <el-tag v-if="scope.row.isEngrave == 0" type="info">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否挂签" align="center" key="isTag" min-width="80" prop="isTag" v-if="columns[8].visible">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isTag == 1">是</el-tag>
              <el-tag v-if="scope.row.isTag == 0" type="info">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="快速出货" align="center" key="isFastOut" min-width="80" prop="isFastOut" v-if="columns[9].visible">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isFastOut == 1">是</el-tag>
              <el-tag v-if="scope.row.isFastOut == 0" type="info">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="子客户是否继承主客户的字印" align="center" key="isExtends" prop="isExtends" min-width="200" v-if="columns[10].visible">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isExtends == 1">是</el-tag>
              <el-tag v-if="scope.row.isExtends == 0" type="info">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="160" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:user:edit']">修改</el-button>
<!--              <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" v-hasPermi="['system:user:remove']">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList"/>
    </el-row>

    <customerForm :open="open" :title="title" @changeOpen="changeOpen"></customerForm>

  </div>
</template>

<script>
  import { getListPage } from "@/api/customer/customerList";
  import { getToken } from "@/utils/auth";
  import customerForm from "./modules/customerForm";

  export default {
    name: "User",
    components: { customerForm },
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 用户表格数据
        userList: null,
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          customerName: undefined,
          customerCode: undefined,
          phone1: undefined,
          isChild: undefined,
          isExhibition: undefined
        },
        // 列信息
        columns: [
          { key: 0, label: `客户编码`, visible: true },
          { key: 1, label: `客户姓名`, visible: true },
          { key: 2, label: `主客户名称`, visible: true },
          { key: 3, label: `主客户编码`, visible: true },
          { key: 4, label: `是否子客户`, visible: true },
          { key: 5, label: `是否展销`, visible: true },
          { key: 6, label: `是否折扣`, visible: true },
          { key: 7, label: `是否字印`, visible: true },
          { key: 8, label: `是否挂签`, visible: true },
          { key: 9, label: `快速出货`, visible: true },
          { key: 10, label: `子客户是否继承主客户的字印`, visible: true }
        ],

      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询用户列表 */
      getList() {
        this.loading = true;
        getListPage(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            this.userList = response.data.rows;
            this.total = response.data.total;
            this.loading = false;
          }
        );
      },

      changeOpen(status){
        this.open = status
      },
      // 用户状态修改
      handleStatusChange(row) {
        let text = row.status === "0" ? "启用" : "停用";
        this.$modal.confirm('确认要"' + text + '""' + row.userName + '"用户吗？').then(function() {
          return changeUserStatus(row.userId, row.status);
        }).then(() => {
          this.$modal.msgSuccess(text + "成功");
        }).catch(function() {
          row.status = row.status === "0" ? "1" : "0";
        });
      },


      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.dateRange = [];
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.userId);
        this.single = selection.length != 1;
        this.multiple = !selection.length;
      },
      // 更多操作触发
      handleCommand(command, row) {
        switch (command) {
          case "handleResetPwd":
            this.handleResetPwd(row);
            break;
          case "handleAuthRole":
            this.handleAuthRole(row);
            break;
          default:
            break;
        }
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.open = true;
        this.title = "添加用户";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.open = true;
        this.title = "修改用户";
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.userId != undefined) {
              updateUser(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addUser(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const userIds = row.userId || this.ids;
        this.$modal.confirm('是否确认删除用户编号为"' + userIds + '"的数据项？').then(function() {
          return delUser(userIds);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
    }
  };
</script>

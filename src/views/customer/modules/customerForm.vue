<template>
  <!-- 添加或修改参数配置对话框 -->
  <el-dialog :title="title" :visible.sync="open" width="800px" :before-close="cancel" append-to-body>
    <el-form ref="form" :model="form" :rules="rules" label-width="110px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户编码" prop="customerCode">
            <el-input v-model="form.customerCode" placeholder="请输入客户编码" maxlength="30" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户姓名" prop="customerName">
            <el-input v-model="form.customerName" placeholder="请输入客户姓名" maxlength="30" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="phone1">
            <el-input v-model="form.phone1" placeholder="请输入手机号码" maxlength="11" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人" prop="contactMan">
            <el-input v-model="form.contactMan" placeholder="请输入联系人" maxlength="50" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="子客户" size="mini">
            <el-radio-group v-model="form.isChild">
              <el-radio label="0" border>否</el-radio>
              <el-radio label="1" border>是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="可以折扣" size="mini">
            <el-radio-group v-model="form.isDiscount">
              <el-radio label="0" border>否</el-radio>
              <el-radio label="1" border>是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="可以字印" size="mini">
            <el-radio-group v-model="form.isEngrave">
              <el-radio label="0" border>否</el-radio>
              <el-radio label="1" border>是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="可以挂签" size="mini">
            <el-radio-group v-model="form.isTag">
              <el-radio label="0" border>否</el-radio>
              <el-radio label="1" border>是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="可以快速出货" size="mini">
            <el-radio-group v-model="form.isFastOut">
              <el-radio label="0" border>否</el-radio>
              <el-radio label="1" border>是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="子客户继承主客户字印">
            <el-radio-group v-model="form.isExtends" size="mini">
              <el-radio label="0" border>否</el-radio>
              <el-radio label="1" border>是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {  } from "@/api/system/dept";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    title:{
      type: String,
      default: ""
    },
  },
  name: "Dept",
  dicts: ['sys_normal_disable'],
  components: {  },
  data() {
    return {
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        phone1: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
  },
  methods: {
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        console.log(this.form);
        // if (valid) {
        //   if (this.form.userId != undefined) {
        //     updateUser(this.form).then(response => {
        //       this.$modal.msgSuccess("修改成功");
        //       this.open = false;
        //       this.getList();
        //     });
        //   } else {
        //     addUser(this.form).then(response => {
        //       this.$modal.msgSuccess("新增成功");
        //       this.open = false;
        //       this.getList();
        //     });
        //   }
        // }
      });
    },
    // 取消按钮
    cancel() {
      this.$emit("changeOpen",false)
    },
  }
};
</script>

<template>
    <el-container direction="vertical">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="margin10">
            <el-breadcrumb-item :to="{ path: '/welcome' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>帐号与安全</el-breadcrumb-item>
            <el-breadcrumb-item>个人资料</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form">
            <el-form-item label="账号">
                <el-input 
                placeholder="请输入内容"
                v-model="form.id"
                :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input 
                placeholder="请输入内容"
                v-model="form.name"
                :disabled="activeDisabled">
                </el-input>
            </el-form-item>
            <el-form-item><el-button @click="clickEdit">编辑</el-button><el-button @click="clickSave">保存</el-button></el-form-item>
        </el-form>
<el-dialog
  title="个人资料"
  :visible.sync="dialogVisible"
  width="30%">
  <span>确认修改？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="queenChangeName">确 定</el-button>
  </span>
</el-dialog>
    </el-container>
</template>
<style lang="stylus" scoped>
.margin10
  margin 1rem 0
</style>
<script>
export default {
    components: {
    },
    data(){
        return {
            activeDisabled:true,
            form: {
                id:'',
                name:''
            },
            dialogVisible: false,
        }
    },
    created(){
        this.form.id=this.$store.state.user.userInfo.user.id
        this.form.name=this.$store.state.user.userInfo.user.name
    },
    methods:{
        clickEdit(){// eslint-disable-next-line
            console.log("bianji")
            this.activeDisabled = false
        },
        clickSave(){// eslint-disable-next-line
            console.log("save")
            // 禁用编辑框
            this.activeDisabled = true
            // 打开对话框
            this.dialogVisible = true
        },
        queenChangeName(){
            this.$store.dispatch("user/changeName",this.form).then(res=>{
                this.dialogVisible = false
                this.$message.success("修改成功")
            })
        }
    },
    head: {
        title: "四一疫情 | 个人资料"|| '',
    },
}
</script>
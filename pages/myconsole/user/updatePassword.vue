<template>
    <el-container direction="vertical">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="margin10">
            <el-breadcrumb-item :to="{ path: '/welcome' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>帐号与安全</el-breadcrumb-item>
            <el-breadcrumb-item>修改密码</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
        ref="form"
        :model="form"
        :rules="rules">
            <el-form-item label="账号">
                <el-input 
                placeholder="请输入内容"
                v-model="form.id"
                :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item 
                prop="password"
                label="旧密码">
                <el-input 
                type="password"
                placeholder="请输入旧密码"
                v-model="form.password">
                </el-input>
            </el-form-item>
            <el-form-item
                prop="newpassword"
                label="新密码">
                <el-input 
                type="password"
                placeholder="请输入新密码"
                v-model="form.newpassword">
                </el-input>
            </el-form-item>
            <el-form-item 
                prop="passwordAgain"
                label="确认密码">
                <el-input 
                type="password"
                placeholder="请输入确认密码"
                v-model="form.passwordAgain">
                </el-input>
            </el-form-item>
            <el-form-item><el-button @click="clickSave">保存</el-button></el-form-item>
        </el-form>
<el-dialog
  title="修改密码"
  :visible.sync="dialogVisible"
  width="30%">
  <span>确认修改？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="changePassword">确 定</el-button>
  </span>
</el-dialog>
    </el-container>
</template>
<style lang="stylus" scoped>
.margin10
  margin 1rem 0
</style>
<script>
let password,passwAgain
function valPassword(rule, value,callback){
    if(value===''||value===undefined||value===null){
        callback();
    }else{
        // const reg =   /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
        // 简单的reg
        const reg =   /^[0-9A-Za-z]{6,18}$/
        password=value
        if ((!reg.test(value)) && value !== '') {
            callback(new Error('密码必须包含数字、字母'));
        } else {
            callback();
        }
    }
}
function valPasswAgain(rule, value,callback){
    if(value===''||value===undefined||value===null){
        callback();
    }else{
        // const reg =   /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
        // 简单的reg
        const reg =   /^[0-9A-Za-z]{6,18}$/
        passwAgain=value
        if ((!reg.test(value)) && value !== '') {
            callback(new Error('确认密码必须包含数字、字母'));
        } else if(passwAgain !== password){
            callback(new Error('两次密码不相同'));
        }else {
            callback();
        }
    }
}

export default {
    components: {
    },
    data(){
        return {
            form:{
                id:'',
                password:'',    // 旧密码
                newpassword:'',  // 新密码
                passwordAgain:''  // //确认密码
            },
            rules:{
                password:[{required:true,message:"请输入旧密码",trigger:"blur"}],
                newpassword:[
                    {required:true,message:"请输入新密码",trigger:"blur"},
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
                    { validator:valPassword, trigger: 'blur' },],
                passwordAgain:[
                    {required:true,message:"请输入确认密码",trigger:"blur"},
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
                    { validator:valPasswAgain, trigger: 'blur' },
                    ],
            },
            dialogVisible: false
        }
    },
    created(){
        this.form.id=this.$store.state.user.userInfo.user.id
    },
    methods:{
        clickSave(){// eslint-disable-next-line
            console.log("save")
            // 打开对话框
            this.dialogVisible = true
        },
        changePassword(){
            // 修改密码
            this.dialogVisible = false
            this.$axios({
                url:'/usermodel/user/update/password',
                method:'post',
                data:this.form
            }).then(res=>{
            const msg = res.data.msg
            const code = res.data.code
            if(code === 200){
                this.$message.success(msg)
                this.$router.push('/welcome')
            }
            if(code === 500)
                this.$message.success(msg)
            })
        }
    },
    head: {
        title: "四一疫情 | 修改密码"|| '',
    },
}
</script>
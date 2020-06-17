<template>
    <div>
    <el-form
    ref="form"
    :model="form"
    :rules="rules">
    <el-row>
        <avatar class="avtar-wrapper"/>
        <el-form-item prop="id">
            <el-input
            v-model="form.id"
            placeholder="账号/手机号">
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input
            v-model="form.password"
            placeholder="密码"
            type="password"
            show-password
            >
            </el-input>
        </el-form-item>
    </el-row>
    <el-button type="primary" style="width:100%;" @click="handleLogin">    登录    </el-button>
    </el-form>
</div>
</template>
<style lang="stylus" scoped>
.avtar-wrapper 
  padding 2rem 0
  
</style>
<script>
// import axios from 'axios'
import avatar from '@/components/user/avatar.vue'

export default {
    components:{
        avatar
    },
    data(){
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            form:{
                id:"",
                password:""
            },
            rules:{
                id:[{required:true,message:"请输入账号/手机号",trigger:"blur"}],
                password:[{required:true,message:"请输入密码",trigger:"blur"}]
            }
        }
    },
    methods:{
        handleLogin(){
            this.$refs.form.validate(valid=>{
                if(valid){
                    // 调用登录接口
                    this.$store.dispatch("user/login",this.form).then(res => {
                        const code = this.$store.state.user.userInfo.code
                        const msg = this.$store.state.user.userInfo.msg
                        if(code === 200){
                            this.$message.success("登录成功")
                            this.$router.push('/welcome')
                        }
                        if(code === 500){
                            this.$message.warning(msg)
                        }
                    })
                }
            })
        },
    }
}
</script>

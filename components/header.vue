<template>
    <el-header type="flex" class="row-bg" justify="space-between" style=" height:2.5rem">
        <el-col :span="3"><h3 @click="joinWelcome" class="font-setter">四 一 疫 情</h3></el-col>
        <el-col  type="flex" justify="end" :span="21">
            <p align="end">
                <span v-if="$store.state.user.userInfo.user.name==='登录/注册'">
                    <nuxt-link style="color:#333;text-decoration:none;" to="/user/login"><span>{{this.$store.state.user.userInfo.user.name}}</span></nuxt-link>
                </span>
                <span v-else>
                    <nuxt-link style="color:#333;text-decoration:none;" to="/myconsole/">
                        <i class="el-icon-setting" style="margin-right: 0.5rem;font-size: 1rem"></i>
                        <span>{{this.$store.state.user.userInfo.user.name}}</span>
                    </nuxt-link>
                </span>
            </p>
        </el-col>
    </el-header>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    mounted(){
        // eslint-disable-next-line
        console.log(this.$store.state.user)// .user.userInfo.state.username
    },
    methods:{
        handleClick(){
            // 清除用户数据
            this.$store.commit("user/ clearUserInfo")

            this.$message({
                message: "退出成功",
                type: "success"
            })
        },
        joinWelcome(){
            this.$router.push("/welcome")
        }
    }
}
</script>

<style scoped>
  .setter{
      z-index: 0;
  }
  .el-header {
    background: url('~assets/img/header_bg.png') repeat-x;
    box-shadow: 0 0.125rem 0.75rem 0 rgba(0, 0, 0, 0.1);
    color: #333;
    font-size: 1rem;
    line-height: 2.5rem;
    padding: 0 4rem;
    width: 100%;
    box-sizing: border-box;
  }
  
  .el-aside {
    color: #333;
  }
  .font-setter{
      color:rgba(245, 108, 108,0.8);
      cursor:pointer;
      font-family:Verdana, Geneva, Tahoma, sans-serif;
      text-align: center;
  }
  .font-setter:hover{
      color:#F56C6C;
  }
</style>
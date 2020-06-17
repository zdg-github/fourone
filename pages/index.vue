<template>
<el-container class="place-bg">
  <el-tooltip class="item" effect="dark" content="进入主页" placement="top">
    <a @click.prevent="joinWelcome"> 
        <el-aside class="bg-container" width="40vw"></el-aside>
    </a>
  </el-tooltip>
  <el-main class="login-container">
    <el-row
    type="flex"
    justify="start"
    class="main">
      <div class="form-wrapper">
        <!-- 表单头部tab -->
        <el-row type="flex" justify="start" class="tabs">
            <span
                v-for="(item, index) in [`登录`,`注册`]" 
                :key="index"
                :class="{active: currentTab===index}" 
                class="tab"
                @click="handleChangeTab(index)">
                {{item}} 
            </span>
        </el-row>
        <loginForm v-if="currentTab===0"></loginForm>
        <registForm v-if="currentTab===1"></registForm>
      </div>
    </el-row>
  </el-main>
</el-container>
</template>
<style lang="stylus" scoped>
.login-container
  margin 4vh
  margin-left 0
  padding 0
.main
  height 92vh
  .form-wrapper
    background-color #ffffff
    position relative
    padding 4vw
    padding-top 0
    padding-bottom 0
    min-width 31.25rem
    .tabs
      font-size 1.2rem
      line-height 2rem
      background-color #EBEEF5
      .tab
        display inline-block
        text-align center
        width 20vw
        min-width 15.625rem
        box-sizing border-box  
        border-top 4px solid #EBEEF5
      .active
        border-top 4px solid #ffdd44
        background-color #ffffff
.place-bg
    width 88vw
    height 100vh
    margin 0 auto

.bg-container  
  margin 4vh
  margin-right 0
  height 92vh
  background url('~assets/img/pic_5tu_big_theme.jpg') no-repeat
  background-size cover
  background-position center center
  position relative
  
</style>
<script>
import loginForm from '@/components/user/loginForm.vue';
import registForm from '@/components/user/registForm.vue';
export default {
    layout:'login',
    components:{
        loginForm,
        registForm
    },
    data(){
        return {
            currentTab:0
        }
    },
    methods:{
        handleChangeTab(index){
            this.currentTab=index
        },
        joinWelcome(){
            this.$router.push('/welcome')
        }
    }
}
</script>
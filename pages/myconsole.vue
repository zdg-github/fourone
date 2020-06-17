<template>
<el-container class="main-container">
    <el-aside width="200px" class="bg-wrapper">
        <el-menu 
         :default-active="defaultPathActive"
         active="is-active"
         @select="handleSelect"
         router
         class="el-menu-vertical-demo">
         <!-- 首页暂时做为主页，后面再做图表展示数据用 -->
        <el-menu-item   index="/welcome/">
            <template slot="title">
                    <i class="el-icon-s-home"></i>首页
            </template>
        </el-menu-item>
        
        <el-menu-item-group>
            <template slot="title">文章管理</template>
            <el-menu-item 
                :class="$route.path === '/myconsole/article'?'is-active1':''" 
                index="/myconsole/article">
                <i class="el-icon-message"></i>我的文章
            </el-menu-item>
            <el-menu-item  
                :class="$route.path === '/myconsole/article/notchecked'?'is-active1':''" 
                index="/myconsole/article/notchecked">
                <i class="el-icon-message"></i>待审核文章
            </el-menu-item>
            <el-menu-item 
                :class="$route.path === '/myconsole/postArticle'?'is-active1':''" 
                index="/myconsole/postArticle">
                <i class="el-icon-edit"></i>发布文章
            </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
            <template slot="title">评论管理</template>
            <el-menu-item
                :class="$route.path === '/myconsole/comments'?'is-active1':''" 
                index="/myconsole/comments">
                <i class="el-icon-edit"></i>我的文章评论
            </el-menu-item>
            <el-menu-item 
                :class="$route.path === '/myconsole/comments/myPostComment'?'is-active1':''" 
                index="/myconsole/comments/myPostComment">
                <i class="el-icon-edit"></i>我发表的评论
            </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
            <template slot="title">
                帐号与安全
            </template>
            <el-menu-item 
                :class="$route.path === '/myconsole/user'?'is-active1':''" 
                index="/myconsole/user">
                    <i class="el-icon-message"></i>个人资料
            </el-menu-item>
            <el-menu-item 
                :class="$route.path === '/myconsole/user/updatePassword'?'is-active1':''" 
                index="/myconsole/user/updatePassword">
                    <i class="el-icon-message"></i>修改密码
            </el-menu-item>
            <el-menu-item @click="logout">
                    <i class="el-icon-message"></i>退出账号
            </el-menu-item>
        </el-menu-item-group>
        </el-menu>
    </el-aside>
  
  <el-container class="bg-wrapper">
    <el-main class="main-wrapper">
        <div class="content">
        <NuxtChild  />
        </div>
    </el-main>
  </el-container>
</el-container>
</template>


<script>
  export default {
    layout:"welcome",
    components:{
    },
    data() {
      return {
        defaultPathActive: '/myconsole/',
      }
    },
    methods:{
        handleSelect(key,keyPath) {
             // eslint-disable-next-line
            console.log("select",key, keyPath);
             // eslint-disable-next-line
            console.log("select",this.defaultPathActive);
        },
        logout(){
            this.$store.dispatch('user/logout')
            this.$message.success("账号，退出成功")
            this.$router.push('/user/login')
        },
    },
    head: {
        title: "四一疫情 | 控制台"|| '',
    },
  };
</script>
<style lang="stylus" scoped>
.main-container
  width 75rem
  height 100%
  min-height 100vh
  margin 0.5rem auto
  box-shadow 0 0.125rem 0.75rem 0 rgba(0, 0, 0, 0.1)
.main-wrapper
  padding-top 0
  background-color rgb(255, 255, 255);
.bg-wrapper
  min-height 100vh
  background-color rgba(255, 255, 255,0.80);
.el-menu-item 
    height 45px
    line-height 45px
    border-left 2px solid #fff
.is-active
  color #303133;;
  border-color #ffffff;
.is-active1
  color #ca0c16;
  border-color #ca0c16;
</style>
<style>
  .el-aside {
    color: #333;
  }
</style>
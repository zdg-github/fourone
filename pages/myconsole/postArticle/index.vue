<template>
    <el-container direction="vertical">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="margin10">
            <el-breadcrumb-item :to="{ path: '/welcome' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
    <el-form class="upload-article">
        <el-form-item>
            <el-input v-model="article.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item>
            <!-- <textarea v-model="article.detail" id="editor" rows="30" style="display:none;visibility:hidden;"></textarea> -->
            <wang ref="wang" :catch-data="getWangContent" :content="article.detail" />
        </el-form-item>
        <el-form-item>
            <el-row>
                <el-button @click="handleSubmit" type="danger" plain>发布文章</el-button>
            </el-row>
        </el-form-item>
    </el-form>
    </el-container>
</template>
<script>
import wang from '~/components/wang/index.vue'
export default {
    components:{
        wang
    },
    data(){
        return {
            article:{
                id:"",      // 用户id
                title:"",   // 文章标题
                detail:"<h2>离开页面会自动清空喔ovo</h2>",  // 文章正文
            },
        }
    },
    mounted(){
        this.article.id = this.$store.state.user.userInfo.user.id
    },
    methods:{
        handleSubmit(){
            // 发布文章
            // eslint-disable-next-line
            console.log(this.article.detail)
            this.$axios({
                url:'/usermodel/essay/save',
                method:'post',
                data: this.article
            }).then(res=>{
                // // eslint-disable-next-line
                // console.log(res)
                this.$message.success("发布成功")
                this.$router.push('/myconsole/article/notchecked')
            })
        },
        handleData(getEditorData){
            // 获取子组件返回数据
            // console.log(getEditorData)
            this.article.detail = getEditorData
        },
        getWangContent(content) {
            this.article.detail = content
        }
    },
    head: {
        title: "四一疫情 | 发布文章"|| '',
    },
}
</script>
<style lang="stylus">
.upload-article 
  .el-form-item 
    .el-input 
      .el-input__inner
        border-color #ddd;
        padding 0 8px;
        font-size 14px;
.margin10
  margin 1rem 0
</style>
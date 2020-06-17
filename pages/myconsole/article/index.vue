<template>
    <el-container direction="vertical">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="margin10">
            <el-breadcrumb-item :to="{ path: '/welcome' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>我的文章</el-breadcrumb-item>
        </el-breadcrumb>
        
        <el-main>
            <article-item
            v-for="(item,idx) in yesEssayList" :key="idx"
            :article-item="item"
            @del-article="delArticle"
            ></article-item>
        </el-main>
    </el-container>
</template>
<style lang="stylus" scoped>
.margin10
  margin 1rem 0
</style>
<script>
import {mapState,mapActions} from 'vuex'
import articleItem from '@/components/article/articleItem.vue'
export default {
    
    components:{
        articleItem
    },
    data(){
        return {
            name:'',
            essayList:[],
        };
    },
    computed:{
        ...mapState('article',['yesEssayList']),
    },
    mounted(){
        this.getMyArticle()
    },
    methods:{
        ...mapActions('article',['setYesEssayList']),
        delArticle(id){
            // 根据文章id删除
            this.$axios({
                url:'/usermodel/essay/delete',
                method:'post',
                data:[id]
            }).then(res => {
                this.$message.success("删除成功")
                // 重新更新数据 并渲染页面
                this.getMyArticle()
                this.$router.push('/myconsole/article')
            })
        },
        getMyArticle(){
            // 用户id
            const id = this.$store.state.user.userInfo.user.id
            this.setYesEssayList(id)
        },
    },
    head: {
        title: "四一疫情 | 我的文章"|| '',
    },
}
</script>
<template>
    <el-container direction="vertical">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="margin10">
            <el-breadcrumb-item :to="{ path: '/welcome' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>评论管理</el-breadcrumb-item>
            <el-breadcrumb-item>我的文章评论</el-breadcrumb-item>
        </el-breadcrumb>
        <comment-item
            v-for="(item,idx) in myArticleComment"
            :key="idx"
            :comment-item="item"
            @del-comment="open"
            style="margin-bottom:20px"
            >
        </comment-item>
    </el-container>
</template>
<style lang="stylus" scoped>
.margin10
  margin 1rem 0
</style>
<script>
import commentItem from '@/components/comment/commentItem.vue'
export default {
    components: {
        commentItem
    },
    data(){
        return{
            myArticleComment:[]
        }
    },
    mounted(){
        this.getMyArticleComment()
    },
    methods:{
        async getMyArticleComment(){
        // 获得初始化的评论列表 和 文章id 集合
            this.myArticleComment=[]
            let ids = this.$store.state.article.articleIdList
            if(ids.length === 0){
                this.$store.dispatch('article/getEssayList',this.$store.state.user.userInfo.user.id)
                ids = this.$store.state.article.articleIdList
            }
            for(const index in ids){
                await this.$store.dispatch('comment/getArticleComment',ids[index])
                const tmpSave = await this.$store.state.comment.myArticleComment
                // console.log(tmpSave)
                this.myArticleComment = this.myArticleComment.concat(tmpSave)
            }
        },
        delComment(id){
            // 根据评论id删除
            this.$axios({
                url:'/usermodel/comment/delete',
                method:'post',
                data:[id]
            }).then(res => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                // 重新更新数据 并渲染页面
                this.getMyArticleComment()
            })
        },
        
        open(id) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delComment(id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    },
    head: {
        title: "四一疫情 | 我的文章评论"|| '',
    },
}
</script>
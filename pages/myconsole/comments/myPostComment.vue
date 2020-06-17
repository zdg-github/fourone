<template>
    <el-container direction="vertical">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="margin10">
            <el-breadcrumb-item :to="{ path: '/welcome' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>评论管理</el-breadcrumb-item>
            <el-breadcrumb-item>我发表的评论</el-breadcrumb-item>
        </el-breadcrumb>
        <myPostComItem
            v-for="(item,idx) in getMyPostComment"
            :key="idx"
            :my-post-comment="item"
            @del-comment='open'
            style="margin-bottom:20px">
        </myPostComItem>
    </el-container>
</template>
<style lang="stylus" scoped>

.margin10
  margin 1rem 0
</style>
<script>
import myPostComItem from '@/components/comment/myPostComItem.vue'
export default {
    components: {
        myPostComItem
    },
    fetch({store,$axios}){
        const id = store.state.user.userInfo.user.id
        store.dispatch('comment/getMyPostComment',id)
    },
    computed:{
        getMyPostComment(){
            return this.$store.state.comment.myPostComment
        },
    },
    mounted(){
        this.myPostComment()
    },
    methods:{
        delComment(id){
            // 根据评论id删除
            this.$axios({
                url:'/usermodel/comment/delete',
                method:'post',
                data:[id]
            }).then(res => {
                this.$message.success("删除成功")
                // 更新数据 computed渲染页面
                this.myPostComment()
            })
        },
        myPostComment(){
            // 用户id
            const id = this.$store.state.user.userInfo.user.id
            this.$store.dispatch('comment/getMyPostComment',id)
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
        title: "四一疫情 | 我发表的评论"|| '',
    },
}
</script>
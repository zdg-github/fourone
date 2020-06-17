<template>
<div class="article-item">
    <el-row type="flex" justify="space-between" :span="10" class="item-title">
        <el-col type="flex" :span="18" style="overflow:hidden;">
            <el-col align="center"  :span="3"> <el-avatar :size="25" :src="circleUrl"/> </el-col>
            <span align="left"> 我 </span>
            <span style="text-indent:1px">  {{createTime}}   </span>
            <span>回复了 <span class="article-link" @click="findMyArticle"> 文章    </span>  </span>
        </el-col>
        <el-col type="flex" :span="4">
            <span class="pointer-span" @click="delCommentItem(myPostComment.id)" :span="10">删除</span>
        </el-col>
    </el-row>
    <paragraph :content='myPostComment.detail'/>
</div>
</template>
<script>
import paragraph from '@/components/comment/paragraph.vue'
export default {
    components:{
        paragraph
    },
    props:{
        myPostComment:{
            type:Object,
            default:()=>{return {
                "id": "1",              // 评论的id
                "essayId": "1",		    // 被评论文章id
                "detail": null,			// 评论内容
                "createUserName": "1",  // 评论者名称
                "createUserId": "1",    // 评论者id
                "createTime": null,	    // 评论时间
                "illegal": 0            // 评论是否被举报（1被举报 0正常）
                }}
        }
    },
    data(){
        return {
            content:'content',
            circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        }
    },
    computed:{
        createTime(){
            const createTime = this.myPostComment.createTime
            const date = new Date(createTime)
            let duration = new Date().getTime()-date.getTime()
            // 获取秒数
            duration = Math.floor(duration/1000)
            if(duration < 60){
                return duration+"秒前"
            }
            // 获取分钟数
            duration = Math.floor(duration/(60))
            if(duration < 60){
                return duration+"分钟前"
            }
            // 获取小时数
            duration = Math.floor(duration/(60))
            if(duration < 24){
                return duration+"小时前"
            }
            // 获取天数
            duration = Math.floor(duration/(24))
            return duration+"天前"
        },
        essayName(){
            return this.myPostComment.essayId
        }
    },
    mounted(){
        // console.log(this.myPostComment)
    },
    methods:{
        backComment(){

        },
        delCommentItem(id){
            // 删除评论
            this.$emit('del-comment',id)
        },
        findMyArticle(){
            const id = this.myPostComment.essayId
            this.$router.push({name:'welcome-userParagraph',params:{id}})
        }
    }
}
</script>
<style lang="stylus" scoped>
.article-item
  width 100%
  border-bottom  2px dashed #eee
  .item-title
    margin-top 0.5rem
    font-size 1rem
    width 100%
.pointer-span
    cursor pointer
.avatar-boxsize
    width 1rem
    height 1rem

.article-link
    cursor pointer
    color lightblue
    font-weight 500
    &:hover
        color blue
        font-weight 600


</style>
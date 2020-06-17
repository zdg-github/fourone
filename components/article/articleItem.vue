<template>
<div class="article-item">
    <el-row class="item-title">
        <span class="article-btn" @click="findArticle(articleItem.id)">
            {{articleItem.title}}
        </span>
    </el-row>
    <el-row class="item-data-wrapper" type="flex" justify="space-between">
        <el-col type="flex" :span="10">
            <el-col :span="4">原创 </el-col>
            <span >
                {{articleItem.createTime | filterDate}}
            </span>
            <span >
                <el-tooltip class="item" effect="dark" content="点赞数" placement="top">
                    <i class="el-icon-star-on"></i>
                </el-tooltip>
                {{articleItem.count}}
            </span>
        </el-col>
        <el-col type="flex" direction="horizontal" :span="3">
            <span class="article-btn" @click="findArticle(articleItem.id)">查看</span>
            <span class="split-line" align="center">|</span>
            <span class="article-btn" @click="delArticle(articleItem.id)">删除</span>
        </el-col>
    </el-row>
</div>
</template>
<script>
export default {
    filters:{
        filterDate(val){
            if(val == null){
                return ""
            }
            const date = new Date(val)
            return date.toLocaleString()
        }
    },
    props:{
        articleItem:{
            type:Object,
            default:()=>{return {
                "id": "2",   			// 文章id 
                "title": "test1",  		// 文章标题
                "detail": null,  		// 文章内容
                "count": 0,				// 点赞数
                "createUserName": null,	// 发布者名称
                "createUserId": null,		// 发布者id
                "createTime": "2020-05-15T16:33:06.000+00:00",  // 发布时间
                "essayCheck": 1,         // 审核状态
                "illegal": 0,              // 被举报状态 （1是被举报）
                "competent": 0          // 是否权威（1是权威）
            }}
        }
    },
    data(){
        return {
        }
    },
    methods:{
        findArticle(id){
            // // 根据id找到文章实例 userParagraph
            // const userParagraph = this.$store.state.article.essayList.filter((element)=>{
            //     return element.id === id
            // }).pop()
            
            // 提供api的文章id值 找到该文章
            this.$router.push({ name: 'welcome-userParagraph', params:{id}})
        },
        delArticle(id){
            // 根据id删除文章
            const _this = this 
            this.open(_this,id)

        },
        open(_this,id) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.$emit('del-article',id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
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
    font-size 1.25rem
  .item-data-wrapper
    margin-top 0.7  5rem
    width 100%
    color #cccccc

.split-line
    font-size 1rem
    height 1rem
    line-height 1rem
.article-btn
    cursor pointer
</style>
<template>     
    <el-card class="article-item" shadow="always">
        <p>{{userParagraph.createUserName}}</p>
         <nuxt-link style="color:#000;text-decoration:none;" :to="{name:'welcome-userParagraph',params:{id:userParagraph.id}}">
            <paragraph :auth-title='userParagraph.title'/>
         </nuxt-link>
    </el-card>
</template>
<script>
import paragraph from '@/components/paragraph.vue'
export default {
    layout:'welcome',
    components:{
        paragraph
    },
    props:{
        userParagraph:{
            type:Object,
            default: ()=>{return {
                        "id": "2",   				// 文章id 
                        "title": "test1",  			// 文章标题
                        "detail": null,  			// 文章内容
                        "count": 0,				// 点赞数
                        "createUserName": null,	// 发布者名称
                        "createUserId": null,		// 发布者id
                }
            }
        }
    },
    data(){
        return {
            title:'titletitletitletitletitletitletitle',
        }
    }
}
</script>
<style lang="stylus" scoped>
.article-item
  border-radius 5px
  margin-bottom 1rem


</style>
<template>
    <div class="show-comment">
        <span>{{commentItem.createUserName}}</span>
        <p>
            <span>{{commentItem.detail}}</span>
            <span>{{createTime}}</span>
        </p>
    </div>
</template>
<style lang="stylus" scoped>
.show-comment
  background #eeeeee
  border-bottom 1px solid #cccccc
  margin-bottom 0.5rem
  padding 5px 16px
  border-radius 5px
  span 
    display inline-block
    line-height 1.5rem
    height 1.5rem
</style>
<script>
export default {
    props:{
        commentItem:{
            type:Object,
            default:()=>{
                return {
                    createUserName:"",
                    detail:"",
                    createTime:""
                }
            }
        }
    },
    computed:{
        createTime(){
            const createTime = this.commentItem.createTime
            const date = new Date(createTime)
            let duration = new Date().getTime()-date.getTime()
            // 获取秒数
            duration = Math.floor(duration/1000)
            if(duration < 1)
                return 1+"秒前"
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
    }
}
</script>
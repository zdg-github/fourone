<template>
    <div class='user-wrapper-bg'>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="margin10">
            <el-breadcrumb-item :to="{ path: '/welcome' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/welcome/moreuser'}">用户文章</el-breadcrumb-item>
            <el-breadcrumb-item>更多</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="paragraph-wrapper">
            <userParagraph
                v-for="(item,idx) in userParagraphList" 
                :key="idx"
                :user-paragraph="item">
            </userParagraph>
        </div>
    </div>
</template>
<script>
import userParagraph from '@/components/welcome/userParagraph.vue'
export default {
    layout:'welcome',
    components:{
        userParagraph,
    },
    data(){
        return {
            userParagraphList:[]
        }
    },
    mounted(){
        this.getUserParagraph()
    },
    methods:{
        goBack(){
            this.$router.back();
        },
        getUserParagraph(){
            this.$axios({
                url:'/usermodel/essay/list/feiQuanWei',
                method:'get',
            }).then(res => {
                // eslint-disable-next-line
                console.log("feiQuanWei",res.data)
                this.userParagraphList = res.data.data
            })
        }
    },
    head: {
        title: "四一疫情 | 更多用户文章"|| '',
    },
}
</script>
<style lang="stylus" scoped>
.margin10
  margin 1rem 0
  padding-left 1rem
.user-wrapper-bg
  max-height 100%
  min-height 80vh
  width 88vw
  position relative
  background-color #ffffff
  margin 0 auto
  margin-top -1px
  border-top 2px solid #cccccc
  border-bottom 2px solid #cccccc
  .paragraph-wrapper
    padding-left 1rem
    width 80%
    overflow hidden
    margin-top 1rem
</style>
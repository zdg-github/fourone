<template>
    <div class='auth-wrapper-bg'>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="margin10">
            <el-breadcrumb-item :to="{ path: '/welcome' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/welcome/moreauth'}">权威文章</el-breadcrumb-item>
            <el-breadcrumb-item>更多</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="paragraph-wrapper">
            <authSpeak
                v-for="(item,idx) in authParagraphList" 
                :key="idx"
                :auth-paragraph="item">
            </authSpeak>
        </div>
    </div>
</template>
<script>
import authSpeak from '@/components/welcome/authoritySpeak.vue'
export default {
    layout:'welcome',
    components:{
        authSpeak,
    },
    data(){
        return {
            authParagraphList:[]
        }
    },
    mounted(){
        this.getAuthParagraph()
    },
    methods:{
        goBack(){
            this.$router.back();
        },
        getAuthParagraph(){
            this.$axios({
                url:'/usermodel/essay/list/quanWei',
                method:'get',
            }).then(res => {
                // eslint-disable-next-line
                console.log("quanWei",res.data)
                this.authParagraphList = res.data.data
            })
        }
    },
    head: {
        title: "四一疫情 | 更多权威文章"|| '',
    },
}
</script>
<style lang="stylus" scoped>
.margin10
  margin 1rem 0
  padding-left 1rem
.auth-wrapper-bg
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
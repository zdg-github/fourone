<template>
    <div>
        <div class='user-paragraph-wrapper'>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="margin10">
                <el-breadcrumb-item :to="{ path: '/welcome' }">主页</el-breadcrumb-item>
                <template v-if="activeType">
                <el-breadcrumb-item :to="{ path: '/welcome/moreuser'}">用户文章</el-breadcrumb-item>
                </template>
                <template v-if="!activeType">
                <el-breadcrumb-item :to="{ path: '/welcome/moreauth'}">权威文章</el-breadcrumb-item>
                </template>
                <span class="pointer-span" @click="backUpPage">返回</span>
            </el-breadcrumb>
            <div class="paragraph-wrapper">
                <h2 align="center">
                    {{userParagraph.title}}</h2>    
                <h4 align="center" style="margin-top:1rem">
                    <span style="font-weight:500;">作者：</span>
                    {{userParagraph.createUserName}}</h4>    
                <h4 align="center" style="margin:0.5rem 0">
                    <span style="font-weight:500;">时间：</span>
                    {{userParagraph.createTime | filterDate}}</h4>        
                <div class="paragraph-span">
                    <p v-html="userParagraph.detail">
                    </p>
                </div>
            </div>
        </div>
        <div class="toolbox">
                <span class="tool-item" @click.prevent="clickCount">
                    <a >
                        <span>
                        <img v-if="actvieZan" id="is-like-imgactive"  src="~assets/img/tobarThumbUpactive.png" alt="">
                        <img v-if="!actvieZan"  id="is-like-img" src="~assets/img/thumbUpWhite.png" alt="">   
                        </span>
                        <span class="name" id="is-like-span">已赞</span>
                        <span id="spanCount" class="count">{{zanCount}}</span>
                    </a>
                </span>
                <span 
                    class="tool-item" 
                    @click="addClass('#comment-anchor-1')" >
                        <span>
                        <img src="~assets/img/commentWhite.png" alt=""> </span>
                        <span>评论</span> 
                        <span>{{commentList.length}}</span>
                </span>
        </div>
        <div id="comment-anchor-1"  class="user-comment-wrapper">
            <div class="back-comment">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="backComment">
                </el-input>
                <el-button @click="postComment" class="margin10" type="danger" round> 
                    发表评论
                </el-button>
                <el-button @click="cancelComment" class="margin10" type="danger" round> 
                    取消回复
                </el-button>
            </div>
            <commentItem  
                v-for="(item,idx) in computedCommentList" 
                :key="idx"
                :comment-item="item">
            </commentItem>
        </div>
    </div>
</template>
<script>
import commentItem from '@/components/welcome/commentItem'
export default {
    layout:'welcome',
    components:{
        commentItem
    },
    filters:{
        filterDate(val){
            if(val == null){
                return ""
            }
            const date = new Date(val)
            return date.toLocaleString()
        }
    },
    data(){
        return {
            userParagraph:{
                "id": "2",   				    // 文章id 
                "title": "test1",  			    // 文章标题
                "detail": null,  			    // 文章内容
                "count": 0,				        // 点赞数
                "createUserName": null,	        // 发布者名称
                "createUserId": null,		    // 发布者id
                "createTime": "2020-05-15T16:33:06.000+00:00",  // 发布时间
                "essayCheck": 1,                // 审核状态
                "illegal": 0,                   // 被举报状态 （1是被举报）
                "competent": 0                  // 是否权威（1是权威）
            },
            backComment:'',
            commentList:[
                {
                    "id": "1",              // 评论的id
                    "essayId": "1",		    // 被评论文章id
                    "detail": null,			// 评论内容
                    "createUserName": "1",  // 评论者名称
                    "createUserId": "1",    // 评论者id
                    "createTime": null,	    // 评论时间
                    "illegal": 0            // 评论是否被举报（1被举报 0正常）
                },
            ],
            actvieZan:false,
            activeType:false
        }
    },
    computed:{
        zanCount(){
            return this.userParagraph.count
        },
        computedCommentList(){
            return this.commentList
        },
    },
    async mounted(){
        await this.getParagraph()
        await this.getComment()
        await this.getHasZan()
    },  
    methods:{
        backUpPage(){
            this.$router.back()
        },
        getParagraph(){// 获取文章内容
            // 文章id
            const id = this.$route.params.id
            this.$axios({
                url:`/usermodel/essay/info/${id}`,
                method:'get'
            }).then(res => {
                this.userParagraph = res.data.data
                this.activeType = this.userParagraph.competent === 0// 是否权威 ture 为非权威
                // eslint-disable-next-line
                console.log("获取用户文章内容",res.data.data)
            })
        },
        getComment(){// 获取评论集合
            // 文章id
            const id = this.$route.params.id
            this.$axios({
                url:`/usermodel/comment/list/${id}`,
                method:'get'
            }).then(res => {
                // eslint-disable-next-line
                console.log("获取评论集合",res.data)
                this.commentList = res.data.data
            })
            
        },
        getHasZan(){
            const userId = this.$store.state.user.userInfo.user.id
            // 文章id
            const essayId = this.$route.params.id
            this.$axios({
                url:'/usermodel/essay/hasZan',
                method:'post',
                data:{
                    userId,
                    essayId
                }
            }).then(res =>{
                // eslint-disable-next-line
                console.log("点赞",res.data)
                const hasZan = res.data.data
                if(hasZan === 0)
                    this.actvieZan = false
                else
                    this.actvieZan = true
            });
        },
        async clickCount(){// 点赞
            const userId = this.$store.state.user.userInfo.user.id
            const essayId = this.userParagraph.id
            if(userId === ""){
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: "点赞失败，用户未登录",
                    type:"warning"
                });
            }else{
                await this.$axios({
                    url:'/usermodel/essay/hasZan',
                    method:'post',
                    data:{
                        userId,
                        essayId
                    }
                }).then(res =>{
                    // eslint-disable-next-line
                    console.log("点赞",res.data)
                    const hasZan = res.data.data
                    if(hasZan === 0)
                        this.actvieZan = false
                    else
                        this.actvieZan = true
                });
                await this.$axios({
                    url:'/usermodel/essay/zan',
                    method:'post',
                    data:{
                        userId,
                        essayId
                    }
                }).then(res => {
                    if(this.actvieZan){// 如果已经点赞 这时候点击 点赞 则数量减少
                        this.userParagraph.count--;
                        this.actvieZan = false
                    }
                    else{
                        this.userParagraph.count++
                        this.actvieZan = true
                    }
                })
            }
        },
        postComment(){
            const userId = this.$store.state.user.userInfo.user.id
            const essayId = this.userParagraph.id
            const backComment = this.backComment
            if(userId === ""){
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: "评论失败，用户未登录",
                    type:"warning"
                });
            }else if(backComment===""){
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: "评论失败，评论内容为空",
                    type:"warning"
                });
            }else{
                this.$axios({
                    url:'/usermodel/comment/save',
                    method:'post',
                    data:{
                        userId,
                        essayId,
                        "detail": backComment
                    }
                }).then(res => {
                    this.$message.success("评论成功")
                    this.backComment=""
                    // 更新comment集合
                    this.getComment()
                })
            }
        },
        cancelComment(){
            this.backComment=""
        },
        addClass(selector) {
            const anchor = this.$el.querySelector(selector)
            document.documentElement.scrollTop = anchor.offsetTop
        }
    },
    head: {
        title: "四一疫情 | 用户文章"|| '',
    },
}
</script>
<style lang="stylus" scoped>
.margin10
  margin 1rem 0
  padding-left 1    rem
.user-paragraph-wrapper
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
    .paragraph-span
      width 80%
      margin 0 auto 
      overflow hidden
      margin-top 1rem
      
.pointer-span
    cursor pointer

.user-comment-wrapper
  width 88vw
  position relative
  border-bottom 2px solid #cccccc
  margin 0 auto 
  .back-comment
    padding-top 1rem
    
.toolbox
  display flex;
  align-items center;
  background #f3f7fb;
  z-index 3000;
  width 88vw
  position relative
  margin 0 auto 
  box-shadow 0 3px 5px 0 rgba(0,0,0,0.05);
  .tool-item
    cursor pointer
    background #f3f7fb;
    border-radius 4px;
    font-size 14px;
    font-weight 500;
    line-height 32px;
    margin-right 2rem
  img 
    width 22px;
    height 22px;
    border 0;
    outline none;
  span
    font-size 16px;
    line-height 22px;
    color #555666;
</style>
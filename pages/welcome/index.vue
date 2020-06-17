<template>
    <div class="welcome-container">
        <ul >
            <li :id="'anchor-'+0">
              <p class="target-title" style="font-size:1.6rem">
                  疫情数据
              </p>
              <virusData/>
            </li>
            <li :id="'anchor-'+1">
              <el-row type="flex" direction="horizontal" justify="start" align="middle">
                <el-col :span="16">
                    <p class="target-title" style="font-size:1.6rem">
                        权威文章
                    </p>
                </el-col>
                <el-col :span="4" style="cursor:pointer;color:#ddd"> <nuxt-link style="color:#ddd;text-decoration:none;" :to="{name:'welcome-moreauth'}">&lt;&lt; 更多</nuxt-link></el-col>
              </el-row>
              <div class="auth-wrapper">
                <authSpeak
                    v-for="(item,idx) in authParagraphList" 
                    :key="idx"
                    :auth-paragraph="item">
                </authSpeak>
              </div>
            </li>
            <li :id="'anchor-'+2">
              <el-row type="flex" direction="horizontal" justify="start" align="middle">
                <el-col :span="16">
                    <p class="target-title" style="font-size:1.6rem">
                        用户文章
                    </p>
                </el-col>
                <el-col :span="4" style="cursor:pointer;color:#ddd"> <nuxt-link style="color:#ddd;text-decoration:none;" :to="{name:'welcome-moreuser'}">&lt;&lt; 更多</nuxt-link></el-col>
              </el-row>
              <div class="auth-wrapper">
                <userParagraph
                v-for="(item,idx) in userParagraphList" 
                :key="idx"
                :user-paragraph="item">
                </userParagraph>
              </div>
            </li>
        </ul>
        <el-container class="set-target-nav" >
        <p 
         class="el-tabs__active-bar is-right" 
         :style="{height: '40px', 
         transform: `translateY(${current*40}px)`}">
        </p>
        <div 
         class="my-row" 
         v-for="(todo, index) in todos" 
         :key="index" 
         @click="addClass(index,'#anchor-'+index)" 
         :class="{ 'is-active':index===current}">
              <p class="target-title">
                {{ todo }}
              </p>
        </div>
        </el-container>
    </div>
</template>
<script>
import authSpeak from '@/components/welcome/authoritySpeak.vue'
import userParagraph from '@/components/welcome/userParagraph.vue'
import virusData from '@/components/virusData'

export default {
    layout:'welcome',
    components:{
        authSpeak,
        userParagraph,
        virusData
    },
    async fetch({$axios,store}){
        function getNowList(cnList,now){
            const nowList = []
            cnList.forEach(element => {
                const name = element.name
                const value = element[now]
                const object = {name,value}
                nowList.push(object)
            })
            return nowList
        }
        const res = await $axios.get('http://39.99.141.244:8084/index/data'); 
        const cnList = res.data.data.cn_list;
        const worldList = res.data.data.world_list;
        const geochina =  {
            nowList:getNowList(cnList,'now'),
            sumList:getNowList(cnList,'sum'),
            deathList:getNowList(cnList,'death'),
            treatList:getNowList(cnList,'treat')
        }
        const geoworld = {
            nowList:getNowList(worldList,'now'),
            sumList:getNowList(worldList,'sum'),
            deathList:getNowList(worldList,'death'),
            treatList:getNowList(worldList,'treat')
        }
        store.commit('welcome/GEOCHINA',geochina);
        store.commit('welcome/GEOWORLD',geoworld);
        store.commit('welcome/SETCN_LIST',cnList)
        store.commit('welcome/SETWORLD_LIST',worldList)
        store.commit('welcome/SETWORLD',res.data.data.world)
         
    },
    data(){
        return {
            todos:["疫情数据","权威文章","用户文章"],
            current:0,
            currentDate:new Date(),
            currentTab:0,
            viruslist:[],
            userParagraphList:[],
            authParagraphList:[]
        }
    },
    mounted(){
        this.getAuthParagraph()
        this.getUserParagraph()
    },
    methods:{
        addClass(index,selector) {
            this.current=index;
            const anchor = this.$el.querySelector(selector)
            document.documentElement.scrollTop = anchor.offsetTop
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
        title: "四一疫情 | 主页"|| '',
    },
}
</script>
<style lang="stylus" scoped>
.welcome-container
  width 88vw
  margin 0 auto
  .target-title
    height 3rem
    font 1.2rem/40px -apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
.auth-wrapper
  width 75%;
.set-target-nav
  position fixed    
  white-space  nowrap;
  transition  transform .3s;
  background-color #ffffff
  float  left;
  z-index  2;
  left 0.25rem
  top 20vh
  display flex
  flex-direction column
  margin 1rem
  margin-left 0
  .my-row
    padding  0 15px;
    height  40px;
    box-sizing  border-box;
    line-height  40px;
    display  inline-block;
    list-style  none;
    font-size  14px;
    font-weight  500;
    color  #303133;
    position  relative;
    border-left 4px solid #dddddd
    cursor pointer
  .is-active
    color #409EFF;
    border-left 4px solid #409EFF
  .el-tabs__active-bar
    position absolute;
    bottom 0;
    left 0;
    height 2px;
    background-color #409EFF;
    z-index 1;
    transition transform .3s cubic-bezier(.645,.045,.355,1);
    list-style none;
  .is-right
    top 0;
    bottom auto;
    width 2px;
    height auto;
.item-data-wrapper
    margin-top 0.75rem
    width 75%
    box-sizing border-box
    position relative
    span 
      display block;
      font-size 1rem;
      line-height 2rem;
      word-wrap break-word;
      padding 0 40px;
      background-color #F2F6FC
      border-radius 1rem
    .icon
      height 16px;
      fill #d4d4d4;
    .zuo-icon 
      position absolute;
      left 0;
      top 3px;
    .you-icon 
      position absolute;
      right 0;
      bottom 3px;
</style>
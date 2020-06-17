<template>
    <div class="virus-data-wrapper" >
        <div class="cover-today-confirm">
            <h4>现有确诊</h4>
            <div class="number">
                {{world.now}}
            </div>
        </div>
        <div class="cover-confirm">
            <h4>累计确诊</h4>
            <div class="number">
                {{world.sum}}
            </div>
        </div>
        <div class="cover-dead">
            <h4>累计死亡</h4>
            <div class="number">
                {{world.death}}
            </div>
        </div>
        <div class="cover-heal">
            <h4>累计治愈</h4>
            <div class="number">
                {{world.treat}}
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState('welcome',['world']),
    },
}
</script>
<style lang="stylus" scoped>
.virus-data-wrapper
  position: relative;
  width 100%
  .cover-today-confirm
  .cover-confirm
  .cover-heal
  .cover-dead
    float left
    position relative;
    width 50%;
    min-height 3.5rem;
    margin-bottom 2rem;
    & h4
      text-align center;
      font 16px/24px -apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
      font-weight 600;
      color #333;
    & .number
      font 700 20px/36px DIN Alternate,din_alternate_bold,-apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
      text-align center;
  .cover-heal
    .number
      color #34aa70
  .cover-today-confirm
    .number
      color #e44a3d
  .cover-confirm
    .number
      color #a31d13
</style>
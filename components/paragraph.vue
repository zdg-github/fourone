<template>
    <el-row class="item-data-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 32 32" class="zuo-icon icon"><path d="M14.75 26c0 2.05-1.65 3.7-3.7 3.7H3.7C1.65 29.7 0 28.05 0 26V12.45C0 7.05 4.4 2.6 9.85 2.6h1.25c.65 0 1.25.55 1.25 1.25V6.3c0 .65-.55 1.25-1.25 1.25H9.85c-2.7 0-4.9 2.2-4.9 4.9v.6c0 1 .85 1.85 1.85 1.85h4.3c2.05 0 3.7 1.65 3.7 3.7V26zM32 26c0 2.05-1.65 3.7-3.7 3.7h-7.4c-2.05 0-3.7-1.65-3.7-3.7V12.45c0-5.4 4.4-9.85 9.85-9.85h1.25c.65 0 1.25.55 1.25 1.25V6.3c0 .65-.55 1.25-1.25 1.25h-1.25c-2.7 0-4.9 2.2-4.9 4.9v.6c0 1 .85 1.85 1.85 1.85h4.3c2.05 0 3.7 1.65 3.7 3.7V26z"></path></svg>
           <span>{{authTitle}}
           </span>       
        <svg xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 32 32" class="you-icon icon"><path d="M14.9 19.6c0 5.4-4.4 9.85-9.85 9.85H3.8c-.65 0-1.25-.55-1.25-1.25v-2.45c0-.65.55-1.25 1.25-1.25h1.25c2.7 0 4.9-2.2 4.9-4.9V19c0-1-.85-1.85-1.85-1.85H3.8c-2.05 0-3.7-1.65-3.7-3.7v-7.4c0-2.05 1.65-3.7 3.7-3.7h7.4c2.05 0 3.7 1.65 3.7 3.7V19.6zm17.2 0c0 5.4-4.4 9.85-9.85 9.85H21c-.65 0-1.25-.55-1.25-1.25v-2.45c0-.65.55-1.25 1.25-1.25h1.25c2.7 0 4.9-2.2 4.9-4.9V19c0-1-.85-1.85-1.85-1.85H21c-2.05 0-3.7-1.65-3.7-3.7v-7.4c0-2.05 1.65-3.7 3.7-3.7h7.4c2.05 0 3.7 1.65 3.7 3.7V19.6z"></path></svg>    
    </el-row>
</template>
<script>
export default {
    props:{
        authTitle:{
            type:String,
            default:()=>('这是一段文章标题')
        }
    }
}
</script>
<style lang="stylus" scoped>
.item-data-wrapper
    margin-top 0.75rem
    width 100%
    box-sizing border-box
    span 
      width 100%
      display block;
      font-size 1.2rem;
      line-height 2rem;
      word-wrap break-word;
      padding 0 40px;
      font 1.2rem/2rem -apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
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
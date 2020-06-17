<template>
<el-container direction="vertical" class="welcome-page-bg">
    <ava-header/>
    <nuxt></nuxt>
  </el-container>
</template>
<script>

import avaHeader from '@/components/header.vue'
export default {
    components:{
        avaHeader
    }
}
</script>
<style scoped>
.welcome-page-bg{
    width:100%;
    height:100%;
    background-image:linear-gradient(90deg, #9c4dff 0%, #42a7ff 100%);
}
</style>
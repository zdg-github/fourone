<template>
<el-container direction="vertical" style=" height: 100%; background:#f6f6f6">
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
</style>
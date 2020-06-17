<template>
    <div>
        <h2 v-if="error.statusCode == 404">404 - 页面不存在</h2>
        <h2 else> 500- 服务器错误</h2>
        <ul>
            <li><nuxt-link to="/welcome">HOME</nuxt-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    layout:'default',
    // eslint-disable-next-line
    props:['error'],
}
</script>


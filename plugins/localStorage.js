import createPersistedState from 'vuex-persistedstate'

export default ({store})=>{
    window.onNuxtReady( () =>{
        createPersistedState({
            // 声明数据保存成到本地的名称
            key: 'store',
        })(store)
    })
}
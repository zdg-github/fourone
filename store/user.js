export const state = () => ({
    userInfo:{
        token:"",
        user:{
            id:'',
            name: "登录/注册",
            email: ""
        }
    }
    })

export const mutations = {
    // 设置用户数据
    setUserInfo(state,data){
        state.userInfo.user = data.data
        state.userInfo.code = data.code
        state.userInfo.msg = data.msg
    },
    setToken(state,token){
        state.userInfo.token = token
    },
    setUserName(state,name){
        state.userInfo.user.name = name
    },
    // 清除用户数据
    clearUserInfo(state){
        // 重置用户数据
        state.userInfo = {
            token:"",
            user:{
                id:'',
                name: "登录/注册",
                email: ""
            }
        }

    }
}

export const actions = {
    login({commit},data){
        return this.$axios({
            url:'usermodel/user/login',
            method:'post',
            data
        }).then(res=>{
            // 调用当前mutation方法
            commit("setUserInfo",res.data)
            // 调用外部的回调函数
            Promise.resolve();
        })
    },
    logout({commit}){
        commit('clearUserInfo')
    },
    changeName({commit},data){
        return this.$axios({
            url:'/usermodel/user/update/name',
            method:'post',
            data
        }).then(res=>{
            // 调用当前mutation方法
            commit('setUserName',data.name)
            // 调用外部的回调函数
            Promise.resolve();
        })
    }
}
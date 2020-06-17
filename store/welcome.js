import {SETWORLD,SETWORLD_LIST,SETCN_LIST,GEOCHINA,GEOWORLD} from './mutation-type.js'
export const state = () => ({
    cn_list:[],
    world_list:[],
    world:{},
    geochina:{},
    geoworld:{}
  })

export const mutations = {
    [SETCN_LIST](state,cnList){
        state.cn_list = cnList
    },
    [SETWORLD_LIST](state,worldList){
        state.world_list = worldList
    },
    [SETWORLD](state,world){
        state.world = world
    },
    [GEOCHINA](state,geochina){
        state.geochina = geochina
    },
    [GEOWORLD](state,geoworld){
        state.geoworld = geoworld
    },
}

export const getters = {
    cn_list: (state) => {
       return state.cn_list
    },
    world_list: (state) => {
       return state.world_list
    },
    china: (state) => {
       return state.world_list[0]
    },
    world: (state) => {
       return state.world
    }
}
// export const actions = {
//     getVirusAreaData({ commit }){
//         return this.$axios({
//             url:'http://39.99.141.244:8084/index/data',
//             method:'get',
//         }).then(res=>{
//             // 调用当前mutation方法
//             // 调用外部的回调函数
//                 commit('SETCN_LIST',res.data.data.cn_list)
//                 commit('SETWORLD_LIST',res.data.data.world_list)
//                 commit('SETWORLD',res.data.data.world)
//         })
//     }
// }

export const state = () => ({
    essayList: [
        // {
        //     "id": "2",   			// 文章id 
        //     "title": "test1",  		// 文章标题
        //     "detail": null,  		// 文章内容
        //     "count": 0,				// 点赞数
        //     "createUserName": null,	// 发布者名称
        //     "createUserId": null,		// 发布者id
        //     "createTime": "2020-05-15T16:33:06.000+00:00",  // 发布时间
        //     "essayCheck": 1,         // 审核状态
        //     "illegal": 0,              // 被举报状态 （1是被举报）
        //     "competent": 0          // 是否权威（1是权威）
        // }
    ],
    notEssayList:[],
    yesEssayList:[],
    articleIdList:[]// 我的文章 id集合
})
export const getters = {
    getNotEssayList:(id,data)=>{
        return state.notEssayList
    },
    getYesEssayList:(id,data)=>{
        return state.yesEssayList
    }
}
export const mutations = {
    setEssayList (state,essayList) {
        state.essayList = essayList
    },
    setNotEssayList (state,notEssayList) {
        state.notEssayList = notEssayList
    },
    setYesEssayList (state,yesEssayList) {
        state.yesEssayList = yesEssayList
    },
    setArticleIdList(state,articleIdList){
        state.articleIdList = articleIdList
    }
}
export const actions = {
    getEssayList({commit},id){
        this.$axios({
            url:`/usermodel/essay/myList/${id}`,
            method:'get',
        }).then(res=>{
            // 提交mutation
            const essayList = res.data.data
            // 设置文章 list
            commit('setEssayList', essayList)
            const articleIdList = []
            essayList.forEach((val,idx) => {
                articleIdList.push(val.id)
            })
            // 设置文章ID list
            commit('setArticleIdList', articleIdList)
        })
    },
    setYesEssayList({commit},id){
        this.$axios({
            url:`/usermodel/essay/myList/${id}`,
            method:'get',
        }).then(res=>{
            // 提交mutationta
            const yesEssayList = []
            res.data.data.filter((element)=>{
                  if(element.essayCheck===0)
                  yesEssayList.push(element)
            })
            // 设置文章 list
            commit('setYesEssayList', yesEssayList)
        })
    },
    setNotEssayList({commit},id){
        this.$axios({
            url:`/usermodel/essay/myList/${id}`,
            method:'get',
        }).then(res=>{
            // 提交mutation
            const notEssayList = []
            res.data.data.filter((element)=>{
                  if(element.essayCheck===0)
                    notEssayList.push(element)
            })
            // 设置文章 list
            commit('setNotEssayList', notEssayList)
        })
    },
}

export const state = () => ({
    myArticleComment:  [
        // {
        //     "id": "1",              // 评论的id
        //     "essayId": "1",		    // 被评论文章id
        //     "detail": null,			// 评论内容
        //     "createUserName": "1",  // 评论者名称
        //     "createUserId": "1",    // 评论者id
        //     "createTime": null,	    // 评论时间
        //     "illegal": 0            // 评论是否被举报（1被举报 0正常）
        // },
        // {
        //     "id": "2",
        //     "essayId": null,
        //     "detail": null,
        //     "createUserName": null,
        //     "createUserId": null,
        //     "createTime": null,
        //     "illegal": 0
        // },
    ],
    myPostComment:[
    //     {
    //         "id": "1",                  // 评论的id
    //         "essayId": "1",		        // 被评论文章id
    //         "detail": null,			    // 评论内容
    //         "createUserName": "1",      // 评论者名称
    //         "createUserId": "1",        // 评论者id
    //         "createTime": null,	        // 评论时间
    //         "illegal": 0                // 评论是否被举报（1被举报 0正常）
    //     },
    ]
})
  
export const mutations = {
    setArticleComment (state,myArticleComment) {
        state.myArticleComment = myArticleComment
    },
    setMyPostComment (state,myPostComment) {
        state.myPostComment = myPostComment
    },
}
export const actions = {
    async getArticleComment({commit},id){
        // 文章id
        await this.$axios({
            url:`/usermodel/comment/list/${id}`,
            method:'get',
        }).then(res=>{
            commit('setArticleComment', res.data.data )
        })
    },
    getMyPostComment({commit},id){// 用户id
        this.$axios({
            url:`/usermodel/comment/myList/${id}`,
            method:'get',
        }).then(res=>{
            //  // eslint-disable-next-line 
            // console.log(res.data.data)
            // 提交mutation
            commit('setMyPostComment', res.data.data)
        })
    },
}
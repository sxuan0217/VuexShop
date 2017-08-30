const types ={
SETPROFILE : 'facebook/SETPROFILE',
LOGOUT : 'facebook/LOGOUT',
NOAUTH : 'facebook/NOAUTH'
}

const state = {//state
  authorized: false,
  profile:{},
  product:[]
}

const getters ={//getters
stateProfile : state => { return state.profile },//傳回基本資料

profilePicture : state => { //傳回大頭貼網址
  return (state.profile.id) ? `https://graph.facebook.com/${state.profile.id}/picture?width=300` : `/static/man.gif`
},

loginstatus : state =>{ return state.authorized}//傳回登入狀態
}

const actions = {//action
  login  ({ commit })  {//登入
    let vm = this
    FB.login(function (response) {
      actions.loginfact  ({ commit }, response)
  
    }, {
      scope: 'email, public_profile',
      return_scopes: true
    })
  
  },
  logout  ({ commit }) {//登出時執行
    FB.logout(function (response) {
      commit(types.LOGOUT)
    })
  },
  
  loginfact  ({ commit }, response)  {
    if (response.status === 'connected') {//如果連接狀態為connected
      FB.api('/me?fields=name,id,email', function (response) {
        commit(types.SETPROFILE, response)//commit過濾後的資料
      })
    } else if (response.status === 'not_authorized') {//有資料未登入
      commit(types.NOAUTH)
    } else if (response.status === 'unknown') {//登出
      commit(types.LOGOUT)
    } else {
      commit(types.NOAUTH)
    }
  }
}

const mutations = {
  [types.SETPROFILE] (state,response) {//取得個人資料和更改登入狀態
    
    state.profile = response
    state.authorized = true
  },
  [types.LOGOUT] (state){
    state.authorized = false
    state.profile = {}

  },
  [types.NOAUTH] (state){
    state.authorized =false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}




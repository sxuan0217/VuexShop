<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light container">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" :to="'/'">hello</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="'/2'">hello2</router-link>
            <li class="nav-item">
              <router-link class="nav-link" :to="'/3'">shop</router-link>
            </li>
        </ul>
         <img v-if="authorized" :src="profilePicture" alt="">
      <button v-if="authorized" type="button" class="btn btn-outline-success" @click="logout">Logout</button>
      <button v-else type="button" class="btn btn-outline-success" @click="login">Login</button>
      </div>
     <!--  <img v-if="authorized" :src="profilePicture" alt="">
      <button v-if="authorized" type="button" class="btn btn-outline-success" @click="logout">Logout</button>
      <button v-else type="button" class="btn btn-outline-success" @click="login">Login</button> -->
    </nav>
    <router-view></router-view>
  </div>
</template>


<script>

import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'app',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      profile: 'stateProfile',
      authorized: 'loginstatus',
      profilePicture: 'profilePicture',
    }),

  },
  methods: {
    ...mapActions([
      'login',
      'getProfile',
      'logout',
      'loginfact'
    ])
  },
  mounted() {
    let vm = this
    window.fbAsyncInit = function() {//初始化FBLOGIN
      FB.init({
        appId: '348044118974583',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
      });
      FB.AppEvents.logPageView();
      FB.getLoginStatus(response => {
        vm.loginfact(response)
      })
    };

  },
}
</script>

<style>
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px
}
</style>

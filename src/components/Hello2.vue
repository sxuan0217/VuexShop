<template>
  <div class="container d-flex flex-column align-items-center">
    <img v-if="authorized" :src="profilePicture" alt="">
    <h1 v-if="authorized">Hello2!{{profile.name}}</h1>
    <h1 v-else>Please Login</h1>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'hello2',
  computed: {
    ...mapGetters({
      profile: 'stateProfile',
      profilePicture: 'profilePicture',
      authorized: 'loginstatus'
    })

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Hello {
  display: flex;
}

h1,
h2 {
  font-weight: normal;
  text-align: center;
  color: #35495E;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

img {
  height: 200px;
  width: 200px;
  border-radius: 50%
}
</style>

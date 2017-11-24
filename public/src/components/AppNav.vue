<template>
  <nav class="navbar navbar-default">
    <div class="navbar-header" v-show="isLoggedIn()">
      <router-link to="/bar" class="navbar-brand btn btn-info log">Nuovo bar</router-link>
      <router-link to="/" class="navbar-brand btn btn-info log">Nuovo ingressi</router-link>
      <router-link to="/" class="navbar-brand btn btn-info log">Lista</router-link>
    </div>
    <div class="nav navbar-nav navbar-right">
      <button class="btn btn-danger log" @click="handleLogout()" v-show="isLoggedIn()">Log out </button>
      <button class="btn btn-info log" @click="handleLogin()" v-show="!isLoggedIn()">Log In</button>
    </div>
  </nav>
</template>

<script>
import { isLoggedIn, login, logout } from '../utils/auth';

export default {
  name: 'app-nav',
  methods: {
    handleLogin() {
      login();
    },
    handleLogout() {
      logout();
    },
    isLoggedIn() {
      return isLoggedIn();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-right { margin-right: 0px !important}

.log {
  margin: 5px 10px 0 0;
}
</style>
<template>
  <div id="app">
    <img src="./assets/corte-dei-miracoli.png" id="logo">
    <app-nav></app-nav>
    <router-view/>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav'
export default {
  name: 'app',
  components: {
    AppNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#logo {
  width: 80%;
  max-width: 400px;
}
input[type="date"]{
    display:block;
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    min-height: 1.2em;
}
</style>

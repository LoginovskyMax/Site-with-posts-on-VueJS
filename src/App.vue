<template>
  <div id="app">
    <nav>
    <router-link to="/">Главная</router-link> | 
    <router-link to="/vuex">Vuex</router-link> | 
    <router-link to="/API">API</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#app {
 margin: 0px;
 display: flex;
 flex-direction: column;
 gap:20px;
 background:linear-gradient(white,wheat,orange);
}
nav {
  padding: 10px 30px 0px;
  font-size: 30px;
  text-align:center;
  }
.router-link-exact-active {
      color: #42b983;
    }
 a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;}
</style>
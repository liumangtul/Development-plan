<template>
  <div id="app">
    <router-link :to="{name:'Index',params:{}}">Index</router-link>
    <router-link :to="{name:'User',params:{}}">User</router-link>
    <router-link to="/article">Article</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>

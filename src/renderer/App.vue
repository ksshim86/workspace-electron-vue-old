<template>
  <div class="container-fluid" id="app">
    <!-- <w-header></w-header> -->
    <div class="col-sm-4">.col-sm-4</div>
    <router-view></router-view>
  </div>
</template>

<script>
import Cmmn from './components/cmmn'

export default {
  name: 'workup-electron-vue',
  components: {
    ...Cmmn
  }
}
</script>

<style>
/* CSS */
</style>

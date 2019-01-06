<template>
  <div class="container-fluid" id="app">
    <div class="row">
      <div class="col-md-3">
        <left-menu></left-menu>
      </div>
      <div class="col-md-9">
          <w-header ></w-header>
          <router-view class="router-view"></router-view>
      </div>
    </div>
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
  
</style>

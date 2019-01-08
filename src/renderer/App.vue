<template>
  <div class="container-fluid" id="app">
    <div class="row h-100" v-if="workspace.isEmpty">
      <div class="col-md-12 my-auto"><tutorial-page></tutorial-page></div>
    </div>
    <div class="row" v-else>
      <div class="col-md-3"><left-menu></left-menu></div>
      <div class="col-md-9">
        <w-header></w-header>
        <router-view class="router-view"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Cmmn from './components/cmmn'
import TutorialPage from './components/tutorial/TutorialPage'

export default {
  name: 'workup-electron-vue',
  components: {
    ...Cmmn,
    TutorialPage
  },
  data() {
    return {
      workspace: { isEmpty: false }
    }
  },
  beforeCreate() {
    this.$electron.ipcRenderer.on('workspace-path', (event, data) => {
      if (data === '') {
        this.workspace.isEmpty = true
      }

      console.log(`test data setting > this.workspace.isEmpty=true`)
      this.workspace.isEmpty = true
    })
  }
}
</script>

<style></style>

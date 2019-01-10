<template>
  <div id="app">
    <v-app id="inspire">
      <w-navigation></w-navigation>
      <w-toolbar></w-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Cmmn from './components/cmmn'

export default {
  name: 'workspace',
  components: {
    ...Cmmn
  },
  methods: {},
  mounted() {
    ipcRenderer.on('workspace-path', (event, data) => {
      console.log(`workspace-path: ${data}`)
    })
  }
}
</script>

<style>
html {
  overflow-y: auto;
}
</style>

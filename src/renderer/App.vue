<template>
  <div id="app">
    <v-app id="inspire">
      <w-navigation></w-navigation>
      <w-toolbar></w-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Cmmn from './components/cmmn'

export default {
  name: 'workspace',
  components: {
    ...Cmmn
  },
  methods: {}
}
</script>

<style>
html {
  overflow-y: auto;
}
</style>

<template>
  <div id="app">
    <v-app id="inspire">
      <w-toolbar></w-toolbar>
      <v-content>
        <v-container class="pa-0 ma-0" fluid fill-height>
          <w-navigation></w-navigation>
          <tutorial-page v-if="workspaceIsEmpty"></tutorial-page>
          <router-view v-else></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ipcRenderer } from 'electron'
import Cmmn from './components/cmmn'
import TutorialPage from './components/tutorial/TutorialPage'

export default {
  name: 'workspace',
  components: {
    ...Cmmn,
    TutorialPage
  },
  data() {
    return {}
  },
  computed: {
    workspaceIsEmpty: {
      get() {
        return this.getWorkspaceIsEmpty()
      },
      set(val) {
        this.setWorkspaceIsEmpty(val)
      }
    }
  },
  methods: {
    ...mapGetters(['getWorkspaceIsEmpty']),
    ...mapActions(['setWorkspaceIsEmpty'])
  },
  mounted() {
    ipcRenderer.on('workspace-path', (event, data) => {
      if (data === '') this.workspaceIsEmpty = data
    })
  }
}
</script>

<style>
html {
  overflow-y: auto;
}
</style>

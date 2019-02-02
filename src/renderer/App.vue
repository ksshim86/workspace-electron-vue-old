<template>
  <v-app>
    <!-- <v-system-bar dark app class="frame-bar">
      <v-spacer></v-spacer>
      <v-icon>remove</v-icon>
      <v-icon>check_box_outline_blank</v-icon>
      <v-icon>close</v-icon>
    </v-system-bar> -->
    <w-navigation />
    <w-toolbar />
    <w-view />
  </v-app>

  <!-- <v-content>
    <v-container class="pa-0 ma-0" fluid fill-height grid-list-xl>
      <w-navigation></w-navigation>
      <tutorial-page v-if="workspaceIsEmpty"></tutorial-page>
      <router-view v-else style="background-color:red;"></router-view>
    </v-container>
  </v-content> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ipcRenderer } from 'electron'
import Cmmn from './components/cmmn'

export default {
  name: 'Workspace',
  components: {
    ...Cmmn
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
  mounted() {
    ipcRenderer.on('workspace-path', (event, data) => {
      if (data === '') this.workspaceIsEmpty = data
    })
  },
  methods: {
    ...mapGetters(['getWorkspaceIsEmpty']),
    ...mapActions(['setWorkspaceIsEmpty'])
  }
}
</script>

<style>
html {
  overflow-y: hidden;
}
</style>

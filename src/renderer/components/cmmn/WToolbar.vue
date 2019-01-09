<template>
  <div>
    <v-toolbar app dark dense color="dark">
      <v-toolbar-side-icon @click="IS_DRAWER" ></v-toolbar-side-icon>
      <v-toolbar-title>{{ getDrawer }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'getDrawer'
    ])
  },
  methods: {
    ...mapActions([
      'IS_DRAWER'
    ])
  }
}
</script>

<style scoped>
</style>

<template>
  <v-navigation-drawer v-model="drawer" mobile-break-point="991" width="200" fixed clipped app>
    <v-list class="pl-2" dense>
      <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      items: [
        { title: 'Dashboard', icon: 'dashboard', to: '/' },
        { title: 'Workspace', icon: 'group_work', to: '/workspace' }
      ],
      mini: false,
      right: null
    }
  },
  computed: {
    drawer: {
      get() {
        return this.getDrawer()
      },
      set(val) {
        this.IS_DRAWER(val)
      }
    }
  },
  methods: {
    ...mapGetters(['getDrawer']),
    ...mapActions(['IS_DRAWER'])
  }
}
</script>

<style>
</style>

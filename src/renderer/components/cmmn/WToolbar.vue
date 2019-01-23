<template>
  <v-toolbar app dark flat clipped-left fixed prominent color="#34495e">
    
    <!-- <v-toolbar-side-icon ></v-toolbar-side-icon> -->
    <v-toolbar-title>
      <v-btn
        class="default v-btn--simple"
        dark
        icon
        @click.stop="IS_DRAWER(true)"
      >
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      responsive: false
    }
  },
  mounted() {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  computed: {
    ...mapGetters(['getDrawer'])
  },
  methods: {
    ...mapActions(['IS_DRAWER']),
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true
        this.responsiveInput = false
      } else {
        this.responsive = false
        this.responsiveInput = true
      }
    }
  }
}
</script>

<style scoped>
</style>

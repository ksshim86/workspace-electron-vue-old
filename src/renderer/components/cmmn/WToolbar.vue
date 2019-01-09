<template>
  <div>
    <v-toolbar app dark dense color="dark">
      <v-toolbar-side-icon @click="foo" ></v-toolbar-side-icon>
      <v-toolbar-title>{{ this.$store.state.WNavigation.drawer }}</v-toolbar-title>
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
export default {
  data() {
    return {}
  },
  methods: {
    foo() {
      console.log(this.$store)
    }
  }
}
</script>

<style scoped>
</style>

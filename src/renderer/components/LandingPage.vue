<template>
  <v-stepper v-model="e6" vertical>
    <div v-if="e6 === 1">
      <v-stepper-step :complete="e6 > 1" step="1">
        Select an app
        <small>Summarize if needed</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </div>
    <div v-if="e6 === 2">
      <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>
      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </div>
  </v-stepper>

</template>

<script>
export default {
  data() {
    return {
      e6: 1
    }
  }
}
</script>

<style>
</style>

<template>
  <div style="padding-top: 35vh;">
    <div class="row">
      <div class="col my-auto">
        <h1>
          {{ message }} <span class="text-primary">{{ name }}</span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'WorkUp',
      message: 'Welcome to'
    }
  }
}
</script>

<style scoped>
div {
  text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.5);
}

.row {
  border-bottom: 1px solid;
}
</style>

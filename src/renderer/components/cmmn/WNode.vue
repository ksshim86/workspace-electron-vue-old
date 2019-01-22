<template>
  <li draggable="true" @dragstart="dragstart">{{items.name}}
    <ul v-if="isFolder">
      <w-node v-for="items in items.children" :items="items" :key="items.sid">
      </w-node>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'WNode',
  components: {},
  props: {
    items: Object
  },
  computed: {
    isFolder() {
      return this.items.children && this.items.children.length
    }
  },
  methods: {
    dragstart(event) {
      event.dataTransfer.setData('text/plain', 'This text may be dragged')
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <li draggable="true" @dragstart="dragstart" @dragover="dragover" @drop="drop">{{items.name}}
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
  data() {
    return {
      isDrag: false
    }
  },
  computed: {
    isFolder() {
      return this.items.children && this.items.children.length
    }
  },
  methods: {
    dragstart(event) {
      console.log(`dragstart : ${this.items.sid}`)
      event.dataTransfer.setData('sid', this.items.sid)
    },
    dragover(event) {
      console.log(`dragover : ${this.items.sid}`)
      event.preventDefault()
    },
    drop(event) {
      console.log(`drop : ${this.items.sid}`)
      event.preventDefault()

      // const data = event.dataTransfer.getData('sid')
      // console.log(data)
      // console.log(data.name)

      // event.target
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <w-node :items="nodes" :depth="rootDepth">
  </w-node>
</template>

<script>
import WNode from './WNode'

export default {
  name: 'WTreeView',
  components: { WNode },
  props: {
    items: Array
  },
  data() {
    return {
      rootDepth: 0,
      nodes: {
        sid: 0,
        name: 'root',
        type: 'root',
        path: '',
        edit: false,
        children: []
      }
    }
  },
  created() {
    if (this.items) {
      // this.items = Object.assign(this.items, this.initItemChildren(this.items))
      // this.items.filter(item => this.nodes.children.push(item))
      this.nodes.children = this.items
    }
  },
  methods: {
    initItemChildren(items) {
      items.map((item) => {
        if (item.children === undefined) {
          item.children = []
        } else {
          item.children = Object.assign(item.children, this.initItemChildren(item.children))
        }
        return item
      })
      return items
    }
  }
}
</script>

<style scoped>
</style>

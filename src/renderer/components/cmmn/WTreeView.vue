<template>
  <!-- <w-node :nodes="nodes" :depth="rootDepth">
  </w-node> -->
  <div>
    <w-node v-for="node in nodes" :nodes="node" :key="node.sid"></w-node>
  </div>
</template>

<script>
import WNode from './WNode'

export default {
  name: 'w-tree-view',
  components: { WNode },
  props: {
    nodes: Array
  },
  data() {
    return {
      rootDepth: 0
      // nodes: {
      //   sid: 0,
      //   name: 'root',
      //   type: 'root',
      //   path: '',
      //   edit: false,
      //   children: []
      // }
    }
  },
  created() {
    // if (this.items) {
    // this.items = Object.assign(this.items, this.initItemChildren(this.items))
    // this.items.filter(item => this.nodes.children.push(item))
    // this.nodes.children = this.items
    // }
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

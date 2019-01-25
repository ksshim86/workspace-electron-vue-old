<template>
  <div class="w-tree-view" style="display: table-row;">
    <div style="width:100%">
      <v-btn icon small>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-divider />
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
    return {}
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

<style>
::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar:horizontal {
  height: 8px;
  background-color: rgba(0, 0, 0, 0);
}
::-webkit-scrollbar:hover {
  background-color: rgba(0, 0, 0, 0.09);
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:active {
  background: rgba(0, 0, 0, 0.61);
}
</style>

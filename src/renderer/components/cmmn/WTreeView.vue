<template>
  <div class="w-tree-view">
    <div :style="style.menu">
      <v-btn class="ma-0" icon small>
        <v-icon class="mdi mdi-collapse-all-outline" />
      </v-btn>
    </div>
    <v-divider />
    <div :style="style.wtreeview">
      <w-node v-for="node in nodes" :nodes="node" :key="node.sid"></w-node>
    </div>
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
      style: {
        menu: {
          height: '25px'
        },
        wtreeview: {
          'overflow-x': 'auto',
          position: 'absolute',
          'white-space': 'nowrap',
          width: '200px',
          height: 'calc(100% - 25px)'
        }
      }
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

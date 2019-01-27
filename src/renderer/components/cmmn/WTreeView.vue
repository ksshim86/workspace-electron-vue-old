<template>
  <div class="w-tree-view">
    <div class="w-tree-view-menu" :style="style.menu">
      <v-btn class="ma-0" icon small @click="handleCollapseAllClick">
        <v-icon class="mdi mdi-collapse-all-outline" />
      </v-btn>
      <v-btn class="ma-0" icon small @click="handleNewFolderClick">
        <v-icon class="mdi mdi-folder-plus-outline" />
      </v-btn>
      <v-btn class="ma-0" icon small>
        <v-icon class="mdi mdi-file-plus" />
      </v-btn>
    </div>
    <v-divider />
    <div class="w-tree-view-node-list" :style="style.wtreeview" @click="handleNodeListDivClicked">
      <w-node ref="wNode99" v-for="node in nodes" :nodes="node" :key="node.sid" :collapseAll="collapseAll" @emitCollapseAllChange="emitCollapseAllChange" @emitPassWnode="emitPassWnode"></w-node>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
      },
      collapseAll: false,
      selectedWNode: {},
      selectedNodeId: 0
    }
  },
  methods: {
    handleCollapseAllClick() {
      this.collapseAll = true
    },
    emitCollapseAllChange() {
      this.collapseAll = false
    },
    handleNodeListDivClicked() {
      this.setSelectedNodeId(-1)
    },
    handleNewFolderClick() {
      let selectedNode = {}

      this.selectedNodeId = this.getSelectedNodeId()

      selectedNode = this.findSelectedNode(this.nodes)

      console.log(selectedNode)
    },
    nodeCopy(node) {
      return Object.assign({}, node)
    },
    findSelectedNode(nodes) {
      let selectedNode = {}

      // https://stackoverflow.com/questions/38132146/recursively-filter-array-of-objects

      selectedNode = nodes.map(this.nodeCopy).filter(function f(node) {
        let result = false

        if (this.selectedNodeId === node.sid) {
          return true
        }

        if (!!node.children && !!node.children.length) {
          result = (node.children = node.children.map(this.nodeCopy).filter(f, this)).length
        }

        return result
      }, this)

      return selectedNode
    },
    emitPassWnode(wNode) {
      this.selectedWNode = wNode
    },
    ...mapGetters(['getSelectedNodeId']),
    ...mapActions(['setSelectedNodeId'])
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
.w-tree-view-menu > * {
  float: right;
}
.w-tree-view-menu i {
  font-size: 20px;
}

.mdi-collapse-all-outline {
  transform: scaleX(-1);
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -ms-transform: scaleX(-1);
}
</style>

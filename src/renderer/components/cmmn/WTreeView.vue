<template>
  <div class="w-tree-view" @click="handleNodeListDivClicked">
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
    <div class="w-tree-view-node-list" :style="style.wtreeview">
      <w-node ref="wNode" v-for="node in nodes" :nodes="node" :key="node.id" :collapseAll="collapseAll" @emitCollapseAllChange="emitCollapseAllChange" @emitPassSelectedWnode="emitPassSelectedWnode"></w-node>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import WNode from './WNode'

export default {
  name: 'w-tree-view',
  components: { WNode },
  props: {
    nodes: Array
  },
  data() {
    return {
      nextId: 9,
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
      selectedWNode: {}
    }
  },
  methods: {
    handleCollapseAllClick() {
      this.collapseAll = true
    },
    emitCollapseAllChange() {
      this.collapseAll = false
    },
    handleNodeListDivClicked(e) {
      if (e.target.className === 'w-tree-view-node-list') {
        this.setSelectedNodeId(-1)
        this.selectedWNode = {}
      }
    },
    handleNewFolderClick() {
      const newNode = {
        id: this.nextId,
        name: '',
        type: 'folder',
        path: '',
        children: []
      }

      if (this.selectedWNode && this.isCreateNewNode(this.selectedWNode.nodes.type)) {
        this.selectedWNode.nodes.children.push(newNode)
      } else {
        this.selectedWNode.$parent.nodes.children.push(newNode)
      }

      this.$nextTick(() => {
        this.setNewNodeId(newNode.id)
      })

      this.nextId += 1
    },
    isCreateNewNode(type) {
      const items = ['folder', 'work']

      return items.find(item => type === item)
    },
    emitPassSelectedWnode(wNode) {
      this.selectedWNode = wNode
    },
    ...mapActions(['setSelectedNodeId', 'setNewNodeId'])
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

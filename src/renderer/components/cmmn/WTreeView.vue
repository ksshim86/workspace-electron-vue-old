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
      <w-node ref="wNode" v-for="node in nodes" :nodes="node" :key="node.sid" :collapseAll="collapseAll" @emitCollapseAllChange="emitCollapseAllChange" @emitPassSelectedWnode="emitPassSelectedWnode"></w-node>
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
      const testNode = {
        sid: 20,
        name: '새로등록이다.png',
        type: 'png',
        path: '',
        edit: false,
        file: 'png',
        children: []
      }

      if (this.selectedWNode && this.selectedWNode.nodes.type === 'folder') {
        this.selectedWNode.nodes.children.push(testNode)
      } else {
        console.log(this.selectedWNode)
        // 선택된 노드가 폴더가 아닌 경우 부모를 찾는 로직이 필요
      }
    },
    emitPassSelectedWnode(wNode) {
      this.selectedWNode = wNode
    },
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

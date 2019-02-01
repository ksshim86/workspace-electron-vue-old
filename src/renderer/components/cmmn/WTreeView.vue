<template>
  <div class="w-tree-view" @click="handleNodeListDivClicked">
    <div class="w-tree-view-menu" :style="style.menu">
      <v-btn class="ma-0" icon small @click="handleCollapseAllClick">
        <v-icon class="mdi mdi-collapse-all-outline" />
      </v-btn>
      <v-btn class="ma-0" icon small @click="handleNewFolderClick">
        <v-icon class="mdi mdi-folder-plus-outline" />
      </v-btn>
      <v-btn class="ma-0" icon small @click="handleNewTemplateClick">
        <v-icon class="mdi mdi-file-plus" />
      </v-btn>
    </div>
    <v-divider />
    <div class="w-tree-view-node-list" :style="style.wtreeview">
      <ul>
        <w-node 
          ref="wNode" 
          v-for="(node, index) in wNodes" 
          :nodes="node"
          :parentWNodeIndex="index"
          :key="node.id" 
          :collapseAll="collapseAll" 
          @emitCollapseAllChange="emitCollapseAllChange" 
        >
        </w-node>
      </ul>
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
    nodes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      wNodes: [],
      style: {
        menu: {
          height: '25px'
        },
        wtreeview: {
          'overflow-x': 'auto',
          position: 'absolute',
          'white-space': 'nowrap',
          width: '100%',
          height: 'calc(100% - 25px)',
          display: 'inline-block'
        }
      },
      collapseAll: false,
      selectedParentNodes: {}
    }
  },
  computed: {
    ...mapGetters({
      doneDrop: 'GET_DROP_W_NODE',
      dragWNode: 'GET_DRAG_W_NODE',
      selectedWNode: 'GET_SELECTED_W_NODE',
      nextWNodeId: 'GET_NEXT_W_NODE_ID',
      editingWNode: 'GET_EDITING_W_NODE'
    })
  },
  watch: {
    wNodes() {
      console.log('treeview nodes watch')
    },
    doneDrop(newVal, oldVal) {
      this.moveChild(newVal)
    },
    selectedWNode(newVal, oldVal) {
      this.editingWNodeSaveAndDelete()
    }
  },
  beforeCreate() {},
  created() {
    this.wNodes = JSON.parse(JSON.stringify(this.nodes))

    for (let i = 0; i < this.wNodes.length; i += 1) {
      this.initWNode(this.wNodes[i])
    }
  },
  methods: {
    // children이 없는 node children 속성 추가
    initWNode(node) {
      // props인 경우는 this.$set(node, 'children', [])
      if (!node.children) this.$set(node, 'children', [])

      for (let i = 0; i < node.children.length; i += 1) {
        this.initWNode(node.children[i])
      }
    },
    moveChild(dropWNode) {
      const child = this.dragWNode.wNode
      const dropWNodeTreeIndexes = dropWNode.parentWNodeIndexsAndWNodeIndex
      const dragWNodeTreeIndexes = this.dragWNode.parentWNodeIndexsAndWNodeIndex
      const dropLength = dropWNodeTreeIndexes.length
      const dragLength = dragWNodeTreeIndexes.length
      let index = dropWNodeTreeIndexes[0]
      let node = this.wNodes[index].children

      this.filterDragWNode()

      if (
        dragWNodeTreeIndexes[dragLength - 2] ===
          dropWNodeTreeIndexes[dropLength - 2] &&
        dropWNodeTreeIndexes[dropLength - 1] >
          dragWNodeTreeIndexes[dragLength - 1]
      ) {
        dropWNodeTreeIndexes[dropLength - 1] =
          dropWNodeTreeIndexes[dropLength - 1] - 1
      }

      if (dropLength === 1) {
        node.push(JSON.parse(JSON.stringify(child)))
        // this.$set(node, node.length, child)
        this.sortWNode(node)
      } else {
        for (let i = 1; i < dropLength; i += 1) {
          index = dropWNodeTreeIndexes[i]

          if (i < dropLength - 1) {
            node = node[index].children
          }
        }

        node[index].children.push(JSON.parse(JSON.stringify(child)))

        this.sortWNode(node[index].children)
      }
    },
    filterDragWNode() {
      const dragWNodeTreeIndexes = this.dragWNode.parentWNodeIndexsAndWNodeIndex
      let index = dragWNodeTreeIndexes[0]
      let node = this.wNodes[index].children

      for (let i = 1; i < dragWNodeTreeIndexes.length; i += 1) {
        index = dragWNodeTreeIndexes[i]

        if (i < dragWNodeTreeIndexes.length - 1) {
          node = node[index].children
        }
      }

      node.splice(index, 1)
    },
    sortWNode(wNode) {
      wNode.sort((a, b) => {
        if (a.type === 'folder' && b.type !== 'folder') {
          return -1
        }
        if (a.type !== 'folder' && b.type === 'folder') {
          return 1
        }

        return a.name > b.name
      })
    },
    handleCollapseAllClick() {
      this.collapseAll = true
    },
    emitCollapseAllChange() {
      this.collapseAll = false
    },
    handleNodeListDivClicked(e) {
      if (e.target.className === 'w-tree-view-node-list') {
        this.setNotSelectWNode()
      }
    },
    editingWNodeSaveAndDelete() {
      const initEditingWNode = {
        wNode: {
          id: 0,
          name: '',
          type: '',
          path: '',
          children: []
        },
        parentWNodeIndexsAndWNodeIndex: [],
        status: ''
      }
      const { wNode, status } = this.editingWNode
      const editingWNodeTreeIndexes = this.editingWNode
        .parentWNodeIndexsAndWNodeIndex
      const treeLen = editingWNodeTreeIndexes.length
      let node = this.wNodes

      if (status === '') return

      if (status === 'new') {
        if (wNode.name === '' && !wNode.name.length) {
          // 1. node를 제거
          for (let i = 0; i < treeLen; i += 1) {
            const index = editingWNodeTreeIndexes[i]

            if (i === treeLen - 1) {
              node.splice(index, 1)
            } else {
              node = node[index].children
            }
          }
          // 2. editingWNode를 초기화
          this.SET_EDITING_W_NODE(JSON.parse(JSON.stringify(initEditingWNode)))
        }
      }

      if (status === 'modify') {
        //
      }
      // editing 중인 node가 있으면 editing = false
      // newWNode가 editing 중이면, node의 name != '' 이면 저장
      // 원래있던 node면 name != '' 이면 name 변경, name == '' 이면 원복
    },
    setNotSelectWNode() {
      const notSelectedWNode = {
        wNode: {
          id: 0,
          name: '',
          type: '',
          path: '',
          children: []
        },
        parentWNodeIndexsAndWNodeIndex: []
      }

      this.SET_SELECTED_W_NODE(notSelectedWNode)
    },
    handleNewFolderClick() {
      const newNode = {
        id: this.nextWNodeId,
        name: '',
        type: 'folder',
        path: '',
        children: []
      }
      const { wNode } = this.selectedWNode
      const treeIndexes = [...this.selectedWNode.parentWNodeIndexsAndWNodeIndex]
      const len = treeIndexes.length
      let index = treeIndexes[0]
      let node = this.wNodes

      if (wNode.id === 0) return

      for (let i = 0; i < len; i += 1) {
        index = treeIndexes[i]

        if (i === len - 1 && this.isCreateNewNode(node[index].type)) {
          node[index].children.push(newNode)
        } else if (
          i === len - 1 &&
          len > 1 &&
          !this.isCreateNewNode(node[index].type)
        ) {
          node.push(newNode)
          treeIndexes.pop()
        }

        if (
          !(i === len - 1 && len > 1) ||
          this.isCreateNewNode(node[index].type)
        ) {
          node = node[index].children
        }
      }

      this.sortWNode(node)

      this.$nextTick(() => {
        const editingWNodeIndex = node.findIndex(
          element => element.id === newNode.id
        )
        let editingWNode = {
          wNode: {},
          parentWNodeIndexsAndWNodeIndex: [],
          status: ''
        }
        treeIndexes.push(editingWNodeIndex)

        editingWNode = {
          wNode: JSON.parse(JSON.stringify(newNode)),
          parentWNodeIndexsAndWNodeIndex: JSON.parse(
            JSON.stringify(treeIndexes)
          ),
          status: 'new'
        }

        this.SET_EDITING_W_NODE(editingWNode)
        this.SET_NEXT_W_NODE_ID()
      })
    },
    handleNewTemplateClick() {},
    isCreateNewNode(type) {
      const items = ['folder', 'work']

      return items.includes(type)
    },
    ...mapActions([
      'SET_NEXT_W_NODE_ID',
      'SET_SELECTED_W_NODE',
      'SET_EDITING_W_NODE'
    ])
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

.w-tree-view-node-list ul {
  display: inline-block;
  width: auto;
  min-width: 200px;
  margin: 0;
  padding: 0;
  /* white-space: nowrap; */
}

.w-tree-view-node-list li {
  list-style: none;
}
</style>

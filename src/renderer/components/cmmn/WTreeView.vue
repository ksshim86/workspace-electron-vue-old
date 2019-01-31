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
          @emitPassSelectedWnode="emitPassSelectedWnode"
        >
        </w-node>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
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
      selectedWNode: {},
      selectedParentNodes: {}
    }
  },
  computed: {
    ...mapGetters({
      doneDrop: 'GET_DROP_W_NODE',
      dragWNode: 'GET_DRAG_W_NODE',
      GET_SELECTED_W_NODE: 'GET_SELECTED_W_NODE',
      GET_NEXT_W_NODE_ID: 'GET_NEXT_W_NODE_ID'
    })
  },
  watch: {
    wNodes() {
      console.log('treeview nodes watch')
    },
    doneDrop(newVal, oldVal) {
      this.moveChild(newVal)
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
      const { parentWNodeIndexs } = dropWNode
      let index = parentWNodeIndexs[0]
      let node = this.wNodes[index].children

      this.filterDragWNode()

      // 같은 부모를 가진곳에 push 하거나 filter해버리면
      // index로 위치를 찾고있어서 index가 꼬여버린다.
      // 위 문제를 해결한 if문
      if (
        this.dragWNode.parentWNodeIndexs[
          this.dragWNode.parentWNodeIndexs.length - 2
        ] === parentWNodeIndexs[parentWNodeIndexs.length - 2] &&
        parentWNodeIndexs[parentWNodeIndexs.length - 1] >
          this.dragWNode.parentWNodeIndexs[
            this.dragWNode.parentWNodeIndexs.length - 1
          ]
      ) {
        parentWNodeIndexs[parentWNodeIndexs.length - 1] =
          parentWNodeIndexs[parentWNodeIndexs.length - 1] - 1
      }

      if (parentWNodeIndexs.length === 1) {
        node.push(child)
        // this.$set(node, node.length, child)
        this.sortWNode(node)
      } else {
        for (let i = 1; i < parentWNodeIndexs.length; i += 1) {
          index = parentWNodeIndexs[i]

          if (i < parentWNodeIndexs.length - 1) {
            node = node[index].children
          }
        }

        node[index].children.push(child)

        this.sortWNode(node[index].children)
      }
    },
    filterDragWNode() {
      const { parentWNodeIndexs } = this.dragWNode
      let index = parentWNodeIndexs[0]
      let node = this.wNodes[index].children

      for (let i = 1; i < parentWNodeIndexs.length; i += 1) {
        index = parentWNodeIndexs[i]

        if (i < parentWNodeIndexs.length - 1) {
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
        // this.setSelectedNodeId(-1)
        // this.selectedWNode = {}
      }
    },
    handleNewFolderClick() {
      // 왜 state 변경이 안되지??????? 소스상세 바꿔도 안되고.. 캐쉬때문인가
      this.SET_NEXT_W_NODE_ID = 20
      const nextId = this.GET_NEXT_W_NODE_ID
      const newNode = {
        id: nextId,
        name: '',
        type: 'folder',
        path: '',
        children: []
      }
      const { wNode, parentWNodeIndexs } = this.GET_SELECTED_W_NODE
      const len = parentWNodeIndexs.length
      let index = parentWNodeIndexs[0]
      let node = this.wNodes

      if (wNode.id === 0) return

      for (let i = 0; i < len; i += 1) {
        index = parentWNodeIndexs[i]

        if (i === len - 1 && this.isCreateNewNode(node[index].type)) {
          node[index].children.push(newNode)
        } else if (i === len - 1 && len > 1) {
          node.push(newNode)
        }

        node = node[index].children
      }

      this.SET_NEW_W_NODE_ID = newNode.id
      // const selectedWNode = Object.assign({}, this.getSelectedWNode())

      // if (!Object.entries(selectedWNode).length) return

      // if (this.isCreateNewNode(selectedWNode.type)) {
      //   this.setSelectedWNodeChildPush(newNode)
      // } else {
      //   this.setSelectedParentWNodeChildPush(newNode)
      // }

      // this.$nextTick(() => {})
    },
    handleNewTemplateClick() {},
    isCreateNewNode(type) {
      const items = ['folder', 'work']

      return items.find(item => type === item)
    },
    emitPassSelectedWnode(wNode, parentNodes) {
      this.selectedWNode = wNode
      this.selectedParentNodes = parentNodes
    },
    ...mapMutations(['SET_NEW_W_NODE_ID', 'SET_NEXT_W_NODE_ID']),
    ...mapActions([])
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

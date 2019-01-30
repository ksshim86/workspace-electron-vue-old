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
          :nodes.sync="node"
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
    wNodes() {
      return JSON.parse(JSON.stringify(this.nodes))
    },
    ...mapGetters({
      doneDrop: 'GET_DROP_W_NODE',
      dragWNode: 'GET_DRAG_W_NODE'
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
    for (let i = 0; i < this.wNodes.length; i += 1) {
      this.initWNode(this.wNodes[i])
    }
  },
  methods: {
    // children이 없는 node children 속성 추가
    initWNode(node) {
      // props인 경우는 this.$set(node, 'children', [])
      if (!node.children) node.children = []

      for (let i = 0; i < node.children.length; i += 1) {
        this.initWNode(node.children[i])
      }
    },
    moveChild(dropWNode) {
      const child = this.dragWNode.wNode
      const { parentWNodeIndexs } = dropWNode
      let index = parentWNodeIndexs[0]
      let node = this.wNodes[index].children

      // 같은 부모를 가진곳에 push 하거나 filter해버리면
      // index로 위치를 찾고있어서 index가 꼬여버린다.
      this.filterDragWNode()

      if (parentWNodeIndexs.length === 1) {
        node.push(child)
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
      const newNode = {
        id: this.getNextNodeId(),
        name: '',
        type: 'folder',
        path: '',
        children: []
      }

      const selectedWNode = Object.assign({}, this.getSelectedWNode())

      if (!Object.entries(selectedWNode).length) return

      if (this.isCreateNewNode(selectedWNode.type)) {
        this.setSelectedWNodeChildPush(newNode)
      } else {
        this.setSelectedParentWNodeChildPush(newNode)
      }

      this.$nextTick(() => {})
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
    ...mapGetters(['getNextNodeId', 'getSelectedWNode', 'getSelectedParentWNode']),
    ...mapActions([
      'setSelectedNodeId',
      'setNewNodeId',
      'setSelectedWNode',
      'setSelectedParentWNode',
      'setSelectedWNodeChildPush',
      'setSelectedParentWNodeChildPush'
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

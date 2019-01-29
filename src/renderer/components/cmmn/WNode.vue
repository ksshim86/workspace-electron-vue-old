<template>
  <div class="w-node">
    <div class="wrapper" :class="{select: isSelected}" :draggable="isDraggable" @dragstart.stop="dragstart" @dragover.stop="dragOver" @drop.stop="drop" @dragenter="dragEnter" @contextmenu.prevent.stop="handleRightClicked">
      <div :style="paddingLeft" @click.stop="handleNodeClick" style="display: flex;">
        <v-icon v-if="hasChildren" :class="['mdi', isOpen ? 'mdi-menu-down' : 'mdi-menu-right']" />
        <v-icon :class="['w-node-icon', iconClass]" :style="hasChildren ? '' : 'padding-left: 24px;'" />
        <div :class="['pr-3', 'pl-1']">
          <p v-if="!isEdit" :class="['body-1', 'font-weight-bold', 'text-xs-center', 'ma-0', 'pt-1']">{{wNode.name}}</p>
          <v-text-field ref="textFieldForName" v-if="isEdit" v-model="wNode.name" required hide-details class="ma-0"></v-text-field>
        </div>
      </div>
    </div>
    <div class="text-xs-center">
      <v-menu 
        v-model="isOptionsOpen" 
        :position-x="options.x" 
        :position-y="options.y" 
        absolute 
        offset-y
      >
        <v-card flat>
          <v-card-title class="ma-0 py-1 px-2">AAAA</v-card-title>
          <v-card-title class="ma-0 py-1 px-2">BBBB</v-card-title>
        </v-card>
      </v-menu>
    </div>
    <w-node v-show="isOpen" 
      v-for="(child, index) in wNode.children" 
      :wNode="child"
      :parentWNodeIndex="index"
      :parentWNodeIds="parentWNodeIdsAndWNodeId"
      :parentWNodeIndexs="parentWNodeIndexsAndWNodeIndex"
      :key="child.id" 
      :depth="increaseDepth" 
      :collapseAll="collapseAll" 
      @emitPassSelectedWnode="emitPassSelectedWnode"
      @emitChildNodeFilter="emitChildNodeFilter"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

let prevRightClickedObj = null
let _dragEnterNodeId = -1
let _dragEnterStartTime = null

export default {
  name: 'WNode',
  components: {},
  props: {
    parentWNodeIds: {
      type: Array,
      default() {
        return []
      }
    },
    parentWNodeIndex: 0,
    parentWNodeIndexs: {
      type: Array,
      default() {
        return []
      }
    },
    wNode: {
      type: Object,
      default() {
        return {
          id: 0,
          name: '',
          type: '',
          path: '',
          children: []
        }
      }
    },
    parentNodes: {
      type: Object,
      default() {
        return {
          id: 0,
          name: '',
          type: '',
          path: '',
          children: []
        }
      }
    },
    depth: {
      type: Number,
      default: 0
    },
    collapseAll: false
  },
  data() {
    return {
      options: {
        rename: false,
        x: 0,
        y: 0
      },
      isOpen: false,
      isSelected: false,
      isOptionsOpen: false,
      isEdit: false,
      type: {
        icons: {
          folder: 'mdi-folder',
          work: 'mdi-developer-board',
          html: 'mdi-language-html5',
          js: 'mdi-nodejs',
          json: 'mdi-json',
          md: 'mdi-markdown',
          pdf: 'mdi-file-pdf',
          png: 'mdi-file-image',
          txt: 'mdi-file-document-outline',
          xls: 'mdi-file-excel'
        }
      }
    }
  },
  created() {
    if (!this.wNode.children) {
      this.$set(this.wNode, 'children', [])
    }
  },
  mounted() {
    if (this.wNode.id === this.getNextNodeId) {
      this.isEdit = true

      this.$nextTick(() => {
        this.$refs.textFieldForName.focus()
      })
    }
  },
  computed: {
    parentWNodeIdsAndWNodeId() {
      let arr = []

      arr = arr.concat(this.parentWNodeIds)
      arr.push(this.wNode.id)

      return arr
    },
    parentWNodeIndexsAndWNodeIndex() {
      let arr = []

      arr = arr.concat(this.parentWNodeIndexs)
      arr.push(this.parentWNodeIndex)

      return arr
    },
    isDraggable() {
      return this.depth > 0 || this.wNode.type !== 'work'
    },
    isDrop() {
      const { wNode, parentWNodeId } = this.GET_DRAG_W_NODE
      const dropTarget = this.wNode

      return (
        (dropTarget.type === 'folder' || dropTarget.type === 'work') &&
        wNode.id !== dropTarget.id &&
        parentWNodeId !== dropTarget.id
      )
    },
    hasChildren() {
      return !!this.wNode.children && !!this.wNode.children.length
    },
    increaseDepth() {
      return this.depth + 1
    },
    paddingLeft() {
      const px = 17 * this.depth

      return this.depth === 0 ? '' : `padding-left: ${px}px !important;`
    },
    iconClass() {
      let iconClass = ''

      if (this.wNode.type === 'folder') {
        iconClass = this.type.icons.folder = this.isOpen
          ? 'mdi-folder-open'
          : 'mdi-folder'
      }

      iconClass = `mdi ${this.type.icons[this.wNode.type]}`

      return iconClass
    },
    ...mapGetters([
      'getNextNodeId',
      'getSelectedNodeId',
      'getNewNodeId',
      'getSelectedWNode',
      'getSelectedParentWNode',
      'GET_DRAG_W_NODE'
    ])
  },
  watch: {
    hasChildren() {
      if (!this.wNode.children.length) {
        this.isOpen = false
      }
    },
    collapseAll(newVal, oldVal) {
      if (!oldVal && newVal) {
        this.isOpen = false
      }
    },
    isOpen() {
      if (this.isOpen) {
        this.$emit('emitCollapseAllChange')
      }
    },
    getSelectedNodeId(newVal, oldVal) {
      if (this.wNode.id === newVal) {
        this.isSelected = true
      } else {
        this.isSelected = false
      }

      if (
        this.wNode.id === this.getNewNodeId &&
        (newVal === -1 || this.wNode.id !== newVal)
      ) {
        this.isEdit = false

        if (this.wNode.name === '') {
          this.childNodeFilter()
        } else {
          this.setNextNodeId()
        }
      }
    },
    getNewNodeId(newVal, oldVal) {
      if (this.wNode.id === newVal) {
        this.isEdit = true
        this.$parent.isOpen = true

        this.$nextTick(() => {
          this.$refs.textFieldForName.focus()
        })
      } else {
        this.isEdit = false
      }
    }
  },
  updated() {
    console.log(`wnode-${this.wNode.name} updated`)
  },
  methods: {
    dragstart(event) {
      const dragWNode = Object.assign({}, this.wNode)
      const len = this.parentWNodeIds.length

      event.dataTransfer.effectAllowed = 'move'

      this.SET_DRAG_W_NODE({
        wNode: dragWNode,
        parentWNodeId: this.parentWNodeIds[len - 1]
      })
    },
    dragOver(event) {
      let _dragOverTime = null

      if (this.wNode.id === _dragEnterNodeId) {
        _dragOverTime = new Date().getTime()

        if (
          _dragOverTime - _dragEnterStartTime >= 500 &&
          !this.isOpen &&
          this.hasChildren
        ) {
          this.handleNodeClick()
        }
      } else {
        _dragEnterStartTime = null
      }

      event.preventDefault()
    },
    dragEnter(event) {
      if (!this.isOpen && this.hasChildren) {
        _dragEnterNodeId = this.wNode.id

        _dragEnterStartTime = new Date().getTime()
      }

      event.preventDefault()
    },
    drop(event) {
      if (this.isDrop) {
        // _toNode.wNode.children.push(_fromNode.wNode)
        this.SET_DROP_W_NODE({
          id: this.wNode.id,
          parentWNodeIds: this.parentWNodeIds,
          parentWNodeIndexs: this.parentWNodeIndexsAndWNodeIndex
        })

        // _fromNode.$parent.wNode.children = _fromNode.$parent.wNode.children.filter(
        //   item => item.id !== _fromNode.wNode.id
        // )

        // _toNode.wNode.children.sort((a, b) => {
        //   if (a.type === b.type) {
        //     return a.name > b.name
        //   }
        //   if (a.type === 'folder' && b.type !== 'folder') {
        //     return -1
        //   }
        //   if (a.type !== 'folder' && b.type === 'folder') {
        //     return 1
        //   }

        //   return 0
        // })
      }

      event.preventDefault()
    },
    handleNodeClick() {
      // 테스트를 위해 주석 원래 사용하는 로직
      // this.setSelectedNodeId(this.wNode.id)

      // this.setSelectedWNode(this.wNode)
      // this.setSelectedParentWNode(this.parentNodes)

      this.nodeOpen()
    },
    emitPassSelectedWnode(wNode, parentNodes) {
      this.$emit('emitPassSelectedWnode', wNode, parentNodes)
    },
    nodeOpen() {
      this.isOpen = !this.isOpen && this.hasChildren
    },
    handleRightClicked(e) {
      if (prevRightClickedObj) prevRightClickedObj.isOptionsOpen = false

      prevRightClickedObj = this

      this.options.x = e.clientX
      this.options.y = e.clientY

      this.$nextTick(() => {
        this.isOptionsOpen = true
      })
    },
    childNodeFilter() {
      this.$emit('emitChildNodeFilter', this.wNode.id)
    },
    emitChildNodeFilter(childId) {
      this.wNode.children = this.wNode.children.filter(
        child => child.id !== childId
      )
    },
    ...mapMutations(['SET_DRAG_W_NODE', 'SET_DROP_W_NODE']),
    ...mapActions([
      'setNextNodeId',
      'setSelectedNodeId',
      'setSelectedWNode',
      'setSelectedParentWNode'
    ])
  }
}
</script>

<style>
.w-node .wrapper {
  cursor: pointer;
}
.w-node .wrapper:hover {
  background-color: rgba(208, 230, 239, 0.5);
}
.w-node .wrapper.select {
  background-color: rgba(208, 230, 239, 0.5);
  /* color: red; */
}
.w-node .wrapper .v-icon {
  color: #34495e;
}
.v-text-field,
.v-text-field div {
  margin: 0;
  padding: 0;
}
.v-text-field input {
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>

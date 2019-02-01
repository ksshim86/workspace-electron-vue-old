<template>
  <li class="w-node">
    <div class="wrapper" :class="{select: isSelected}" :draggable="isDraggable" @dragstart.stop="dragstart" @dragover.stop="dragOver" @drop.stop="drop" @dragenter="dragEnter" @contextmenu.prevent.stop="handleRightClicked">
      <div :style="paddingLeft" @click.stop="handleNodeClick" style="display: flex;">
        <v-icon v-if="hasChildren" :class="['mdi', isOpen ? 'mdi-menu-down' : 'mdi-menu-right']" />
        <v-icon :class="['w-node-icon', iconClass]" :style="hasChildren ? '' : 'padding-left: 24px;'" />
        <div :class="['pr-3', 'pl-1']">
          <p 
            v-if="!isEdit" 
            :class="['body-1', 'font-weight-bold', 'text-xs-center', 'ma-0', 'pt-1']"
          >
            {{wNode.name}}
          </p>
          <v-text-field 
            ref="textFieldForName" 
            v-if="isEdit" 
            v-model="wNode.name" 
            required 
            hide-details 
            class="ma-0"
            @change="nameEditing"
          />
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
      v-for="(node, index) in wNode.children" 
      :nodes="node"
      :parentWNodeIndex="index"
      :parentWNodeIds="parentWNodeIdsAndWNodeId"
      :parentWNodeIndexs="parentWNodeIndexsAndWNodeIndex"
      :key="node.id" 
      :depth="increaseDepth" 
      :collapseAll="collapseAll" 
      @emitPassSelectedWnode="emitPassSelectedWnode"
      @emitChildNodeFilter="emitChildNodeFilter"
    />
  </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

let prevRightClickedObj = null
let _dragEnterNodeId = -1
let _dragEnterStartTime = null

export default {
  name: 'WNode',
  components: {},
  props: {
    parentWNodeIds: {
      type: Array,
      default: () => []
    },
    parentWNodeIndex: 0,
    parentWNodeIndexs: {
      type: Array,
      default: () => []
    },
    nodes: {
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
  created() {},
  mounted() {},
  computed: {
    wNode() {
      return JSON.parse(JSON.stringify(this.nodes))
    },
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
      const { wNode, parentWNodeId } = this.dragWNode
      const dropTarget = this.wNode

      return (
        (dropTarget.type === 'folder' || dropTarget.type === 'work') &&
        wNode.id !== dropTarget.id &&
        parentWNodeId !== dropTarget.id
      )
    },
    isSelected() {
      return this.wNode.id === this.selectedWNode.wNode.id
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
        iconClass = this.type.icons.folder = this.isOpen ? 'mdi-folder-open' : 'mdi-folder'
      }

      iconClass = `mdi ${this.type.icons[this.wNode.type]}`

      return iconClass
    },
    ...mapGetters({
      dragWNode: 'GET_DRAG_W_NODE',
      selectedWNode: 'GET_SELECTED_W_NODE',
      editingWNode: 'GET_EDITING_W_NODE'
    })
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
    editingWNode() {
      if (this.wNode.id === this.editingWNode.wNode.id) {
        this.isEdit = true

        this.$nextTick(() => {
          this.$refs.textFieldForName.focus()
        })
      } else if (this.isEdit) {
        this.isEdit = false
      }
    }
  },
  updated() {},
  methods: {
    dragstart(event) {
      const len = this.parentWNodeIds.length
      const lastIndex = len - 1

      event.dataTransfer.effectAllowed = 'move'

      this.SET_DRAG_W_NODE({
        wNode: this.wNode,
        parentWNodeId: this.parentWNodeIds[lastIndex],
        parentWNodeIndexsAndWNodeIndex: this.parentWNodeIndexsAndWNodeIndex
      })
    },
    dragOver(event) {
      const delayTime = 500
      let _dragOverTime = null

      if (this.wNode.id === _dragEnterNodeId) {
        _dragOverTime = new Date().getTime()

        if (_dragOverTime - _dragEnterStartTime >= delayTime && !this.isOpen && this.hasChildren) {
          this.isOpen = true
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
        const len = this.parentWNodeIds.length

        this.SET_DROP_W_NODE({
          id: this.wNode.id,
          parentWNodeId: this.parentWNodeIds[len - 1],
          parentWNodeIndexsAndWNodeIndex: this.parentWNodeIndexsAndWNodeIndex
        })
      }

      event.preventDefault()
    },
    handleNodeClick() {
      const len = this.parentWNodeIds.length

      this.SET_SELECTED_W_NODE({
        wNode: JSON.parse(JSON.stringify(this.wNode)),
        parentWNodeId: this.parentWNodeIds[len - 1],
        parentWNodeIndexsAndWNodeIndex: this.parentWNodeIndexsAndWNodeIndex
      })

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
    nameEditing() {
      const { name } = this.wNode

      this.SET_EDITING_W_NODE_NAME(name)
    },
    childNodeFilter() {
      this.$emit('emitChildNodeFilter', this.wNode.id)
    },
    emitChildNodeFilter(childId) {
      this.wNode.children = this.wNode.children.filter(child => child.id !== childId)
    },
    ...mapActions([
      'SET_SELECTED_W_NODE',
      'SET_DRAG_W_NODE',
      'SET_DROP_W_NODE',
      'SET_EDITING_W_NODE_NAME'
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

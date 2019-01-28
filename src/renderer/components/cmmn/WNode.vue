<template>
  <div class="w-node">
    <div class="wrapper" :class="{select: isSelected}" :draggable="isDraggable" @dragstart.stop="dragstart" @dragover.stop="dragOver" @drop.stop="drop" @dragenter="dragEnter" @contextmenu.prevent.stop="handleRightClicked">
      <div :style="paddingLeft" @click.stop="handleNodeClick" style="display: flex;">
        <v-icon v-if="hasChildren" :class="['mdi', isOpen ? 'mdi-menu-down' : 'mdi-menu-right']" />
        <v-icon :class="['w-node-icon', iconClass]" :style="hasChildren ? '' : 'padding-left: 24px;'" />
        <div :class="['pr-3', 'pl-1']">
          <p v-if="!isEdit" :class="['body-1', 'font-weight-bold', 'text-xs-center', 'ma-0', 'pt-1']">{{nodes.name}}</p>
          <v-text-field ref="textFieldForName" v-if="isEdit" v-model="nodes.name" required hide-details class="ma-0"></v-text-field>
        </div>
      </div>
    </div>
    <div class="text-xs-center">
      <v-menu v-model="isOptionsOpen" :position-x="options.x" :position-y="options.y" absolute offset-y>
        <v-card flat>
          <v-card-title class="ma-0 py-1 px-2">AAAA</v-card-title>
          <v-card-title class="ma-0 py-1 px-2">BBBB</v-card-title>
        </v-card>
      </v-menu>
    </div>
    <w-node v-show="isOpen" 
      v-for="node in nodes.children" 
      :nodes="node" :key="node.id" 
      :depth="increaseDepth" 
      :collapseAll="collapseAll" 
      @emitPassSelectedWnode="emitPassSelectedWnode"
      @emitChildNodeFilter="emitChildNodeFilter"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

let _fromNode = null
let _toNode = null
let prevRightClickedObj = null
let _dragEnterNodeId = -1
let _dragEnterStartTime = null

export default {
  name: 'WNode',
  components: {},
  props: {
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
    if (!this.nodes.children) {
      this.$set(this.nodes, 'children', [])
    }
  },
  computed: {
    isDraggable() {
      return this.depth > 0 || this.nodes.type !== 'work'
    },
    isDrop() {
      return this.nodes.type === 'folder' || this.nodes.type === 'work'
    },
    hasChildren() {
      return !!this.nodes.children && !!this.nodes.children.length
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

      if (this.nodes.type === 'folder') {
        iconClass = this.type.icons.folder = this.isOpen
          ? 'mdi-folder-open'
          : 'mdi-folder'
      }

      iconClass = `mdi ${this.type.icons[this.nodes.type]}`

      return iconClass
    },
    ...mapGetters(['getSelectedNodeId', 'getNewNodeId'])
  },
  watch: {
    hasChildren() {
      if (!this.nodes.children.length) {
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
      if (this.nodes.id === newVal) {
        this.isSelected = true
      } else {
        this.isSelected = false
      }

      if (
        this.nodes.id === this.getNewNodeId &&
        (newVal === -1 || this.nodes.id !== newVal)
      ) {
        this.isEdit = false

        if (this.nodes.name === '') {
          this.childNodeFilter()
        }
      }
    },
    getNewNodeId(newVal, oldVal) {
      if (this.nodes.id === newVal) {
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
  methods: {
    dragstart(event) {
      event.dataTransfer.effectAllowed = 'move'

      _fromNode = this
    },
    dragOver(event) {
      let _dragOverTime = null

      if (this.nodes.id === _dragEnterNodeId) {
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
        _dragEnterNodeId = this.nodes.id

        _dragEnterStartTime = new Date().getTime()
      }

      event.preventDefault()
    },
    drop(event) {
      if (this.isDrop) {
        _toNode = this

        if (
          _fromNode.nodes.id !== _toNode.nodes.id &&
          _fromNode.$parent.nodes.id !== _toNode.nodes.id
        ) {
          _toNode.nodes.children.push(_fromNode.nodes)

          _fromNode.$parent.nodes.children = _fromNode.$parent.nodes.children.filter(
            item => item.id !== _fromNode.nodes.id
          )

          _toNode.nodes.children.sort((a, b) => {
            if (a.type === b.type) {
              return a.name > b.name
            }
            if (a.type === 'folder' && b.type !== 'folder') {
              return -1
            }
            if (a.type !== 'folder' && b.type === 'folder') {
              return 1
            }

            return 0
          })
        }
      }

      event.preventDefault()
    },
    handleNodeClick() {
      this.setSelectedNodeId(this.nodes.id)
      this.emitPassSelectedWnode(this)
      this.nodeOpen()
    },
    emitPassSelectedWnode(wNode) {
      this.$emit('emitPassSelectedWnode', wNode)
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
      this.$emit('emitChildNodeFilter', this.nodes.id)
    },
    emitChildNodeFilter(childId) {
      this.nodes.children = this.nodes.children.filter(
        child => child.id !== childId
      )
    },
    ...mapActions(['setSelectedNodeId'])
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

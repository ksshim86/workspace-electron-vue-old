<template>
  <li class="w-node">
    <div
      class="wrapper"
      :class="{select: isSelected}"
      :draggable="isDraggable"
      @dragstart.stop="dragstart"
      @dragover.stop="dragOver"
      @drop.stop="drop"
      @dragenter="dragEnter"
      @dragend="dragEnd"
      @contextmenu.prevent.stop="handleRightClicked"
    >
      <div
        :style="paddingLeft"
        style="display: flex;"
        @click.stop="handleNodeClick"
      >
        <v-icon
          v-if="hasChildren"
          :class="['mdi', isOpen ? 'mdi-menu-down' : 'mdi-menu-right']"
        />
        <v-icon
          :class="['w-node-icon', iconClass]"
          :style="hasChildren ? '' : 'padding-left: 24px;'"
        />
        <div :class="['pr-3', 'pl-1']">
          <p
            v-if="!isEdit"
            ref="nodeName"
            :class="['body-1', 'font-weight-bold', 'text-xs-center', 'ma-0', 'pt-1']"
          >
            {{ wNode.name }}
          </p>
          <v-text-field
            v-if="isEdit"
            ref="textFieldForName"
            v-model="wNode.name"
            required
            hide-details
            :error="nameError"
            class="ma-0"
            @change="nameEditing"
            @keyup.13="handleNameEditingKeyupEnter"
          />
          <!-- <v-alert
              style="position: absolute;"
              :value="nameError"
              color="error"
            >
              This is an info alert.1111111111111111111111
            </v-alert> -->
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
          <v-card-title class="ma-0 py-1 px-2">
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
          </v-card-title>
          <v-card-title class="ma-0 py-1 px-2">
            BBBB
          </v-card-title>
        </v-card>
      </v-menu>
    </div>
    <w-node
      v-for="(node, index) in wNode.children"
      v-show="isOpen"
      :key="node.id"
      :nodes="node"
      :parent-path="wNode.path"
      :parent-w-node-index="index"
      :parent-w-node-ids="parentAndWNodeIds"
      :parent-w-node-indexs="parentWNodeIndexsAndWNodeIndex"
      :depth="increaseDepth"
      :collapse-all="collapseAll"
      @emitChildNodeFilter="emitChildNodeFilter"
      @emitCheckDuplicateName="emitCheckDuplicateName"
    />
  </li>
</template>

<script>
// import { ipcRenderer } from 'electron'
import { mapGetters, mapActions } from 'vuex'

let prevRightClickedObj = null
let _dragEnterNodeId = -1
let _dragEnterStartTime = null
let _dragNodeId = -1

export default {
  name: 'WNode',
  components: {},
  props: {
    parentWNodeIds: {
      type: Array,
      default: () => []
    },
    parentWNodeIndex: {
      type: Number,
      default: 0
    },
    parentWNodeIndexs: {
      type: Array,
      default: () => []
    },
    parentPath: {
      type: String,
      default: ''
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
    depth: {
      type: Number,
      default: 0
    },
    collapseAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      wNode: {
        id: 0,
        name: '',
        type: '',
        path: '',
        children: []
      },
      path: '',
      options: {
        rename: false,
        x: 0,
        y: 0
      },
      isOpen: false,
      isOptionsOpen: false,
      isEdit: false,
      nameError: false,
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
  computed: {
    parentAndWNodeIds() {
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
      let klass = ''

      if (this.wNode.type === 'folder') {
        klass = this.isOpen ? 'mdi mdi-folder-open' : 'mdi mdi-folder'
      } else {
        klass = `mdi ${this.type.icons[this.wNode.type]}`
      }

      return klass
    },
    wNodeName() {
      return this.wNode.name
    },
    nameCheck() {
      return this.editingWNode.nameCheck
    },
    separator() {
      const items = ['folder', 'work']

      return items.includes(this.wNode.type) ? '\\' : ''
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
    editingWNode(newVal, oldVal) {
      const notEditing = ''

      if (newVal.status === notEditing && oldVal.status === 'new') {
        if (this.wNode.name !== '' && this.wNode.name.length) {
          this.isEdit = false
        }
      }

      if (newVal.status !== notEditing && oldVal.status === notEditing) {
        const { parentAndWNodeIds } = newVal
        const parentIndex = parentAndWNodeIds.length - 2

        if (this.wNode.id === parentAndWNodeIds[parentIndex] && !this.isOpen) {
          this.isOpen = true
        }

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
    nameCheck(newVal, oldVal) {
      if (newVal.status === oldVal.status) {
        if (this.wNode.id === this.editingWNode.wNode.id) {
          if (!newVal) {
            this.nameError = true
          } else {
            this.nameError = false
          }
        }
      }
    },
    wNodeName(newVal, oldVal) {
      const name = newVal.trim()

      if (this.isEdit) {
        this.$emit('emitCheckDuplicateName', name, this.parentWNodeIndex)
      }
    }
  },
  created() {
    this.wNode = this.nodes
    this.wNode.path = `${this.parentPath}${this.separator}${this.wNode.name}`
    console.log(`created> ${this.parentPath}`)
  },
  mounted() {
    console.log(`mounted> ${this.parentPath}`)
  },
  beforeUpdate() {
    console.log(`beforeUpdate> ${this.parentPath}`)
  },
  methods: {
    emitCheckDuplicateName(name, index) {
      const result =
        this.wNode.children.find(
          (element, elementIndex) =>
            elementIndex !== index && element.name === name
        )

      if (result) {
        this.SET_EDITING_W_NODE_NAME_CHECK(false)
      } else {
        this.SET_EDITING_W_NODE_NAME_CHECK(true)
      }
    },
    dragstart(event) {
      const len = this.parentWNodeIds.length
      const lastIndex = len - 1

      // 아래와 같이 element 추가로 설정 가능 지금은 빈 텍스트로
      // const element = document.createElement('p')
      // event.dataTransfer.effectAllowed = 'move'
      // element.textContent = this.wNode.name
      // element.id = 'drag-ghost'
      // document.body.appendChild(element)
      // event.dataTransfer.setDragImage(element, -17, -15)

      this.isOpen = false
      _dragNodeId = this.wNode.id

      this.SET_DRAG_W_NODE({
        wNode: JSON.parse(JSON.stringify(this.wNode)),
        parentWNodeId: this.parentWNodeIds[lastIndex],
        parentWNodeIndexsAndWNodeIndex: this.parentWNodeIndexsAndWNodeIndex
      })
    },
    dragOver(event) {
      const delayTime = 500
      let _dragOverTime = null

      console.log(`${_dragNodeId} : ${this.wNode.id}`)

      if (this.wNode.id === _dragEnterNodeId) {
        _dragOverTime = new Date().getTime()

        if (
          _dragOverTime - _dragEnterStartTime >= delayTime &&
          !this.isOpen &&
          this.hasChildren &&
          _dragNodeId !== this.wNode.id
        ) {
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
        const lastIndex = len - 1

        this.SET_DROP_W_NODE({
          id: this.wNode.id,
          path: this.wNode.path,
          parentWNodeId: this.parentWNodeIds[lastIndex],
          parentWNodeIndexsAndWNodeIndex: JSON.parse(
            JSON.stringify(this.parentWNodeIndexsAndWNodeIndex)
          )
        })
      }

      event.preventDefault()
    },
    dragEnd() {
      // const ghost = document.getElementById('drag-ghost')
      // if (ghost.parentNode) {
      //   ghost.parentNode.removeChild(ghost)
      // }
    },
    handleNodeClick() {
      this.SET_SELECTED_W_NODE({
        wNode: JSON.parse(JSON.stringify(this.wNode)),
        parentAndWNodeIds: JSON.parse(JSON.stringify(this.parentAndWNodeIds)),
        parentWNodeIndexsAndWNodeIndex: JSON.parse(
          JSON.stringify(this.parentWNodeIndexsAndWNodeIndex)
        )
      })

      this.nodeOpen()
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
    handleNameEditingKeyupEnter() {
      const initEditingWNode = {
        wNode: {
          id: 0,
          name: '',
          type: '',
          path: '',
          children: []
        },
        parentWNodeIndexsAndWNodeIndex: [],
        status: '',
        nameCheck: true
      }

      this.wNode.name = this.wNode.name.trim()

      if (!this.wNode.name.length) {
        // TODO: duplicate name alert
        return
      }

      if (!this.nameCheck) {
        return
      }

      this.wNode.path = `${this.parentPath}${this.separator}${this.wNode.name}`
      this.SET_EDITING_W_NODE_PATH(`${this.parentPath}${this.separator}${this.wNode.name}`)
      this.isEdit = false
      this.SET_EDITING_W_NODE(JSON.parse(JSON.stringify(initEditingWNode)))

      // TODO: ipc call, window directory create
      // TODO: 디렉토리, db에 저장을 어떤 방식으로 처리할지 고민 필요
      // this.$nextTick(() => {
      //   ipcRenderer.send(
      //     'send-directory-create',
      //     {
      //       wNode: this.wNode,
      //       treeIndex: this.parentWNodeIndexsAndWNodeIndex
      //     }
      //   )
      // })
    },
    childNodeFilter() {
      this.$emit('emitChildNodeFilter', this.wNode.id)
    },
    emitChildNodeFilter(childId) {
      this.wNode.children = this.wNode.children.filter(
        child => child.id !== childId
      )
    },
    ...mapActions([
      'SET_SELECTED_W_NODE',
      'SET_DRAG_W_NODE',
      'SET_DROP_W_NODE',
      'SET_EDITING_W_NODE',
      'SET_EDITING_W_NODE_NAME',
      'SET_EDITING_W_NODE_PATH',
      'SET_EDITING_W_NODE_NAME_CHECK'
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

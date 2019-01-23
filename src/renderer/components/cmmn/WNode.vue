<template>
  <div :class="['ma-0']" :style="paddingLeft" :draggable="isDraggable" :allowDrop="isAllowDrop" @dragstart.stop="dragstart" @dragover="dragover" @drop.stop="drop" @dragenter.prevent="dragenter">
    <div v-if="!isRoot" @click="handleFolderClicked" style="display: flex;">
      <v-icon v-if="isFolder" :class="['mdi', showArrow ? 'mdi-menu-down' : 'mdi-menu-right']" />
      <v-icon :class="['mdi', isFolderOpen ? 'mdi-folder-open' : 'mdi-folder']" :style="isFolder ? '' : 'padding-left: 24px;'" />
      <span :class="['title', 'font-weight-light', 'pr-3', 'text-truncate']" @contextmenu.prevent.stop="handleRightClicked">{{items.name}}</span>
      <div class="text-xs-center">
        <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
          <v-card flat>
            <v-card-title class="ma-0 py-1 px-2">AAAA</v-card-title>
            <v-card-title class="ma-0 py-1 px-2">BBBB</v-card-title>
          </v-card>
        </v-menu>
      </div>
    </div>
    <w-node v-if="isFolder" v-show="isDisplay" v-for="items in items.children" :items="items" :key="items.sid" :depth="increaseDepth">
    </w-node>
  </div>
</template>

<script>
let fromItems = null
let toItems = null
let prevRightClickedObj = null

export default {
  name: 'WNode',
  components: {},
  props: {
    items: Object,
    depth: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isDraggable: false,
      isDrag: false,
      isClicked: false,
      isDisplay: false,
      showMenu: false,
      x: 0,
      y: 0
    }
  },
  beforeMount() {
    if (this.depth > 1) this.isDraggable = true
    if (this.depth < 1) this.isDisplay = true
  },
  computed: {
    isFolder() {
      return this.items.children && this.items.children.length
    },
    isAllowDrop() {
      return this.depth > 0
    },
    increaseDepth() {
      return this.depth + 1
    },
    isRoot() {
      return this.depth === 0
    },
    paddingLeft() {
      return this.depth === 1 || this.isRoot ? '' : 'padding-left: 17px !important;'
    },
    showArrow() {
      return this.isClicked && this.isFolder
    },
    isFolderOpen() {
      return this.isClicked && this.isFolder
    }
  },
  methods: {
    dragstart() {
      // event.dataTransfer.setData('items', JSON.stringify(this.items))
      fromItems = this
    },
    dragover(event) {
      event.preventDefault()
    },
    dragenter() {
    },
    drop() {
      if (this.isAllowDrop) {
        toItems = this

        if (
          fromItems.items.sid !== toItems.items.sid &&
          fromItems.$parent.items.sid !== toItems.items.sid
        ) {
          toItems.items.children.push(fromItems.items)

          fromItems.$parent.items.children =
            fromItems.$parent.items.children.filter(item => item.sid !== fromItems.items.sid)
        }
      }
    },
    handleFolderClicked() {
      this.isClicked = !this.isClicked && this.items.children.length > 0
      this.isDisplay = !this.isDisplay && this.items.children.length > 0
    },
    handleRightClicked(e) {
      if (prevRightClickedObj) prevRightClickedObj.showMenu = false

      prevRightClickedObj = this

      this.x = e.clientX
      this.y = e.clientY

      this.$nextTick(() => {
        this.showMenu = true
      })
    }
  }
}
</script>

<style scoped>
</style>

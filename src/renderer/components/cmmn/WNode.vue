<template>
  <div :class="[isWork ? 'my-2 mx-0' : 'ma-0']" :style="paddingLeft" :draggable="isDraggable" :allowDrop="isAllowDrop" @dragstart.stop="dragstart" @dragover="dragover" @drop.stop="drop" @dragenter.prevent="dragenter">
    <div v-if="!isRoot" @click="handleFolderClicked" style="display: flex;">
      <v-icon v-if="isFolder" :class="['mdi', showArrow ? 'mdi-menu-down' : 'mdi-menu-right']" />
      <v-icon 
        v-if="!isWork"
        :class="['mdi', isFolderOpen ? filesIconClass.folderClose : filesIconClass.folderOpen]" 
        :style="isFolder ? '' : 'padding-left: 24px;'" 
      />
      <v-icon v-if="isWork" :class="['mdi', 'mdi-developer-board']" :style="isFolder ? '' : 'padding-left: 24px;'" />
      <div 
        :class="['title', 'font-weight-light', 'pr-3']" 
        @contextmenu.prevent.stop="handleRightClicked"
      >
        {{items.name}}
      </div>
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
      1234234324
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
    items: {
      type: Object,
      default: {
        sid: 0,
        name: '',
        type: '',
        path: '',
        edit: false,
        children: []
      }
    },
    depth: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      filesIconClass: {
        folderClose: 'mdi-folder',
        work: 'mdi-developer-board',
        folderOpen: 'mdi-folder-open',
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-json',
        md: 'mdi-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel'
      },
      isDraggable: false,
      isDrag: false,
      isClicked: false,
      isDisplay: false,
      showMenu: false,
      x: 0,
      y: 0
    }
  },
  created() {
    if (!this.items.children) {
      this.$set(this.items, 'children', [])
    }
  },
  beforeMount() {
    if (this.depth > 1) this.isDraggable = true
    if (this.depth < 1) this.isDisplay = true
  },
  updated() {
    // console.log(`this node name: ${this.items.name}`)
  },
  computed: {
    isFolder() {
      return this.items.children !== undefined && this.items.children.length > 0
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
    isWork() {
      return this.depth === 1
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
      fromItems = this
    },
    dragover(event) {
      event.preventDefault()
    },
    dragenter() {},
    drop() {
      if (this.isAllowDrop) {
        toItems = this

        if (
          fromItems.items.sid !== toItems.items.sid &&
          fromItems.$parent.items.sid !== toItems.items.sid
        ) {
          toItems.items.children.push(fromItems.items)

          fromItems.$parent.items.children = fromItems.$parent.items.children.filter(
            item => item.sid !== fromItems.items.sid
          )
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

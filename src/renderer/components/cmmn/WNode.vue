<template>
  <div 
    :class="['my-2']" 
    :draggable="isDraggable"
    :allowDrop="isAllowDrop"
    @dragstart.stop="dragstart" 
    @dragover="dragover" 
    @drop.stop="drop" 
  >
    <v-icon v-if="isFolder">mdi-menu-right</v-icon>
    <v-icon v-if="!isClicked" :class="[isFolder ? '' : 'pl-4']" @dblclick="dblclick">mdi-folder</v-icon>
    <v-icon v-if="isClicked" :class="[isFolder ? '' : 'pl-4']" @dblclick="dblclick">mdi-folder-open</v-icon>
    <span :class="['title', 'font-weight-light']" @contextmenu.prevent.stop="handleRightClicked">{{items.name}}</span>
    <div class="text-xs-center">
      <v-menu v-model="showMenu"
        :position-x="x"
        :position-y="y"
        absolute
        offset-y
      >
        <v-card flat>
          <v-card-title class="ma-0 py-1 px-2">AAAA</v-card-title>
          <v-card-title class="ma-0 py-1 px-2">BBBB</v-card-title>
        </v-card>
      </v-menu>
    </div>
    <!-- <v-btn icon small absolute right="">
      <v-icon>mdi-dots-horizontal</v-icon>
    </v-btn> -->
    <w-node 
      v-if="isFolder"
      v-show="isDisplay"
      :class="['pl-5']" 
      v-for="items in items.children" 
      :items="items" 
      :key="items.sid"
      :depth="increaseDepth"
    >
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
      isDisplay: true,
      showMenu: false,
      x: 0,
      y: 0
    }
  },
  beforeMount() {
    if (this.depth > 1) this.isDraggable = true
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
    drop() {
      const pa = fromItems.$parent.items.children

      if (this.isAllowDrop) {
        toItems = this

        if (
          fromItems.items.sid !== toItems.items.sid &&
          fromItems.$parent.items.sid !== toItems.items.sid
        ) {
          toItems.items.children.push(fromItems.items)

          fromItems.$parent.items.children = pa.filter(item => item.sid !== fromItems.items.sid)

          console.log(pa)
        }
      }
    },
    dblclick() {
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

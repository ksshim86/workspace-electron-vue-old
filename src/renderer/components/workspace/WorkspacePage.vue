<template>
  <v-container fill-height fluid grid-list-xl class="pa-0">

    <v-card class="mr-3" min-width="200" width="200" style="height: 100%; overflow-x : auto; position: absolute; white-space: nowrap;">
      <w-tree-view :nodes="items"></w-tree-view>
    </v-card>
    <v-layout wrap wtest class="ma-0" style="height: 100%;">
      <v-flex md12 sm12 lg4 pt-0 mt-1>
        <v-card color="#27ae60" dark class="mb-1">
          <v-card-title class="title font-weight-medium">
            <v-icon class="mr-2">mdi-card-outline</v-icon>
            TO DO
          </v-card-title>
        </v-card>
        <v-card class="my-2">
          <v-card-title class="py-0 px-3">
            <span class="grey--text text-truncate">VueJSVueJS</span>
            <v-divider class="mx-1 white" vertical />
            <span class="font-weight-black">WS-2</span>
            <v-spacer />
            <v-btn icon small class="mr-0">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-title class="py-1">
            <span class="text-truncate">Work 등록 개발</span>
          </v-card-title>
          <v-card-title class="py-1">
            <v-btn icon small class="ml-0">
              <v-icon>mdi-folder-open</v-icon>
            </v-btn>
            <v-spacer />
            <span>09.01.20</span>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex md12 sm12 lg4 pt-0 mt-1>
        <v-card color="#e74c3c" dark class="mb-1">
          <v-card-title class="title font-weight-medium">
            <v-icon class="mr-2">mdi-progress-check</v-icon>
            IN PROGRESS
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex md12 sm12 lg4 pt-0 mt-1>
        <v-card color="#3498db" dark class="mb-1">
          <v-card-title class="title font-weight-medium">
            <v-icon class="mr-2">mdi-checkbox-marked-circle</v-icon>
            DONE
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import Cmmn from '../cmmn'

export default {
  components: {
    ...Cmmn,
    draggable
  },
  data: () => ({
    open: ['public'],
    files: {
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-json',
      md: 'mdi-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel'
    },
    tree: [],
    items: [
      {
        sid: 1,
        name: '.git',
        type: 'work',
        path: '',
        edit: false
      },
      {
        sid: 2,
        name: 'node_modules',
        type: 'work',
        path: '',
        edit: true,
        children: [
          {
            sid: 10,
            name: 'testtest',
            type: 'folder',
            path: '',
            edit: false
          }
        ]
      },
      {
        sid: 3,
        name: '전표',
        type: 'work',
        path: '',
        edit: false,
        children: [
          {
            sid: 4,
            name: '템플릿',
            type: 'folder',
            path: '',
            edit: false,
            children: [
              {
                sid: 5,
                name: 'logo.png',
                type: 'png',
                path: '',
                edit: false,
                file: 'png',
                children: []
              }
            ]
          },
          {
            sid: 6,
            name: 'favicon.ico',
            type: 'png',
            path: '',
            edit: false,
            file: 'png',
            children: []
          },
          {
            sid: 7,
            name: 'indexxxxxxxxxxxxxxxxxxxxxxxxxxx.html',
            type: 'html',
            path: '',
            edit: false,
            file: 'html',
            children: []
          }
        ]
      }
    ]
  }),
  mounted() { },
  methods: {
    onResize(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag(x, y) {
      this.x = x
      this.y = y
    },
    handleTreeNameClicked(dataItem) {
      dataItem.edit = !dataItem.edit
    },
    treeMouseOver(evt, display) {
      evt.fromElement.getElementsByTagName('button')[0].style.display = display
    }
  }
}
</script>

<style>
.wtest {
  position: absolute;
  top: 0px;
  left: 200px;
  right: 0;
  bottom: 0;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 8px; /* 1px wider than Lion. */
  /* This is more usable for users trying to click it. */
  background-color: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar:horizontal {
  height: 8px;
  background-color: rgba(0, 0, 0, 0);
}
/* hover effect for both scrollbar area, and scrollbar 'thumb' */
::-webkit-scrollbar:hover {
  background-color: rgba(0, 0, 0, 0.09);
}

/* The scrollbar 'thumb' ...that marque oval shape in a scrollbar */
::-webkit-scrollbar-thumb {
  /* This is the EXACT color of Mac OS scrollbars. 
     Yes, I pulled out digital color meter */
  background: rgba(43, 52, 56, 0.4);
}
::-webkit-scrollbar-thumb:active {
  background: rgba(0, 0, 0, 0.61); /* Some darker color when you click it */
}
</style>

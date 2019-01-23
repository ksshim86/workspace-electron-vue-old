<template>
  <v-container fill-height fluid grid-list-xl class="pa-0">

    <v-card class="mr-3" min-width="200" width="200" style="height: 100%; overflow-x : auto; position: absolute; white-space: nowrap;">
      <div>
        <v-btn icon small>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <v-divider />

      <!-- 
        min-width: 200px;
    width: 200px;
    height: 100%;
    overflow: auto;
    position: absolute;
    overflow-x: scroll;
    white-space: nowrap;
    
        <v-treeview v-model="tree" :open="open" :items="items" activatable hoverable item-key="sid">
        <template slot="label" slot-scope="{ item, open, leaf }">
          <div v-if="!item.edit">{{item.name}}</div>
          <div v-else-if="item.edit">
            <v-text-field :label="item.name" />
          </div>
        </template>
        <template slot="prepend" slot-scope="{ item, open, leaf }">
          <v-icon v-if="!item.file">
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon>
          <v-icon v-else>
            {{ files[item.file] }}</v-icon>
        </template>
        <template slot="append" slot-scope="{ item, open, leaf, selected, indeterminate }">
          <v-btn icon small class="ml-0">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
      </v-treeview> -->
      <w-tree-view></w-tree-view>
    </v-card>
    <v-layout wrap wtest class="ma-0" style="height: 99.5%;">
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
        sid: 0,
        name: '.git',
        edit: false
      },
      {
        sid: 1,
        name: 'node_modules',
        edit: true
      },
      {
        sid: 2,
        name: '전표',
        edit: false,
        children: [
          {
            sid: 3,
            name: '템플릿',
            edit: false,
            children: [
              {
                sid: 4,
                name: 'logo.png',
                file: 'png'
              }
            ]
          },
          {
            sid: 5,
            name: 'favicon.ico',
            edit: false,
            file: 'png'
          },
          {
            sid: 6,
            name: 'index.html',
            edit: false,
            file: 'html'
          }
        ]
      }
    ]
  }),
  mounted() {
    console.log(this.$vuetify.breakpoint)
  },
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
  -webkit-border-radius: 100px;
}

::-webkit-scrollbar:horizontal {
  height: 8px;
  background-color: rgba(0, 0, 0, 0);
  -webkit-border-radius: 100px;
}
/* hover effect for both scrollbar area, and scrollbar 'thumb' */
::-webkit-scrollbar:hover {
  background-color: rgba(0, 0, 0, 0.09);
}

/* The scrollbar 'thumb' ...that marque oval shape in a scrollbar */
::-webkit-scrollbar-thumb {
  /* This is the EXACT color of Mac OS scrollbars. 
     Yes, I pulled out digital color meter */
  background: rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 100px;
}
::-webkit-scrollbar-thumb:active {
  background: rgba(0, 0, 0, 0.61); /* Some darker color when you click it */
  -webkit-border-radius: 100px;
}
</style>

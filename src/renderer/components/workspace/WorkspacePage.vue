<template>
  <!-- <v-flex md12 sm12 lg3 width="200" color="red" class="ma-1">
      <v-card width="200">
        <v-treeview v-model="tree" :open="open" :items="items" activatable item-key="name" open-on-click class="mr-5">
          <template slot="prepend" slot-scope="{ item, open, leaf }">
            <v-icon v-if="!item.file">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <v-icon v-else>
              {{ files[item.file] }}
            </v-icon>
          </template>
        </v-treeview>
      </v-card>
    </v-flex> -->

  <v-container fill-height fluid grid-list-xl class="pa-0">
    <v-card class="mr-3" min-width="200" style="height: 100%;">
      <v-treeview v-model="tree" :open="open" :items="items" activatable item-key="name">
        <template slot="prepend" slot-scope="{ item, open, leaf }">
          <v-icon v-if="!item.file">
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon>
          <v-icon v-else>
            {{ files[item.file] }}
          </v-icon>
        </template>
      </v-treeview>
    </v-card>
    <v-layout wrap wtest class="ma-0" style="height: 99.5%;">
      <v-flex md12 sm12 lg4 class="pt-0">
        <v-card color="#27ae60" dark class="mb-1">
          <v-card-title class="title font-weight-medium">
            <v-icon class="mr-2">mdi-card-outline</v-icon>
            TO DO
          </v-card-title>
        </v-card>
        <v-card class="my-2" hover>
          <v-card-title class="py-1">
            <span class="grey--text">VueJS</span>
            <v-divider class="mx-1 white" vertical />
            <span class="font-weight-black">WS-1</span>
            <v-spacer />
            <span>09.01.18</span>
          </v-card-title>
          <v-card-title class="py-1">
            <span class="text-truncate">Workspace layout 작업</span>
          </v-card-title>
          <v-divider/>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
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
            <span>#electron</span>
            <v-spacer />
            <span>09.01.20</span>
          </v-card-title>
          <v-divider/>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex md12 sm12 lg4 class="pt-0">
        <v-card color="#e74c3c" dark class="mb-1">
          <v-card-title class="title font-weight-medium">
            <v-icon class="mr-2">mdi-progress-check</v-icon>
            IN PROGRESS
          </v-card-title>
        </v-card>
        <v-card class="my-2">
          <v-card-title class="py-1">
            <span class="grey--text">VueJS</span>
            <v-divider class="mx-1 white" vertical />
            <span class="font-weight-black">WS-1</span>
            <v-spacer />
            <span>09.01.18</span>
          </v-card-title>
          <v-card-title class="py-1">
            <span class="">Workspace layout 작업Workspace layout 작업Workspace layout 작업</span>
          </v-card-title>
          <v-divider/>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex md12 sm12 lg4 class="pt-0">
        <v-card color="#3498db" dark class="mb-1">
          <v-card-title class="title font-weight-medium">
            <v-icon class="mr-2">mdi-checkbox-marked-circle</v-icon>
            DONE
          </v-card-title>
        </v-card>
        <v-card dark>
          <v-img class="white--text" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Top 10 Australian beaches</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <div>
              <span class="grey--text">Number 10</span><br>
              <span>Whitehaven Beach</span><br>
              <span>Whitsunday Island, Whitsunday Islands</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
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
        name: '.git'
      },
      {
        name: 'node_modules'
      },
      {
        name: 'public',
        children: [
          {
            name: 'static',
            children: [
              {
                name: 'logo.png',
                file: 'png'
              }
            ]
          },
          {
            name: 'favicon.ico',
            file: 'png'
          },
          {
            name: 'index.html',
            file: 'html'
          }
        ]
      },
      {
        name: '.gitignore',
        file: 'txt'
      },
      {
        name: 'babel.config.js',
        file: 'js'
      },
      {
        name: 'package.json',
        file: 'json'
      },
      {
        name: 'README.md',
        file: 'md'
      },
      {
        name: 'vue.config.js',
        file: 'js'
      },
      {
        name: 'yarn.lock',
        file: 'txt'
      }
    ],
    bread: [
      {
        text: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard'
      },
      {
        text: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1'
      },
      {
        text: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2'
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
    }
  }
}
</script>

<style>
.wtest {
  position: absolute;
  top: 9px;
  left: 208px;
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
/* hover effect for both scrollbar area, and scrollbar 'thumb' */
::-webkit-scrollbar:hover {
  background-color: rgba(0, 0, 0, 0.09);
}

/* The scrollbar 'thumb' ...that marque oval shape in a scrollbar */
::-webkit-scrollbar-thumb:vertical {
  /* This is the EXACT color of Mac OS scrollbars. 
     Yes, I pulled out digital color meter */
  background: rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 100px;
}
::-webkit-scrollbar-thumb:vertical:active {
  background: rgba(0, 0, 0, 0.61); /* Some darker color when you click it */
  -webkit-border-radius: 100px;
}
</style>

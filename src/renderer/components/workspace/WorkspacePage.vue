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

  <v-container fill-height fluid grid-list-xl class="pa-2">
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
    <v-layout wrap>
      <v-flex md12 sm12 lg4>
        <v-card class="mr-3 pa-1" min-width="350" style="height: 100%;">

          <v-card class="ma-1" dark min-width="300">
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
          <v-card class="ma-1" dark min-width="300">
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

        </v-card>
      </v-flex>
      <v-flex md12 sm12 lg4>
        <v-card class="mr-3" style="height: 100%;" min-width="350">
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
      </v-flex>
      <v-flex md12 sm12 lg4>
        <v-card class="mr-3" style="height: 100%;" min-width="350">
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Cmmn from '../cmmn'

export default {
  components: {
    ...Cmmn
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
</style>

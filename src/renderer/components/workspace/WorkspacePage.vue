<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout justify-start row fill-height wrap>
      <v-layout class="ma-2">
        <v-card >
          <v-card-title>TODO</v-card-title>
          <v-divider/>
          <v-card-text>
            <v-treeview
              v-model="tree"
              :open="open"
              :items="items"
              activatable
              item-key="name"
              open-on-click
              class="mr-5"
            >
              <template slot="prepend" slot-scope="{ item, open, leaf }">
                <v-icon v-if="!item.file">
                  {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                </v-icon>
                <v-icon v-else>
                  {{ files[item.file] }}
                </v-icon>
              </template>
            </v-treeview>
          </v-card-text>
        </v-card>
      </v-layout>
      <v-layout class="ma-2">
        <v-card>
          <v-card-title>TODO</v-card-title>
          <v-divider/>
          <v-card-text>
            <v-treeview
              v-model="tree"
              :open="open"
              :items="items"
              activatable
              item-key="name"
              open-on-click
              class="mr-5"
            >
              <template slot="prepend" slot-scope="{ item, open, leaf }">
                <v-icon v-if="!item.file">
                  {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                </v-icon>
                <v-icon v-else>
                  {{ files[item.file] }}
                </v-icon>
              </template>
            </v-treeview>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-layout>
  </v-container>
<!--
  <v-layout fill-height>
    <div style="background-color: red; width: 300px;">
      <v-navigation-drawer permanent :mini-variant="navigation.miniVariant">
        <v-toolbar class="transparent" flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                Workspace
              </v-list-tile-title>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-group v-for="item in items" :key="item.title" v-model="item.active" no-action>
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="subItem in item.items" :key="subItem.title">
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-toolbar>
      </v-navigation-drawer>
    </div>
    <v-layout column style="background-color: blue; height: 100%;">
      <v-toolbar dense></v-toolbar>
      <v-layout row style="backgroun-color: yellow;">
        <v-flex only-lg4 style="background-color: gray;">
        </v-flex>
        <v-flex only-lg4 style="background-color: white;">
        </v-flex>
        <v-flex only-lg4 style="background-color: gray;">
        </v-flex>
      </v-layout>
    </v-layout>
  </v-layout>
  -->
<!--   
  <v-layout row fill-height style="background-color: red;">
    <v-navigation-drawer permanent :mini-variant="navigation.miniVariant">
      <v-toolbar class="transparent" flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Workspace
            </v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" :key="subItem.title">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-toolbar>
    </v-navigation-drawer>
    <v-layout column style="background-color: green;">
      <v-toolbar></v-toolbar>
      <v-layout row wrap style="backgroun-color: yellow;">
        <v-flex lg4 style="background-color: gray;">
        </v-flex>
        <v-flex lg4 style="background-color: white;">
        </v-flex>
        <v-flex lg4 style="background-color: gray;">
        </v-flex>
      </v-layout>
    </v-layout>
  </v-layout>
   -->
</template>

<script>
import Cmmn from '../cmmn'

export default {
  components: {
    ...Cmmn
  },
  // data() {
  //   return {
  //     navigation: {
  //       width: 250,
  //       miniVariant: false
  //     },
  //     items: [
  //       {
  //         action: 'local_activity',
  //         title: 'Attractions',
  //         items: [{ title: 'List Item', action: 'local_activity' }]
  //       },
  //       {
  //         action: 'restaurant',
  //         title: 'Dining',
  //         active: true,
  //         items: [{ title: 'Breakfast & brunch' }, { title: 'New American' }, { title: 'Sushi' }]
  //       },
  //       {
  //         action: 'school',
  //         title: 'Education',
  //         items: [{ title: 'List Item' }]
  //       },
  //       {
  //         action: 'directions_run',
  //         title: 'Family',
  //         items: [{ title: 'List Item' }]
  //       },
  //       {
  //         action: 'healing',
  //         title: 'Health',
  //         items: [{ title: 'List Item' }]
  //       },
  //       {
  //         action: 'content_cut',
  //         title: 'Office',
  //         items: [{ title: 'List Item' }]
  //       },
  //       {
  //         action: 'local_offer',
  //         title: 'Promotions',
  //         items: [{ title: 'List Item' }]
  //       }
  //     ]
  //   }
  // },
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

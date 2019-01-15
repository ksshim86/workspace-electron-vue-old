<template>
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
        <v-flex sm12 md4 style="background-color: gray;"></v-flex>
        <v-flex sm12 md4 style="background-color: white;"></v-flex>
        <v-flex sm12 md4 style="background-color: gray;"></v-flex>
      </v-layout>
    </v-layout>
    <!-- 
      <v-flex row sm12 md4 style="background-color: gray;"></v-flex>
      <v-flex row sm12 md4 style="background-color: white;"></v-flex>
      <v-flex row sm12 md4 style="background-color: gray;"></v-flex>
     -->
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      navigation: {
        width: 250,
        miniVariant: false
      },
      items: [
        {
          action: 'local_activity',
          title: 'Attractions',
          items: [{ title: 'List Item', action: 'local_activity' }]
        },
        {
          action: 'restaurant',
          title: 'Dining',
          active: true,
          items: [{ title: 'Breakfast & brunch' }, { title: 'New American' }, { title: 'Sushi' }]
        },
        {
          action: 'school',
          title: 'Education',
          items: [{ title: 'List Item' }]
        },
        {
          action: 'directions_run',
          title: 'Family',
          items: [{ title: 'List Item' }]
        },
        {
          action: 'healing',
          title: 'Health',
          items: [{ title: 'List Item' }]
        },
        {
          action: 'content_cut',
          title: 'Office',
          items: [{ title: 'List Item' }]
        },
        {
          action: 'local_offer',
          title: 'Promotions',
          items: [{ title: 'List Item' }]
        }
      ]
    }
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

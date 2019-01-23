<template>
  <w-node :items="items" :depth="rootDepth">
  </w-node>
</template>

<script>
import draggable from 'vuedraggable'
import WNode from './WNode'

export default {
  name: 'WTreeView',
  components: { draggable, WNode },
  data() {
    return {
      rootDepth: 0,
      items: {
        sid: 0,
        name: '1',
        children: [
          { sid: 1, name: '1-1', children: [] },
          { sid: 2, name: '1-2', children: [] },
          {
            sid: 3,
            name: '1-3',
            children: [
              {
                sid: 4,
                name: '1-3-1',
                children: [
                  { sid: 5, name: '1-3-1-1', children: [] },
                  { sid: 6, name: '1-3-1-2', children: [] }
                ]
              },
              { sid: 7, name: '1-3-2', children: [] },
              { sid: 8, name: '1-3-3', children: [] },
              {
                sid: 9,
                name: '1-3-4',
                children: [
                  { sid: 10, name: '1-3-4-1', children: [] },
                  { sid: 11, name: '1-3-4-2-2-2-2-2-2-2', children: [] }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
</style>

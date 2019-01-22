<template>
  <div>
    <ul>
      <w-node :items="items">
      </w-node>
    </ul>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import WNode from './WNode'

export default {
  name: 'WTreeView',
  components: { draggable, WNode },
  data() {
    return {
      items: {
        sid: 0,
        name: 'My Tree',
        children: [
          { sid: 1, name: 'hello' },
          { sid: 2, name: 'wat' },
          {
            sid: 3,
            name: 'child folder',
            children: [
              {
                sid: 4,
                name: 'child folder',
                children: [{ sid: 5, name: 'hello' }, { sid: 6, name: 'wat' }]
              },
              { sid: 7, name: 'hello' },
              { sid: 8, name: 'wat' },
              {
                sid: 9,
                name: 'child folder',
                children: [{ sid: 10, name: 'hello' }, { sid: 11, name: 'wat' }]
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

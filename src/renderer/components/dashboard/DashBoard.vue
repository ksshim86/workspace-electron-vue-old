<template>
  <div class="wrapper">
    <div v-if="workspace.isEmpty">
      <div class="container">
        <div class="root-folder" @click="handleFolderClicked">
          <font-awesome-icon class="fa-folder" icon="folder" size="8x" />
          <font-awesome-icon class="fa-folder-open" :icon="faFolderOpen" size="8x" />
        </div>
      </div>
      <div class="notice">
        <!-- <h4>WorkUp 폴더를 지정하세요.</h4>
        <h4><small>업무와 관련된 폴더, 파일 등을 관리하기 위한 시작입니다.</small></h4> -->
      </div>
    </div>
    <div v-else>sd</div>
  </div>
</template>

<script>
import Cmmn from '@/components/cmmn'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'DashBoard',
  components: {
    ...Cmmn
  },
  computed: {
    faFolderOpen() {
      return faFolderOpen
    }
  },
  data() {
    return {
      isStatus: true,
      workspace: {
        isEmpty: false
      }
    }
  },
  mounted() {
    this.$electron.ipcRenderer.on('root-folder', (event, data) => {
      this.isStatus = !this.isStatus
      this.workspace.isEmpty = false
    })
  },
  methods: {
    handleFolderClicked() {
      let rootPath = ''

      if (this.isStatus) {
        this.isStatus = !this.isStatus
        this.$electron.ipcRenderer.send('root-folder', '')
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
  height: 50%;
}
.root-folder {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.notice {
  padding-top: 2em;
  text-align: center;
  height: 50%;
}

.root-folder > svg {
  cursor: pointer;
}

.root-folder:active .fa-folder,
.root-folder .fa-folder-open {
  display: none;
}
.root-folder:active .fa-folder-open {
  display: block;
}
</style>

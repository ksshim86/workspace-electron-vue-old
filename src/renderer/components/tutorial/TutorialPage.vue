<template>
  <div class="wrapper">
    <div class="container">
      <b-alert
        class="fixed-top"
        :show="dismissCountDown"
        dismissible
        fade
        variant="primary"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        Workspace가 설정되었습니다.
      </b-alert>
      <b-card class="text-center" v-if="firstStep">
        <b-card-body>
          <h4 class="card-title">Special title treatment</h4>
          <p class="card-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <a href="#" class="btn btn-primary" @click="handleNextStepClicked">시작하기</a>
        </b-card-body>
      </b-card>
      <b-card class="text-center" v-if="secondStep">
        <b-card-body>
          <h4 class="card-title">Workspace 설정</h4>
          <p class="card-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <b-button variant="primary" @click="handleWorkspaceSettingClicked"
            ><font-awesome-icon class="fa-folder-open" :icon="faFolderOpen" /> 설정하기</b-button
          >
        </b-card-body>
      </b-card>
      <b-card class="text-center" v-if="thirdStep">
        <b-card-body>
          <h4 class="card-title">Workspace 설정</h4>
          <b-nav class="d-flex justify-content-center">
            <ol class="breadcrumb" v-html="nav"></ol>
          </b-nav>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'

export default {
  data() {
    return {
      step: 1,
      nav: '',
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      splitPaths: []
    }
  },
  computed: {
    firstStep() {
      return this.step === 1
    },
    secondStep() {
      return this.step === 2
    },
    thirdStep() {
      return this.step === 3
    },
    faFolderOpen() {
      return faFolderOpen
    }
  },
  beforeCreate() {
    // this.$electron.ipcRenderer.on('recv-workspace-path-save', (event, data) => {
    // })
  },
  methods: {
    handleNextStepClicked() {
      this.step++
    },
    handleWorkspaceSettingClicked() {
      let result = ''

      result = this.$electron.ipcRenderer.sendSync('send-workspace-path-save', '')

      if ('' !== result) {
        // this.step++

        this.splitPaths = this.parsingPath(result)

        this.showNavByWorkspacePath(splitPaths)

        this.showAlert()
      }
    },
    showNavByWorkspacePath(splitPaths) {
      this.nav = `<b-nav-item class="breadcrumb-item"><a href="#">C</a></b-nav-item>
                <b-nav-item class="breadcrumb-item"><a href="#">Work</a></b-nav-item>
                <b-nav-item class="breadcrumb-item"><a href="#"></a></b-nav-item>`
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    parsingPath(path = '') {
      let result = []

      result = path.split('\\')

      return result
    }
  }
}
</script>

<style scoped></style>

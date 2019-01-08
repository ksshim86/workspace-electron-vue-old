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
        <span class="icon-info-circled alert-icon-float-left"></span>
        Workspace가 설정되었습니다.
      </b-alert>
      <b-card class="text-center" v-if="firstStep">
        <b-card-body>
          <h4 class="card-title">Workspace 시작</h4>
          <p class="card-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
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
          <h4 class="card-title">Workspace</h4>
          <b-nav class="d-flex justify-content-center">
            <ol class="breadcrumb" v-html="navItemHtml"></ol>
          </b-nav>
          <p class="card-text">이제부터 이 경로 하위로 폴더/파일들이 관리됩니다.</p>
          <b-button variant="primary" @click="handleNextStepClicked">Work 만들기</b-button>
        </b-card-body>
      </b-card>
      <b-card class="text-center" v-if="fourthStep">
        <b-card-body>
          <h4 class="card-title">Workspace</h4>
          <b-nav class="d-flex justify-content-center">
            <ol class="breadcrumb" v-html="navItemHtml"></ol>
          </b-nav>
          <p class="card-text">이제부터 이 경로 하위로 폴더/파일들이 관리됩니다.</p>
        </b-card-body>
      </b-card>
      <div v-if="fourthStep" style="display: flex; height: 30px; width: 50%; border-right: 1px solid red;"></div>
      <b-card class="text-center" v-if="fourthStep">
        <b-card-body>
          <h4 class="card-title">Work</h4>
          <b-input-group prepend="Name" class="mb-3">
            <b-form-input></b-form-input>
          </b-input-group>
          <b-input-group prepend="Key" class="mb-3">
            <b-form-input></b-form-input>
          </b-input-group>
          <b-button variant="primary">Work 생성</b-button>
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
      navItemHtml: '',
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
    fourthStep() {
      return this.step === 4
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
        this.step++

        this.splitPaths = this.parsingPath(result)

        this.showNavByWorkspacePath()

        this.showAlert()
      }
    },
    showNavByWorkspacePath() {
      for (let i=0; i<this.splitPaths.length; i++) {
        this.navItemHtml += `<b-nav-item class="breadcrumb-item"><a href="#">${this.splitPaths[i]}</a></b-nav-item>`
      }

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

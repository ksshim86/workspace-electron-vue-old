<template>
  <v-container fill-height>
    <v-layout
      align-center
      justify-center
      row
      fill-height
    >
      <v-flex lg12>
        <v-card>
          <v-card-title>
            <div>
              <h3 class="headline mb-0">
                시작하기
              </h3>
              <div>
                Located two hours south of Sydney in the Southern Highlands of New South Wales, ...Located two hours south of Sydney in the Southern Highlands of New South Wales, ...
                <br>Located two hours south of Sydney in the Southern Highlands of New South Wales, ...
              </div>
            </div>
          </v-card-title>
          <v-card-text>
            <v-btn
              block
              dark
              @click="workspaceSetting"
            >
              Workspace 설정
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ snackbarText }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  data() {
    return {
      snackbar: false,
      y: 'bottom',
      x: 'right',
      mode: '',
      timeout: 3000,
      text: "Hello, I'm a snackbar",
      workspacePath: ''
    }
  },
  computed: {
    snackbarText() {
      return 'Workspace가 설정되었습니다.'
    }
  },
  methods: {
    workspaceSetting() {
      this.workspacePath = ipcRenderer.sendSync('send-workspace-path-save')

      this.snackbar = !this.snackbar

      this.$router.push('workspace')
    }
  }
}
</script>

<style>
</style>

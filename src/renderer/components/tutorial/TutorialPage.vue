<template>
  <v-container fill-height>
    <v-layout align-center justify-center row fill-height>
      <v-flex lg12>
        <v-card>
          <v-card-title>
            <div>
              <h3 class="headline mb-0">시작하기</h3>
              <div>Located two hours south of Sydney in the Southern Highlands of New South Wales, ...Located two hours south of Sydney in the Southern Highlands of New South Wales, ...
                <br>Located two hours south of Sydney in the Southern Highlands of New South Wales, ...
              </div>
            </div>
          </v-card-title>
          <v-card-text>
            <v-btn block color="primary" dark @click="workspaceSetting">
              Workspace 설정
            </v-btn>
          </v-card-text>

          <!-- <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
            {{ text }}
            <v-btn color="pink" flat @click="snackbar = false">
              Close
            </v-btn>
          </v-snackbar> -->
        </v-card>
      </v-flex>
    </v-layout>
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
      timeout: 6000,
      text: "Hello, I'm a snackbar"
    }
  },
  mounted() {
    ipcRenderer.on('recv-workspace-path-save', (event, data) => {
      console.log(`workspace-path: ${data}`)
    })
  },
  methods: {
    workspaceSetting() {
      ipcRenderer.send('send-workspace-path-save', 'pong')
    }
  }
}
</script>

<style>
</style>

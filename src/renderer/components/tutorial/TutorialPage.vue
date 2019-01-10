<template>
  <div>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-card-text>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12 sm3>
                <v-checkbox
                  v-model="x"
                  label="Left"
                  value="left"
                ></v-checkbox>
              </v-flex>

              <v-flex xs6 sm3>
                <v-checkbox
                  v-model="x"
                  label="Right"
                  value="right"
                ></v-checkbox>
              </v-flex>

              <v-flex xs6 sm3>
                <v-checkbox
                  v-model="y"
                  label="Top"
                  value="top"
                ></v-checkbox>
              </v-flex>

              <v-flex xs6 sm3>
                <v-checkbox
                  v-model="y"
                  label="Bottom"
                  value="bottom"
                ></v-checkbox>
              </v-flex>

              <v-flex xs12 sm3>
                <v-checkbox
                  v-model="mode"
                  label="Multi-line (mobile)"
                  value="multi-line"
                ></v-checkbox>
              </v-flex>

              <v-flex xs12 sm3>
                <v-checkbox
                  v-model="mode"
                  label="Vertical (mobile)"
                  value="vertical"
                ></v-checkbox>
              </v-flex>

              <v-flex xs12 sm4 offset-sm4>
                <v-text-field
                  v-model="text"
                  label="Text"
                  type="text"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm4>
                <v-text-field
                  v-model.number="timeout"
                  label="Timeout"
                  type="number"
                ></v-text-field>
              </v-flex>
            </v-layout>

          </v-container>
          <v-btn
            block
            color="primary"
            dark
            @click="snackbar = true"
          >
            Show Snackbar
          </v-btn>
        </v-card-text>

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
          {{ text }}
          <v-btn
            color="pink"
            flat
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
      </v-card>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
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
  }
}
</script>

<style>
</style>

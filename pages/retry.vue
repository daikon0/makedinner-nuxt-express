<template>
  <v-app>
    <div>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="7">
            <v-alert
              class="ma-8"
              icon="mdi-shield-lock-outline"
              text
              outlined
              type="error"
              prominent
              elevation="10"
            >
              username または password が違います
            </v-alert>
            <div class="ma-10 pt-10">
              <v-btn block color="info" dark elevation="15" to="/">
                やり直す
                <v-icon>mdi-replay</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'signout',
  created() {
    this.$store.dispatch('setTitle', 'Not Found')
  }
})
</script>

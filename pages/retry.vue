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
            <div class="ma-8 pt-8">
              <v-btn block color="info" dark elevation="10" to="/signin">
                やり直す
              </v-btn>
            </div>
            <div class="ma-8 pt-3">
              <v-btn block color="indigo" dark to="/" elevation="10">
                TOPへ戻る
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'signout'
}
</script>

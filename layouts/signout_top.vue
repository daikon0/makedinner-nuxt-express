<template>
  <v-app>
    <v-card class="overflow-hidden" min-height="650">
      <div>
        <v-app-bar fixed color="info" dark>
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
          <v-toolbar-title>{{ $store.state.title }}</v-toolbar-title>
        </v-app-bar>
      </div>
      <div class="top"></div>
      <nuxt />

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item to="/">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>ホーム</v-list-item-title>
            </v-list-item>

            <v-list-item to="/login">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>ログイン</v-list-item-title>
            </v-list-item>

            <form action="/routes/auth/local" method="post">
              <button type="hidden">
                <input type="hidden" name="username" value="GuestUser" />
                <input type="hidden" name="password" value="GuestPass" />
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-shield-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    ゲストユーザーでログイン
                  </v-list-item-title>
                </v-list-item>
              </button>
            </form>

            <v-list-item to="/register">
              <v-list-item-icon>
                <v-icon>mdi-account-plus-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>新規登録</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    drawer: false,
    group: ''
  })
})
</script>

<style>
.top {
  height: 56px;
}
</style>

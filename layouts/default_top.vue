<template>
  <v-app>
    <v-card class="overflow-hidden" min-height="650">
      <div>
        <v-app-bar fixed color="info" dark>
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
          <v-toolbar-title>{{ $store.state.title }}</v-toolbar-title>
        </v-app-bar>
      </div>
      <div class="fix"></div>
      <nuxt />

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item to="/mypage">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>ホーム</v-list-item-title>
            </v-list-item>

            <v-list-item to="/mypage/menu">
              <v-list-item-icon>
                <v-icon>mdi-book-open-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>メニュー</v-list-item-title>
            </v-list-item>

            <v-list-item to="/mypage/createDish">
              <v-list-item-icon>
                <v-icon>mdi-pencil-plus-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>料理を登録する</v-list-item-title>
            </v-list-item>

            <v-list-item to="/mypage/selectGenre">
              <v-list-item-icon>
                <v-icon>mdi-food-fork-drink</v-icon>
              </v-list-item-icon>
              <v-list-item-title>夕飯を決める</v-list-item-title>
            </v-list-item>

            <v-list-item to="/mypage/rakuten">
              <v-list-item-icon>
                <v-icon>mdi-magnify</v-icon>
              </v-list-item-icon>
              <v-list-item-title>他のレシピを見る</v-list-item-title>
            </v-list-item>

            <v-list-item to="/mypage/oneDish">
              <v-list-item-icon>
                <v-icon>mdi-noodles</v-icon>
              </v-list-item-icon>
              <v-list-item-title>お手軽献立</v-list-item-title>
            </v-list-item>

            <v-list-item to="/mypage/memo">
              <v-list-item-icon>
                <v-icon>mdi-note-text-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>メモを見る</v-list-item-title>
            </v-list-item>

            <v-list-item @click="signout">
              <v-list-item-icon>
                <v-icon>mdi-account-arrow-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>ログアウト</v-list-item-title>
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
  }),
  methods: {
    async signout() {
      await this.$axios.post('/routes/signout')
      this.$router.push('/')
    }
  }
})
</script>

<style>
#top {
  margin-left: auto;
}
.fix {
  height: 56px;
}
</style>

<template>
  <v-app>
    <v-card class="overflow-hidden" min-height="650">
      <v-app-bar color="info" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Make Dinner</v-toolbar-title>
      </v-app-bar>
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
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>メニュー</v-list-item-title>
            </v-list-item>

            <v-list-item to="/mypage/selectGenre">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>夕飯を決める</v-list-item-title>
            </v-list-item>

            <v-list-item to="/mypage/createDish">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>料理を登録する</v-list-item-title>
            </v-list-item>

            <v-list-item to="/mypage/rakuten">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>他のレシピを見る</v-list-item-title>
            </v-list-item>

            <v-list-item @click="signout">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>ログアウト</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-app>
</template>

<script>
export default {
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
}
</script>

<!-- <div>
    <nav class="navbar navvbar-light bg-light">
      <div class="navbar-header">
        <nuxt-link to="/mypage" class="navbar-brand nav-link">
          Makedinner
        </nuxt-link>
      </div>
    </nav>
    <nuxt />
  </div> -->

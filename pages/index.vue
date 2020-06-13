<template>
  <v-app>
    <div>
      <v-img :src="require('@/assets/foodlbg.jpg')" height="300px">
        <div id="title" class="text-center title">
          <p class="mt-12 display-1 white--text">
            今晩の献立
            <br />
            Make Dinner
          </p>
        </div>
        <div>
          <div id="btn" class="text-center">
            <v-btn class="mx-9" to="/register">新規登録</v-btn>
            <v-btn class="mx-9" to="/login">ログイン</v-btn>
          </div>
          <div id="btn" class="text-center">
            <form action="/routes/auth/local" method="post">
              <input type="hidden" name="username" value="GuestUser" />
              <input type="hidden" name="password" value="GuestPass" />
              <input type="hidden" name="_csrf" :value="csrf" />
              <v-btn class="mt-9" tile large type="submit">
                <v-icon>mdi-shield-account</v-icon>
                ゲストユーザーでログイン
              </v-btn>
            </form>
          </div>
        </div>
      </v-img>
    </div>
    <v-container fluid>
      <v-row justify="center">
        <v-col class="mx-6" cols="12" md="5" sm="8">
          <v-card class="mt-5" elevation="5">
            <v-list-item three-line>
              <v-list-item-content>
                <p class="title my-1 text-justify">
                  レシピを探す！
                </p>
                <p class="text--secondary">
                  様々なカテゴリーの料理を準備しております。
                  <br />
                  日々、新しい料理を発見していただけます。
                </p>
              </v-list-item-content>
              <v-list-item-avatar tile size="180" color="grey">
                <img :src="require('@/assets/display.jpg')" />
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col class="mx-6" cols="12" md="5" sm="8">
          <v-card class="mt-5" elevation="5">
            <v-list-item three-line>
              <v-list-item-content>
                <p class="title my-1 text-justify">
                  献立を決める！
                </p>
                <p class="text--secondary">
                  登録した料理から献立をご提案します。
                  <br />
                  和・洋・中から選択していただけます。
                </p>
              </v-list-item-content>
              <v-list-item-avatar tile size="180" color="grey">
                <img :src="require('@/assets/pick.png')" />
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'signout',
  async asyncData({ app }) {
    const csrf = await app.$axios.$get('/routes/csrf')
    return {
      csrf
    }
  },
  data() {
    return {
      csrf: ''
    }
  },
  created() {
    this.$store.dispatch('setTitle', '今晩の献立　Make Dinner')
  }
}
</script>

<style>
#title {
  opacity: 0.9;
}
#btn {
  opacity: 0.5;
}
</style>

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
        <Topinformation
          title="レシピを探す！"
          subtitle="様々なカテゴリーの料理を準備しております。"
          undersubtitle="日々、新しい料理を発見していただけます。"
          image="display.jpg"
        />
        <Topinformation
          title="献立を決める！"
          subtitle="登録した料理から献立をご提案します。"
          undersubtitle="和・洋・中から選択していただけます。"
          image="pick.png"
        />
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Topinformation from '@/components/Topinformation.vue'

interface DataType {
  csrf: string
}

export default Vue.extend({
  components: {
    Topinformation
  },
  layout: 'signout',
  async asyncData({ app }) {
    const csrf = await app.$axios.$get('/routes/csrf')
    return {
      csrf
    }
  },
  data(): DataType {
    return {
      csrf: ''
    }
  },
  created() {
    this.$store.dispatch('setTitle', '今晩の献立　Make Dinner')
  }
})
</script>

<style>
#title {
  opacity: 0.9;
}
#btn {
  opacity: 0.5;
}
</style>

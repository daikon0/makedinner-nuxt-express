<template>
  <v-app>
    <div>
      <v-img :src="require('@/assets/bg.jpg')" height="350px">
        <div id="title" class="text-center title">
          <p class="mt-10 display-1 font-weight-bold">
            今晩の献立
            <br />
            Make Dinner
          </p>
        </div>
        <div>
          <div id="btn" class="text-center mt-10">
            <span class="mx-7">
              <v-btn to="/register">新規登録</v-btn>
            </span>
            <span class="mx-7">
              <v-btn to="/login">ログイン</v-btn>
            </span>
          </div>
          <div id="btn" class="text-center mt-4">
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
          image="pick_p.jpg"
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
  layout: 'signout_top',
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
  opacity: 0.8;
}
</style>

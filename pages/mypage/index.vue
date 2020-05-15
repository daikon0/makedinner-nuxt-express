<template>
  <v-app>
    <div v-if="!$store.state.loading" class="container">
      <div>
        <h2>{{ $store.state.user.name }}さん</h2>
      </div>
      <div>
        <v-btn class="my-3" rounded color="info" to="/mypage/createDish">
          料理を追加する
        </v-btn>
      </div>
      <div>
        <v-btn
          class="my-3"
          rounded
          color="info"
          to="/mypage/rakuten"
          @click="submit"
        >
          楽天レシピから料理を見つける
        </v-btn>
      </div>
      <div>
        <v-btn class="my-3" rounded color="info" to="/mypage/selectGenre">
          今日の献立を決める
        </v-btn>
        <div>
          <form action="/routes/signout" method="post">
            <v-btn type="submit" class="my-3" rounded color="info">
              ログアウト
            </v-btn>
          </form>
        </div>
      </div>
    </div>
    <Loading v-if="$store.state.loading" />
  </v-app>
</template>

<script>
import Loading from '@/components/Loading'
export default {
  components: {
    Loading
  },
  created() {
    this.$store.commit('uploadTitle', '今晩の献立　〜Make Dinner〜')
    this.$store.commit('reload')
  },
  methods: {
    submit() {
      this.$store.commit('submit')
    }
  }
}
</script>

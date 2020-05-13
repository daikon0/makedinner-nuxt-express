<template>
  <div>
    <div class="container">
      <div>
        <h2>{{ $store.state.user.name }}さん</h2>
      </div>
      <div>
        <v-btn class="my-3" rounded color="info" to="/mypage/createDish">
          料理を追加する
        </v-btn>
      </div>
      <div>
        <v-btn class="my-3" rounded color="info" to="/mypage/rakuten">
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
              Sign Out
            </v-btn>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('uploadTitle', 'H O M E')
  }
}
</script>

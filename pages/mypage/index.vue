<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col>
          <v-card elevation="5">
            <div v-if="!$store.getters.loading" class="container">
              <p id="name" class="ma-3 title">
                ようこそ、{{ $store.getters.username }}さん
              </p>
              <v-container>
                <v-row justify="center">
                  <Information
                    title="料理一覧"
                    subtitle="自分の料理一覧を表示します。"
                    btn="料理一覧"
                    image="book.jpg"
                    to="/mypage/menu"
                  />

                  <Information
                    title="追加する"
                    subtitle="新しい料理を追加します。"
                    btn="追加する"
                    image="desk.jpg"
                    to="/mypage/createDish"
                  />

                  <Information
                    title="探す"
                    subtitle="他のレシピを探して登録しましょう。"
                    btn="見つける"
                    image="coffee.jpg"
                    to="/mypage/rakuten"
                    @submit="submit"
                  />

                  <Information
                    title="献立"
                    subtitle="自分の料理から今晩の献立を決めましょう。"
                    btn="決める"
                    image="dish.jpg"
                    to="/mypage/selectGenre"
                  />

                  <Information
                    title="メモ"
                    subtitle="お買い物メモ。必要な材料をメモしておきましょう。"
                    btn="メモする"
                    image="note.jpg"
                    to="/mypage/memo"
                  />

                  <Information
                    title="お手軽"
                    subtitle="今日の献立を手軽に済ませたい時に、おすすめの一品レシピを提案します。"
                    btn="見る"
                    image="onedish.jpeg"
                    to="/mypage/oneDish"
                  />
                </v-row>
              </v-container>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Loading v-if="$store.getters.loading" />
  </v-app>
</template>

<script>
import Loading from '@/components/Loading'
import Information from '@/components/Information'
export default {
  components: {
    Loading,
    Information
  },
  created() {
    this.$store.dispatch('setTitle', '今晩の献立　Make Dinner')
    this.$store.dispatch('reset')
  },
  methods: {
    submit() {
      this.$store.dispatch('setLoading')
    }
  }
}
</script>

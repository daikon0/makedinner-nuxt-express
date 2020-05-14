<template>
  <v-app>
    <v-container v-if="!$store.state.loading" fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-btn class="my-3" color="info" to="/mypage/rakuten" @click="submit">
            <v-icon>mdi-keyboard-backspace</v-icon>
            <div class="ma-1">戻る</div>
          </v-btn>
          <v-card class="mt-5">
            <div>
              <v-list rounded subheader>
                <v-subheader>recipes!!</v-subheader>
                <v-list-item
                  v-for="recipe in recipes"
                  :key="recipe.recipeId"
                  class="my-3 text-center"
                  :to="{
                    name: 'mypage-rakuten-categoryId-recipeId',
                    params: {
                      categoryId: $route.params.categoryId,
                      recipeId: recipe.recipeId
                    }
                  }"
                  @click="submit"
                >
                  <v-list-item-avatar size="100">
                    <img :src="recipe.mediumImageUrl" alt="" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      class="title"
                      v-text="recipe.recipeTitle"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Loading v-if="$store.state.loading" />
  </v-app>
</template>

<script>
import Loading from '@/components/Loading'
export default {
  components: {
    Loading
  },
  async asyncData({ app }) {
    const secret = process.env.RAKUTEN_SECRET
    const categoryId = app.context.params.categoryId

    // URLのIDを使い、カテゴリーの名前を取得しtitleに反映させる
    const category = await app.$axios.$get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${secret}&categoryType=large`
    )
    const categories = category.result.large
    const title = categories.filter((item) => {
      if (item.categoryId === categoryId) return true
    })

    const recipe = await app.$axios.$get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${secret}&categoryId=${categoryId}`
    )
    const recipes = recipe.result
    return {
      recipes,
      title: title[0].categoryName
    }
  },
  created() {
    this.$store.commit('uploadTitle', this.title)
    this.$store.commit('reload')
  },
  methods: {
    submit() {
      this.$store.commit('submit')
    }
  }
}
</script>

<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
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
  </v-app>
</template>

<script>
export default {
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
  }
}
</script>

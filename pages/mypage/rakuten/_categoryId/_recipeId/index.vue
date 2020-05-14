<template>
  <v-app>
    <div v-if="!$store.state.loading">
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <v-btn
              class="my-3"
              color="info"
              :to="{
                name: 'mypage-rakuten-categoryId',
                params: {
                  categoryId: $route.params.categoryId
                }
              }"
              @click="submit"
            >
              <v-icon>mdi-keyboard-backspace</v-icon>
              <div class="ma-1">戻る</div>
            </v-btn>
            <v-card>
              <div class="subheading">
                <v-img
                  class="white--text align-end"
                  :src="recipe.mediumImageUrl"
                  max-height="400"
                >
                  <v-card-title v-text="recipe.recipeTitle"></v-card-title>
                </v-img>
              </div>
              <v-card-subtitle
                class="pb-0"
                v-text="recipe.nickname + endname"
              ></v-card-subtitle>
              <v-card-text class="text--primary my-3">
                <div class="mb-3">材料：</div>
                <div>
                  <ul>
                    <li
                      v-for="item in recipe.recipeMaterial"
                      :key="item"
                      class="d-inline-block"
                      v-text="item"
                    ></li>
                  </ul>
                </div>
              </v-card-text>
              <div class="grey lighten-2">
                <v-card-text>
                  <p class="mb-3">コメント：</p>
                  <p class="mb-3" v-text="recipe.recipeDescription"></p>
                </v-card-text>
                <v-btn color="info" rounded class="ma-3">
                  <a
                    :href="recipe.recipeUrl"
                    target="_blank"
                    class="white--text align-end"
                  >
                    レシピを見る
                  </a>
                </v-btn>
                <v-btn
                  color="primary"
                  rounded
                  :to="{
                    name: 'mypage-rakuten-categoryId-recipeId-edit',
                    params: {
                      categoryId: $route.params.categoryId,
                      recipeId: $route.params.recipeId
                    }
                  }"
                  class="ma-3"
                >
                  保存する
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
  async asyncData({ app }) {
    const secret = process.env.RAKUTEN_SECRET
    const categoryId = app.context.params.categoryId
    const recipeId = app.context.params.recipeId
    const categories = await app.$axios.$get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${secret}&categoryId=${categoryId}`
    )
    const recipes = categories.result
    const recipe = recipes.filter((item) => {
      if (item.recipeId === recipeId) return true
    })
    return {
      recipe: recipe[0],
      endname: 'さん'
    }
  },
  created() {
    this.$store.commit('uploadTitle', this.recipe.recipeTitle)
    this.$store.commit('reload')
  },
  methods: {
    submit() {
      this.$store.commit('submit')
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>

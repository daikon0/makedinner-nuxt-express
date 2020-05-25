<template>
  <v-app>
    <v-container v-if="!$store.getters.loading" fluid>
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
    <Loading v-if="$store.getters.loading" />
  </v-app>
</template>

<script>
import Loading from '@/components/Loading'
export default {
  components: {
    Loading
  },
  async asyncData({ app }) {
    const categoryId = app.context.params.categoryId

    const categories = await app.$axios.$get('/routes/rakuten/category', {
      params: {
        categoryId
      }
    })
    const title = categories.filter((item) => {
      if (item.categoryId === categoryId) return true
    })
    const recipes = await await app.$axios.$get('/routes/rakuten/ranking', {
      params: {
        categoryId
      }
    })
    return {
      recipes,
      title: title[0].categoryName
    }
  },
  created() {
    this.$store.dispatch('setTitle', this.title)
    this.$store.dispatch('reset')
  },
  methods: {
    submit() {
      this.$store.dispatch('setLoading')
    }
  }
}
</script>

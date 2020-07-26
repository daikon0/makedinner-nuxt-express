<template>
  <v-app>
    <div v-if="!$store.getters.loading">
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
              <v-list-item>
                <v-list-item-avatar class="my-5" size="100">
                  <img :src="recipe.mediumImageUrl" alt="" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    class="title"
                    v-text="recipe.recipeTitle"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-card-subtitle
                class="pb-0"
                v-text="recipe.nickname + endname"
              ></v-card-subtitle>
              <v-card-text class="text--primary my-3">
                <div class="mb-3">材料：</div>
                <div>
                  <ul>
                    <li
                      v-for="(item, index) in recipe.recipeMaterial"
                      :key="index"
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
                <a
                  :href="recipe.recipeUrl"
                  target="_blank"
                  class="white--text align-end"
                >
                  <v-btn color="info" rounded class="ma-3">
                    レシピを見る
                  </v-btn>
                </a>
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
                  @click="submit"
                >
                  保存する
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <Loading v-if="$store.getters.loading" />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/Loading.vue'

export default Vue.extend({
  components: {
    Loading
  },
  async asyncData({ app }) {
    const categoryId = app.context.params.categoryId
    const recipeId = app.context.params.recipeId
    const recipes = await app.$axios.$get('/routes/rakuten/recipe', {
      params: {
        categoryId
      }
    })
    const recipe = recipes.filter((recipe: any) => {
      if (recipe.recipeId === recipeId) return true
    })
    return {
      recipe: recipe[0],
      endname: 'さん'
    }
  },
  data() {
    return {
      recipe: {
        recipeTitle: ''
      }
    }
  },
  created() {
    this.$store.dispatch('setTitle', this.recipe.recipeTitle)
    this.$store.dispatch('reset')
  },
  methods: {
    submit() {
      this.$store.dispatch('setLoading')
    }
  }
})
</script>

<style>
a {
  text-decoration: none;
}
</style>

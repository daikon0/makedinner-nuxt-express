<template>
  <v-app>
    <v-container v-if="!$store.getters.loading" fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-btn
            class="my-3"
            color="info"
            :to="{
              name: 'mypage-rakuten-categoryId-recipeId',
              params: {
                categoryId: $route.params.categoryId,
                recipeId: recipe.recipeId
              }
            }"
            @click="submit"
          >
            <v-icon>mdi-keyboard-backspace</v-icon>
            <div class="ma-1">戻る</div>
          </v-btn>
          <v-card class="mt-5">
            <div>
              <v-row justify="center">
                <v-col>
                  <v-card-title>料理を登録する</v-card-title>
                  <v-card-text>
                    <v-form ref="test_form">
                      <v-text-field
                        v-model="recipe.recipeTitle"
                        label="料理名"
                        :rules="[required]"
                      ></v-text-field>
                      <v-text-field
                        v-model="recipe.recipeUrl"
                        label="レシピのURL"
                      ></v-text-field>
                      <v-radio-group v-model="dishGenre" row>
                        <v-radio label="和食" value="japan"></v-radio>
                        <v-radio label="洋食" value="western"></v-radio>
                        <v-radio label="中華" value="china"></v-radio>
                      </v-radio-group>
                      <v-radio-group v-model="dishRole" row>
                        <v-radio label="主菜" value="main"></v-radio>
                        <v-radio label="副菜" value="sub"></v-radio>
                        <v-radio label="汁物" value="soup"></v-radio>
                      </v-radio-group>
                    </v-form>
                    <form action="/routes/createDish/rakuten" method="post">
                      <input
                        type="hidden"
                        name="dishName"
                        :value="recipe.recipeTitle"
                      />
                      <input
                        type="hidden"
                        name="dishUrl"
                        :value="recipe.recipeUrl"
                      />
                      <input
                        type="hidden"
                        name="dishFile"
                        :value="recipe.foodImageUrl"
                      />
                      <input
                        type="hidden"
                        name="dishGenre"
                        :value="dishGenre"
                      />
                      <input type="hidden" name="dishRole" :value="dishRole" />
                      <input type="hidden" name="_csrf" :value="csrf" />
                      <v-btn
                        :disabled="
                          !recipe.recipeTitle || !dishGenre || !dishRole
                        "
                        text
                        class="my-5"
                        type="submit"
                      >
                        登録する
                      </v-btn>
                    </form>
                  </v-card-text>
                </v-col>
              </v-row>
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
    const recipeId = app.context.params.recipeId
    const categoryId = app.context.params.categoryId
    const recipes = await app.$axios.$get('/routes/rakuten/recipe/edit', {
      params: {
        categoryId
      }
    })
    const recipe = recipes.filter((item) => {
      if (item.recipeId === recipeId) return true
    })
    const csrf = await app.$axios.$get('/routes/csrf')
    return {
      recipe: recipe[0],
      dishGenre: '',
      dishRole: '',
      csrf,
      required: (value) => !!value || '必ず入力してください'
    }
  },
  created() {
    this.$store.commit('uploadTitle', this.recipe.recipeTitle)
    this.$store.dispatch('reset')
  },
  methods: {
    submit() {
      this.$store.dispatch('setLoading')
    }
  }
}
</script>

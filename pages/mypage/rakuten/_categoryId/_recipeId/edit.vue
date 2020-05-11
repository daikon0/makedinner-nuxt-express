<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
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
                      <v-radio-group v-model="dishGenre" :rules="[reqired]" row>
                        <v-radio label="和食" value="japan"></v-radio>
                        <v-radio label="洋食" value="western"></v-radio>
                        <v-radio label="中華" value="china"></v-radio>
                      </v-radio-group>
                      <v-radio-group v-model="dishRole" :rules="[required]" row>
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
  </v-app>
</template>

<script>
export default {
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
      dishGenre: '',
      dishRole: ''
    }
  }
}
</script>

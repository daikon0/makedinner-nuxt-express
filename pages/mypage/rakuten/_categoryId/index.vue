<template>
  <div>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.recipeId">
        <nuxt-link
          :to="{
            name: 'mypage-rakuten-categoryId-recipeId',
            params: {
              categoryId: $route.params.categoryId,
              recipeId: recipe.recipeId
            }
          }"
        >
          {{ recipe.recipeTitle }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const secret = process.env.RAKUTEN_SECRET
    const categoryId = app.context.params.categoryId
    const recipe = await app.$axios.$get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${secret}&categoryId=${categoryId}`
    )
    const recipes = recipe.result
    return {
      recipes
    }
  }
}
</script>

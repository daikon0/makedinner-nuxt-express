<template>
  <div>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.recipeId">
        <img :src="recipe.foodImageUrl" />
        {{ recipe.recipeTitle }}
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

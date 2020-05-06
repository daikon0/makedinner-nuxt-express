<template>
  <div>
    <div>{{ recipe.recipeTitle }}</div>
  </div>
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
      recipe: recipe[0]
    }
  }
}
</script>

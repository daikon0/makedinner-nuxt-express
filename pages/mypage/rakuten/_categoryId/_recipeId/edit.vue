<template>
  <div>
    <div class="container">
      <h1>料理を追加する</h1>
      <form action="/createDish" method="post" class="form-group">
        <div>
          <label>料理名</label>
          <input type="text" name="dishName" :value="recipe.recipeTitle" />
        </div>
        <div>
          <label>レシピURL</label>
          <input type="text" name="dishUrl" :value="recipe.recipeUrl" />
        </div>
        <div>
          <input type="hidden" name="dishFile" :value="recipe.foodImageUrl" />
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="genre"
              value="japan"
              autocomplete="off"
              checked
            />
            和食
          </label>
          <label>
            <input type="radio" name="genre" autocomplete="off" value="china" />
            中華
          </label>
          <label>
            <input
              type="radio"
              name="genre"
              autocomplete="off"
              value="western"
            />
            洋食
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="main"
              autocomplete="off"
              checked
            />
            主菜
          </label>
          <label>
            <input type="radio" name="role" value="sub" autocomplete="off" />
            副菜
          </label>
          <label>
            <input type="radio" name="role" value="soup" autocomplete="off" />
            汁物
          </label>
        </div>
        <button type="submit">料理を登録</button>
      </form>
    </div>
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

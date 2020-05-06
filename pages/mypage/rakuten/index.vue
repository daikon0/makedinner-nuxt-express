<template>
  <div>
    <div>
      <ul>
        <li v-for="category in categories" :key="category.categoryId">
          <nuxt-link
            :to="{
              name: 'mypage-rakuten-categoryId',
              params: { categoryId: category.categoryId }
            }"
          >
            {{ category.categoryName }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

//
<script>
export default {
  async asyncData({ app }) {
    const secret = process.env.RAKUTEN_SECRET
    const category = await app.$axios.$get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${secret}&categoryType=large`
    )
    const categories = category.result.large
    return {
      categories
    }
  }
}
</script>

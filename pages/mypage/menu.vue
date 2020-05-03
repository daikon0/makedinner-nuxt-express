<template>
  <div>
    <ul>
      <li v-for="dish in dishes" :key="dish.dishId">
        <span>{{ dish.dishName }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const dishes = await app.$axios.$get('/mypage/menu')
    return {
      dishes
    }
  }
}
</script>

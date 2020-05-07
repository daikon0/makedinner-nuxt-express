<template>
  <div>
    <ul>
      <li v-for="dish in dishes" :key="dish.dishId">
        <span>{{ dish.dishName }}</span>
        <nuxt-link
          :to="{ name: 'mypage-menu-dishId', params: { dishId: dish.dishId } }"
        >
          {{ dish.dishId }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const dishes = await app.$axios.$get('/routes/mypage/menu')
    return {
      dishes
    }
  }
}
</script>

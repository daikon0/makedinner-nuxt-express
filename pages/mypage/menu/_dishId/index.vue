<template>
  <div>
    <div>
      {{ $route.params.dishId }}
    </div>
    <div>
      {{ dish.dishName }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const dishId = app.context.params.dishId
    const dish = await app.$axios.$get(`/mypage/menu/${dishId}`)
    return {
      dish
    }
  }
}
</script>

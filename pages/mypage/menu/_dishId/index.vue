<template>
  <div>
    <div>
      {{ dish.dishName }}
    </div>
    <div>
      <nuxt-link
        :to="{
          name: 'mypage-menu-dishId-edit',
          params: { dishId: dish.dishId }
        }"
      >
        編集する
      </nuxt-link>
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

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
      <button type="submit" @click="deleteDish">削除する</button>
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
  },
  methods: {
    async deleteDish() {
      const id = this.$store.$router.app.context.params.dishId
      await this.$store.$router.app.$axios
        .$post(`/mypage/menu/${id}/delete`)
        .then(() => {
          this.$router.push('/mypage/menu')
        })
        .then(() => {
          this.$router.push('/mypage/menu')
        })
    }
  }
}
</script>

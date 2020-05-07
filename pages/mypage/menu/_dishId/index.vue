<template>
  <div>
    <div>
      {{ dish.dishName }}
    </div>
    <div>
      <nuxt-link
        :to="{
          name: 'mypage-menu-dishId-editImage',
          params: { dishId: dish.dishId }
        }"
      >
        画像を変える
      </nuxt-link>
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
      const id = this.$store.app.context.params.dishId
      await this.$axios
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

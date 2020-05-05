<template>
  <div>
    <div class="container">
      <h1>料理を編集する</h1>
      <form class="form-group" @submit.prevent="edit">
        <div>
          <label>料理名</label>
          <input v-model="dishName" type="text" name="dishName" />
        </div>
        <div>
          <label>レシピURL</label>
          <input v-model="dishUrl" type="text" name="dishUrl" />
        </div>
        <button type="submit">料理を登録</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dishName: '',
      dishUrl: ''
    }
  },
  methods: {
    async edit() {
      const id = this.$store.$router.app.context.params.dishId
      await this.$store.$router.app.$axios
        .$post(`/mypage/menu/${id}/edit`, {
          dishName: this.dishName,
          dishUrl: this.dishUrl
        })
        .then(() => {
          this.$router.push('/mypage/menu')
        })
    }
  }
}
</script>

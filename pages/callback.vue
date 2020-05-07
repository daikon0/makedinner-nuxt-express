<template>
  <div>
    <p>callback</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    }
  },
  async mounted() {
    const res = await this.$axios.get('/aacallback')
    console.log(res)
    const user = {
      id: res.data.user.name.id,
      name: res.data.user.name.username
    }
    this.$store.commit('login', user)
    this.$router.push('/mypage')
  }
}
</script>

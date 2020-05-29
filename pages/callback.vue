<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    }
  },
  async mounted() {
    const user = await this.getUser()
    this.$store.dispatch('setUser', user)
    this.$router.push('/mypage')
  },
  methods: {
    async getUser() {
      const res = await this.$axios.get('/routes/callback')
      return { id: res.data.user.name.id, name: res.data.user.name.username }
    }
  }
}
</script>

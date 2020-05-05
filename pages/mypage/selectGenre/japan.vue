<template>
  <div>
    <div>Japan</div>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const dishes = await app.$axios.$get('/mypage/selectGenre/japan')
    return {
      dishes
    }
  }
}
</script>

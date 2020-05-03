<template>
  <div>
    <div class="container">
      <div>
        <h2 class="subtitle">{{ user.username }}さん</h2>
      </div>
      <div>
        <nuxt-link to="/mypage/createDish">料理を追加する</nuxt-link>
      </div>
      <div>
        <form action="/signout" method="post">
          <input type="submit" value="Sign Out" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const user = await app.$axios.$get('/mypage/user')
    return {
      user: user.name
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

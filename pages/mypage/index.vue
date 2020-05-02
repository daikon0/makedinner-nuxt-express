<template>
  <div>
    <Header />
    <div class="container">
      <div>
        <h2 class="subtitle">{{ user.username }}さん</h2>
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
import Header from '~/components/Header.vue'
export default {
  components: {
    Header
  },
  data() {
    return {
      user: ''
    }
  },
  created() {
    this.$axios.$get('/mypage/user').then((res) => {
      this.user = res.name
    })
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

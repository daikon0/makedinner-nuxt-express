<template>
  <div>
    <nav class="navbar navvbar-light bg-light">
      <div class="navbar-header">
        <nuxt-link to="/" class="navbar-brand nav-link">Makedinner</nuxt-link>
      </div>
      <ul class="navbar-nav">
        <li v-if="user" class="nav-item">
          <nuxt-link to="/logout" class="nav-link">
            {{ user.username }}をログアウト</nuxt-link
          >
        </li>
        <li v-if="!user" class="nav-item">
          <nuxt-link to="/signin" class="nav-link">ログイン</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
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

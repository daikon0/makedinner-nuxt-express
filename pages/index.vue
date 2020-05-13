<template>
  <v-app>
    <div class="container">
      <div>
        <div>
          <v-btn class="my-3" rounded color="info" to="/register">
            Register
          </v-btn>
        </div>
        <div>
          <v-btn class="my-3" rounded color="info" to="/signin">
            Sign In
          </v-btn>
        </div>
        <div>
          <form class="my-3" action="/routes/auth/local" method="post">
            <input type="hidden" name="username" value="test" />
            <input type="hidden" name="password" value="pass" />
            <v-btn rounded color="info" type="submit">
              ゲストユーザーでSign In
            </v-btn>
          </form>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'signout',
  created() {
    this.$store.commit('uploadTitle', '今晩の献立　〜Make Dinner〜')
  }
}
</script>

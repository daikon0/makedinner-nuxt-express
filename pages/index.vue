<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="6" sm="8">
          <v-card class="mt-5" elevation="5">
            <div>
              <v-row justify="center">
                <v-col cols="12" md="10">
                  <v-card-title>
                    <v-icon large>mdi-nuxt</v-icon>
                    Make Dinner
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="test_form">
                      <v-text-field
                        v-model="username"
                        label="usernmae"
                        :rules="[required]"
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        label="password"
                        :rules="[required, limit_length]"
                        counter="8"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-form>
                    <form
                      class="text-center"
                      action="/routes/auth/local"
                      method="post"
                    >
                      <input
                        id="username"
                        v-model="username"
                        type="hidden"
                        name="username"
                      />
                      <input
                        id="password"
                        v-model="password"
                        type="hidden"
                        name="password"
                      />
                      <input type="hidden" name="_csrf" :value="csrf" />
                      <v-btn
                        id="login"
                        block
                        large
                        :disabled="!username || !(password.length >= 8)"
                        class="my-5"
                        type="submit"
                      >
                        ログイン
                      </v-btn>
                    </form>
                  </v-card-text>
                  <v-divider></v-divider>
                  <div class="text-center my-5">
                    <form action="/routes/auth/local" method="post">
                      <input type="hidden" name="username" value="test" />
                      <input type="hidden" name="password" value="pass" />
                      <input type="hidden" name="_csrf" :value="csrf" />
                      <v-btn class="mt-9" tile color="info" large type="submit">
                        <v-icon>mdi-shield-account</v-icon>
                        ゲストユーザーでログイン
                      </v-btn>
                    </form>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card>
          <v-card class="my-5 text-center" elevation="5">
            <div class="pa-1">
              <div class="pt-3">
                <p class="subtitle-2">
                  <v-icon class="pb-1">mdi-help-circle-outline</v-icon>
                  アカウントをお持ちではないですか？
                  <a href="/register">登録する</a>
                </p>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'signout',
  async asyncData({ app }) {
    const csrf = await app.$axios.$get('/routes/csrf')
    return {
      csrf
    }
  },
  data() {
    return {
      username: '',
      password: '',
      csrf: '',
      show1: false,
      success: false,
      required: (value) => !!value || '必ず入力してください',
      limit_length: (value) =>
        value.length >= 8 || '8文字以上で入力してください'
    }
  },
  created() {
    this.$store.dispatch('setTitle', '今晩の献立　〜Make Dinner〜')
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>

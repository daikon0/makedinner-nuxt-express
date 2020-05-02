<template>
  <div>
    <Header />
    <div class="container">
      <div>
        <h1 class="title">SignIn</h1>
        <h2 class="subtitle">名前とパスワードを入力</h2>
        <form action="/signin" method="post" class="form-group">
          <div>
            <label>ユーザー名：</label>
            <input
              v-model="username"
              type="text"
              name="username"
              :class="{ error: $v.username.$error, 'form-control': true }"
              @input="$v.username.$touch()"
            />
            <span v-if="$v.username.$error">usernameを入力してください</span>
          </div>
          <div>
            <label>パスワード：</label>
            <input
              v-model="password"
              type="password"
              name="password"
              :class="{ error: $v.password.$error, 'form-control': true }"
              @input="$v.password.$touch()"
            />
            <span v-if="!$v.password.minLength"
              >パスワードは4文字以上で設定してください</span
            >
          </div>
          <div>
            <input :disabled="$v.$invalid" type="submit" value="ログイン" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  validations: {
    username: {
      required
    },
    password: {
      minLength: minLength(4)
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

.error {
  color: #8a0421;
  border-color: #dd0f3b;
  background-color: #ffd9d9;
}
</style>

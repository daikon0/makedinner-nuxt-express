<template>
  <v-app>
    <v-card>
      <div>
        <v-card-title>Sign In</v-card-title>
        <v-card-text>
          <v-form ref="test_form">
            <v-text-field
              v-model="username"
              label="usernmae"
              :rules="[required]"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="password"
              :rules="[required, limit_length]"
              counter="8"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            :disabled="!username || !(password.length >= 8)"
            text
            @click="submit"
          >
            送信する
          </v-btn>
          <span v-if="success">success!</span>
        </v-card-actions>
      </div>
    </v-card>
  </v-app>
</template>

<script>
export default {
  layout: 'signout',
  data() {
    return {
      username: '',
      password: '',
      success: false,
      required: (value) => !!value || '必ず入力してください',
      limit_length: (value) =>
        value.length >= 8 || '8文字以上で入力してください'
    }
  },
  methods: {
    async submit() {
      await this.$axios
        .$post('/routes/auth/local', {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          this.$router.push('/mypage')
        })
    }
  }
}
</script>

<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="mt-5">
            <div>
              <v-row justify="center">
                <v-col cols="12" md="8">
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
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        label="password"
                        :rules="[required, limit_length]"
                        counter="8"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                      <v-btn
                        :disabled="!username || !(password.length >= 8)"
                        text
                        class="my-5"
                        @click="submit"
                      >
                        Sign In
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-col>
              </v-row>
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
  data() {
    return {
      username: '',
      password: '',
      show1: false,
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

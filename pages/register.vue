<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="6" sm="8">
          <v-card class="mt-5">
            <div>
              <v-row justify="center">
                <v-col cols="12" md="10">
                  <v-card-title>Make Dinner</v-card-title>
                  <v-card-text>
                    <v-form ref="test_form">
                      <v-text-field
                        id="username"
                        v-model="username"
                        label="usernmae"
                        :rules="[required]"
                      ></v-text-field>
                      <v-text-field
                        id="password"
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        label="password"
                        :rules="[required, limit_length]"
                        counter="8"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                      <v-btn
                        block
                        large
                        :disabled="!username || !(password.length >= 8)"
                        class="my-5"
                        @click="submit"
                      >
                        登録する
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
  created() {
    this.$store.dispatch('setTitle', '新規登録')
  },
  methods: {
    async submit() {
      await this.$axios
        .$post(window.location.origin + '/routes/register', {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          this.$router.push('/')
        })
    }
  }
}
</script>

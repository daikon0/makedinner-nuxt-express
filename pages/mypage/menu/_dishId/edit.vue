<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="mt-5">
            <div class="container">
              <v-card-title>料理を編集する</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                    id="dishName"
                    v-model="dishName"
                    label="料理名"
                    :rules="[required]"
                  ></v-text-field>
                  <v-text-field
                    id="dishUrl"
                    v-model="dishUrl"
                    label="レシピのURL"
                  ></v-text-field>
                  <v-btn
                    id="btn"
                    class="my-5"
                    :disabled="!dishName"
                    @click="edit"
                  >
                    変更する
                  </v-btn>
                </v-form>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  async asyncData({ app }) {
    const dishId = app.context.params.dishId
    const dish = await app.$axios.$get(`/routes/mypage/menu/${dishId}`)
    const csrf = await app.$axios.$get('/routes/csrf')
    return {
      dishName: dish.dishName,
      dishUrl: dish.dishUrl,
      csrf
    }
  },
  data() {
    return {
      dishName: '',
      dishUrl: '',
      required: (value) => !!value || '必ず入力してください'
    }
  },
  created() {
    this.$store.dispatch('setTitle', this.dishName + 'を編集')
  },
  methods: {
    async edit() {
      const id = this.$store.app.context.params.dishId
      await this.$axios
        .$post(`/routes/mypage/menu/${id}/edit`, {
          dishName: this.dishName,
          dishUrl: this.dishUrl,
          _csrf: this.csrf
        })
        .then(() => {
          this.$router.push('/mypage/menu')
        })
    }
  }
}
</script>

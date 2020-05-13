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
                    v-model="dish.dishName"
                    label="料理名"
                    :rules="[required]"
                  ></v-text-field>
                  <v-text-field
                    v-model="dish.dishUrl"
                    label="レシピのURL"
                  ></v-text-field>
                  <v-btn class="my-5" :disabled="!dish.dishName" @click="edit">
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
    return {
      dish
    }
  },
  data() {
    return {
      required: (value) => !!value || '必ず入力してください'
    }
  },
  created() {
    this.$store.commit('uploadTitle', this.dish.dishName + 'を編集')
  },
  methods: {
    async edit() {
      const id = this.$store.app.context.params.dishId
      await this.$axios
        .$post(`/routes/mypage/menu/${id}/edit`, {
          dishName: this.dish.dishName,
          dishUrl: this.dish.dishUrl
        })
        .then(() => {
          this.$router.push('/mypage/menu')
        })
    }
  }
}
</script>

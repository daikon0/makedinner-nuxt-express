<template>
  <v-app>
    <div>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <v-card>
              <div v-if="dish.dishFile" class="subheading">
                <v-img
                  class="white--text align-end"
                  :src="dish.dishFile"
                  max-height="500"
                >
                  <v-card-title v-text="dish.dishName"></v-card-title>
                </v-img>
              </div>
              <div v-else>
                <v-img class="align-end" :src="img" max-height="500">
                  <v-card-title v-text="dish.dishName"></v-card-title>
                </v-img>
              </div>
              <div class="grey lighten-2">
                <v-btn v-if="dish.dishUrl" color="info" rounded class="ma-3">
                  <v-icon>mdi-apple-airplay</v-icon>
                  <a
                    :href="dish.dishUrl"
                    target="_blank"
                    class="white--text align-end"
                  >
                    レシピを見る
                  </a>
                </v-btn>
                <v-btn
                  :to="{
                    name: 'mypage-menu-dishId-edit',
                    params: { dishId: dish.dishId }
                  }"
                  color="info"
                  rounded
                  class="ma-3"
                >
                  <v-icon>mdi-pencil</v-icon>
                  <div class="ma-1">編集</div>
                </v-btn>

                <v-btn
                  :to="{
                    name: 'mypage-menu-dishId-editImage',
                    params: { dishId: dish.dishId }
                  }"
                  color="info"
                  rounded
                  class="ma-3"
                >
                  <v-icon>mdi-image-edit</v-icon>
                  <div class="ma-1">画像を変える</div>
                </v-btn>
                <v-btn color="info" rounded class="ma-3" @click="deleteDish">
                  <v-icon>mdi-trash-can-outline</v-icon>
                  <div class="ma-1">削除</div>
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
export default {
  async asyncData({ app }) {
    const dishId = app.context.params.dishId
    const dish = await app.$axios.$get(`/routes/mypage/menu/${dishId}`)
    const csrf = await app.$axios.$get('/routes/csrf')
    return {
      dish,
      img: require('@/static/no-image.jpeg'),
      csrf
    }
  },
  created() {
    this.$store.commit('uploadTitle', this.dish.dishName)
  },
  methods: {
    async deleteDish() {
      const id = this.$store.app.context.params.dishId
      await this.$axios
        .$post(`/routes/mypage/menu/${id}/delete`, {
          _csrf: this.csrf
        })
        .then(() => {
          this.$router.push('/mypage/menu')
        })
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>

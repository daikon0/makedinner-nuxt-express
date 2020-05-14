<template>
  <v-app>
    <div>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" md="8">
            <div>
              <v-btn-toggle class="ma-8 btn-width">
                <v-btn
                  color="cyan lighten-2"
                  outlined
                  elevation="3"
                  block
                  :to="{
                    path: '/mypage/selectGenre',
                    query: { genre: 'japan' }
                  }"
                >
                  和 食
                </v-btn>
                <v-btn
                  color="green lighten-1"
                  outlined
                  elevation="3"
                  block
                  :to="{
                    path: '/mypage/selectGenre',
                    query: { genre: 'western' }
                  }"
                >
                  洋 食
                </v-btn>
                <v-btn
                  color="pink lighten-2"
                  elevation="3"
                  outlined
                  block
                  :to="{
                    path: '/mypage/selectGenre',
                    query: { genre: 'china' }
                  }"
                >
                  中 華
                </v-btn>
              </v-btn-toggle>
            </div>
            <v-alert
              v-if="errorMessage"
              class="ma-5"
              text
              outlined
              elevation="10"
              color="deep-orange"
              icon="mdi-fire"
            >
              献立を決めるための料理が足りない！もっと料理をつくろう！
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
      <div v-if="maindish">
        <v-container>
          <v-row justify="center">
            <v-col cols="8" md="4">
              <Dish :dish="maindish" />
            </v-col>
            <v-col cols="8" md="4">
              <Dish :dish="subdish" />
            </v-col>
            <v-col cols="8" md="4">
              <Dish :dish="soup" />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
import Dish from '@/components/Dish'
export default {
  components: {
    Dish
  },
  data: () => {
    return {
      maindish: '',
      subdish: '',
      soup: '',
      errorMessage: '',
      img: require('@/static/no-image.png')
    }
  },
  created() {
    this.$store.commit('uploadTitle', '今日の献立')
  },
  beforeRouteUpdate(to, from, next) {
    // this.dish = to.query.genre
    this.setDish(to.query.genre)
    next()
  },
  methods: {
    async setDish(params) {
      const dish = await this.$axios.$get(`/routes/mypage/selectGenre`, {
        params: {
          genre: params
        }
      })
      if (
        dish.main === undefined ||
        dish.sub === undefined ||
        dish.soup === undefined
      ) {
        this.maindish = ''
        this.subdish = ''
        this.soup = ''
        this.errorMessage = '料理をもっと登録しよう！'
      } else {
        this.maindish = dish.main
        this.subdish = dish.sub
        this.soup = dish.soup
        this.errorMessage = ''
      }
    }
  }
}
</script>

<style>
.btn-width {
  width: 29%;
}

a {
  text-decoration: none;
}
</style>

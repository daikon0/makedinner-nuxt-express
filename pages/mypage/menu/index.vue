<template>
  <v-app>
    <div>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card elevation="8">
              <v-tabs grow>
                <v-tab @click="all">すべて</v-tab>
                <v-tab @click="onlyJapan">和食</v-tab>
                <v-tab @click="onlyWestern">洋食</v-tab>
                <v-tab @click="onlyChina">中華</v-tab>
              </v-tabs>

              <v-list subheader class="ma-3" rounded>
                <v-subheader class="ma-3">
                  <v-icon>mdi-pasta</v-icon>
                  <div class="ma-2">料理一覧</div>
                </v-subheader>

                <v-list-item-group>
                  <v-list-item
                    v-for="dish in dishes"
                    :key="dish.dishId"
                    :to="{
                      name: 'mypage-menu-dishId',
                      params: { dishId: dish.dishId }
                    }"
                    color="primary"
                  >
                    <v-list-item-avatar v-if="dish.dishFile" size="80">
                      <img :src="dish.dishFile" alt="dish" />
                    </v-list-item-avatar>
                    <v-list-item-avatar v-else size="80">
                      <img :src="img" alt="no-image" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        class="subtitle-1 mx-6"
                        v-text="dish.dishName"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
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
    const res = await app.$axios.$get('/routes/mypage/menu')
    return {
      res,
      img: require('@/static/no-image.jpeg')
    }
  },
  data() {
    return {
      dishes: []
    }
  },
  created() {
    this.$store.dispatch('setTitle', 'メニュー')
    this.dishes = this.res
  },
  methods: {
    // クリックされたボタンのジャンルだけをdishに渡す
    all() {
      this.dishes = this.res
    },
    onlyJapan() {
      const dish = this.res.filter((item) => {
        if (item.dishGenre === 'japan') return true
      })
      this.dishes = dish
    },
    onlyWestern() {
      const dish = this.res.filter((item) => {
        if (item.dishGenre === 'western') return true
      })
      this.dishes = dish
    },
    onlyChina() {
      const dish = this.res.filter((item) => {
        if (item.dishGenre === 'china') return true
      })
      this.dishes = dish
    }
  }
}
</script>

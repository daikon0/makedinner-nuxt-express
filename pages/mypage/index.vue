<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col>
          <v-card elevation="5">
            <div v-if="!$store.state.loading" class="container">
              <p id="name" class="ma-3 title">
                ようこそ、{{ $store.getters.username.name }}さん
              </p>
              <v-container>
                <v-row justify="center">
                  <v-col class="my-3" cols="10" md="6">
                    <v-card class="mx-auto" outlined elevation="5">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title class="headline mb-2 a">
                            料理一覧
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            自分の料理一覧を表示します。
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-avatar tile size="100">
                          <v-img :src="menu_img"></v-img>
                        </v-list-item-avatar>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-btn block to="/mypage/menu">料理一覧</v-btn>
                    </v-card>
                  </v-col>

                  <v-col class="my-3" cols="10" md="6">
                    <v-card class="mx-auto" outlined elevation="5">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title class="headline mb-2">
                            追加する
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            新しい料理を追加します。
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-avatar tile size="100" color="grey">
                          <v-img :src="add_img"></v-img>
                        </v-list-item-avatar>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-btn block to="/mypage/createDish">追加する</v-btn>
                    </v-card>
                  </v-col>

                  <v-col class="my-3" cols="10" md="6">
                    <v-card class="mx-auto" outlined elevation="5">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title class="headline mb-2">
                            探す
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            他のレシピを探して登録しましょう。
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-avatar tile size="100" color="grey">
                          <v-img :src="find_img"></v-img>
                        </v-list-item-avatar>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-btn block to="/mypage/rakuten" @click="submit">
                        見つける
                      </v-btn>
                    </v-card>
                  </v-col>

                  <v-col class="my-3" cols="10" md="6">
                    <v-card class="mx-auto" outlined elevation="5">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title class="headline mb-2">
                            献立
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            自分の料理から今晩の献立を決めましょう。
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-avatar tile size="100" color="grey">
                          <v-img :src="select_img"></v-img>
                        </v-list-item-avatar>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-btn block to="/mypage/selectGenre">決める</v-btn>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Loading v-if="$store.state.loading" />
  </v-app>
</template>

<script>
import Loading from '@/components/Loading'
export default {
  components: {
    Loading
  },
  data() {
    return {
      add_img: require('@/static/desk.jpg'),
      find_img: require('@/static/coffee.jpg'),
      select_img: require('@/static/dish.jpg'),
      menu_img: require('@/static/book.jpg')
    }
  },
  created() {
    this.$store.commit('uploadTitle', '今晩の献立　〜Make Dinner〜')
    this.$store.commit('reload')
  },
  methods: {
    submit() {
      this.$store.commit('submit')
    }
  }
}
</script>

<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col>
          <v-card elevation="5">
            <div v-if="!$store.getters.loading" class="container">
              <p id="name" class="ma-3 title">
                ようこそ、{{ $store.getters.username }}さん
              </p>
              <v-container>
                <v-row justify="center">
                  <v-col class="my-3" cols="10" md="6">
                    <v-card class="mx-auto" outlined elevation="5">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title class="title my-2">
                            料理一覧
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            自分の料理一覧を表示します。
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-avatar tile size="100">
                          <img src="~/assets/book.jpg" alt="menu-image" />
                        </v-list-item-avatar>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-btn id="toMenu" block to="/mypage/menu">
                        料理一覧
                      </v-btn>
                    </v-card>
                  </v-col>

                  <v-col class="my-3" cols="10" md="6">
                    <v-card class="mx-auto" outlined elevation="5">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title class="title my-2">
                            追加する
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            新しい料理を追加します。
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-avatar tile size="100" color="grey">
                          <img src="~/assets/desk.jpg" alt="menu-image" />
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
                          <v-list-item-title class="title my-2">
                            探す
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            他のレシピを探して登録しましょう。
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-avatar tile size="100" color="grey">
                          <img src="~/assets/coffee.jpg" alt="menu-image" />
                        </v-list-item-avatar>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-btn
                        id="toRakuten"
                        block
                        to="/mypage/rakuten"
                        @click="submit"
                      >
                        見つける
                      </v-btn>
                    </v-card>
                  </v-col>

                  <v-col class="my-3" cols="10" md="6">
                    <v-card class="mx-auto" outlined elevation="5">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title class="title my-2">
                            献立
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            自分の料理から今晩の献立を決めましょう。
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-avatar tile size="100" color="grey">
                          <img src="~/assets/dish.jpg" alt="menu-image" />
                        </v-list-item-avatar>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-btn block to="/mypage/selectGenre">決める</v-btn>
                    </v-card>
                  </v-col>

                  <v-col class="my-3" cols="10" md="6">
                    <v-card class="mx-auto" outlined elevation="5">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title class="title my-2">
                            メモ
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            お買い物メモ。必要な材料をメモしておきましょう。
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-avatar tile size="100" color="grey">
                          <img src="~/assets/note.jpg" alt="menu-image" />
                        </v-list-item-avatar>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-btn block to="/mypage/memo">メモする</v-btn>
                    </v-card>
                  </v-col>

                  <v-col class="my-3" cols="10" md="6">
                    <v-card class="mx-auto" outlined elevation="5">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title class="title my-2">
                            お手軽
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            今日の献立を手軽に済ませたい時に、おすすめの一品レシピを提案します。
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-avatar tile size="100" color="grey">
                          <img src="~/assets/onedish.jpeg" alt="menu-image" />
                        </v-list-item-avatar>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-btn block to="/mypage/oneDish">見る</v-btn>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Loading v-if="$store.getters.loading" />
  </v-app>
</template>

<script>
import Loading from '@/components/Loading'
export default {
  components: {
    Loading
  },
  // data() {
  //   return {
  //     add_img: '',
  //     find_img: '',
  //     select_img: '',
  //     menu_img: '',
  //     memo_img: '',
  //     onedish_img: ''
  //   }
  // },
  // mounted() {
  //   this.add_img = require('@/static/desk.jpg')
  //   this.find_img = require('@/static/coffee.jpg')
  //   this.select_img = require('@/static/dish.jpg')
  //   this.menu_img = require('@/static/book.jpg')
  //   this.memo_img = require('@/static/note.jpg')
  //   this.onedish_img = require('@/static/onedish.jpeg')
  // },
  created() {
    this.$store.commit('uploadTitle', '今晩の献立　〜Make Dinner〜')
    this.$store.dispatch('reset')
  },
  methods: {
    submit() {
      this.$store.dispatch('setLoading')
    }
  }
}
</script>

<template>
  <v-app>
    <v-container v-if="!$store.getters.loading" fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-btn class="my-3" color="info" to="/mypage">
            <v-icon>mdi-keyboard-backspace</v-icon>
            <div class="ma-1">戻る</div>
          </v-btn>
          <v-card class="mt-5">
            <div>
              <v-row justify="center">
                <v-col>
                  <v-list rounded subheader>
                    <v-subheader inset>rakuten category</v-subheader>
                    <v-list-item-group>
                      <v-list-item
                        v-for="category in categories"
                        :key="category.categoryId"
                        :to="{
                          name: 'mypage-rakuten-categoryId',
                          params: { categoryId: category.categoryId }
                        }"
                        @click="submit"
                      >
                        <v-list-item-content text-center>
                          <v-list-item-title
                            class="my-3 text-center title"
                            v-text="category.categoryName"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>
              </v-row>
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
  async asyncData({ app }) {
    const categories = await app.$axios.$get('/routes/rakuten')
    return {
      categories
    }
  },
  created() {
    this.$store.dispatch('setTitle', 'カテゴリー')
    this.$store.dispatch('reset')
  },
  methods: {
    submit() {
      this.$store.dispatch('setLoading')
    }
  }
}
</script>

<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
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
  </v-app>
</template>

//
<script>
export default {
  async asyncData({ app }) {
    const secret = process.env.RAKUTEN_SECRET
    const category = await app.$axios.$get(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${secret}&categoryType=large`
    )
    const categories = category.result.large
    return {
      categories
    }
  },
  created() {
    this.$store.commit('uploadTitle', 'カテゴリー')
  }
}
</script>

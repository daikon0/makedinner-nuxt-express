<template>
  <v-app>
    <div>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card>
              <v-list subheader class="ma-3" rounded>
                <v-subheader class="ma-3">料理一覧</v-subheader>
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
                        class="subtitle-1"
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
    const dishes = await app.$axios.$get('/routes/mypage/menu')
    return {
      dishes,
      img: require('@/static/no-image.png')
    }
  }
}
</script>

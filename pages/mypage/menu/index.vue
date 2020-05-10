<template>
  <v-app>
    <div>
      <v-list subheader>
        <v-subheader>dishes!!</v-subheader>
        <v-list-item
          v-for="dish in dishes"
          :key="dish.dishId"
          :to="{ name: 'mypage-menu-dishId', params: { dishId: dish.dishId } }"
        >
          <v-list-item-avatar v-if="dish.dishFile">
            <img :src="dish.dishFile" alt="" />
          </v-list-item-avatar>
          <v-list-item-avatar v-else>
            X
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="dish.dishName"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-app>
  <!-- <div>
    <ul>
      <li v-for="dish in dishes" :key="dish.dishId">
        <span>{{ dish.dishName }}</span>
        <nuxt-link
          :to="{ name: 'mypage-menu-dishId', params: { dishId: dish.dishId } }"
        >
          {{ dish.dishId }}
        </nuxt-link>
      </li>
    </ul>
  </div> -->
</template>

<script>
export default {
  async asyncData({ app }) {
    const dishes = await app.$axios.$get('/routes/mypage/menu')
    return {
      dishes
    }
  }
}
</script>

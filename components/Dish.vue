<template>
  <v-container>
    <v-card>
      <div>
        <div v-if="dish.dishFile">
          <v-img
            class="white--text align-end"
            :src="dish.dishFile"
            height="400"
          >
            <v-card-title
              class="font-weight-black"
              v-text="dish.dishName"
            ></v-card-title>
          </v-img>
        </div>
        <div v-else>
          <v-img class="align-end" :src="img" height="400">
            <v-card-title v-text="dish.dishName"></v-card-title>
          </v-img>
        </div>
        <a :href="dish.dishUrl" target="_blank" class="white--text align-end">
          <v-btn v-if="dish.dishUrl" block color="info" dark>
            レシピを見る
          </v-btn>
        </a>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    dish: {
      type: Object,
      default: null
    }
  },
  data: () => {
    return {
      img: require('@/static/no-image.jpeg')
    }
  }
}
</script>

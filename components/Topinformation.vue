<template>
  <v-col class="mx-6" cols="12" md="5" sm="8">
    <v-card class="mt-5" elevation="5">
      <v-list-item three-line>
        <v-list-item-content>
          <p class="title my-1 text-justify">
            {{ title }}
          </p>
          <p class="text--secondary">
            {{ subtitle }}
            <br />
            {{ undersubtitle }}
          </p>
        </v-list-item-content>
        <v-list-item-avatar tile size="180" color="grey">
          <img :src="require(`@/assets/${image}`)" />
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    undersubtitle: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    }
  }
}
</script>

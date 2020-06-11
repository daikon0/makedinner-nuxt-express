<template>
  <v-col class="my-3" cols="10" md="6">
    <v-card class="mx-auto" outlined elevation="5">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title
            class="title my-2"
            v-text="title"
          ></v-list-item-title>
          <v-list-item-subtitle v-text="subtitle"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar tile size="100" color="grey">
          <img :src="require(`@/assets/${image}`)" />
        </v-list-item-avatar>
      </v-list-item>
      <v-divider></v-divider>
      <v-btn block :to="to" @click="submit" v-text="btn"></v-btn>
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
    btn: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    to: {
      type: String,
      default: null
    }
  },
  methods: {
    submit() {
      this.$emit('submit')
    }
  }
}
</script>

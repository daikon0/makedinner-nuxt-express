<template>
  <v-col class="mx-6" cols="12" md="5" sm="8">
    <v-card class="mt-5" elevation="5">
      <v-list-item three-line>
        <div>
          <v-list-item-content>
            <v-col cols="12" md="5" sm="12">
              <img class="image" :src="require(`@/assets/${image}`)" />
            </v-col>
            <v-col cols="12" md="7" sm="12">
              <div class="text-center">
                <p class="title mt-3" md="10">
                  {{ title }}
                </p>
                <p class="text--secondary text-justify">
                  {{ subtitle }}
                  <br />
                  {{ undersubtitle }}
                </p>
              </div>
            </v-col>
          </v-list-item-content>
        </div>
      </v-list-item>
      <v-divider></v-divider>
      <form action="/routes/auth/local" method="post">
        <input type="hidden" name="username" value="GuestUser" />
        <input type="hidden" name="password" value="GuestPass" />
        <input type="hidden" name="_csrf" :value="csrf" />
        <v-btn block large type="submit">ゲストユーザーでお試しログイン</v-btn>
      </form>
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
  },
  async asyncData({ app }) {
    const csrf = await app.$axios.$get('/routes/csrf')
    return {
      csrf
    }
  },
  data() {
    return {
      csrf: ''
    }
  }
}
</script>

<style>
.image {
  width: 100%;
  max-width: 100%;
  height: auto;
}
</style>

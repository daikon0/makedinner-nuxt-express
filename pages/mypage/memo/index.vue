<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="mt-5">
            <div>
              <v-row justify="center">
                <v-col>
                  <v-card-title>お買い物メモ一覧</v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        v-model="name"
                        label="メモする"
                      ></v-text-field>
                    </v-form>
                    <form action="/routes/memo" method="post">
                      <input type="hidden" name="name" :value="name" />
                      <v-btn class="my-5" type="submit">
                        追加
                      </v-btn>
                    </form>
                  </v-card-text>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  created() {
    this.$store.dispatch('setTitle', 'メモ')
  },
  methods: {
    // async add() {
    //   await this.$axios
    //     .$post('/routes/memo', {
    //       name: this.name
    //     })
    //     .then(() => {
    //       this.$router.push('/mypage/menu')
    //     })
    // }
  }
}
</script>

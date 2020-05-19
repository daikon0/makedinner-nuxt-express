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
                    <v-list-item-group>
                      <v-list-item v-for="memo in memos" :key="memo.id">
                        <v-list-item-content>
                          <v-list-item-title
                            v-if="memo.done"
                            class="line"
                            @click="edit(memo.id)"
                            v-text="memo.name"
                          ></v-list-item-title>
                          <v-list-item-title
                            v-else
                            @click="edit(memo.id)"
                            v-text="memo.name"
                          ></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn icon @click="memoDelete(memo.id)">
                            <v-icon large color="grey lighten-1">
                              mdi-trash-can-outline
                            </v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list-item-group>
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
                    <v-btn @click="deleteAll">
                      <v-icon>mdi-reload</v-icon>
                      リセット
                    </v-btn>
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
  async asyncData({ app }) {
    const memos = await app.$axios.$get('/routes/memo')
    return {
      memos
    }
  },
  data() {
    return {
      name: '',
      memos: []
    }
  },
  created() {
    this.$store.dispatch('setTitle', 'メモ')
  },
  methods: {
    async edit(id) {
      await this.$axios
        .$post('/routes/memo/edit', {
          memoId: id
        })
        .then(() => {
          location.reload()
        })
    },
    async memoDelete(id) {
      await this.$axios
        .$post('/routes/memo/delete', {
          memoId: id
        })
        .then(() => {
          location.reload()
        })
    },
    async deleteAll() {
      await this.$axios.$post('/routes/memo/deleteAll').then(() => {
        location.reload()
      })
    }
  }
}
</script>

<style>
.line {
  text-decoration: line-through;
}
</style>

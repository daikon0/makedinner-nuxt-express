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
                      <template v-for="(memo, index) in memos">
                        <v-list-item :key="memo.id">
                          <v-list-item-action>
                            <v-checkbox
                              id="edit"
                              :input-value="memo.done"
                              @click="edit(memo.id)"
                            ></v-checkbox>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title
                              v-if="memo.done"
                              class="line title"
                              @click="edit(memo.id)"
                              v-text="memo.name"
                            ></v-list-item-title>
                            <v-list-item-title
                              v-else
                              class="title"
                              @click="edit(memo.id)"
                              v-text="memo.name"
                            ></v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn
                              id="delete"
                              icon
                              @click="memoDelete(memo.id)"
                            >
                              <v-icon large color="grey lighten-1">
                                mdi-trash-can-outline
                              </v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>
                        <v-divider
                          v-if="index + 1 < memos.length"
                          :key="index"
                        ></v-divider>
                      </template>
                    </v-list-item-group>
                    <v-form class="mt-6">
                      <v-text-field
                        id="name"
                        v-model="name"
                        label="材料を記入"
                        :rules="[required]"
                      ></v-text-field>
                    </v-form>
                    <form class="d-inline" action="/routes/memo" method="post">
                      <input type="hidden" name="name" :value="name" />
                      <input type="hidden" name="_csrf" :value="csrf" />
                      <v-btn
                        id="addButton"
                        :disabled="!name"
                        class="ma-5"
                        type="submit"
                      >
                        <v-icon>mdi-pencil-plus</v-icon>
                        追加する
                      </v-btn>
                    </form>
                    <v-btn
                      id="deleteAll"
                      class="ml-3 d-inline"
                      @click="deleteAll"
                    >
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
    const csrf = await app.$axios.$get('/routes/csrf')
    return {
      memos,
      csrf
    }
  },
  data() {
    return {
      name: '',
      memos: [],
      required: (value) => !!value || '入力しないと追加ボタンを押せません',
      csrf: ''
    }
  },
  created() {
    this.$store.dispatch('setTitle', 'メモ')
  },
  methods: {
    async edit(id) {
      await this.$axios
        .$post('/routes/memo/edit', {
          memoId: id,
          _csrf: this.csrf
        })
        .then(() => {
          location.reload()
        })
    },
    async memoDelete(id) {
      await this.$axios
        .$post('/routes/memo/delete', {
          memoId: id,
          _csrf: this.csrf
        })
        .then(() => {
          location.reload()
        })
    },
    async deleteAll() {
      await this.$axios
        .$post('/routes/memo/deleteAll', {
          _csrf: this.csrf
        })
        .then(() => {
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

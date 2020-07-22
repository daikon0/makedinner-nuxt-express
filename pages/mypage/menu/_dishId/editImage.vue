<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="mt-5">
            <div class="container">
              <v-card-text>
                <v-form>
                  <form
                    action="/routes/mypage/editFile"
                    method="post"
                    class="form-group"
                    enctype="multipart/form-data"
                  >
                    <v-file-input
                      type="file"
                      name="dishFile"
                      label="File input"
                      filled
                      prepend-icon="mdi-camera"
                      :rules="[required]"
                      @change="hasFile"
                    ></v-file-input>
                    <input type="hidden" name="dishId" :value="dishId" />
                    <input type="hidden" name="_csrf" :value="csrf" />
                    <v-btn class="my-5" type="submit" :disabled="!file">
                      変更する
                    </v-btn>
                  </form>
                </v-form>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app }) {
    const dishId = app.context.params.dishId
    const csrf = await app.$axios.$get('/routes/csrf')
    return {
      dishId,
      file: '',
      csrf,
      required: (value: string) => !!value || '画像を選択してください'
    }
  },
  data() {
    return {
      file: ''
    }
  },
  created() {
    this.$store.dispatch('setTitle', '画像の変更')
  },
  methods: {
    hasFile(file: string) {
      this.file = file
    }
  }
})
</script>

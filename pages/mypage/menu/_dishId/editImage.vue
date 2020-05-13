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

<script>
export default {
  asyncData({ app }) {
    const dishId = app.context.params.dishId
    return {
      dishId,
      file: '',
      required: (value) => !!value || '画像を選択してください'
    }
  },
  created() {
    this.$store.commit('uploadTitle', '画像の変更')
  },
  methods: {
    hasFile(file) {
      this.file = file
    }
  }
}
</script>

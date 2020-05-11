<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="mt-5">
            <div>
              <v-row justify="center">
                <v-col cols="12" md="8">
                  <v-card-title>料理を登録する</v-card-title>
                  <v-card-text>
                    <v-form ref="test_form">
                      <v-text-field
                        v-model="dishName"
                        label="料理名"
                        :rules="[required]"
                      ></v-text-field>
                      <v-text-field
                        v-model="dishUrl"
                        label="レシピのURL"
                      ></v-text-field>
                      <v-radio-group
                        v-model="dishGenre"
                        :rules="[required]"
                        row
                      >
                        <v-radio label="和食" value="japan"></v-radio>
                        <v-radio label="洋食" value="western"></v-radio>
                        <v-radio label="中華" value="china"></v-radio>
                      </v-radio-group>
                      <v-radio-group v-model="dishRole" :rules="[required]" row>
                        <v-radio label="主菜" value="main"></v-radio>
                        <v-radio label="副菜" value="sub"></v-radio>
                        <v-radio label="汁物" value="soup"></v-radio>
                      </v-radio-group>
                    </v-form>
                    <form
                      action="/routes/createDish"
                      method="post"
                      enctype="multipart/form-data"
                    >
                      <v-file-input
                        type="file"
                        name="dishFile"
                        label="File input"
                        filled
                        prepend-icon="mdi-camera"
                        @change="getFile"
                      ></v-file-input>
                      <input type="hidden" name="dishName" :value="dishName" />
                      <input type="hidden" name="dishUrl" :value="dishUrl" />
                      <input
                        type="hidden"
                        name="dishGenre"
                        :value="dishGenre"
                      />
                      <input type="hidden" name="dishRole" :value="dishRole" />
                      <v-btn
                        :disabled="!dishName || !dishGenre || !dishRole"
                        text
                        class="my-5"
                        type="submit"
                      >
                        登録する
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
      dishName: '',
      dishUrl: '',
      dishGenre: '',
      dishRole: '',
      required: (value) => !!value || '必ず入力してください'
    }
  }
}
</script>

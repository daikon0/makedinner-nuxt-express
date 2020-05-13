<template>
  <div>
    <div>
      <h1>画像を変える</h1>
      <form
        action="/routes/mypage/editFile"
        method="post"
        class="form-group"
        enctype="multipart/form-data"
      >
        <div>
          <input type="file" name="dishFile" />
          <label>画像を選択してください</label>
        </div>
        <input type="hidden" name="dishId" :value="dishId" />
        <button type="submit">変更する</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ app }) {
    const dishId = app.context.params.dishId
    return {
      dishId
    }
  },
  created() {
    this.$store.commit('uploadTitle', '画像の変更')
  }
}
</script>

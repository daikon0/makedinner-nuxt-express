<template>
  <div>
    <div class="container">
      <h1>料理を追加する</h1>
      <form
        action="/routes/createDish"
        method="post"
        class="form-group"
        enctype="multipart/form-data"
      >
        <div>
          <label>料理名</label>
          <input type="text" name="dishName" />
        </div>
        <div>
          <label>レシピURL</label>
          <input type="text" name="dishUrl" />
        </div>
        <div>
          <input type="file" name="dishFile" />
          <label>画像を選択してください</label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="genre"
              value="japan"
              autocomplete="off"
              checked
            />
            和食
          </label>
          <label>
            <input type="radio" name="genre" autocomplete="off" value="china" />
            中華
          </label>
          <label>
            <input
              type="radio"
              name="genre"
              autocomplete="off"
              value="western"
            />
            洋食
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="main"
              autocomplete="off"
              checked
            />
            主菜
          </label>
          <label>
            <input type="radio" name="role" value="sub" autocomplete="off" />
            副菜
          </label>
          <label>
            <input type="radio" name="role" value="soup" autocomplete="off" />
            汁物
          </label>
        </div>
        <button type="submit">料理を登録</button>
      </form>
    </div>
  </div>
</template>

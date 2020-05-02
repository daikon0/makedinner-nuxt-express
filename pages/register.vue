<template>
  <div class="container">
    <div>
      <h1 class="title">Register</h1>
      <h2 class="subtitle">名前とパスワードを入力</h2>
      <form action="/register" method="post">
        <div>
          <label>ユーザー名：</label>
          <input type="text" name="username" />
        </div>
        <div>
          <label>パスワード：</label>
          <input type="password" name="password" />
        </div>
        <div>
          <input type="submit" value="ログイン" />
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

<template>
  <div>
    <div class="container">
      <div>
        <h2>{{ $store.state.user.name }}</h2>
      </div>
      <div>
        <nuxt-link to="/mypage/menu">あなたの料理一覧</nuxt-link>
      </div>
      <div>
        <nuxt-link to="/mypage/createDish">料理を追加する</nuxt-link>
      </div>
      <div>
        <nuxt-link to="/mypage/rakuten">楽天レシピから料理を見つける</nuxt-link>
      </div>
      <div>
        <nuxt-link to="/mypage/selectGenre">今日の献立を決める</nuxt-link>
      </div>
      <div>
        <form action="/routes/signout" method="post">
          <input type="submit" value="Sign Out" />
        </form>
      </div>
    </div>
  </div>
</template>

<template>
  <div>
    <div>
      <div>
        <nuxt-link
          :to="{ path: '/mypage/selectGenre', query: { genre: 'japan' } }"
        >
          和食
        </nuxt-link>
      </div>
      <div>
        <nuxt-link
          :to="{ path: '/mypage/selectGenre', query: { genre: 'western' } }"
        >
          洋食
        </nuxt-link>
      </div>
      <div>
        <nuxt-link
          :to="{ path: '/mypage/selectGenre', query: { genre: 'china' } }"
        >
          中華
        </nuxt-link>
      </div>
    </div>
    <div>{{ errorMessage }}</div>
    <div>{{ maindish.dishName }}</div>
    <div>{{ subdish.dishName }}</div>
    <div>{{ soup.dishName }}</div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      maindish: '',
      subdish: '',
      soup: '',
      errorMessage: ''
    }
  },
  beforeRouteUpdate(to, from, next) {
    // this.dish = to.query.genre
    this.setDish(to.query.genre)
    next()
  },
  methods: {
    async setDish(params) {
      const dish = await this.$axios.$get(`/mypage/selectGenre`, {
        params: {
          genre: params
        }
      })
      if (
        dish.main === undefined ||
        dish.sub === undefined ||
        dish.soup === undefined
      ) {
        this.maindish = ''
        this.subdish = ''
        this.soup = ''
        this.errorMessage = '料理をもっと登録しよう！'
      } else {
        this.maindish = dish.main
        this.subdish = dish.sub
        this.soup = dish.soup
        this.errorMessage = ''
      }
    }
  }
}
</script>

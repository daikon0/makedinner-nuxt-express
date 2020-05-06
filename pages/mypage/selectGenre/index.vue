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
      soup: ''
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
      this.maindish = dish.main
      this.subdish = dish.sub
      this.soup = dish.soup
    }
  }
}
</script>

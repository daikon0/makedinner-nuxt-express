export const state = () => ({
  title: '',
  loading: false,
  user: { name: '', id: '' },
  auth: false,
  rice: {
    name: 'yakiniku',
    recipe: 'aaaaaaaaaa'
  }
})

export const getters = {
  title: (state) => state.title,
  loading: (state) => state.loading,
  username: (state) => state.user.name,
  auth: (state) => state.auth,
  rice: (state) => state.rice
}

export const mutations = {
  login(state, payload) {
    state.auth = true
    state.user = payload
  },
  logout(state) {
    state.auth = false
    state.user = null
  },
  uploadTitle(state, title) {
    state.title = title
  },
  submit(state) {
    state.loading = true
  },
  reload(state) {
    state.loading = false
  }
}

export const actions = {
  setUser(context, user) {
    context.commit('login', user)
  },
  setTitle(context, title) {
    context.commit('uploadTitle', title)
  },
  setLoading(context) {
    context.commit('submit')
  }
}

export default { state, getters, mutations, actions }

export const state = () => ({
  title: '',
  loading: false,
  user: null,
  auth: false
})

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

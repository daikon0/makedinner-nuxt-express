import axios from 'axios'

export default async ({ store, route, redirect }) => {
  if (store.state.auth) {
    return
  }

  if (route.path !== '/callback') {
    const res = await axios.get('/aacallback')
    if (res.data.user) {
      const user = {
        id: res.data.user.name.id,
        name: res.data.user.name.username
      }
      store.commit('login', user)
      if (route.path === '/') {
        return redirect('/mypage')
      }
    } else if (route.path !== '/') {
      return redirect('/')
    }
  }
}

import axios from 'axios'

export default async ({ store, route, redirect }) => {
  if (store.state.auth) {
    return
  }
  if (route.path === '/') {
    return
  }
  if (route.path === '/register') {
    return
  }
  if (route.path === '/retry') {
    return
  }

  if (route.path !== '/callback') {
    const res = await axios.get('/routes/callback')
    if (res.data.user) {
      const user = {
        id: res.data.user.name.id,
        name: res.data.user.name.username
      }
      store.commit('login', user)
    } else if (route.path !== '/') {
      return redirect('/')
    }
  }
}

import axios from 'axios'

export default async ({ store, route, redirect }) => {
  if (store.getters.auth) {
    return
  }
  if (route.path === '/') {
    return
  }
  if (route.path === '/login') {
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
      store.dispatch('setUser', user)
    } else if (route.path !== '/login') {
      return redirect('/login')
    }
  }
}

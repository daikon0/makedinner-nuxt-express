import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Vue from 'vue'
import VueRouter from 'vue-router'
import cloneDeep from 'lodash.clonedeep'
import Mypage from '~/pages/mypage/index'
import store from '~/store/index'
// import Loading from '~/components/Loading.vue'

const localVue = createLocalVue()
Vue.use(Vuetify)
localVue.use(Vuex)
localVue.use(Vuetify)
localVue.use(VueRouter)

describe('pages/mypage/index.vue', () => {
  let wrapper
  let vuetify
  let router
  let mock

  beforeEach(() => {
    wrapper = null
    vuetify = new Vuetify()
    router = new VueRouter()
    mock = jest.fn()
    wrapper = mount(Mypage, {
      store: new Vuex.Store(cloneDeep(store)),
      localVue,
      vuetify,
      router,
      methods: {
        submit: mock
      }
    })
  })
  test('見つけるをクリックするとsubmit関数が呼び出される', () => {
    wrapper.find('#toRakuten').trigger('click')
    expect(mock).toHaveBeenCalled()
  })
})

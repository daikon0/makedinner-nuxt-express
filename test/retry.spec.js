import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Vue from 'vue'
import VueRouter from 'vue-router'
import cloneDeep from 'lodash.clonedeep'
import RetryPage from '~/pages/retry'
import store from '~/store/index'

const localVue = createLocalVue()
Vue.use(Vuetify)
localVue.use(Vuex)
localVue.use(Vuetify)
localVue.use(VueRouter)

describe('pages/retry.vue', () => {
  let wrapper
  let vuetify
  let router

  beforeEach(() => {
    wrapper = null
    vuetify = new Vuetify()
    router = new VueRouter()
    wrapper = mount(RetryPage, {
      store: new Vuex.Store(cloneDeep(store)),
      localVue,
      vuetify,
      router
    })
  })
  test('トップページへ戻る導線が存在する', () => {
    expect(wrapper.find('.v-btn').props().to).toBe('/')
  })
})

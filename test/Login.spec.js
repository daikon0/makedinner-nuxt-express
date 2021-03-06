import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Vue from 'vue'
import cloneDeep from 'lodash.clonedeep'
import IndexPage from '~/pages/login'
import store from '~/store/index'

const localVue = createLocalVue()
Vue.use(Vuetify)
localVue.use(Vuex)
localVue.use(Vuetify)

describe('pages/login.vue', () => {
  let wrapper
  let vuetify

  beforeEach(() => {
    wrapper = null
    vuetify = new Vuetify()
    wrapper = mount(IndexPage, {
      store: new Vuex.Store(cloneDeep(store)),
      localVue,
      vuetify
    })
  })

  test('条件を満たした入力がないとボタンを押せない', () => {
    expect(wrapper.find('#login').props().disabled).toBe(true)
  })

  test('フォームに入力でき、入力された値がbindされている', () => {
    wrapper.find('#username').setValue('username')
    wrapper.find('#password').setValue('password')
    expect(wrapper.vm.username).toBe('username')
    expect(wrapper.vm.password).toBe('password')
  })
})

import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Vue from 'vue'
import cloneDeep from 'lodash.clonedeep'
import CreateDishPage from '~/pages/mypage/createDish'
import store from '~/store/index'

const localVue = createLocalVue()
Vue.use(Vuetify)
localVue.use(Vuex)
localVue.use(Vuetify)

describe('pages/mypage/createDish.vue', () => {
  let wrapper
  let vuetify
  // let mock

  beforeEach(() => {
    wrapper = null
    vuetify = new Vuetify()
    // mock = jest.fn()
    wrapper = mount(CreateDishPage, {
      store: new Vuex.Store(cloneDeep(store)),
      localVue,
      vuetify
    })
  })

  test('条件を満たした入力がないとボタンを押せない', () => {
    expect(wrapper.find('.v-btn').props().disabled).toBe(true)
  })

  test('フォームに入力でき、入力された値がbindされている', () => {
    wrapper.find('#dishName').setValue('dishName')
    wrapper.find('#dishUrl').setValue('dishUrl')
    expect(wrapper.vm.dishName).toBe('dishName')
    expect(wrapper.vm.dishUrl).toBe('dishUrl')
  })

  test('ラジオボタンの検証', () => {
    const radios = wrapper.findAll('.v-radio')
    expect(radios.length).toBe(6)
  })

  test('priventをクリックするとsubmitがtrueに変更される', () => {
    expect(wrapper.vm.submit).toBe(false)
    wrapper.vm.prevent()
    expect(wrapper.vm.submit).toBe(true)
  })

  // test('a', () => {
  //   wrapper.setMethods({ prevent: mock })
  //   wrapper.vm.prevent()
  //   expect(mock).toHaveBeenCalled()
  // })
})

import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Vue from 'vue'
import cloneDeep from 'lodash.clonedeep'
import EditPage from '~/pages/mypage/menu/_dishId/edit'
import store from '~/store/index'

const localVue = createLocalVue()
Vue.use(Vuetify)
localVue.use(Vuex)
localVue.use(Vuetify)

describe('pages/mypage/menu/_dishId/edit.vue', () => {
  let wrapper
  let vuetify
  let mockRouterPush

  beforeEach(() => {
    wrapper = null
    vuetify = new Vuetify()
    mockRouterPush = jest.fn()
    wrapper = mount(EditPage, {
      store: new Vuex.Store(cloneDeep(store)),
      localVue,
      vuetify,
      mocks: {
        $router: {
          push: mockRouterPush
        }
      }
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
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

  // test('aaaa', () => {
  //   const mock = jest.fn()
  //   wrapper.setMethods({ edit: mock })
  //   wrapper.find('.v-btn').trigger('click')
  //   expect(mock).toHaveBeenCalled()
  // })

  // test('クリック時に$route.pushが実行される', () => {
  //   wrapper.find('.v-btn').trigger('click')
  //   expect(mockRouterPush.push).toBeCalledWith('/mypage/menu')
  // })
})

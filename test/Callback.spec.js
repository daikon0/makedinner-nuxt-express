import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Vue from 'vue'
import cloneDeep from 'lodash.clonedeep'

import CallbackPage from '~/pages/callback'
import store from '~/store/index'

const localVue = createLocalVue()
Vue.use(Vuetify)
localVue.use(Vuex)
localVue.use(Vuetify)

describe('pages/callback.vue', () => {
  let vuetify
  let guestUserMock
  let routerPushMock

  beforeEach(() => {
    vuetify = new Vuetify()
    guestUserMock = jest.fn()
    routerPushMock = jest.fn()
    mount(CallbackPage, {
      store: new Vuex.Store(cloneDeep(store)),
      localVue,
      vuetify,
      methods: {
        getUser: guestUserMock
      },
      mocks: {
        $router: {
          push: routerPushMock
        }
      }
    })
  })

  test('getUser関数が実行される', () => {
    expect(guestUserMock).toHaveBeenCalled()
  })

  test('$route.pushが実行される', () => {
    expect(routerPushMock).toHaveBeenCalled()
  })
})

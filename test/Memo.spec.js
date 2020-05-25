import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Vue from 'vue'
import cloneDeep from 'lodash.clonedeep'
import MemoPage from '~/pages/mypage/memo/index'
import store from '~/store/index'

const localVue = createLocalVue()
Vue.use(Vuetify)
localVue.use(Vuex)
localVue.use(Vuetify)

describe('pages/mypage/memo/index.vue', () => {
  let wrapper
  let vuetify
  let deleteMock
  let deleteAllMock
  let editMock

  beforeEach(() => {
    wrapper = null
    vuetify = new Vuetify()
    deleteMock = jest.fn()
    deleteAllMock = jest.fn()
    editMock = jest.fn()
    wrapper = mount(MemoPage, {
      store: new Vuex.Store(cloneDeep(store)),
      localVue,
      vuetify,
      methods: {
        memoDelete: deleteMock,
        deleteAll: deleteAllMock,
        edit: editMock
      },
      data: () => {
        return {
          memos: [{ name: 'test', done: false }]
        }
      }
    })
  })

  test('リセットボタンをクリックするとdeleteAll関数が呼び出される', () => {
    wrapper.find('#deleteAll').trigger('click')
    expect(deleteAllMock).toHaveBeenCalled()
  })

  test('リセットボタンをクリックするとdeleteAll関数が呼び出される', () => {
    wrapper.find('#edit').trigger('click')
    expect(editMock).toHaveBeenCalled()
  })

  test('リセットボタンをクリックするとdeleteAll関数が呼び出される', () => {
    wrapper.find('#delete').trigger('click')
    expect(deleteMock).toHaveBeenCalled()
  })

  test('フォームに入力でき、入力された値がbindされている', () => {
    wrapper.find('#name').setValue('testname')
    expect(wrapper.vm.name).toBe('testname')
  })
})

import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { buildTreeLoop } from '@/lib/utils/util'

const allMenus = [
  { id: '1', name: '一级菜单一', level: 1, parentId: null },
  { id: '2', name: '一级菜单二', level: 1, parentId: null },
  { id: '3', name: '一级菜单三', level: 1, parentId: null },
  { id: '1-1', name: '二级菜单一', level: 2, parentId: '1', entry: 'http://localhost:5174', menuPath: '/microApp1' },
  { id: '1-2', name: '二级菜单二', level: 2, parentId: '1' },
  { id: '2-1', name: '二级菜单三', level: 2, parentId: '2' },
  { id: '2-2', name: '二级菜单四', level: 2, parentId: '2' },
  { id: '3-1', name: '二级菜单五', level: 2, parentId: '3' },
]

export const useMenuStore = defineStore('menu', {
  state: () => ({
    allMenus: allMenus, // 所有菜单
    myMenus: [], // 我的菜单
    showMenus: allMenus, // 最终展示的菜单
    activeMenu: {}, // 当前激活的菜单
    // activeMenu: { id: '1-1', name: '二级菜单一', level: 2, parentId: '1', entry: 'http://localhost:5174', menuPath: '/microApp1' }, // 当前激活的菜单
  }),
  getters: {
    // 面包屑导航渲染数据
    activeMenuBreadcrumb: state => {
      const activeParentMenu = state.allMenus.find(menu => menu.id === state.activeMenu.parentId)
      return activeParentMenu ? [activeParentMenu.name, state.activeMenu.name] : []
    },
    // 菜单列表结构转树结构用于渲染
    allMenusTree: state => {
      return buildTreeLoop([...toRaw(state.showMenus)], null, { pKey: 'parentId', cKey: 'id' })
    }
  },
  actions: {
    // 根据菜单名称过滤菜单
    filterMenusByName(name) {
      this.showMenus = this.allMenus.filter((menu) => menu.name.indexOf(name) !== -1)
    },
    // 设置当前激活的菜单
    setActiveMenu(menuId) {
      this.activeMenu = [...toRaw(this.allMenus)].find(menu => menu.id === menuId)
      console.log('setactiveMenu-------')
      sessionStorage.setItem('activeMenu', JSON.stringify(this.activeMenu))
    }
  },
})
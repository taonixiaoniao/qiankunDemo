<template>
	<div>
		<Layout>
			<template #content>
				<a-row>
					<a-col :span="3">
						<div class="input-search-menu">
							<a-input-search placeholder="请输入菜单名称"></a-input-search>
						</div>
					</a-col>
					<a-col>
						<a-breadcrumb style="margin: 16px 0">
							<a-breadcrumb-item v-for="(breadcrumbItem, index) in menuStore.activeMenuBreadcrumb"
								:key="breadcrumbItem + index">{{ breadcrumbItem }}</a-breadcrumb-item>
						</a-breadcrumb>
					</a-col>
				</a-row>
				<a-layout style="padding: 24px 0; background: #fff">
					<a-layout-sider width="200" style="background: #fff">
						<a-menu mode="inline" v-for="menuItem in menuStore.allMenusTree" :key="menuItem.id"
							:selectedKeys="selectedMenuKeys" v-model:openKeys="openMenuKeys" @click="onMenuClick">
							<a-sub-menu :key="menuItem.id">
								<template #title>
									<span>
										{{ menuItem.name }}
									</span>
								</template>
								<a-menu-item v-for="menuChildItem in (menuItem.children || []) " :key="menuChildItem.id">{{
									menuChildItem.name
								}}</a-menu-item>
							</a-sub-menu>
						</a-menu>
					</a-layout-sider>
					<a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
						<RouterView />
					</a-layout-content>
				</a-layout>
			</template>
		</Layout>
	</div>
</template>
<script setup>
import { reactive, ref, computed, nextTick, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import Layout from '@/layout/index.vue'
import { joinUrl } from '@/lib/utils/util'
import { isJson } from '@/lib/utils/is'

const menuStore = useMenuStore()

const router = useRouter()
const route = useRoute()

// 菜单相关处理
function menuFn() {
	const openMenuKeys = ref([])
	const selectedMenuKeys = computed(() => {
		return menuStore.activeMenu?.id ? [menuStore.activeMenu.id] : []
	})
	const onMenuClick = (e) => {
		menuStore.setActiveMenu(e.key)
	}
	const onOpenMenu = openKeys => {
		console.log(openKeys, 'openKeys')
		openMenuKeys.value = [...openMenuKeys.value, openKeys]
	}
	return { onOpenMenu, openMenuKeys, onMenuClick, selectedMenuKeys }
}
const { onOpenMenu, openMenuKeys, onMenuClick, selectedMenuKeys } = menuFn()

// 初始化激活菜单
function initActiveMenu() {
	if (route.name === 'home') return
	const activeMenuStorage = sessionStorage.getItem('activeMenu')
	if (isJson(activeMenuStorage)) {
		const activeMenu = JSON.parse(activeMenuStorage)
		menuStore.setActiveMenu(activeMenu.id)
		// 激活menu设置为open状态
		onOpenMenu(activeMenu?.parentId)
	}
}
initActiveMenu()

watch(() => menuStore.activeMenu, () => {
	if (route.name === 'micro') return
	const from = { path: joinUrl(['/microApp', menuStore.activeMenu.menuPath]) }
	router.push(from)
})

</script>
<style scoped>
.input-search-menu {
	height: 100%;
	padding: 10px 16px 10px 0;
}
</style>
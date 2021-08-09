import Login from '../views/layout/Login.vue';
import v404 from '../views/layout/404.vue';
import Layout from '../views/layout/Layout.vue';
import Home from '../views/layout/Home.vue';
import Iframe from '../views/layout/Iframe.vue';
/* 系统管理 */
import UserManager from '../views/systemManager/User';
import MenuManager from '../views/systemManager/Menu';
import Department from '../views/systemManager/Department';
import ProfileInformation from '../views/systemManager/ProfileInformation';

/* WebServer 临时测试websocket */
import WebServer from '../views/webServer/WebServer';

const routes = [
	{
		path: '/login',
		name: 'Login',
		meta: {
			title: '登录'
		},
		component: Login
	},
	{
		path: '/ws', // 临时测试websocket
		name: 'WebServer',
		meta: {
			title: 'WebServer'
		},
		component: WebServer
	},
	{
		path: '/',
		redirect: '/home',
		name: 'Layout',
		component: Layout,
		children: [
			{
				path: 'home',
				name: 'Home',
				meta: {
					title: '首页',
					aside: {
						isMenu: false
					}
				},
				component: Home
			},
			{
				path: 'system/userManager',
				name: 'UserManager',
				meta: {
					title: '用户管理'
				},
				component: UserManager
			},
			{
				path: 'system/menuManager',
				name: 'MenuManager',
				meta: {
					title: ''
				},
				component: MenuManager
			},
			{
				path: 'system/department', // 部门管理
				name: 'Department',
				meta: {
					title: '部门管理'
				},
				component: Department
			},
			{
				path: 'system/profile',
				name: 'Profile',
				meta: {
					title: '个人信息',
					/* tab: {
						isAdd: false,
						parentRouteName: 'UserManager'
					}, */
					aside: {
						isMenu: false
						/* activedRouteName: 'UserManager' */
					},
					isKeepAlive: true // 是否缓存
				},
				component: ProfileInformation
			},
			{
				path: 'iframe',
				name: 'Iframe',
				meta: {
					title: '外链加载器'
				},
				component: Iframe
			},
			{
				path: '404',
				name: '404',
				meta: {
					title: '404',
					tab: {
						isAdd: true
					}
				},
				component: v404
			}
		]
	},
	{
		path: '*',
		name: '404',
		meta: {
			title: '404'
		},
		component: v404
	}
];

export default routes;

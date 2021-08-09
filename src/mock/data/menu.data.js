import Mock from 'mockjs';

// eslint-disable-next-line import/no-mutable-exports
const menuData = [
	{
		menuName: '系统管理',
		id: 1,
		pid: 0,
		routeUrl: '',
		routeName: ''
	},
	{
		menuName: '菜单管理',
		id: 2,
		pid: 1,
		routeUrl: '/system/menuManager',
		routeName: 'MenuManager'
	},
	{
		menuName: '用户管理',
		id: 4,
		pid: 1,
		routeUrl: '/system/userManager',
		routeName: 'UserManager'
	},
	{
		menuName: '部门管理',
		id: 6,
		pid: 1,
		routeUrl: '/system/department',
		routeName: 'Department'
	}
];
const menuStatusArr = [0, 1];
menuData.forEach(item => {
	item.menuIcon = 'app';
	item.createDate = Mock.Random.datetime();
	item.menuSort = Mock.Random.natural(1, 100);
	item.status = Mock.mock({
		'status|1': menuStatusArr
	}).status;
	item.isShow = 0;
	item.isOutsideLink = 0;
	item.isNewWindow = 1;
	item.btnType = 0;
	item.isDel = 0;
	item.children = null;
});

export default menuData;

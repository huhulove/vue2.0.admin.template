import Mock from 'mockjs';

import { hgetAllParams } from '../../util/htools.web';
import { changeTreeDataToChildren } from '../../util/htools.tree';
import menuData from '../data/menu.data';

/* 菜单列表 */
export const menuListService = () => {
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: menuData
	});
};
/* 登录用户菜单权限 */
export const userMenuAuthorizeService = () => {
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: changeTreeDataToChildren(menuData)
	});
};
/* 菜单添加 */
export const menuAddService = options => {
	const body = JSON.parse(options.body);
	body.createDate = Mock.Random.now();
	if (menuData.length === 0) {
		body.id = 1;
	} else {
		body.id = menuData[menuData.length - 1].id + 1;
	}
	body.children = null;
	body.isDel = 0;
	menuData.push(body);
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 菜单修改 */
export const menuEditService = options => {
	const body = JSON.parse(options.body);
	body.updateDate = Mock.Random.now();
	menuData.forEach((item, index) => {
		if (item.id === body.id) {
			menuData[index] = body;
		}
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 菜单删除 */
export const deleteList = ids => {
	for (let i = 0; i < menuData.length; i++) {
		const item = menuData[i];
		if (ids.indexOf(item.id) > -1) {
			menuData.splice(i, 1);
			i--;
		}
	}
	const newIds = [];
	menuData.forEach(item => {
		if (ids.indexOf(item.pid) > -1) {
			newIds.push(item.id);
		}
	});
	if (newIds.length !== 0) {
		deleteList(newIds);
	}
};
export const menuDeleteService = options => {
	const { ids } = JSON.parse(options.body);
	deleteList(ids);
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: ids
	});
};
/* 菜单详情 */
export const menuDetailService = options => {
	const { id } = hgetAllParams(options.url);
	const result = menuData.filter(item => {
		return item.id === Number(id);
	})[0];
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: { ...result }
	});
};

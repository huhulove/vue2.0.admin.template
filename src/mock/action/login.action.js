import Mock from 'mockjs';
import { allUserData } from './user.action';

/* 登录 */
export const login = options => {
	const allUses = allUserData().result;
	const body = JSON.parse(options.body);
	const result = allUses.filter(item => {
		return item.userName === body.userName && item.userPwd === body.userPwd;
	});
	if (result.length > 0) {
		return Mock.mock({
			code: 200,
			msg: '操作成功',
			result: result[0].id
		});
	}
	return Mock.mock({
		code: 500,
		msg: '用户名账号或密码错误!',
		result: []
	});
};

export default login;

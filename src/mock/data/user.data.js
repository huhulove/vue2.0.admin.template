import Mock from 'mockjs';

const userName = ['admin'];
const userStatus = [0, 1];

const userData = Mock.mock({
	records: [
		{
			id: 1,
			nickName: Mock.Random.cname(),
			createDate: Mock.Random.datetime(),
			updateDate: null,
			userPwd: '123456',
			'userName|1': userName,
			'status|1': userStatus,
			remark: Mock.Random.title(),
			departmentId: 1,
			birthday: null,
			email: null,
			phone: null,
			avatar: null,
			sex: null
		}
	]
});

export default userData.records;

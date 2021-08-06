import Mock from 'mockjs';

const departmentData = [
	{
		id: 1,
		name: '总经办',
		parentId: 0,
		dutyPeopleId: 1
	},
	{
		id: 2,
		name: '测试部门',
		parentId: 1,
		dutyPeopleId: 1
	},
	{
		id: 3,
		name: '测试一部',
		parentId: 2,
		dutyPeopleId: null
	},
	{
		id: 4,
		name: '技术部',
		parentId: 1,
		dutyPeopleId: 1
	},
	{
		id: 5,
		name: '技术一部',
		parentId: 4,
		dutyPeopleId: null
	}
];

departmentData.forEach(item => {
	item.createDate = Mock.Random.datetime();
	item.updateDate = null;
});

export default departmentData;

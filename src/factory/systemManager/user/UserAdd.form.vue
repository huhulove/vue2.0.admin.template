<template>
	<DataForm :model_p="formData" :rules_p="formRules" @cancel="formCancel" @submit="formSubmit">
		<el-form-item label="用户名" prop="userName">
			<Input v-model="formData.userName" placeholder="请输入用户名" />
		</el-form-item>
		<el-form-item label="密码" prop="userPwd" v-if="editId === -1">
			<Input type_p="password" v-model="formData.userPwd" placeholder="请输入密码" />
		</el-form-item>
		<el-form-item label="昵称">
			<Input v-model="formData.nickName" placeholder="请输入昵称" />
		</el-form-item>
		<el-form-item label="部门">
			<SelectTree v-model="formData.departmentId" :data="departmentData" node-key="id"></SelectTree>
		</el-form-item>
		<el-form-item label="状态" prop="status">
			<RadioGroup v-model="formData.status" :data_p="statusData"></RadioGroup>
		</el-form-item>
		<el-form-item label="备注">
			<Input type_p="textarea" :rows_p="4" v-model="formData.remark" />
		</el-form-item>
	</DataForm>
</template>

<script>

import RadioGroup from '@c/ui/RadioGroup';
import Input from '@c/ui/Input';
import DataForm from '@c/ui/DataForm';
import SelectTree from '@c/ui/SelectTree';

// eslint-disable-next-line import/named
import { userAddService, userEditService } from '@s/systemManager/UserService';
import { departmentListService } from '@s/systemManager/DepartmentService';

export default {
	props: ['selectData_p'],
	components: {
		RadioGroup,
		DataForm,
		Input,
		SelectTree
	},
	data() {
		return {
			editId: -1,
			formData: {
				userName: '',
				userPwd: '',
				nickName: '',
				status: 0,
				departmentId: null,
				remark: ''
			},
			formRules: {
				userName: [
					{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					},
					{
						min: 2,
						max: 20,
						message: '长度在 2 到 20 个字符',
						trigger: 'blur'
					}
				],
				userPwd: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}
				]
			},
			departmentData: null,
			statusData: [
				{ label: '正常', value: 0 },
				{ label: '禁用', value: 1 }
			]
		};
	},
	watch: {
		selectData_p: {
			async handler(newValue) {
				this.departmentData === null && (await this.departmentList());
				if (newValue.length > 0) {
					this.editId = newValue[0].id;
					this.formData = { ...newValue[0] };
				}
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {},
	methods: {
		async departmentList() {
			const dataJson = {
				pageIndex: 1,
				pageSize: 10000,
				name: ''
			};
			const res = await departmentListService(dataJson);
			this.departmentData = res.records;
		},
		async formSubmit(valid) {
			if (valid) {
				if (this.editId === -1) {
					await userAddService(this.formData);
				} else {
					const dataJson = {
						id: this.editId,
						...this.formData
					};
					await userEditService(dataJson);
				}
				this.$emit('update:isRefreshList_p', true);
				this.formCancel();
			} else {
				this.$emit('update:isRefreshList_p', false);
			}
		},
		formCancel() {
			this.$emit('update:isShowAEDialog_p', false);
		}
	}
};
</script>

<style lang="less" scoped>
</style>

<template>
	<DataForm :model="formData" :rules="formRules" @cancel="formCancel" @submit="formSubmit">
		<el-form-item label="用户名" prop="userName">
			<Input v-model="formData.userName" placeholder="请输入用户名" />
		</el-form-item>
		<el-form-item label="密码" prop="userPwd" v-if="editId === -1">
			<Input type="password" v-model="formData.userPwd" placeholder="请输入密码" />
		</el-form-item>
		<el-form-item label="昵称">
			<Input v-model="formData.nickName" placeholder="请输入昵称" />
		</el-form-item>
		<el-form-item label="角色" prop="roleIds">
			<Select v-model="formData.roleIds" :optionsData_p="roleData" :optionJson_p="{ label: 'name', value: 'id' }" placeholder="请选择角色" multiple></Select>
		</el-form-item>
		<el-form-item label="部门" v-if="!isSupperAdmin || loginCompanyId === formData.companyId">
			<SelectTree v-model="formData.departmentId" :data="departmentData" node-key="id"></SelectTree>
		</el-form-item>
		<el-form-item label="状态" prop="status">
			<Radio v-model="formData.status" :data_p="statusData"></Radio>
		</el-form-item>
		<el-form-item label="备注">
			<Input type="textarea" :rows="4" v-model="formData.remark" />
		</el-form-item>
	</DataForm>
</template>

<script>
import { hgetStorage } from '@u/htools.web';

import Select from '@c/ui/Select';
import Radio from '@c/ui/Radio';
import Input from '@c/ui/Input';
import DataForm from '@c/ui/DataForm';
import SelectTree from '@c/ui/SelectTree';

// eslint-disable-next-line import/named
import { userAddService, userEditService } from '@s/system/UserService';
// eslint-disable-next-line import/no-cycle
import { roleListService } from '@s/system/RoleService';
import { departmentListService } from '@s/system/DepartmentService';

export default {
	props: ['selectData_p'],
	components: {
		Select,
		Radio,
		DataForm,
		Input,
		SelectTree
	},
	data() {
		return {
			editId: -1,
			loginCompanyId: null,
			isSupperAdmin: false,
			formData: {
				userName: '',
				userPwd: '',
				nickName: '',
				status: 0,
				companyId: 0,
				departmentId: null,
				remark: '',
				roleIds: []
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
				],
				roleIds: [
					{
						required: true,
						message: '请选择角色',
						trigger: 'change'
					}
				]
			},
			roleData: null,
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
				this.roleData === null && (await this.roleList());
				this.departmentData === null && (await this.departmentList());
				if (newValue.length > 0) {
					this.editId = newValue[0].id;
					this.formData = { ...newValue[0] };
					this.$set(this.formData, 'roleIds', newValue[0].roleIds);
				}
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
		if (hgetStorage('roleIds').indexOf(1) > -1) {
			this.isSupperAdmin = true;
		}
		this.loginCompanyId = hgetStorage('companyId');
	},
	methods: {
		async departmentList() {
			const dataJson = {
				pageIndex: 1,
				pageSize: 10000,
				name: ''
			};
			const res = await departmentListService(dataJson);
			console.log(res);
			this.departmentData = res;
		},
		async roleList() {
			const dataJson = {
				pageIndex: 1,
				pageSize: 10000,
				name: ''
			};
			const res = await roleListService(dataJson);
			this.roleData = res.records;
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

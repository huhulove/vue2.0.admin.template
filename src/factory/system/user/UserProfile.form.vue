<template>
	<DataForm ref="profileFormEle" :model="formData" :rules="formRules">
		<el-form-item label="用户名" prop="userName">
			<Input v-model="formData.userName" disabled placeholder="请输入姓名" />
		</el-form-item>
		<el-form-item label="昵称" prop="nickName">
			<Input v-model="formData.nickName" placeholder="请输入姓名" />
		</el-form-item>
		<el-form-item label="性别" prop="sex">
			<Select v-model="formData.sex" :optionsData_p="optionsData" placeholder="请选择性别"></Select>
		</el-form-item>
		<el-form-item label="生日" prop="birthday">
			<el-date-picker v-model="formData.birthday" type="date" placeholder="请选择生日"></el-date-picker>
		</el-form-item>
		<el-form-item label="邮箱" prop="email">
			<Input v-model="formData.email" placeholder="请输入邮箱" />
		</el-form-item>
		<el-form-item label="手机号" prop="phone">
			<Input v-model="formData.phone" type="number" placeholder="请输入手机号" />
		</el-form-item>
		<el-form-item label="公司" prop="company">
			<Input v-model="formData.company" disabled placeholder="请输入公司" />
		</el-form-item>
		<el-form-item label="角色" prop="role">
			<Input v-model="formData.role" disabled placeholder="请输入角色" />
		</el-form-item>
		<el-form-item slot="footer" style="text-align: right">
			<el-button type="primary" @click="formSubmit">确 定</el-button>
		</el-form-item>
	</DataForm>
</template>

<script>
import DataForm from '@c/ui/DataForm';
import Input from '@c/ui/Input';
import Select from '@c/ui/Select';

import { userLoginDetailService, userEditLoginInfoService } from '@s/system/UserService.js';

export default {
	components: {
		DataForm,
		Input,
		Select
	},
	data() {
		const emailValid = (rule, value, callback) => {
			const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (value && !reg.test(value)) {
				callback(new Error('请输入正确的邮箱地址'));
			} else {
				callback();
			}
		};
		const phoneValid = (rule, value, callback) => {
			const reg = /^(?:(?:\+|00)86)?1\d{10}$/;
			if (value && !reg.test(value)) {
				callback(new Error('请输入正确的手机号码'));
			} else {
				callback();
			}
		};
		return {
			optionsData: [
				{
					id: 1,
					name: '男'
				},
				{
					id: 0,
					name: '女'
				}
			],
			formData: {
				userName: null,
				nickName: null,
				sex: null,
				birthday: null,
				email: null,
				phone: null,
				company: null,
				role: null
			},
			formRules: {
				nickName: [
					{
						required: true,
						message: '请输入昵称',
						trigger: 'blur'
					}
				],
				email: [
					{
						validator: emailValid,
						trigger: 'blur'
					}
				],
				phone: [
					{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					},
					{
						validator: phoneValid,
						trigger: 'blur'
					}
				]
			}
		};
	},
	mounted() {
		this.userDetail();
	},
	methods: {
		async userDetail() {
			const dataJson = {};
			const res = await userLoginDetailService(dataJson);
			this.formData = { ...res };
		},
		formSubmit() {
			this.$refs.profileFormEle.$refs.formEle.validate(async valid => {
				if (valid) {
					const dataJson = {
						...this.formData
					};
					await userEditLoginInfoService(dataJson);
				}
			});
		}
	}
};
</script>

<style>
</style>

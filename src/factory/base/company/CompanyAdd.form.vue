<template>
	<DataForm :model="formData" :rules="formRules" @cancel="formCancel" @submit="formSubmit">
		<el-form-item label="机构名称" prop="name">
			<Input v-model="formData.name" placeholder="请输入机构名称" />
		</el-form-item>
		<el-form-item label="联系电话" prop="phone">
			<Input v-model="formData.phone" type="number" placeholder="请输入联系电话" />
		</el-form-item>
		<el-form-item label="邮箱" prop="email">
			<Input v-model="formData.email" placeholder="请输入邮箱" />
		</el-form-item>
		<el-form-item label="用户名" prop="userName" v-if="editId === -1">
			<Input v-model="formData.userName" placeholder="请输入用户名" />
		</el-form-item>
		<el-form-item label="密码" prop="password" v-if="editId === -1">
			<Input v-model="formData.password" type="password" placeholder="请输入密码" />
		</el-form-item>
		<el-form-item label="官方网址" prop="website">
			<Input v-model="formData.website" placeholder="请输入官方网址" />
		</el-form-item>
		<el-form-item label="地址详情" prop="address">
			<Input v-model="formData.address" placeholder="请输入地址详情" />
		</el-form-item>
		<el-form-item label="公司LOGO" prop="website">
			<Upload :action="uploadImgAction" :limit="1" list-type="picture-card" :file-list="logoFile" :on-success="logoSuccessHandler" :isShowTip_p="true">
				<p>公司logo只能上传一张图片</p>
			</Upload>
		</el-form-item>
		<el-form-item label="营业执照" prop="website">
			<Upload
				:action="uploadImgAction"
				:limit="1"
				list-type="picture-card"
				:file-list="licenseFile"
				:on-success="licenseSuccessHandler"
				:isShowTip_p="true"
			>
				<p>营业执照只能上传一张图片</p>
			</Upload>
		</el-form-item>
	</DataForm>
</template>

<script>
import Upload from '@c/ui/Upload';
import Input from '@c/ui/Input';
import DataForm from '@c/ui/DataForm';

// eslint-disable-next-line import/named
import { companyAddService, companyEditService } from '@s/base/CompanyService';

export default {
	props: ['selectData_p'],
	components: {
		DataForm,
		Upload,
		Input
	},
	data() {
		const phoneValid = (rule, value, callback) => {
			const reg = /^(?:(?:\+|00)86)?1\d{10}$/;
			if (value && !reg.test(value)) {
				callback(new Error('请输入正确的手机号码'));
			} else {
				callback();
			}
		};
		const websiteValid = (rule, value, callback) => {
			const reg = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
			if (value && !reg.test(value)) {
				callback(new Error('请输入正确的网址'));
			} else {
				callback();
			}
		};
		return {
			editId: -1,
			formData: {
				name: '',
				phone: '',
				userName: '',
				email: '',
				password: '',
				website: '',
				address: '',
				logo: '',
				businessLicense: ''
			},
			formRules: {
				name: [
					{
						required: true,
						message: '请输入机构名称',
						trigger: 'blur'
					}
				],
				phone: [
					{
						validator: phoneValid,
						trigger: 'blur'
					}
				],
				website: [
					{
						validator: websiteValid,
						trigger: 'blur'
					}
				]
			},
			uploadImgAction: 'http://www.huhulove.com/api/upload/img',
			logoFile: [],
			licenseFile: []
		};
	},
	watch: {
		selectData_p: {
			async handler(newValue) {
				if (newValue.length > 0) {
					this.editId = newValue[0].id;
					this.logoFile = [];
					this.licenseFile = [];
					this.logoFile.push({
						name: newValue[0].logo,
						url: newValue[0].logo
					});
					this.licenseFile.push({
						name: newValue[0].businessLicense,
						url: newValue[0].businessLicense
					});
					this.formData = { ...newValue[0] };
				}
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		logoSuccessHandler(res) {
			this.formData.logo = res.result;
		},
		licenseSuccessHandler(res) {
			this.formData.businessLicense = res.result;
		},
		async formSubmit(valid) {
			if (valid) {
				if (this.editId === -1) {
					await companyAddService(this.formData);
				} else {
					const dataJson = {
						id: this.editId,
						...this.formData
					};
					await companyEditService(dataJson);
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

<style>
</style>

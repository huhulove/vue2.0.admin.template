<template>
	<SearchForm :model_p="formData" @search="searchHandler" :inline_p="true">
		<el-form-item label="用户名称">
			<Input v-model="formData.nickName" placeholder="请输入用户名称" />
		</el-form-item>
	</SearchForm>
</template>

<script>
import SearchForm from '@c/ui/SearchForm';
import Input from '@c/ui/Input';

export default {
	components: {
		SearchForm,
		Input
	},
	data() {
		return {
			formData: {
				nickName: ''
			}
		};
	},
	mounted() {},
	methods: {
		searchHandler() {
			this.$emit('searchForm', this.formData);
		}
	}
};
</script>

<style lang="less" scoped>
</style>

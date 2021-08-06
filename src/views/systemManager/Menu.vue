<template>
	<div class="app-container">
		<ButtonGroup
			@showDialogAdd="showDialogAddHandler"
			@showDialogEdit="showDialogEditHandler"
			@showDelete="showDeleteHandler"
			:selectData_p="selectData"
			:delTips_p="delTips"
		></ButtonGroup>
		<!--表格渲染-->
		<Table
			ref="tableDom"
			:data.sync="tableData"
			:tableColumn_p="tableColumn"
			:selectData_p.sync="selectData"
			row-key="id"
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
		>
			<el-table-column label="状态" width="70">
				<template slot-scope="scope">
					{{ scope.row.status === 0 ? '正常' : '禁用' }}
				</template>
			</el-table-column>
			<el-table-column label="操作" align="left" fixed="right" width="300">
				<template slot-scope="scope">
					<EditRowButton @click="editSingleHandler(scope.row)"></EditRowButton>
					<RemoveRowButton @click="deleteSingleHandler(scope.row)"></RemoveRowButton>
				</template>
			</el-table-column>
		</Table>
		<!-- AEForm -->
		<Dialog :title_p="AEDialogTitle" :visible_p.sync="isShowAEDialog">
			<MenuAEForm v-if="isShowAEDialog" :isShowAEDialog_p.sync="isShowAEDialog" :isRefreshList_p.sync="isRefreshList" :selectData_p="selectData"></MenuAEForm>
		</Dialog>
	</div>
</template>

<script>
import ListMixin from '@m/List.mixin';

import Table from '@c/ui/Table';
import ButtonGroup from '@c/custom/ButtonGroup';
import Dialog from '@c/ui/Dialog';
import EditRowButton from '@c/ui/Button/editRow';
import RemoveRowButton from '@c/ui/Button/removeRow';

import MenuAEForm from '@f/systemManager/menu/MenuAdd.form';

// eslint-disable-next-line import/no-cycle
import { menuListService, menuDeleteService, menuDetailService } from '@s/systemManager/MenuService';

export default {
	mixins: [ListMixin],
	components: {
		Table,
		ButtonGroup,
		Dialog,
		EditRowButton,
		RemoveRowButton,
		MenuAEForm
	},
	data() {
		return {
			// 表格
			tableColumn: [
				{
					label: '菜单名称',
					field: 'menuName',
					columnWidth: 200
				},
				{
					label: 'id',
					field: 'id',
					columnWidth: 55
				},
				{
					label: '排序',
					field: 'menuSort',
					columnWidth: '70'
				},
				{
					label: 'url地址',
					field: 'url',
					columnWidth: '240'
				},
				{
					label: '路由名称',
					field: 'routeName'
				},
				{
					label: '图标',
					field: 'menuIcon',
					type: 'icon'
				}
			],
			delTips: ''
		};
	},
	computed: {
		AEDialogTitle() {
			return this.editId === -1 ? '新增菜单' : '编辑菜单';
		}
	},
	watch: {
		isRefreshList(newValue) {
			if (newValue) {
				this.menuList();
			}
		}
	},
	mounted() {
		this.menuList();
	},
	methods: {
		async menuList() {
			const dataJson = {};
			const res = await menuListService(dataJson);
			this.listMixin(res);
		},
		showDialogAddHandler() {
			this.dialogAddHandlerMixin();
			this.$refs.tableDom.clearSelection();
		},
		async showDialogEditHandler() {
			const editId = this.dialogEditHandlerMixin();
			const dataJson = {
				id: editId
			};
			const res = await menuDetailService(dataJson);
			this.selectData = [res];
		},
		async showDeleteHandler() {
			const ids = this.filterSelectIdsMixin();
			const dataJson = {
				ids: ids
			};
			await menuDeleteService(dataJson);
			this.isRefreshList = true;
		},
		async editSingleHandler(row) {
			const res = await this.menuDetail(row);
			this.editSingleHandlerMixin(res);
		},
		deleteSingleHandler(row) {
			this.deleteSingleHandlerMixin(row);
		},
		async menuDetail(row) {
			const dataJson = {
				id: row.id
			};
			this.editId = row.id;
			const res = await menuDetailService(dataJson);
			return res;
		}
	}
};
</script>

<style>
</style>

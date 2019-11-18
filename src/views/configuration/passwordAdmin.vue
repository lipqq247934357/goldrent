<template>
<div class="loanapproval">
    <div class="passwordAdmin">
        <h3>密码管理</h3>
        <span>用户名：</span>
        <el-input class="searchInput" v-model="userName">
        </el-input>
        <el-button type="primary" style="background: #f68e58;color: #fff;border: 0; margin-left: 10px;" @click="seachButton">
            查询
        </el-button>

        <componentitle :message="message = '密码管理'" />
        <template>
			<el-table
				:data="tableData"
				border
				v-loading="loading"
				element-loading-text="拼命加载中"
				size="small"
				:header-cell-style="{
					'color': '#212121',
					'font-size': '14px',
					'font-weight': 'bold'
				}"
				style="width: 100%">
				<el-table-column
					type="index"
					width="80px"
					label="序号">
				</el-table-column>
				<el-table-column
					prop="userName"
					label="用户名">
				</el-table-column>
				<el-table-column
						prop="name"
						label="操作">
					<template slot-scope="scope">
						<el-button @click="edit(scope.row)" type="text" size="small">重置密码</el-button>
					</template>
	        	</el-table-column>
	        </el-table>
        </template>

		<!-- 分页 -->
		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage2"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="10"
				layout="sizes, prev, pager, next"
				:total="allpage">
			</el-pagination>
		</div>
    </div>

</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../components/title/title.vue';
export default {
    data() {
        return {
            userName: '',
            loading: false,
            tableData: [],
			currentPage: '1',
            pageSize: '10',
            currentPage2: 1,
			allpage: 1,
        }
    },
    created() {
		this.tablepage();
	},
    methods: {
        seachButton() {
			this.loading = true;
			this.currentPage = '1';
			this.tablepage();
        },
		// 分页 页大小
        handleSizeChange(val) {
            this.loading = true;
            this.pageSize = val;
            this.tablepage();
        },
        // 分页 上一页下一页
        handleCurrentChange(val) {
            this.loading = true;
            this.currentPage = val;
            this.tablepage();
        },
		edit(data) {
			this.$confirm('重置后默认密码为jinzu123', '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$post('/user/resetPwd',{
					id: data.id
				}).then(res => {
					if(res.data.code == '2000000') {
						this.$message.success('重置成功');
					} else {
						this.$message.error(res.data.msg);
					}
				});
			}).catch(() => {
				this.$message({
				type: 'info',
				message: '已取消重置'
				});
			});return;

		},
		tablepage() {
            this.$post('/user/listUser',{
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                userName: this.userName,
            }).then(res => {
                if(res.data.code == '2000000') {
                    this.tableData = res.data.data.recordList;
                    this.allpage = res.data.data.totalCount;
                    this.loading = false;
                }
            });
        },
    },
    components: {
        componentitle,
    },
}
</script>
<style lang="less">
.passwordAdmin {
    margin: 20px;
    .searchInput {
        margin: 10px 0;
        width: 30%;
    }
}
</style>

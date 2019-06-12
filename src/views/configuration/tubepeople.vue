<template>
<div class="configuration loanapproval">
    <div class="quanxian">
        <h3>用户权限管理</h3>
        <componentitle :message="message = '用户权限管理'"/>
    </div>
    <div class="configetable">
        <div class="rightTable">
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
                        prop="roleName"
                        label="匹配角色">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="是否授权微信">
                        <template slot-scope="scope">
                            <div @click="updateWXPrivate(scope)">
                                <el-switch
                                        :disabled="scope.row.status === 1"
                                        :value="scope.row.isWxlogin === '1'"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </div>
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
    <el-dialog
        title="用户管理权限"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div class="dialoginput">
            <div class="editdialog">
                <label>用户名：</label>
                <label>{{editname}}</label>

                <div class="dialogcheckbox">
                    <label>选择角色：</label>
                    <template>
                        <el-checkbox-group v-model="matchingId" @change='checkboxData' class="checkedData">
                            <template v-for="(items,index) in roleChoice1">
                                <el-checkbox :key="items.id" :label="items.id">
                                    {{items.roleName}}
                                </el-checkbox>
                            </template>
                        </el-checkbox-group>
                    </template>
                </div>
            </div>

        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogsubmit">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../components/title/title.vue';
export default {
    data() {
        return {
            loading: true,
            tableData: [],
            dialogVisible: false,
            checkedData: [],
            currentPage: '1',
            pageSize: '10',
            currentPage2: 1,
            allpage: 1,
            editname: '',
            roleChoice: [],
            roleChoice1: [],
            matchingId: [],
            userId: ''
        }
    },
    created() {
        this.tablepage();
        this.$get(`/role/listRole?currentPage=1&pageSize=100`).then(res => {
            this.roleChoice = res.data.data.recordList;
            this.roleChoice.forEach((item)=>{
                item.status = 0;
            })
        });
    },
    methods: {
        handleClose() {
            // 关闭弹框
            this.dialogVisible = false;
        },
        checkboxData(val) {
            // console.log(val);
        },
        dialogsubmit() {
            this.$post('/user/role/updataUser',{
                roleId: this.matchingId,
                id: this.userId
            }).then( res => {
                if(res.data.code == '2000000') {
                    this.$message.success('修改成功');
                    this.tablepage();
                    this.dialogVisible = false;
                }
            });
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
        edit(val) {
            // 编辑
            this.checkedData = [];
            this.dialogVisible = true;
            this.editname = val.userName;
            this.matchingId = val.roleId;
            this.userId = val.id;
            this.roleChoice1 = this.roleChoice.map((item) => {
                return {...item, isChecked: this.matchingId.includes(item.id) ? true : false};
            });
        },
        tablepage() {
            this.$post('/user/listUser',{
                currentPage: this.currentPage,
                pageSize: this.pageSize
            }).then(res => {
                if(res.data.code == '2000000') {
                    this.tableData = res.data.data.recordList;
                    this.allpage = res.data.data.totalCount;
                    this.loading = false;
                }
            });
        },
        async updateWXPrivate(scope){
            if(scope.row.status === 1)
                return;
            scope.row.status = 1;
            let currData = this.getData(this.tableData,scope.row.id);
            let tempData = currData.isWxlogin === '1' ? '0' :'1';
            let data = await this.$post('/user/update/iswxlogin', {
                userIds:scope.row.id,
                isWxLogin:tempData
            });
            if(data.data.code == 2000000){
                setTimeout(()=>{
                    currData.isWxlogin = tempData;
                    scope.row.status = 0;
                },100)
            }else {
                scope.row.status = 0;
            }
        },
        getData(data, id) {
            for (let i = 0,len = data.length; i < len; i++) {
                if (data[i].id == id) {
                    return data[i]
                }
            }
        }
    },
    components: {
        componentitle,
    },
}
</script>
<style lang="less">

</style>

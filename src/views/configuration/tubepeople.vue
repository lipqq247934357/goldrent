<template>
<div class="configuration loanapproval">
    <div class="quanxian">
        <h3>用户权限管理</h3>


        <div class="seachDiv">
            <div class="subseachDiv">
                <span>员工编号：</span>
                <el-input
                    class="searchInput"
                    type="text"
                    v-model="staffNo">
                </el-input>
            </div>
            <div class="subseachDiv">
                <span>用户名：</span>
                <el-input
                    class="searchInput"
                    type="text"
                    v-model="userNameSeach">
                </el-input>
            </div>
            <div class="subseachDiv">
                <span>角色：</span>
                <template>
                    <el-select class="choiceselect" placeholder="请选择" v-model="userRole">
                        <el-option
                            v-for="item in roleChoice"
                            :key="item.id"
                            :label="item.roleName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </template>

            </div>
            <el-button
                type="primary"
                style="background: #f68e58;color: #fff;border: 0;"
                @click="seachButton"
                size="mini">
                搜索
            </el-button>
        </div>

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
                        prop="userId"
                        label="员工编号">
                    </el-table-column>
                    <el-table-column
                        prop="departName"
                        label="部门">
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
                            <div @click="updateWXPrivate(scope)" style="display: inline-block;">
                                <el-switch
                                        :disabled="scope.row.status === 1"
                                        :value="scope.row.isWxlogin === '1'"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="是否冻结">
                        <template slot-scope="scope">
                            <div style="display: inline-block;">
                                <el-switch
                                    @change="switchChange(scope.row)"
                                    style="display: block"
                                    v-model="scope.row.freeze"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-value="1"
                                    inactive-value="0"
                                    active-text="是"
                                    inactive-text="否">
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
            userId: '',
            testValue:'' ,// 测试滑块
            staffNo: '', //员工编号
            staffNo: '',   //员工编号
            userNameSeach: '', //用户名
            userRole: '', //角色
            roleoptions: [],
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
        seachButton() {
            this.currentPage = '1';
            this.tablepage();
        },
        handleClose() {
            // 关闭弹框
            this.dialogVisible = false;
        },
        checkboxData(val) {
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
                pageSize: this.pageSize,
                userId: this.staffNo,
                userName: this.userNameSeach,
                roleId: this.userRole
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
                currData.isWxlogin = tempData;
                scope.row.status = 0;
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
        },
        // 是否冻结
        frozen(row) {

            console.log(row.row);
            this.$post('/user/update/freezeUser',{
                userId: row.row.id
            }).then(res => {
                if(res.data.code == '2000000') {
                    console.log(res);
                }
            });
        },
        // 是否冻结选择后之后的提示
        switchChange(val) {
            this.$post('/user/update/freezeUser',{
                userId: val.id,
                freeze: val.freeze
            }).then(res => {
                if(res.data.code == '2000000') {
                    if(val.freeze == '1') {
                        this.$message.warning('冻结成功，复用现有密码错误');
                    }
                } else {
                    this.$message.error(res.data.msg);
                    if(val.freeze == '1') {
                        val.freeze = '0';
                    } else {
                        val.freeze = '1';
                    }
                }
            });

        }
    },
    components: {
        componentitle,
    },
}
</script>
<style lang="less">
.seachDiv {
    margin: 20px 10px;
    .subseachDiv {
        width: 30%;
        display: inline-block;
        margin-right: 10px;
        font-size: 12px;
        color: #606266;
        .searchInput {
            width: 80%;
        }
        span {
            display: inline-block;
        }
    }
}
</style>

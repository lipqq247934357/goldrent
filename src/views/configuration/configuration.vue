<template>
<div class="configuration loanapproval">
    <div class="quanxian">
        <h3>用户权限管理</h3>
        <componentitle :message="message = '用户权限管理'"/>
        <button type="button" name="button" class="releasebutton" @click="releasebutton">新建角色</button>
    </div>
    <div class="configetable">
        <!-- 角色管理表格 -->
        <div class="leftTable">
            <h3>角色管理</h3>
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
                        prop="roleName"
                        label="角色名称">
                    </el-table-column>
                    <el-table-column
                        prop="matchSystem"
                        label="匹配系统">
                        <template slot-scope="scope">
                            <span>{{scope.row.matchSystem == 1 ? 'PC' : "APP"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="deletetable(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!-- 角色管理表格end -->

    </div>
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
    <!-- 弹框 -->
    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div class="dialoginput">
            <div class="namediv" v-if="dialogType == '1'">
                <label>角色名称：</label>
                <el-input placeholder="请输入内容" class="contentinout" v-model="inputName"></el-input>
            </div>
            <div class="selectdiv" v-if="dialogType == '1'">
                <label>匹配系统：</label>
                <template>
                    <el-select v-model="value" placeholder="请选择" class="choiceselect">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                <div class="pc" v-if="value == '2' || value == '0'">
                    <h3>PC选取菜单</h3>
                    <el-checkbox label="全选"></el-checkbox>
                    <el-collapse v-model="activeNames" @change="handleChange" class="dialogcollapse">

                        <el-checkbox-group v-model="checkedData" @change='checkboxData'>
                            <el-collapse-item v-for="(item,index) in tree" :title="item.resourceName" :name="index">
                                <div class="fatherDiv" v-for="subitem in item.authResource">
                                    <el-checkbox :label="subitem.resourceName"></el-checkbox>
                                    <div class="lastchildDiv" v-for="lastchild in subitem.authResource">
                                        <el-checkbox :label="lastchild.resourceName"></el-checkbox>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-checkbox-group>
                    </el-collapse>
                </div>
                <div class="phone" v-if="value == '1' || value == '0'">
                    <h3>移动选取菜单</h3>
                    <template>
                        <el-checkbox-group v-model="checkedData" @change='checkboxData' class="checkedData">
                            <el-checkbox label="报单申请" class="subcheckbox"></el-checkbox>
                            <el-checkbox label="调查任务" class="subcheckbox"></el-checkbox>
                            <el-checkbox label="面签任务" class="subcheckbox"></el-checkbox>
                            <el-checkbox label="业务订单查询" class="subcheckbox"></el-checkbox>
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
            message: '',
            loading: false,
            tableData: [],
            righttableData: [],
            dialogVisible: false,
            dialogType: '',
            inputName: '',
            value: '',
            options: [
                {
                    value: '1',
                    label: '移动报单'
                },
                {
                    value: '2',
                    label: 'PC'
                },
                {
                    value: '0',
                    label: '移动+PC'
                }
            ],
            dialogTitle: '新建角色',
            checkedData: [],
            activeNames: ['1'],
            elcollapse: [
                {
                    title: '业务信息',
                }
            ],
            tree: [],
            currentPage: 1,
            pageSize: '10',
            currentPage2: 1,
            allpage: 1
        }
    },
    created() {
        //PC权限配置树形结构
        this.$get('/resource/listResource').then(res => {
            console.log(res.data.data);
            this.tree = res.data.data;
        });
        this.tablepage();
    },
    methods: {
        tablepage() {
            this.$get(`/role/listRole?currentPage=${this.currentPage}&pageSize=${this.pageSize}`).then(res => {
                this.tableData = res.data.data.recordList;
                this.allpage = res.data.data.totalPage;
                console.log(this.tableData,',,,,,,');
            });
        },
        releasebutton() {
            this.dialogVisible = true;
            this.dialogType = '1';
            this.value = '';
        },
        handleClose() {
            // 关闭弹框
            this.dialogVisible = false;
        },
        checkboxData(val) {
            console.log(val);
        },
        handleChange() {

        },
        dialogsubmit() {
            // 确定按钮
            this.$post('/role/addRole',{
                resourceIds: [],
                roleName: '',
                matchSystem: ''
            }).then(res => {

            });
        },
        handleSizeChange(val) {

        },
        handleCurrentChange(val) {

        },
        edit(val) {
            console.log(val);
            this.$get(`/role/getRoleInfo?roleId=${val.id}`).then(res => {
                console.log(res);
            });
        },
        deletetable(val) {
            this.$post(`/role/deletRole`,{
                roleId: val.id
            }).then(res => {
                if(res.data.code == '2000000') {
                    this.$message.success('删除成功')
                    this.tablepage();
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
.configuration {
    .quanxian {
        width: 96%;
        margin: 0 auto;
        h3 {
            font-size: 16px;
            font-weight: bold;
            margin: 15px auto;
        }
        .releasebutton {
            padding: 5px 10px;
            border-radius: 5px;
            background: #ff8f2b;
            border: 0;
            color: #fff;
            position: absolute;
            right: 15px;
            top: 9px;
        }
    }
    .configetable {
        width: 96%;
        margin: 0 auto;
        display: flex;
        h3 {
            font-size: 16px;
            font-weight: bold;
            margin: 15px auto;
        }
        .leftTable,.rightTable {
            width: 100%;
        }

    }
    .namediv {
        .contentinout {
            width: 70%;
            margin-bottom: 20px;
        }
    }
    .selectdiv {
        .choiceselect {
            width: 70%;
            margin: 0;
        }
        .pc, .phone {
            margin: 20px 0;
            .subcheckbox {
                margin: 15px 10px;
            }
            .fatherDiv {
                margin-left: 30px;
            }
            .lastchildDiv {
                margin: 10px 20px;
            }
        }

    }
    .dialogcheckbox .el-checkbox {
        display: block;
    }
    .editdialog {
        width: 60%;
        margin: 0 auto;
    }
    .checkedData {
        margin: 10px 0 0 65px;
    }
    .dialogcollapse {
        margin: 20px 0;
    }
}
</style>

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
            <h3>用户角色管理</h3>
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
                    <!-- <el-table-column
                        prop="matchSystem"
                        label="匹配系统">
                        <template slot-scope="scope">
                            <span>{{scope.row.matchSystem == 1 ? 'PC' : "APP"}}</span>
                        </template>
                    </el-table-column> -->
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
            <div class="namediv">
                <label>角色名称：</label>
                <el-input placeholder="请输入内容" class="contentinout" v-model="inputName"></el-input>
            </div>
            <div class="selectdiv">
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
                <div class="pc" v-if="value == '1' || value == '0'">
                    <h3>PC选取菜单</h3>
                    <el-tree
                        :data="tree"
                        show-checkbox
                        node-key="id"
                        ref="tree"
                        :auto-expand-parent="true"
                        :default-checked-keys="ids"
                        :default-expanded-keys="ids"
                        @check="treechecked"
                        :props="defaultProps">
                    </el-tree>
                </div>
                <div class="phone" v-if="value == '2' || value == '0'">
                    <h3>移动选取菜单</h3>

                    <template>
                        <el-checkbox
                            :indeterminate="isIndeterminate"
                            v-model="checkAll"
                            @change="handleCheckAllChange">
                            全选
                        </el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group
                            v-model="checkedTask"
                            @change="handleCheckedCitiesChange">
                            <el-checkbox
                                v-for="task in app"
                                :label="task.id"
                                :key="task.id">
                                {{task.resourceName}}
                            </el-checkbox>
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
            inputName: '',
            value: '',
            options: [
                {
                    value: '2',
                    label: '移动报单'
                },
                {
                    value: '1',
                    label: 'PC'
                }
            ],
            dialogTitle: '新建角色',
            checkedData: [],
            tree: [],
            app: [],
            currentPage: 1,
            pageSize: '10',
            currentPage2: 1,
            allpage: 1,
            defaultProps: {
               children: 'authResource',
               label: 'resourceName'
            },
            checkAll: false,
            checkedTask: [],
            taskOptions: [
                {name:'报单申请',id: '0'},
                {name:'调查任务',id: '1'},
                {name: '面签任务',id: '2'},
                {name: '业务订单查询',id: '3'}
            ],
            taskId: [],
            isIndeterminate: true,
            ids: [], // 编辑按钮用于回显选中的树形结构
            editType: '', // 1编辑 0新增
            currentroleId: '', // 编辑是需要用到的角色ID
        }
    },
    created() {
        //PC权限配置树形结构
        this.$get('/resource/listResource').then(res => {
            this.tree = res.data.data.PC;
            this.app = res.data.data.APP;
            for(let i = 0 ; i < this.app.length;i++ ) {
                this.taskId.push(this.app[i].id);
            }
        });
        this.tablepage();
    },
    methods: {
        tablepage() {
            this.$get(`/role/listRole?currentPage=${this.currentPage}&pageSize=${this.pageSize}`).then(res => {
                this.tableData = res.data.data.recordList;
                this.allpage = res.data.data.totalCount;
            });
        },
        releasebutton() {
            this.dialogVisible = true;
            this.inputName = '';
            this.value = '';
            this.ids = [];
            this.editType = '0';
        },
        handleClose() {
            // 关闭弹框
            this.dialogVisible = false;
        },
        checkboxData(val) {
            // console.log(val);
        },
        dialogsubmit() {
            // 确定按钮 editType 1编辑 0 新增
            if(this.inputName == '' || this.value == '') {
                this.$message.error('角色名称或者匹配系统没有填写')
                return;
            }

            if(this.editType == '1') {
                this.$post('/role/updataRole',{
                    resourceIds: this.value == '1' ? this.checkedData : this.checkedTask,
                    type: this.value,
                    roleName: this.inputName,
                    matchSystem: this.value,
                    id: this.currentroleId
                }).then(res => {
                    if(res.data.code == '2000000') {
                        this.$message.success('修改成功');
                        this.dialogVisible = false;
                        this.tablepage();
                        return;
                    }
                });
            }

            if(this.editType == '0') {
                this.$post('/role/addRole',{
                    resourceIds: this.value == '1' ? this.checkedData : this.checkedTask,
                    type: this.value,
                    roleName: this.inputName,
                    matchSystem: this.value
                }).then(res => {
                    if(res.data.code == '2000000') {
                        this.$message.success('新增成功');
                        this.dialogVisible = false;
                        this.tablepage();
                    }
                });
            }

        },
        // 分页 页大小
        handleSizeChange(val) {
            this.pageSize = val;
            this.tablepage();
        },
        // 分页 上一页下一页
        handleCurrentChange(val) {
            this.currentPage = val;
            this.tablepage();
        },
        // 编辑
        edit(val) {
            this.ids = [];
            this.currentroleId = val.id;
            this.editType = '1'; // 编辑
            this.inputName = val.roleName;
            this.value = val.matchSystem;
            this.dialogVisible = true;

            this.$get(`/role/getRoleInfo?roleId=${val.id}`).then(res => {
                if(res.data.code == '2000000') {
                    //this.ids = res.data.data.resourceIds;
                    this.checkedTask = res.data.data.resourceIdapp;
                    const _ids = [...res.data.data.resourceIds];
                    this.ids = this.deepFilter(this.tree, _ids);
                }
            });

        },

        deepFilter(a, ids){
            for(let i=0;i<a.length;i++){
              if(a[i] && a[i].authResource instanceof Array) {
        		const index = ids.findIndex(it => it===a[i].id)
                if (index > -1) {
                   ids.splice(index,1);
                }
        		this.deepFilter(a[i].authResource, ids)
              }
            }
            return ids
        },
        // 删除
        deletetable(val) {
            this.$get(`/role/deletRole?roleId=${val.id}`).then(res => {
                if(res.data.code == '2000000') {
                    this.$message.success('删除成功')
                    this.tablepage();
                }
            });
        },

        treechecked(data,checked) {
            // 获取ID用于新增角色的ajax参数
            this.checkedData = checked.checkedKeys.concat(checked.halfCheckedKeys);
        },
        handleCheckAllChange(val) {
            this.checkedTask = val ? this.taskId : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.taskOptions.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.taskOptions.length;
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

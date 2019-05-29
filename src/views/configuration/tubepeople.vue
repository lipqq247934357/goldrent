<template>
<div class="configuration loanapproval">
    <div class="quanxian">
        <h3>用户权限管理</h3>
        <componentitle :message="message = '用户权限管理'"/>
    </div>
    <div class="configetable">
        <div class="rightTable">
            <h3>用户权限管理</h3>
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
                        prop="bussNo"
                        label="序号">
                    </el-table-column>
                    <el-table-column
                        prop="custName"
                        label="用户名">
                    </el-table-column>
                    <el-table-column
                        prop="startDate"
                        label="匹配角色">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
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
                <label>XXXX：</label>

                <div class="dialogcheckbox">
                    <label>选择角色：</label>
                    <template>
                        <el-checkbox-group v-model="checkedData" @change='checkboxData' class="checkedData">
                            <el-checkbox label="主办人"></el-checkbox>
                            <el-checkbox label="协办人"></el-checkbox>
                            <el-checkbox label="部门负责人"></el-checkbox>
                            <el-checkbox label="审批人"></el-checkbox>
                            <el-checkbox label="资深审批人"></el-checkbox>
                            <el-checkbox label="秘书"></el-checkbox>
                            <el-checkbox label="主任"></el-checkbox>
                            <el-checkbox label="财务"></el-checkbox>
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
            loading: false,
            tableData: [],
            dialogVisible: true,
            checkedData: []
        }
    },
    methods: {
        handleClose() {
            // 关闭弹框
            this.dialogVisible = false;
        },
        checkboxData(val) {
            console.log(val);
        },
        dialogsubmit() {
            
        }
    },
    components: {
        componentitle,
    },
}
</script>
<style lang="less">

</style>

<template>
<div class="loanapproval">
    <div class="appversion">
        <h3>版本发布管理</h3>
        <componentitle :message="message = '手机系统'" />
        <ul class="phonelist">
            <li>手机系统</li>
            <li>Android</li>
        </ul>
    </div>
    <div class="buttomappversion">
        <componentitle :message="message = '发布版本历史'" />
        <el-button type="primary" class="releasebutton" @click="releasebutton" :disabled="submit == 'N'">发布新版</el-button>

        <!-- <button type="button" name="button" class="releasebutton" @click="releasebutton" :disabled="submit =='N'"></button> -->
        <!-- 表格 -->
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
                    prop="versionCode"
                    label="版本号">
                </el-table-column>
                <el-table-column
                    prop="versionName"
                    label="版本名称">
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="说明">
                </el-table-column>
                <el-table-column
                    :formatter="formatterForceUpdate"
                    prop="forceUpdate"
                    label="是否强制更新">
                </el-table-column>
                <el-table-column
                    prop="releaseTime"
                    label="发布时间">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="处理">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row)" type="text" size="small" :disabled="update == 'N'">修改</el-button>
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
                :total="alldata.totalPage">
            </el-pagination>
        </div>
    </div>

    <!-- 弹出框 -->
    <el-dialog
        title="编辑发布信息"
        class="appversioncss"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose">
        <div class="dialogdivtext">
            <ul>
                <li>
                    <div>手机系统：</div>
                    <div>Andriod</div>
                </li>
                <li>
                    <div>版本号：</div>
                    <div>
                        <el-input class="contentinout" placeholder="请输入内容" v-model="versionNo"></el-input>
                    </div>
                </li>
                <li>
                    <div>是否强制更新：</div>
                    <div>
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
                    </div>
                </li>
                <li>
                    <div>安装包：</div>
                    <div>
                        <el-upload
                            class="upload-demo"
                            action="/web/appVersion/upload"
                            :before-remove="beforeRemove"
                            :before-upload="handelupload"
                            :on-success="handleSuccess"
                            :headers="{token:this.token}"
                            :multiple="false"
                            :limit="1"
                            name="package"
                            :file-list="fileList">
                            <el-button size="small" type="primary" class="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </li>
                <li>
                    <div>说明：</div>
                    <div>
                        <el-input
                            type="textarea"
                            class="uppertextareaup"
                            :rows="3"
                            placeholder="请输入"
                            v-model="instructions">
                        </el-input>
                    </div>
                </li>
            </ul>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitFunc" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../components/title/title.vue';
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            dialogVisible: false,
            fullscreenLoading: false,
            message: '',
            tableData: [
                // {
                //     "msg": "success",
                //     "code": "2000000",
                //     "data": {
                //         "currentPage": 1,
                //         "numPerPage": 10,
                //         "totalCount": 2,
                //         "recordList": [
                //             {
                //                 "id": "d4f2c45ec6e54cd8b16a2b6e8de8c8b8",
                //                 "system": "Android",
                //                 "versionCode": "1.01.00",
                //                 "forceUpdate": "N",
                //                 "versionName": "v1.01.00",
                //                 "description": "新版本发布",
                //                 "url": "cGFja2FnZSUyRmFwayUyRjIwMTkwNSUyRjI4ODQ4ODc2Njg4NDA5Mzk1MjY5NTU0OTc5LmFwaw==",
                //                 "releaseTime": "2019-05-15 14:27:43"
                //             },
                //             {
                //                 "id": "ccaa5e0022db49ffa3812518ae96b24c",
                //                 "system": "Android",
                //                 "versionCode": "1.00.00",
                //                 "forceUpdate": "N",
                //                 "versionName": "v1.00.00",
                //                 "description": null,
                //                 "url": "cGFja2FnZSUyRmFwayUyRjIwMTkwNSUyRjI4ODQ4ODc2Njg4NDA5Mzk1MjY5NTU0OTc5LmFwaw==",
                //                 "releaseTime": "2019-05-15 14:04:07"
                //             }
                //         ],
                //         "totalPage": 1,
                //         "beginPageIndex": 1,
                //         "endPageIndex": 1,
                //         "countResultMap": null
                //     }
                // }
            ],
            options: [
                {
                    value: 'Y',
                    label: '是'
                },
                {
                    value: 'N',
                    label: '否'
                }
            ],
            loading: false,
            currentPage2: 1,
            alldata: '',
            page: '1', // 当前页
            pageSize: '10', // 每页显示数
            versionNo: '', // 版本号
            value: '',
            fileList: [],
            id: '',
            url: '',
            instructions: '',
            fileName: {
                filename: ''
            }, // 文件名
            nowtype: '',
            fileIndex: '', // 上传成功需要存储的文件id
            submit: '',
            update: ''
        }
    },
    created() {
        this.pages();
        this.jurisdiction();
        this.token = Cookies.get('token');
    },
    methods: {
        jurisdiction(val) {
            let sonresourceId = this.$route.query.idJurisdiction; // 获取菜单栏的映射到uel上的id来请求ajax活的权限
            this.$get(`/user/get/sonresource?id=${sonresourceId}`).then(res => {
                // 权限ajax
                this.submit = res.data.data.submit;
                this.update = res.data.data.update;
            });
        },
        // 表格分页
        pages() {
            // wike http://wiki.i.beebank.com/pages/viewpage.action?pageId=22516607
            this.$post('/appVersion/history',{
                system: 'Android',
                page: this.page,
                pageSize: this.pageSize
            }).then(res => {
                this.alldata = res.data.data;
                this.tableData = res.data.data.recordList
            })
        },
        handleCurrentChange(val) {
            this.page = val;
            this.pages();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.pages();
        },
        handleSuccess(file,e,filelist) {
            // 请求成功勾子
            this.fileIndex = file.data.fileIndex;
        },
        edit(val) {
            this.dialogVisible = true;
            this.versionNo = val.versionCode;
            this.value = val.forceUpdate;
            this.instructions = val.description;
            this.id = val.id;
            this.url = val.url;
            this.nowtype = '1'; // 1为修改 0为新增;
            let a = {
                'name': val.filename
            }
            this.fileList.push(a);
        },
        handleClose() {
            this.dialogVisible = false;
            this.fileIndex = '';
            this.fileList = [];
        },
        releasebutton() {
            // 发布按钮
            this.dialogVisible = true;
            this.nowtype = '0'; // 1为修改 0为新增;
            this.versionNo = '';
            this.value = '';
            this.instructions = '';
        },
        beforeRemove(file, fileList) {
            // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handelupload(file,filelist) {
            // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
            this.fileName.filename = file.name;
        },
        submitFunc() {
            this.modifyandadd();
        },
        // 新增或者修改
        modifyandadd() {
            const loading = this.$loading({
                                  lock: true,
                                  text: 'Loading',
                                  spinner: 'el-icon-loading',
                                  background: 'rgba(0, 0, 0, 0.7)'
                                });
            this.$post('/appVersion/release',{
                id: this.nowtype == 0 ? '' : this.id,
                versionCode: this.versionNo,
                url: this.nowtype == 0 ?  this.fileIndex : (this.fileIndex || this.url),
                filename: this.fileName.filename,
                system: "Android",
                description: this.instructions,
                forceUpdate: this.value
            }).then(res => {
                if(res.data.code == '2000000') {
                    setTimeout(function() {
                        loading.close();
                    },200);
                    this.fileList = [];
                    this.pages();
                    this.dialogVisible = false;
                }else {
                    this.$message.error({message: res.data.msg, duration: 5 * 1000});
                    setTimeout(function() {
                        loading.close();
                    },200);
                }
            });

        },
        formatterForceUpdate(row, column, cellValue = ''){
            return cellValue === 'Y' ? '是' : '否'
        }
    },
    components: {
        componentitle
    }
}
</script>
<style lang="less">
.appversion ,.buttomappversion {
    width: 96%;
    margin: 0 auto;
    position: relative;
    h3 {
        font-size: 16px;
        font-weight: bold;
        margin: 15px auto;
    }
    .phonelist {
        margin: 15px 0;
        li {
            display: inline-block;
            width: 150px;
            text-align: center;
            height: 50px;
            line-height: 50px;
            border: 1px solid #ffcb9d;
            color: #333;
            &:last-child {
                border-left: 0;
            }
        }
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
.appversioncss {
    .el-dialog__header {
        padding: 10px;
        border-bottom: 1px solid #ffcb9d;
        background: #fff3e9;
        .el-dialog__title {
            color: #d76500;
        }
        .el-dialog__headerbtn {
            top: 13px;
        }
    }
}
.dialogdivtext {
    width: 90%;
    margin: 0 auto;
    .contentinout {
        width: 100%;
    }
    .el-select {
        width: 100%;
    }
    ul {
        li {
            display: flex;
            height: 50px;
            line-height: 50px;
            position: relative;
            div {
                position: relative;
                .el-select {
                    margin-left: 0;
                }
                &:first-child {
                    flex: 3;
                    text-align: right;
                }
                &:last-child {
                    flex: 7;
                }
                .primary {
                    position: absolute;
                    top: -18px;
                    right: 0;
                }
                .el-upload-list {
                    position: absolute;
                    top: -10px;
                    left: 0;
                }
                .el-upload-list__item-name {
                    width: 150px;
                    text-overflow:ellipsis;
                    white-space:nowrap
                }
                .el-icon-close {
                    top: 18px;
                }
            }
        }
    }
}
</style>

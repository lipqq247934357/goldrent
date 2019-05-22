<template>
<div class="loanapproval bannerview">
    <h3 class="bannertitle">Banner图管理</h3>
    <el-button type="primary" class="uploadimg" @click="releasebutton">上传图片</el-button>
    <div class="topdiv bannerimglist">
        <componentitle :message="message = '顶部Banner图管理'" />
        <ul>
            <li v-for="item in topBanner">
                <div class="imgtoptitle">
                    <div>序号{{item.serialNumber}}</div>
                    <div>{{item.title}}</div>
                    <div>
                        <input type="checkbox"
                               name=""
                               :value="item.status"
                               @change="switchchange(item)"
                               :checked="item.status == 1 ? true : false">
                        {{item.status == 1 ? '启用' : '禁用'}}
                    </div>
                </div>
                <img :src="item.url + '&v=' +Math.ceil(Math.random()*10)" alt="" width="90%" height="200">
                <el-button type="primary" class="edit" @click="editupload(item)">编辑</el-button>
            </li>

        </ul>
    </div>
    <div class="bottomdiv bannerimglist">
        <componentitle :message="message = '底部Banner图管理'" />
        <ul>
            <li v-for="item in bottomBanner">
                <div class="imgtoptitle">
                    <div>序号{{item.serialNumber}}</div>
                    <div>{{item.title}}</div>
                    <div>
                        <input type="checkbox"
                               name=""
                               :value="item.status"
                               @change="switchchange(item)"
                               :checked="item.status == 1 ? true : false">
                        {{item.status == 1 ? '启用' : '禁用'}}
                    </div>
                </div>
                <img :src="item.url + '&v=' +Math.ceil(Math.random()*10)" alt="" width="90%" height="200">
                <el-button type="primary" class="edit" @click="editupload(item)">编辑</el-button>
            </li>

        </ul>
    </div>

    <!-- 弹出框 -->
    <form action="/web/banner/addNewBanner" methods="post">
        <el-dialog
            title="编辑发布信息"
            class="appversioncss"
            :visible.sync="dialogVisible"
            width="500px"
            :before-close="handleClose">
            <div class="dialogdivtext">
                <div class="indexNo" v-if="uploadactive == '0'">
                    序号{{indexnNo}}
                </div>
                <ul v-if="uploadactive == '1'">
                    <li>
                        <div>标题：</div>
                        <div>
                            <el-input class="contentinout" placeholder="请输入内容" v-model="bannerTitle"></el-input>
                        </div>
                    </li>
                    <li>
                        <div>序号：</div>
                        <div>
                            <el-input class="contentinout" placeholder="请输入内容" v-model="bannerIndex"></el-input>
                        </div>
                    </li>
                    <li>
                        <div>跳转地址：</div>
                        <div>
                            <el-input class="contentinout" placeholder="请输入内容" v-model="bannerLinkurl"></el-input>
                        </div>
                    </li>

                    <li>
                        <div>图片位子：</div>
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
                        <div>图片：</div>
                        <div>
                            <el-upload
                                class="upload-demo"
                                action="/web/banner/addNewBanner"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                :before-upload="handelupload"
                                :on-success="filesuccess"
                                :multiple="false"
                                :limit="1"
                                :headers="{token:this.token}"
                                ref="uploadsubmit"
                                name="file"
                                :data="{'imageName': bannerTitle,
                                        'serialNumber': bannerIndex,
                                        'redirectUrl': bannerLinkurl,
                                        'position': value
                                }"
                                :auto-upload="false"
                                :file-list="fileList">
                                <el-button size="small" type="primary" class="primary">点击上传</el-button>
                            </el-upload>
                        </div>
                    </li>
                </ul>
                <ul class="editimg" v-if="uploadactive == '0'">
                    <li style="min-height: 200px;">
                        <el-upload
                            class="avatar-uploader"
                            action="/web/banner/modifyBannerPic"
                            :headers="{token:this.token}"
                            :data="{id: imgId}"
                            :show-file-list="false"
                            :limit="1"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="editimageUrl" :src="editimageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </li>
                    <li>
                        <div>标题：</div>
                        <div>
                            <el-input class="contentinout" placeholder="请输入内容" v-model="bannerTitle"></el-input>
                        </div>
                    </li>
                    <li>
                        <div>链接：</div>
                        <div>
                            <el-input class="contentinout" placeholder="请输入内容" v-model="bannerLinkurl"></el-input>
                        </div>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </form>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../components/title/title.vue';
import Cookies from 'js-cookie';
import axios from 'axios';
import qs from 'qs';
export default {
    data() {
        return {
            imageUrl: '',
            dataObj: {},
            dialogVisible: false,
            message: '',
            fileList: [],
            options: [
                {
                    value: 'TOP',
                    label: '顶部Banner'
                },
                {
                    value: 'BOTTOM',
                    label: '底部Banner'
                }
            ], // select 选择
            value: '', // 图片位子绑定
            versionNo: '',
            bannerLinkurl: '',
            bannerIndex: '',
            bannerTitle: '',
            token: '',
            topBanner: [],
            bottomBanner: [],
            activeName: '', //启用 禁用
            uploadactive: '', // 区别是新增还是编辑改变 1新增 0修改
            indexnNo: '', // 当前img 序号
            editimageUrl: '',
            imgstatus: '',
            imgId: '',
            echoimgId: '', // 图片回显ID
        }
    },
    mounted() {
        this.token = Cookies.get('token');


        this.bottombanner();
        this.topbanner();
    },
    methods: {
        releasebutton() {
            // 上传图片
            this.dialogVisible = true;
            this.uploadactive = '1';
            this.bannerTitle = '';
            this.bannerLinkurl = '';
        },
        handleRemove(file, fileList) {
            // 文件列表移除文件时的钩子
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
            // 点击文件列表中已上传的文件时的钩子
        },
        filesuccess(file,e,filelist) {
            // 请求成功勾子
            if(file.code == '2000000') {
                this.$message.success('上传成功')
                this.dialogVisible = false;
                this.bottombanner();
                this.topbanner();
            }
        },
        beforeRemove(file, fileList) {
            // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handelupload(file,filelist) {
            this.dataObj = {
                'imageName': this.bannerTitle,
                'serialNumber':this.bannerIndex,
                'redirectUrl': this.bannerLinkurl,
                'position': this.value
            }
            // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
            // this.fileName.filename = file.name;
        },
        handleClose() {
            // 关闭弹框
            this.dialogVisible = false;
        },
        submit() {
            if(this.uploadactive == '0') {
                let data = new FormData();
                data.append('id',this.imgId);
                data.append('imageName',this.bannerTitle);
                data.append('status',this.imgstatus);
                data.append('redirectUrl',this.bannerLinkurl);
                this.$post('/banner/modifyBanner',data).then(res => {
                    if(res.data.code == '2000000') {
                        this.dialogVisible = false;
                        this.$nextTick(this.topbanner());
                        return;
                    }
                });
            }
            else {
                this.$refs.uploadsubmit.submit();
            }
        },
        // 头部banner
        topbanner() {
            let topdata = new FormData();
            topdata.append('position','TOP');
            this.$post('/banner/getBannerList',topdata).then(res => {
                if(res.data.code == '2000000') {
                    this.topBanner = res.data.data;
                    this.topBanner.forEach(val => {
                        val.url = '/web/fileView?fileId=' + val.imageId;
                    })
                }
            })
        },
        // 底部banner
        bottombanner() {
            let bottomdata = new FormData();
            bottomdata.append('position','BOTTOM');
            this.$post('/banner/getBannerList',bottomdata).then(res => {
                if(res.data.code == '2000000') {
                    this.bottomBanner = res.data.data;
                    this.bottomBanner.forEach(val => {
                        val.url = '/web/fileView?fileId=' + val.imageId;
                    })
                }
            })
        },
        switchchange(item) {
            if(item.status == '1') {
                item.status = '0';
            } else {
                item.status = '1';
            }
            let editdata = new FormData();
            editdata.append('status',item.status);
            editdata.append('id',item.id);
            editdata.append('imageName',item.title);
            editdata.append('redirectUrl',item.redirectUrl);
            this.$post('/banner/modifyBanner',editdata).then(res => {
                if(res.data.code == '2000000') {
                    this.bottombanner();
                    this.topbanner();
                }
            })
            console.log(item);
        },
        editupload(item) {
            console.log(item);
            this.dialogVisible = true;
            this.uploadactive = '0';
            this.indexnNo = item.serialNumber;
            this.editimageUrl = item.url;
            this.bannerLinkurl = item.redirectUrl;
            this.bannerTitle = item.title;
            this.imgstatus = item.status;
            this.imgId = item.id;
            this.echoimgId = item.imageId;
        },
        // 修改图片上传
        handleAvatarSuccess(file) {
            if(file.code == '2000000') {
                this.editimageUrl = '/web/fileView?fileId=' + this.echoimgId + '&v=1' + Math.ceil(Math.random()*10);
                this.$nextTick(function() {
                    this.topbanner()
                }.bind(this),1000);
            }

        },
        beforeAvatarUpload(file) {
            console.log(file)
        }
    },
    components: {
        componentitle,
    },
}
</script>
<style lang="less">
.bannerview {
    .bannertitle {
        font-size: 16px;
        font-weight: bold;
        width: 96%;
        margin: 15px auto;
    }
    .uploadimg {
        position: absolute;
        top: 7px;
        right: 5%;
    }
    .titletop {
        width: 96%;
        margin: 0 auto;
    }
    .topdiv {
        position: relative;
        margin:0 auto;
    }
    .bannerimglist {
        ul {
            width: 96%;
            margin: 15px auto;
            li {
                width: 23%;
                height: 320px;
                border: 1px solid #afafaf;
                display: inline-block;
                margin: 5px 0 0 1%;
                border-radius: 5px;
                overflow: hidden;
                img {
                    margin: 20px auto;
                    display: block;
                    border: 10px solid #afafaf;
                }
                .edit {
                    margin: -5px auto;
                    display: block;
                    padding: 5px 10px;
                    background: #ff8f2b;
                    border: 0;
                }
                .imgtoptitle {
                    display: flex;
                    margin: 10px auto;
                    text-align: center;
                    div {
                        flex: 1;
                        color: #303133;
                        font-size: 12px;
                        line-height: 20px;
                        height: 20px;
                        &:first-child {
                            flex: .8;
                        }
                        &:nth-child(2) {
                            width: 100px;
                            text-overflow:ellipsis;
                            white-space:nowrap;
                            overflow: hidden;
                        }
                        &:last-child {
                            flex: 0.8;
                            font-size: 12px;
                            .el-switch__label * {
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
    .indexNo {
        position: absolute;
        top: 15px;
        right: 60px;
    }
    .editimg {
        text-align: center;
        .avatar-uploader {
            text-align: center;
        }
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
}

</style>

<template>
    <div class="businfo" @keyup.enter="queryFunc">
        <div class="topTitle">
            <componentTitle :message="firstTitle" :titletext="maxTitle"/>
        </div>
        <div class="topcontent">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>如何导入数据</span>
                    <el-button style="float: right; padding: 3px 0" type="button" @click="downTemplate">下载模板</el-button>
                </div>
                <div class="text item">1.下载模板</div>
                <div class="text item">2.在模板内填入订单信息</div>
                <div class="text item">3.上传文件</div>
            </el-card>

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>注意</span>
                </div>
                <div class="text item">1.一笔订单一个文件</div>
                <div class="text item">2.最多支持同时导入5个文件</div>
                <div class="text item">3.承租人和保证人如果有多个,需要将sheet标签里的所有表格复制一下,然后紧接着粘贴在下面,一定不要增删行数或者隔行粘贴,否则会导致导入失败</div>
                <div class="text item">4.承租人和保证人里面的子女或者房产等信息有多条的话,需要复制相应项,由左到右共6列,然后粘贴在右侧紧邻的位置</div>
                <div class="text item">5.请保证填写的信息在excel内就已经达到清晰无误的状态,否则导入的数据有可能会乱码</div>
            </el-card>
        </div>
        
        <div class="topTitle">
            <componentTitle :message="message = '订单数据导入'"/>
            <el-upload
                class="upload-cell"
                ref="upload"
                action="/web/importOrder/single"
                :before-upload="beforeUpload"
                :before-remove="beforeRemove"
                :on-change="onChange"
                :on-success="onSuccess"
                :headers="{token:this.adminToken}"
                :on-exceed="onExceed"
                :multiple="true"
                :limit="5"
                :auto-upload="false"
                :file-list="fileList"
                accept=".xlsx"
                name="file">
                <el-button slot="trigger" size="middle" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="middle" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传xlsx文件，且不超过200kb</div>
            </el-upload>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Cookies from 'js-cookie';
    import componentTitle from '../../components/title/title.vue';

    export default {
        components: {
            componentTitle,
        },
        data() {
            return {
                loading: false,
                firstTitle: '温馨提示', // 第一个标题
                maxTitle: '订单导入', // 大标题
                fileList: [],
                adminToken: ''
            }
        },
        mounted() {
            this.adminToken = Cookies.get('token');
        },
        methods: {
            onChange(file, fileList) {
                this.fileList = fileList;
            },
            onSuccess(response,file,filelist) {
                if(response.code !== "2000000") {
                    this.$message.error(file.name + "导入失败了")
                    file.status = 'fail'    // 隐藏文件列表后面的成功图标
                }
            },
            beforeRemove(file, fileList) {
                // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
                // return this.$confirm(`确定移除 ${ file.name }？`);
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            onExceed(files, fileList) {
                this.$message.error("最多只能上传5个文件")
            },
            beforeUpload(file) {
                if(file.size > 204800) {    // 最大200k
                    this.$message.error("文件" + file.name + "超过200Kb了")
                    return false
                }
                if(file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                    this.$message.error("文件" + file.name + "的类型不支持")
                    return false
                }
                return true
            },
            downTemplate () {
                window.location.href = "/web/importOrder/template"
            }
        },
    }
</script>
<style lang="less" scoped>
    .upload-cell {
        margin: 40px 5px;
        padding: 5px 5px;
        text-align: right;
        // width: 50%;
    }
</style>
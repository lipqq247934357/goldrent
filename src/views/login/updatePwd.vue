<template>
    <div>
        <el-dialog
                :before-close="beforeClose"
                :show-close="false"
                :visible.sync="visible"
                custom-class="pop-class"
                title="更新密码"
                width="30%">
            <div class="update-user-info">
                <el-form label-width="70px" ref="form">
                    <p class="update-pwd-desc">系统检测到您已经三个月未更新登录密码，为保障您的账户安全，请立即更新您的登录密码</p>
                    <el-form-item label="新密码">
                        <el-input size="mini" type="password" v-model="newPwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input size="mini" type="password" v-model="rnewPwd"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="update-pwd-btn" slot="footer">
                <el-button @click="updatePwd" size="small">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: ['showPWD', 'name', 'pwd'],
        data() {
            return {
                updatePasswordPop: '',
                newPwd: '',
                rnewPwd: '',
            }
        },
        computed: {
            visible: {
                get() {
                    return this.showPWD;
                },
                set(val) {
                    this.$emit('update:showPWD', val)
                }
            }
        },
        methods: {
            async updatePwd() {
                let data = await this.$post('user/updateUser', {
                    userName: this.name,
                    oldPwd: this.pwd,
                    newPwd: this.newPwd,
                    rnewPwd: this.rnewPwd
                });
                if (data.data.code === '2000000') {
                    setTimeout(function () {
                        window.location.reload();
                    }, 100);
                }
            },
            beforeClose(done) {
            }
        },

    }
</script>
<style lang="less">

    .update-pwd-desc {
        margin-left: 15px;
        margin-bottom: 20px;
        margin-top: -20px;
        line-height: 20px;
    }

    .update-pwd-btn {
        text-align: center;
        margin-top: -40px;
    }


</style>


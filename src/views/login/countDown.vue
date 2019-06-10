<template>
    <div>
        <el-dialog
                :visible.sync="visible"
                custom-class="pop-class"
                title=""
                top="30vh"
                width="25%">
            <div class="update-user-info">
                请在微信端授权登录！如<span style="color: #ff8f2b;font-size: 15px"> {{count}}s </span>内未授权，需重新登录并授权!
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import Cookies from 'js-cookie';

    export default {
        props: ['id', 'timeOut', 'showCD'],
        data() {
            return {
                countDown: '',
                count: '',
                ajaxWX: '',
            }

        },
        computed: {
            visible: {
                get() {
                    return this.showCD;
                },
                set(val) {
                    this.$emit('update:showCD', val)
                }
            }
        },
        watch: {
            showCD: function (newVal) {
                if (newVal) { // 如果展示，说明开始倒计时，并且发起请求
                    this.udpateCount(); // 重置倒计时
                    this.timeCountDown(); // 倒计时
                    this.getWXStatus(); // 发起ajax请求
                } else { // 清除倒计时,停止ajax请求
                    this.clearTimeOut();
                }
            }
        },
        methods: {
            timeCountDown() {
                // timeOut
                this.count--;
                if (this.count === 0) {
                    this.visible = false;
                    this.clearTimeOut();
                } else {
                    this.countDown = setTimeout(this.timeCountDown, 1000);
                }
            },
            async getWXStatus() {
                let data = await this.$post('/user/query/msg', {id: this.id});
                if (data.data.code === '2000000') {
                    if (!this.visible) return;
                    this.visible = false;
                    this.clearTimeOut();
                    //跳首页
                    Cookies.set('token', data.data.data.token);
                    this.getUserInfo(data.data.data.token); // TODO 获取用户数据
                    this.$router.push('/login');
                } else if (data.data.code === '2000010') {
                    //失败
                    this.visible = false;
                    this.clearTimeOut();
                } else {
                    this.ajaxWX = setTimeout(this.getWXStatus, 250);
                }
            },
            udpateCount() {
                this.count = Number(this.timeOut) + 1;
            },
            clearTimeOut() {
                this.countDown && typeof this.countDown === "function" && clearTimeout(this.countDown);
                this.ajaxWX && typeof this.ajaxWX === "function" && clearTimeout(this.ajaxWX);
            },
            getUserInfo(token) {

            }
        },

    }
</script>
<style lang="less" scoped>

    /*修改个人信息标题和x号水平*/
    /deep/ .el-dialog__header {
        padding: 20px 20px 10px;
    }

    /*修改弹框body部分*/
    /deep/ .el-dialog__body {
        padding: 20px 30px 40px;
    }
</style>


<template>
    <div class="wrapper bkg-white">
        <navbar :title="title" @goback="goback"> </navbar>
        <mobile :title="mbtitle" :value="value" @onSend="onSend" @onChange="onChange"> </mobile>
        <div class="memo">
            <text class="title">登录即注册,表示同意</text>
            <text class="title" style="color:#0088fb">《用户注册协议》</text>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>

<style scoped>
    .memo {
        margin-top: 20px;
        padding-left: 60px;
        padding-right: 60px;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
<script>
    const event = weex.requireModule('event');
    const storage = weex.requireModule('storage');
    import { POST, GET } from '../../assets/fetch'
    import utils from '../../assets/utils'
    import navbar from '../../include/navbar.vue';
    import mobile from '../../include/mobile.vue';

    export default {
        components: {
            navbar,mobile
        },
        props: {
            value: { default: "" },
            title: { default: "登录" },
            mbtitle: { default: "手机验证码登录" }
        },
        created () {
            storage.getItem('mobile', event => {
                if (event.data!="" && event.data!="undefined") {
                    this.value = event.data
                }
            })
        },
        methods: {
            onSend: function (e) {
                var _this = this;
                event.toast(this.value);
                event.encrypt(_this.value,function (message) {
                    event.toast(message);
                    if (message.type=="success") {
                        POST('weex/login/send_mobile.jhtml?mobile=' + message.data).then(
                            function (data) {
                                if (data.type == "success") {
                                    event.openURL(utils.locate('view/login/captcha.js?mobile=' +_this.value),function (e) {
                                        event.closeURL(e);
                                    });
                                } else {
                                    event.toast(data.content);
                                }
                            }, function (err) {
                                event.toast("网络不稳定");
                            }
                        )
                    } else {
                        event.toast(message.content);
                    }
                });
            },
            goback:function(e) {
                event.closeURL();
            },
            onChange: function (e) {
                this.value = e;
            }
        }
    }
</script>
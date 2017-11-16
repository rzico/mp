<template>
    <div class="wrapper bkg-white">
        <navbar :title="title" @goback="goback"> </navbar>
        <mobile :title="mbtitle" :mobile="mobile" :value="value" @onSend="onSend" @onChange="onChange"> </mobile>
        <div class="memo">
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>

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
    import { POST, GET } from '../../../assets/fetch';
    import utils from '../../../assets/utils';
    const event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue';
    import mobile from '../../../include/mobile.vue';

    export default {
        data () {
            return {

            }
        },
        components: {
            navbar,mobile
        },
        props: {
            value: { default: "" },
            title: { default: "设置密码" },
            mbtitle: { default: "输入手机号" }
        },
        created () {
            utils.initIconFont();
        },
        methods: {
            onSend: function (e) {
                var _this = this;
                event.encrypt(_this.value,function (message) {
                    if (message.type=="success") {
                        utils.debug('weex/member/password/check_mobile.jhtml?mobile=' + message.data)
                        POST('weex/member/password/check_mobile.jhtml?mobile=' + message.data).then(
                            function (data) {
                                if (data.type == "success") {
                                    event.openURL(utils.locate("view/member/passowrd/captcha.js?mobile=" +_this.value),
                                        function (resp) {
//                                           event.closeURL(resp);
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
            goBack:function(e) {
                event.closeURL();
            },
            onChange: function (val) {
                this.value = val;
            }
        }
    }
</script>
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
    const modal = weex.requireModule('modal');
    const storage = weex.requireModule('storage');
    import utils from '../../../assets/utils';
    var stream = weex.requireModule('stream');
    var event = weex.requireModule('event');
    import { POST, GET } from '../../../assets/fetch'
    import navbar from '../../../include/navbar.vue';
    import mobile from '../../../include/mobile.vue';

    export default {
        components: {
            navbar,mobile
        },
        props: {
            value: { default: "" },
            title: { default: "绑定手机" },
            mbtitle: { default: "绑定手机号" }
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
                event.encrypt(_this.value, function (message){
                    if (message.type == "success") {
                    POST('weex/member/mobile/send_mobile.jhtml?mobile=' + message.data).then(
                        function (weex) {
                            if (weex.type == "success") {
                                event.openURL(utils.locate("view/member/mobile/captcha.js?mobile=" +_this.value) ,function (res) {
                                    event.closeURL(res);
                                })
                            } else {
                                event.toast(weex.content)
                            }

                        }, function (err) {
                            event.toast(err.content)
                        })
                }
            })
            },
            goback:function(e) {
                event.closeURL();
            },
            onChange: function (e) {
                var _this = this;
                _this.value = e
            }
        }
    }
</script>
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
    const modal = weex.requireModule('modal');
    const storage = weex.requireModule('storage');
    const stream = weex.requireModule('stream');
    const event = weex.requireModule('event');

    import {jsMixins} from '../../mixins/wx.js'
    import navbar from '../../include/navbar.vue';
    import mobile from '../../include/mobile.vue';

    export default {
        mixins:[jsMixins],
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
                return stream.fetch({
                    method: 'POST',
                    type: 'json',
                    url: '/weex/login/send_mobile.jhtml?mobile=' + _this.value
                }, function (weex) {
                    if (weex.ok) {
                        if (weex.data.type == "success") {
                           event.openURL({
                               url:_this.locateURL+"/view/login/captcha.js?mobile=" + _this.value,
                               function (e) {
                                   event.closeURL();
                               }
                           });
                        } else {
                            modal.toast({message:weex.data.content});
                        }
                    } else {
                        modal.toast({message:"网络不稳定请重试"});
                    }
                })
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
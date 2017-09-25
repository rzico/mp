<template>
    <div class="wrapper bkg-white">
        <navbar :title="title" @goback="goback"> </navbar>
        <mobile :title="mbtitle" :mobile="mobile" :value="value" @onSend="onSend" @onChange="onChange"> </mobile>
        <div class="memo">
            <text class="title">自动注册,点击即同意</text>
            <text class="title">《用户注册协议》</text>
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
    var stream = weex.requireModule('stream');
    var event = weex.requireModule('event');
    var app = weex.requireModule('app');

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
                return stream.fetch({
                    method: 'POST',
                    type: 'json',
                    url: '/weex/login/send_mobile.jhtml?mobile=' + this.value
                }, function (weex) {
                    if (weex.ok) {
                        if (weex.data.type == "success") {
                           event.openUrl({
                               url:"file://login/captcha.js?mobile=" + this.value,
                               function (e) {
                                   event.closeUrl();
                               }
                           });
                        } else {
                            native.showToast(weex.data.content);
                        }
                    } else {
                        modal.toast({message:"网络不稳定请重试"});
                    }
                })
            },
            goBack:function(e) {
                event.closeUrl();
            },
            onChange: function (e) {
                modal.toast({message:this.value});
            }
        }
    }
</script>
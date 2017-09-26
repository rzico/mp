<template>
    <div class="wrapper bkg-white">
        <navbar :title="title" @goback="goback"> </navbar>
        <captcha :title="caption" :mobile="mobile" @onclick="onclick"  @onEnd="onEnd"> </captcha>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>


<style scoped>

</style>
<script>
    const modal = weex.requireModule('modal')
    const event = weex.requireModule('event');
    const native = weex.requireModule('app');
    import {jsMixins} from '../../mixins/wx.js'
    import navbar from '../../include/navbar.vue'
    import captcha from '../../include/captcha.vue'
    var stream = weex.requireModule('stream')
    export default {
        mixins:[jsMixins],
        components: {
            navbar,captcha
        },
        props: {
            title: { default: "登录"},
            caption: { default: "输入验证码" },
            captcha: { default: "输入验证码"},
            mobile:{default: ""},
            status:{default:"点击重新发送"}
        },
        created() {
            var bundleUrl = this.$getConfig().bundleUrl;
            var getVal = bundleUrl.split('?')[1];
            var operates = getVal.split('&');

            for (var i=0;i<operates.length;i++){
               var op = operates[i].split('=');
               if (op[0] == "mobile"){
                  this.mobile = op[1];
               }
            }
        },
        methods: {
            goBack:function(e) {
                event.closeUrl();
            },
            onEnd: function (val) {
                this.captcha = val;
                native.encrypt(val,function (data) {
                    return stream.fetch({
                        method: 'POST',
                        type: 'json',
                        url: '/weex/login/captcha.jhtml?captcha=' + data
                    }, function (weex) {
                        if (weex.ok) {
                            if (weex.data.type == "success") {
                                event.openUrl({
                                    url: this.locateURL + "/login/captcha.js",
                                    function (e) {
                                        event.closeUrl();
                                    }
                                });
                            } else {
                                native.showToast(weex.data.content);
                            }
                        } else {
                            modal.toast({message: "网络不稳定请重试"});
                        }
                    })
                })
            }
        }
    }
</script>
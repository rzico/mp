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
    var event = weex.requireModule('event');
    var app = weex.requireModule('app');``
    import navbar from '../../include/navbar.vue'
    import captcha from '../../include/captcha.vue'
    var stream = weex.requireModule('stream')
    export default {
        components: {
            navbar,captcha
        },
        props: {
            title: { default: "登录"},
            caption: { default: "输入验证码" },
            captcha: { default: "输入验证码"},
            mobile:{default: ""}
        },
        created() {
            var bundleUrl = this.$getConfig().bundleUrl();
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
            onEnd: function (e) {
                app.encrypt(this.captcha)
                return stream.fetch({
                    method: 'POST',
                    type: 'json',
                    url: '/weex/login/captcha.jhtml?captcha=' + this.value
                }, function (weex) {
                    if (weex.ok) {
                        if (weex.data.type == "success") {
                            event.openUrl({
                                url:"file://login/captcha.js",
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
                event.closeUrl();
            }
        }
    }
</script>
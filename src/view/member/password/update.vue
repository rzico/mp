<template>
    <div class="captcha">
        <navbar :title="title" @goback="goback"> </navbar>
        <div class="password-header">
            <text class="password-title">{{title}}</text>
        </div>

        <div class="content">
            <text class="title">请为您的账号设置一个新密码</text>
        </div>

        <div class="input-panel">
            <input class="flex5 password passwordadd" type="number" placeholder="请输入新密码" v-model="value"  @change="onchange" @input="oninput"/>
            <div class="flex1 flex-column">
                <text class="see" :style="{fontFamily:'iconfont'}">&#xe61e;</text>
            </div>
        </div>

        <div class="password_panel">
            <text class="button flex1" value="保存新密码" type="primary" @click="save()" >保存新密码</text>
        </div>

    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>


<style scoped>
    .content {
        margin-left: 40px;
        margin-right: 40px;
        margin-top: 60px;
        flex-wrap: wrap;
    }

    .password-title {
        font-size: 48px;
        color: #000;
        flex-wrap: wrap;
    }

    .password-header {
        margin-top: 150px;
        height:100px;
        background-color: #fff;
        flex-direction: column;
        align-items: center;
    }

    .input-panel {
        margin-left: 40px;
        margin-right: 40px;
        margin-top: 60px;
        height: 100px;
        flex-direction: row;
        justify-content:space-between;
        align-items: center;
    }

    .password_panel {
        margin-left: 40px;
        margin-right: 40px;
        margin-top: 60px;
    }
    .passwordadd{
        height: 60px;
    }
</style>
<script>
    import { POST, GET } from '../../../assets/fetch';
    import utils from '../../../assets/utils';
    const event = weex.requireModule('event');
    export default {
        data() {
            return {
                value:this.value,
                captcha:""
            }
        },
        components: {
            navbar,mobile
        },
        props: {
            value: { default: "" },
            title: { default: "设置密码" }
        },
        created(){
            utils.initIconFont();
        },
        methods: {
            save:function () {
                var _this = this;
                event.encrypt(_this.value,function (msg) {
                    if (msg.type="success") {
                        POST('weex/member/password/update.jhtml?enPassword=' + msg.data).then(
                            function (data) {
                                utils.debug(data)
                                if (data.type == "success") {
                                    let backData = utils.message('success','成功');
                                    event.closeURL(backData);
                                } else {
                                    _this.$refs.captcha.endTimer();
                                    event.toast(data.content);
                                }
                            },
                            function (err) {
                                _this.$refs.captcha.endTimer();
                                event.toast("网络不稳定")

                            }
                        )
                    } else {
                        event.toast(msg.content);
                    }
                })
            }
        }
    }
</script>
<template>
    <div class="wrapper bg" v-if="isShow" @onclick="close('error')">
        <div class="box">
            <div class="nav">
                <div class="flex1 flex-center" @click="close('error')">
                    <text class="close" :style="{fontFamily:'iconfont'}" >&#xe60a;</text>
                </div>
                <div class="flex4 flex-center">
                    <text class="caption" >确认付款</text>
                </div>
                <div class="flex1 flex-center">
                    <text class="help"  :style="{fontFamily:'iconfont'}" >&#xe613;</text>
                </div>
            </div>
            <div>
                <text class="currency">¥0.02</text>
            </div>
            <div class="cell">
                <div class="flex-row flex-start">
                    <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6b1;</text>
                    <text class="title ml10">付款详情</text>
                </div>
                <div class="flex-row flex-end">
                    <text class="sub_title" style="margin-right: 20px;">钱包充值</text>
                </div>
            </div>
            <div class="cell">
               <dropdown ></dropdown>
            </div>
            <!--<div class="cell">-->
                <!--<div class="cell-row">-->
                    <!--<text class="ico" :style="{fontFamily:'iconfont'}">&#xe69f;</text>-->
                    <!--<text class="title ml10">付款方式</text>-->
                <!--</div>-->
                <!--<div class="cell-row">-->
                    <!--<text class="sub_title">微信支付</text>-->
                    <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                <!--</div>-->
            <!--</div>-->
            <text class="button btn" value="确定付款" @click="submit()">确定付款</text>
        </div>
        <div class="box" v-if="isPwd()">
            <div class="nav">
                <div class="flex1 flex-center">
                    <text class="close" :style="{fontFamily:'iconfont'}" >&#xe607;</text>
                </div>
                <div class="flex4 flex-center">
                    <text class="caption" >支付密码</text>
                </div>
                <div class="flex1 flex-center">
                    <text class="help" :style="{fontFamily:'iconfont'}" >&#xe607;</text>
                </div>
            </div>
            <text class="hint sub_title">请输入支付密码</text>
            <!--6个验证码框-->
            <div class="inputTextBox" @click="getFocus()">
                <!--隐藏的输入框-->
                <input type="tel" ref="captchRef" v-model="captchaValue" maxlength="6" @input="captchaInput" autofocus="true" class="input" />
                <div  v-for="item in textList" class="inputDiv" >
                    <text class="inputText">{{item}}</text>
                </div>
            </div>
        </div>

    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>

    .bg {
        background-color:rgba(0,0,0,0.5);
    }

    .box {
        width:750px;
        height: 800px;
        position: fixed;
        flex-direction: column;
        align-items: center;
        bottom:0px;
        background-color: #fff;
    }

    .nav {
        flex-direction: row;
        width:750px;
        height:80px;
        background-color: #eee;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
        border-bottom-style: solid;
    }

    .cell {
        margin-top: 20px;
        margin-left: 20px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 730px;
        /*height:80px;*/
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
        border-bottom-style: solid;
    }
    .caption {
        font-size: 38px;
        line-height: 60px;
        color:#999;
    }
    .close {
        font-size: 38px;
        line-height: 60px;
        color:#999;
    }

    .currency {
        font-size: 58px;
        line-height: 80px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .help {
        font-size: 38px;
        line-height: 60px;
        color:#999;
    }

    .hint {
        margin-top: 50px;
    }
    .inputTextBox{
        margin-top: 20px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width:530px;
        position: relative;
    }

    .inputText{
        border-width: 1px;
        border-style: solid;
        border-color: #999;
        width: 80px;
        height:80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
    }
    .inputDiv{
        flex:1;
        align-items: center;
    }
    .input{
        opacity:0;
        width:530px;
        position: absolute;
        height: 80px;
        font-size: 85px;
    }

    .btn {
        margin-left:50px;
        margin-right:50px;
        position: fixed;
        width:650px;
        bottom:50px;
    }

</style>
<script>
    import { POST, GET } from '../assets/fetch';
    import utils from '../assets/utils';
    import dropdown from './dropdown.vue'
    const event = weex.requireModule('event');
    var globalEvent = weex.requireModule('globalEvent');
    var timer = null;
    var optionIndex = 0;
    var lastCaptchaLength = 0;
    export default {
        components: {
            dropdown
        },
        data:function(){
            return{
                sn:"",
                isShow:true,
                captchaValue:'',
                textList:['','','','','',''],
            }
        },
        props: {
            title: { default: "验证码" },
            captcha: {default:""},
            mobile:{default:""},
            status:{default:"点击重新发送"}
        },
        created() {
            utils.initIconFont();
        },
        methods:{
            isPwd:function () {
                return false;
            },
//            当用户输入数字时触发
            captchaInput:function (event) {
                var _this = this;
//                判断删除还是输入  '大于' --> 删除
                if(lastCaptchaLength > event.value.length){
                    optionIndex --;
                    _this.textList[optionIndex] = '';
                }else{
                    let a = event.value;
                    let b = a.substr(a.length-1,1)
                    console.log(event);
                    _this.textList[optionIndex] = b;
                    optionIndex ++;
                }
                lastCaptchaLength = event.value.length;
//                当用户输完验证码后进行系统验证
                if(lastCaptchaLength == 6){
                    _this.captcha = event.value;
                    _this.$emit("onEnd",this.captcha);
                }
            },

//            点击验证框时使隐藏的input获取焦点；
            getFocus:function () {
                this.$refs['captchRef'].focus();
            },

            close (e) {
                var _this = this;
                if (timer!=null) {
                    clearInterval(timer);
                }
                globalEvent.removeEventListener("onResume");
                _this.$emit("notify",e);

            },

            submit (e) {
                var _this = this;
                POST("payment/submit.jhtml?sn="+this.sn+"&paymentPluginId=weixinH5Plugin").then(
                    function (data) {
                        if (data.type=="success") {
                            event.wxPay(data.data.mweb_url,function (e) {
                                globalEvent.addEventListener("onResume", function (e) {
                                    if (timer!=null) {
                                        clearInterval(timer);
                                    }
                                    timer = setInterval(1000,function () {
                                        GET("payment/query.jhtml?sn="+this.sn).then(
                                            function (data) {

                                                if (data.type=="success") {
                                                    if (data.data=="0000") {
                                                        _this.close("success");
                                                    } else {
                                                        if (data.data=="0001") {
                                                            _this.close("error");
                                                        }
                                                    }
                                                }

                                            },
                                            function (err) {
                                            }
                                        )
                                    });
                                });
                            })
                        } else {
                            event.toast(data.data.content);
                            _this.close("error");
                        }
                    },
                    function (err) {
                        event.toast("网络不稳定");
                    }
                )
            }

        }
    }
</script>

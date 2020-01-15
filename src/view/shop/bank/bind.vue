<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"></navbar>
        <wxc-tab-page ref="wxc-tab-page"
                      :tab-titles="list"
                      :tab-styles="tabStyles"
                      :tab-page-height="listHeight"
                      @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
            <div class="page"  :style="{height:listHeight + 'px'}">
                <div class="titleBox">
                    <text class="title">请绑定持卡人本人的银行卡</text>
                </div>
                <div class="nameCell">
                    <text class="ml20 fz32">开户人</text>
                    <div class="nameBox">
                        <input type="text" placeholder="持卡人姓名" class="input" :autofocus="true" v-model="name"/>
                    </div>
                    <text class="nameIco" :style="{fontFamily:'iconfont'}" @click="showAlert">&#xe620;</text>
                </div>
                <div class="cardNoCell">
                    <text class="ml20 fz32">卡号</text>
                    <div class="cardNoBox">
                        <input type="number" placeholder="无需网银/免手续费" class="input" v-model="cardNo"/>
                    </div>
                </div>
                <div class="A3">
                    <text class="toastText">智慧加密，保障你的用卡安全，</text>
                    <text class="toastTextTwo" @click="showAlerttwo">了解安全保障</text>
                </div>
                <div class="button bkg-primary" @click="goTwoStep">
                    <text class="buttonText">下一步</text>
                </div>
            </div>
            <div class="page"  :style="{height:listHeight + 'px'}">
                <div class="twoHeader">
                    <text class="fz32">卡类型</text>
                    <text class="ml30 fz32 gray">{{cardname}}</text>
                </div>
                <div class="mobileCell">
                    <text class="fz32">手机号</text>
                    <input class="mobileInput" type="number" placeholder="请输入手机号" :autofocus="true" v-model="mobile"/>
                </div>
                <div class="mobileCell">
                    <text class="fz32">证件号</text>
                    <input class="mobileInput" type="email" placeholder="请输入证件号码"  v-model="identity"/>
                </div>
                <div class="flex-row mt20 pl20">
                    <text class="fz28 gray">同意</text>
                    <text class="fz28" style="color:#0088fb;">《服务协定》</text>
                </div>
                <div class="button bkg-primary" @click=" goThreeStep">
                    <text class="buttonText" >下一步</text>
                </div>
                <div class="bottomToast">
                    <text class="fz28 gray">资讯加密处理，仅用于银行验证</text>
                </div>
            </div>
            <div class="page"  :style="{height:listHeight + 'px'}">
                <div class="codeBox">
                    <text class="fz28 gray">本次操作需要短信确认，请输入</text>
                    <text class="fz32 gray" > {{mobile}}</text>
                    <text class="fz28 gray">收到的短信验证码</text>
                </div>
                <div class="inputCodeBox">
                    <div class="flex-row">
                        <text class="fz32">验证码</text>
                        <input type="tel" ref="captchRef" v-model="captcha" maxlength="6"  :autofocus="true" class="inputCode" />
                    </div>
                    <div class="flex-end">
                        <text class="status primary" @click="onSend()" :style="statusStyle()" v-if="retry">{{status}}</text>
                        <text class="status gray fz28"  :style="statusStyle()"  v-else> {{time}}秒后刷新</text>
                    </div>
                </div>

                <div class="button bkg-primary" @click="binding()">
                    <text class="buttonText" >绑定</text>
                </div>
            </div>
        </wxc-tab-page>
    </div>
</template>

<style lang="less" src="../../../style/wx.less"/>

<style>
    .page{
        width: 750px;
        position: relative;
    }
    .codeBox{
        flex-wrap: wrap;
        background-color:#ffffff;
        height: 200px;
        align-items:center;
        justify-content: center;
    }
    .inputCode{
        width:450px;
        height: 80px;
        padding-left:50px;
        font-size: 32px;
        line-height: 32px;
    }
    .status {
        min-width: 200px;
        margin-right: 20px;
    }
    .inputCodeBox{
        flex-direction: row;
        background-color:#ffffff;
        margin-top: 30px;
        padding-left: 20px;
        height: 86px;
        border-style:solid;
        border-bottom-width:1px;
        border-top-width: 1px;
        border-color:#ccc;
        align-items:center;
        justify-content: space-between;
    }
    .twoHeader{
        flex-direction: row;
        align-items:center;
        background-color:#ffffff;
        margin-top: 30px;
        padding-left: 20px;
        height: 86px;
        border-style:solid;
        border-bottom-width:1px;
        border-top-width: 1px;
        border-color:#ccc;
    }
    .mobileCell{
        flex-direction: row;
        background-color: #ffffff;
        margin-top: 40px;
        padding-left: 20px;
        height: 86px;
        border-style:solid;
        border-bottom-width:1px;
        border-color:#ccc;
        align-items:center;
    }
    .mobileInput{
        padding-left: 30px;
        font-size: 32px;
        line-height: 32px;
        width:550px;
        height: 80px;
    }

    .bottomToast{
        position: absolute;
        bottom:50px;
        align-items: center;
        justify-content: center;
        left: 0;
        right: 0;
    }

    .nameIco {
        font-size: 45px;
        color: #0088fb;
    }


    .nameBox {
        padding-left: 30px;
        padding-top: 4px;
        width: 550px;
    }

    .cardNoBox {
        padding-left: 62px;
        padding-top: 4px;
        width: 550px;

    }

    .button {
        margin-left: 20px;
        margin-right: 20px;
        height: 82px;
        align-items: center;
        justify-content: center;
        margin-top: 48px;
        border-radius: 15px;
    }

    .A3 {
        flex-direction: row;
        padding-left: 20px;
        padding-top: 20px;
    }

    .cardNoCell {
        flex-direction: row;
        align-items: center;
        height: 86px;
        border-style: solid;
        border-bottom-width: 1px;
        border-color: #ccc;
        background-color: #fff;

    }

    .nameCell {
        flex-direction: row;
        align-items: center;
        height: 86px;
        border-style: solid;
        border-bottom-width: 1px;
        border-color: #ccc;
        background-color: #fff;
    }

    .titleBox {
        border-style: solid;
        border-bottom-width: 1px;
        border-color: #ccc;
        padding-left: 20px;
        padding-top: 32px;
        background-color: #F5F5F5;
        height: 79px;
    }

    .title {
        color: #a9a9a9;
        font-size: 28px;
    }

    .input {
        height: 80px;
        font-size: 32px;
        line-height: 32px;
    }

    .toastText {
        font-size: 28px;
        color: #a9a9a9;
    }

    .toastTextTwo {
        font-size: 28px;
        color: #0088fb;
    }

    .buttonText {
        font-size: 40px;
        color: #fff;

    }
</style>
<script>
    var timer = null;
    const storage = weex.requireModule('storage');
    var modal = weex.requireModule('modal')
    var event = weex.requireModule('event')
    import utils from '../../../assets/utils';
    import navbar from '../../../include/navbar.vue';
    import {POST, GET} from '../../../assets/fetch'
    import {WxcTabPage, BindEnv} from 'weex-ui';

    export default {
        data: function () {
            return {
                pageIndex: 0,
                cardNo: '',
                name: '',
                identity:'',
                mobile:'',
                cardname:'',
                bankname:'',
                banknum:'',
                cardtype:"",
                bankimage:'',
                province:'',
                city:'',
                captcha:'',
                status:'重新发送',
                time:59,
                retry: false,
                clicked: false,
                nowClose:false,
                list:[0,1,2],//该变量几个页面就要有几个值，否者setPage失效
                tabStyles: {
                    bgColor: '#ffffff',// 标签背景色
                    titleColor: '#ffffff',// 标签文本未选中状态颜色
                    activeTitleColor: '#ffffff',// 标签文本选中状态颜色
                    activeBgColor: '#ffffff',// 标签选中状态背景色
                    isActiveTitleBold: true,// 标签选中状态是否使用粗体
                    iconWidth: 0,// 图标宽度
                    iconHeight: 0,// 图标高度
                    width: 0,// 标签宽度
                    height: 0,// 标签高度
                    fontSize: 32,// 标签文本字体大小
                    hasActiveBottom: true,// 选中状态是否带有下划线
                    activeBottomColor: '#ffffff',// 选中状态下划线颜色
                    activeBottomHeight: 6,// 选中状态下划线高度
                    activeBottomWidth: 30,// 选中状态下划线宽度
                    textPaddingLeft: 10,// 文本的padding-left值
                    textPaddingRight: 10// 文本的padding-right值
                },
                headerHeight:136,
                listHeight:1334
            };
        },
        components: {
            navbar, WxcTabPage
        },
        props: {
            title: {default: "绑定银行卡"},

        },

        created() {
            utils.initIconFont();
            this.headerHeight = utils.getHeaderHeight();
            this.listHeight = utils.fullScreen(this.headerHeight);
        },
        beforeDestory() {
            var _this = this;
            if (utils.isNull(timer) == false)  {
                clearInterval(timer);
                _this.time = 59;
                timer = null;
            }
        },
        methods: {
            wxcTabPageCurrentTabSelected(e) {
                this.pageIndex = e.page;
            },
            onSend: function (e) {
                var _this = this;
                _this.captcha = '';
                event.encrypt(_this.mobile, function (message) {
                    if (message.type == "success") {
                        POST('weex/member/bankcard/send_mobile.jhtml?mobile=' + message.data).then(
                            function (data) {
                                if (data.type == "success") {
                                    _this.beginTimer();
                                } else {
                                    event.toast(data.content);
                                }
                            }, function (err) {
                                event.toast(err.content);
                            }
                        )
                    } else {
                        event.toast(message.content);
                    }
                })

            },
            beginTimer: function () {
                var _this = this;
                _this.time = 60;
                _this.retry = false;
                if (utils.isNull(timer) == false) {
                    clearInterval(timer);
                    _this.time = 59;
                    timer = null;
                }
                timer = setInterval(function () {
                    _this.time = _this.time - 1;
                    if (_this.time < 1) {
                        _this.endTimer();
                    }
                }, 1000)
            },
            endTimer: function () {
                var _this = this;
                if (utils.isNull(timer) == false) {
                    clearInterval(timer);
                    _this.time = 59;
                    timer = null;
                }
                _this.clicked =false;
                _this.retry = true;
            },
            statusStyle: function () {
                if (this.retry) {
                    return "margin-right: 20px;";
                } else {
                    return "margin-right: 20px;color:#ccc;";
                }
            },
            showAlert(event) {
                modal.alert({
                    message: '为保证账户资金安全 ，只能绑定认证用户本人的银行卡',
                    okTitle: '知道了',
                    duration: 0.3
                }, function (value) {
                    console.log('alert callback', value)
                })
            },
            showAlerttwo(event) {
                modal.alert({
                    message: '安全保障：智慧风险控管系统即时监控 ，保障你的资金安全',
                    okTitle: '知道了',
                    duration: 0.3
                }, function (value) {
                    console.log('alert callback', value)
                })
            },
            goback: function () {
                if(this.nowClose || this.pageIndex==0){
                    event.closeURL()
                }else if(this.pageIndex == 1){
                    this.$refs['wxc-tab-page'].setPage(0);
                }else if(this.pageIndex == 2){
                    this.$refs['wxc-tab-page'].setPage(1);
                }
            },
            goTwoStep: function () {
                if (this.clicked == true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if (utils.isNull(this.cardNo)) {
                    modal.alert({
                        message: "请输入卡号",
                        okTitle: '知道了'
                    })
                    _this.clicked = false
                    return;
                } else if (utils.isNull(this.name)) {
                    modal.alert({
                        message: "请输入开户名",
                        okTitle: '知道了'
                    })
                    _this.clicked = false
                    return;
                }
                this.clicked = false
                this.query();
            },
            //检查银行卡
            query:function(){
                var _this = this;
                event.encrypt(this.cardNo, function (message) {
                    if (message.type == "success") {
                        POST('weex/member/bankcard/query.jhtml?banknum=' +message.data).then(function (data) {
                                if (data.type == "success" && data.data != '') {
                                    _this.$refs['wxc-tab-page'].setPage(1);
                                    _this.cardname = data.data.cardname;
                                    _this.bankname = data.data.bankname;
                                    _this.banknum = data.data.banknum;
                                    _this.cardtype = data.data.cardtype;
                                    _this.bankimage = data.data.bankimage;
                                    _this.province = data.data.province;
                                    _this.city =data.data.city;
                                } else {
                                    event.toast(data.content);

                                }
                            }, function (err) {
                                event.toast(err.content);
                            }
                        )
                    }
                    else {
                        event.toast(message.content);
                    }
                })
            },
            goThreeStep(){
                if (this.clicked == true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if (utils.isNull(this.mobile)) {
                    modal.alert({
                        message: "请输入手机号",
                        okTitle: '知道了'
                    })
                    _this.clicked =false
                    return;
                }else if (this.mobile.length!=11) {
                    modal.alert({
                        message: "请输入11位手机号",
                        okTitle: '知道了'
                    })
                    _this.clicked =false
                    return;
                }
                if (utils.isNull(this.identity)) {
                    modal.alert({
                        message: "请输入证件号",
                        okTitle: '知道了'
                    })
                    _this.clicked =false
                    return;
                }
                this.$refs['wxc-tab-page'].setPage(2);
                this.clicked = false
                this.onSend()
            },
            binding:function (e){
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if (utils.isNull(this.captcha)) {
                    modal.alert({
                        message: "请输入验证码",
                        okTitle: '知道了'
                    })
                    _this.clicked =false
                    return;
                }
                var  bindData = {
                    cardno : this.cardNo,
                    mobile :this.mobile,
                    identity:this.identity,
                    name:this.name,
                    cardname:this.cardname,
                    bankname:this.bankname,
                    banknum:this.banknum,
                    cardtype:this.cardtype,
                    bankimage:this.bankimage,
                    province:this.province,
                    city:this.city
                };
                let bindDataString = JSON.stringify(bindData);
                event.encrypt(bindDataString, function (message) {
                    if (message.type == "success") {
                        POST('weex/member/bankcard/submit.jhtml?captcha=' +_this.captcha,message.data).then(
                            function (data) {
                                if (data.type == "success") {
                                    _this.clicked = false
                                    //走到这一步，点击返回时直接关掉页面
                                    _this.nowClose = true;
                                    modal.alert({
                                        message: data.content,
                                        okTitle: '知道了'
                                    });
                                    let  mesData = utils.message('success','成功','');
                                    event.closeURL(mesData);
                                } else {
                                    _this.clicked = false
                                    _this.nowClose = true;
                                    _this.endTimer();
                                    event.toast(data.content);
                                }
                            }, function (err) {
                                _this.clicked = false
                                _this.nowClose = true;
                                _this.endTimer();
                                event.toast("网络不稳定");
                            }
                        )
                    }else {
                        _this.clicked = false
                        _this.nowClose = true;
                        _this.endTimer();
                        event.toast(message.content);
                    }
                });
                _this.clicked =false
            },
        }
    }


</script>
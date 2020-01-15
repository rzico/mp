<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"></navbar>
        <div class='headerBox bkg-primary' v-if="status == 0">
            <text class="title">无需添加好友，扫码收款</text>
            <div class="flex-row mt30">
                <div class="menuBox">
                    <div class="flex-row">
                        <text class="menuIcon" :style="{fontFamily:'iconfont'}">&#xe63b;</text>
                        <text class="menuIconTwo">费率</text>
                    </div>
                    <text class="menuText">低至0.38%</text>
                </div>
                <div class="menuBox">
                    <div class="flex-row">
                        <text class="menuIcon" :style="{fontFamily:'iconfont'}">&#xe742;</text>
                        <text class="menuIconTwo">方便</text>
                    </div>
                    <text class="menuText">无需现金</text>
                </div>
                <div class="menuBoxTwo">
                    <div class="flex-row">
                        <text class="menuIcon" :style="{fontFamily:'iconfont'}">&#xe67a;</text>
                        <text class="menuIconTwo">安全</text>
                    </div>
                    <text class="menuText">资金直达</text>
                </div>
            </div>
        </div>
        <div class='statusBox bkg-primary' v-if="status == 1">
            <text class="statusTitle">审核中...</text>
            <text class="statusSubTitle">您的信息已提交成功，审核妹妹会尽快审核您的信息</text>
        </div>
        <div class="memoBox">
            <div class="flex-row">
                <text class="fz32 gray">—</text>
                <text class="memoTitle">为什么要开通收款码?</text>
                <text class="fz32 gray">—</text>
            </div>
            <text class="memoSubTitle">推出无现金业务，免去送货员收款、缴款、对账等繁琐工作，资金直达店主账户，安全零差错。收单手续费低至0.38%，同时支持信用卡及借记卡。</text>
        </div>
        <div class="buttonBox bkg-primary" @click='submit()' v-if="status == 0">
            <text class='buttonBoxText'>立即开通</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .headerBox{
        width: 750px;
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
    }
    .title{
        font-size: 60px;
        color: #ffffff;
        font-weight: 600;
    }
    .menuBox{
        flex-direction: column;
        align-items: center;
        width: 220px;
        border-right-width: 1px;
        border-right-color: rgba(255,255,255,0.5);
    }
    .menuBoxTwo{
        flex-direction: column;
        align-items: center;
        width: 220px;
    }
    .menuIcon{
        font-size: 38px;
        color: gold;
    }
    .menuIconTwo{
        font-size: 35px;
        margin-left: 10px;
        color: gold;
    }
    .menuText{
        font-size: 26px;
        margin-top: 5px;
        color: #ffffff;
    }
    .memoBox{
        width: 750px;
        flex-direction: column;
        align-items: center;
        margin-top: 100px;
    }
    .memoTitle{
        font-size: 32px;
        font-weight: 600;
        margin-left: 20px;
        margin-right: 20px;
    }
    .memoSubTitle{
        margin-top: 20px;
        max-width: 550px;
        font-size: 26px;
        color: #777;
    }
    .statusBox{
        width: 750px;
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-left: 40px;
        padding-right: 40px;
        box-sizing: border-box;
    }
    .iconBox{
        width: 50px;
        height: 50px;
        border-width: 3px;
        border-color: #ffffff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
    }
    .icon{
        font-size: 35px;
        color: #fff;
        line-height: 35px;
    }
    .statusTitle{
        font-family: PingFangSC;
        font-size: 50px;
        color: #ffffff;
    }
    .statusSubTitle{
        font-family: PingFangSC;
        font-size: 28px;
        color: #ffffff;
        margin-top: 20px;
    }

    .buttonBox{
        width: 700px;
        height: 100px;
        border-radius: 50px;
        background-color: #808080;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        bottom: 20px;
        left: 25px;
    }
    .buttonBoxText{
        font-family: PingFangSC;
        font-size: 50px;
        color: #ffffff;
    }

</style>
<script>
    import {POST, GET} from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    const modal = weex.requireModule('modal');
    const event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue';
    export default {
        data() {
            return {
                status:0,
                clicked:false
            }
        },
        props: {
            title: {default: "开通收款码"}
        },
        components: {
            navbar,
        },
        created() {
            let _this = this;
            utils.initIconFont();
            if(!utils.isNull(utils.getUrlParameter('status'))){
                _this.status = 1;
            }
        },
        beforeDestory() {

        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            submit(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate('view/shop/bank/bind.js'), function (mes) {
                    if (mes.type == "success") {
                        event.openURL(utils.locate('view/shop/shop/newShop.js'), function (res) {
                            if(res.type == "success"){
                                _this.status = 1;
                            }
                        })
                    }
                })
            },
        }
    }
</script>

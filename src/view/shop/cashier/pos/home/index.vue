<template>
    <div class="wrapper">
        <div class="headerBox" :class="[classHeader(),border==true?'':'cb']" >
            <text class="headerIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
            <text class="headerTitle">xxx门店开单系统</text>
        </div>
        <div class="contentBox">
            <div class="buttonBox">
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">销售开单</text>
            </div>
            <div class="buttonBox" @click='linkToReport'>
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">报表查询</text>
            </div>
            <div class="buttonBox">
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">门店日结</text>
            </div>
            <div class="buttonBox" @click='linkToAdmin'>
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">人员管理</text>
            </div>
            <div class="buttonBox" @click='linkToMes'>
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">系统消息</text>
            </div>
            <div class="buttonBox" @click='linkToSetting'>
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">系统设置</text>
            </div>
            <div class="buttonBox" @click='linkToPassword'>
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">密码修改</text>
            </div>
            <div class="buttonBox">
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">银联签到</text>
            </div>
            <div class="buttonBox" @click="goback">
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">系统退出</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../../../../style/wx.less"/>
<style>
    .cb {
        border-bottom-width: 0px;
    }
    .wrapper{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color:#fff;
        align-items: center;
    }
    .headerBox{
        width: 750px;
        height: 136px;
        padding-top: 44px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position:sticky;
    }
    .headerIcon{
        font-size: 80px;
    }
    .headerTitle{
        font-size:40px;
        margin-left: 100px;
    }
    .contentBox{
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        width: 750px;
        padding-top:100px;
    }
    .buttonBox{
        width: 250px;
        flex-direction: column;
        align-items: center;
        margin-bottom: 100px;
    }
    .contentIcon{
        font-size:100px;
    }
    .buttonText{
        font-size:32px;
        margin-top: 10px;
    }
</style>
<script>
    import { POST, GET } from '../../../../../assets/fetch';
    var event = weex.requireModule('event');
    import utils from '../../../../../assets/utils';
    export default {
        components: {

        },
        data() {
            return {

            }
        },
        props: {

        },
        created() {
            utils.initIconFont();
        },
        methods:{
            goback: function (e) {
                event.closeURL();
            },
            classHeader:function () {
                let dc = utils.device();

                return dc
            },
            linkToReport(){
                event.openURL(utils.locate("view/shop/cashier/pos/report/index.js"),function (e) {});
            },
            linkToAdmin(){
                event.openURL(utils.locate("view/shop/cashier/pos/admin/index.js"),function (e) {});
            },
            linkToMes(){
                event.openURL(utils.locate("view/shop/cashier/pos/message/index.js"),function (e) {});
            },
            linkToSetting(){
                event.openURL(utils.locate("view/shop/cashier/pos/setting/index.js"),function (e) {});
            },
            linkToPassword(){
                event.openURL(utils.locate("view/shop/cashier/pos/password/index.js"),function (e) {});
            }

        }
    }
</script>
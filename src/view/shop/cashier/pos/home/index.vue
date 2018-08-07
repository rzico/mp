<template>
    <div class="wrapper">
        <div class="headerBox">
            <text class="headerIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
            <text class="headerTitle">xxx门店开单系统</text>
        </div>
        <div class="contentBox">
            <div class="buttonBox">
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">销售开单</text>
            </div>
            <div class="buttonBox">
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">报表查询</text>
            </div>
            <div class="buttonBox">
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">门店日结</text>
            </div>
            <div class="buttonBox">
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">人员管理</text>
            </div>
            <div class="buttonBox">
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">系统消息</text>
            </div>
            <div class="buttonBox">
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">系统设置</text>
            </div>
            <div class="buttonBox">
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">密码修改</text>
            </div>
            <div class="buttonBox">
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">银联签到</text>
            </div>
            <div class="buttonBox">
                <text class="contentIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <text class="buttonText">系统退出</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .headerBox{
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 750px;
        border-bottom-color: #999999;
        border-bottom-width: 1px;
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
    }
    .buttonBox{
        width: 250px;
        flex-direction: column;
        align-items: center;
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
    import { POST, GET } from '../../assets/fetch';
    var event = weex.requireModule('event');
    import utils from '../../assets/utils';
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

        }
    }
</script>
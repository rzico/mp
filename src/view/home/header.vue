<template>
    <div >
        <div class="header cell-bottom-clear" :class="[classHeader()]">
            <div class="nav" style="width:750px;">
                <div class="flex-center logoBox ">
                    <image class="logo" :src="logoImg" ></image>
                </div>
                <div class="search_box " @click="search()" >
                    <text class="ico_small gray searchMLMR fzz24" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                    <text class="sub_title  fzz24">搜索用户专栏和文章</text>
                </div>
                <!--<div class="flex-center flex1 ml10"  style="justify-content: flex-end;" @click="scan()" >-->
                    <!--<text class="scan fz40 flex-row" style="width: 59px;" :style="{fontFamily:'iconfont'}" >&#xe607;</text>-->
                <!--</div>-->
                <!--750/8=93.75-->
                <!--<div class="flex-center flex1" style="justify-content: flex-end;" @click="menu()" >-->
                    <!--<text class="scan" :style="{fontFamily:'iconfont'}" >&#xe72b;</text>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .searchMLMR{
        margin-left: 14px;
        margin-right: 14px;
    }
    .fzz24{
        font-size: 27px;
        color:#666;
    }
    .search_box {
        margin-left: 22px;
        margin-right: 22px;
        width:620px;
        /*height: 66px;*/
        /*height: 50px;*/
        height: 60px;
        border-width: 1px;
        border-color: #ccc;
        border-style: solid;
        /*border-radius:8px;*/
        border-radius:10px;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        background-color: white;
    }
    .logoBox{
        height: 58px;
        width: 58px;
        margin-left: 22px;
    }
    .logo {
        /*height:55px;*/
        /*width:55px;*/
        height:58px;
        width:58px;
        border-radius:6px;
    }
    /*.scan {*/
        /*font-size: 50px;*/
        /*line-height: 60px;*/
        /*height:60px;*/
        /*width:73px;*/
        /*color:white;*/
    /*}*/
</style>
<script>


    const event = weex.requireModule('event');
    const dom=weex.requireModule("dom");
    import utils from '../../assets/utils';
    import { SCAN} from '../../assets/fetch';
    export default {
        data:function () {
          return{
              logoImg:utils.locate('resources/logo.png')
          }
        },
        created() {
        },
        methods: {
            classHeader:function () {
                let dc = utils.device();
                return dc
            },
            menu:function (e) {
                this.$emit('menu');
            },
            search:function(w){
                this.$emit('search',this.keyword);
            },
//            触发自组件的二维码方法
            scan:function () {
                event.scan(function (message) {
                    SCAN(message,function (data) {
                    },function (err) {
                    })
                });
            },
        }
    }
</script>
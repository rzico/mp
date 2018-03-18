<template>
    <div >
        <div class="header cell-bottom-clear" :class="[classHeader()]">
            <div class="nav" style="width:750px;">
                <!--<div class="flex-center flex1" >-->
                    <!--<image class="logo" :src="'file://resources/logoWhite.png'" ></image>-->
                <!--</div>-->
                <div class="search_box flex6" @click="search()">
                    <text class="ico_small gray mr5" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                    <text class="sub_title ml5">搜索用户和文章</text>
                </div>
                <div class="flex-center flex1 ml10"  style="justify-content: flex-end;" @click="scan()" >
                    <text class="scan fz40 flex-row" style="width: 59px;" :style="{fontFamily:'iconfont'}" >&#xe607;</text>
                </div>
                <!--750/8=93.75-->
                <div class="flex-center flex1" style="justify-content: flex-end;" @click="menu()" >
                    <text class="scan" :style="{fontFamily:'iconfont'}" >&#xe72b;</text>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .search_box {
        /*padding-left: 30px;*/
        margin-left: 32px;
        /*height: 66px;*/
        height: 50px;
        border-width: 1px;
        border-color: #ccc;
        border-style: solid;
        /*border-radius:8px;*/
        border-radius:10px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: white;
    }
    .logo {
        /*height:55px;*/
        /*width:55px;*/
        height:66px;
        width:66px;
        border-radius:6px;
    }
    .scan {
        font-size: 50px;
        line-height: 60px;
        height:60px;
        width:73px;
        color:white;
    }
</style>
<script>


    const event = weex.requireModule('event');
    const dom=weex.requireModule("dom");
    import utils from '../../assets/utils';
    import { SCAN} from '../../assets/fetch';
    export default {
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
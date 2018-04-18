<template>
    <div >
        <div class="headers cell-bottom-clear" :class="[classHeader()]">
            <div class="navContent" style="width:750px;">
                <image class="image" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/liveHeader.png"></image>
                <div class="imageContent">
                <text class="titleOne">芸店VIP</text>
                <text class="titleTwo">vip直播商城</text>
                <div class="button">
                    <text class="buttonText">我要直播</text>
                </div>
                </div>
                <div   style="position: absolute;top: 70px;right: 80px" @click="scan()" >
                    <text class="scan fz40 flex-row" style="width: 59px;" :style="{fontFamily:'iconfont'}" >&#xe607;</text>
                </div>
                <!--750/8=93.75-->
                <div style="position: absolute;top: 70px;right: 10px" @click="menu()" >
                    <text class="scan" :style="{fontFamily:'iconfont'}" >&#xe72b;</text>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .headers {
        flex-direction: row;
        position:sticky;
    }
    .navContent{
        width:750px;
        height: 300px;
        justify-content: center;
        align-items: center;
        margin-top: 0px;
    }
    .imageContent{
        width: 300px;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top:0;
        left:225px;
    }
    .image{
        width: 750px;
        height: 300px;
    }
    .titleOne{
        font-size: 50px;
        color: white;
        font-weight: bold;
        margin-top: 60px;
    }
    .titleTwo{
        margin-top: 10px;
        font-size: 32px;
        color: white;
        font-weight: bold;
    }
    .button{
        margin-top: 20px;
        align-items: center;
        justify-content: center;
        width: 300px;
        padding-left: 40px;
        padding-right: 40px;
        padding-top:5px;
        padding-bottom: 5px;
        background-color: yellow;
        border-radius: 40px;
    }
    .buttonText{
        font-size: 40px;
        color: #EB4E40;
        font-weight: bold;
    }
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
        data:function () {
          return{
              imageUrl:utils.locate('resources/images/liveHeader.png'),
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
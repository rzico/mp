<template>
    <div >
        <div class="headers cell-bottom-clear" >
            <div class="navContent" style="width:750px;">
                <image class="image" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/liveHeader.png"></image>
                <div class="imageContent" :class="[classTop()]">
                <text class="titleOne">芸店VIP</text>
                <text class="titleTwo">VIP直播商城</text>
                <div class="button" @click="doLive()">
                    <text class="buttonText">我要直播</text>
                </div>
                </div>
                <div class="iconOne" :class="[classTop()]"  @click="scan()" >
                    <text class="scan fz40"  :style="{fontFamily:'iconfont'}" >&#xe607;</text>
                </div>
                <!--750/8=93.75-->
                <div class="iconTwo" :class="[classTop()]" @click="menu()" >
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
        height: 258px;
        justify-content: center;
        align-items: center;
        margin-top: 0px;
    }
    .imageContent{
        width: 300px;
        flex-direction: column;
        align-items: center;
        position: fixed;
        top:44px;
        left:225px;
    }
    .image{
        width: 750px;
        height: 258px;
    }
    .titleOne{
        font-size: 40px;
        color: white;
        font-weight: bold;
        line-height:88px;
        height:88px;
        text-align: center;
    }
    .titleTwo{
        font-size: 24px;
        color: white;
    }
    .iconOne{
        height: 88px;width: 59px;line-height:88px;text-align: center;position: fixed;top: 54px;right: 80px;
    }
    .iconTwo{
        height: 88px;width: 59px;line-height:88px;text-align: center;position: fixed;top: 54px;right: 10px
    }
    .button{
        margin-top: 10px;
        align-items: center;
        justify-content: center;
        padding-left: 40px;
        padding-right: 40px;
        padding-top:5px;
        padding-bottom: 5px;
        background-color: yellow;
        border-radius: 40px;
    }
    .buttonText{
        font-size: 34px;
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
    const livePlayer = weex.requireModule('livePlayer');
    const event = weex.requireModule('event');
    const dom=weex.requireModule("dom");
    import utils from '../../assets/utils';
    import { SCAN} from '../../assets/fetch';
    import { POST, GET } from '../../assets/fetch';
    export default {
        data:function () {
          return{
              imageUrl:utils.locate('resources/images/liveHeader.png'),
              clicked:false
          }
        },
        created() {
        },
        methods: {
            //             开通专栏
            create:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;

            },
            //            我要直播
            doLive(){
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)

                GET('weex/live/check.jhtml?memberId=' + event.getUId(),function (data) {
                    if(data.type == 'success' && !utils.isNull(data.data)){
//                            开始直播
//                        event.toast("当前APP版本不支持直播");
                        livePlayer.toPlayLiveRoom(data.data.liveId,false,false,function(mes){});

                    }else
                    if (data.type == 'success' && utils.isNull(data.data)) {
                        POST('weex/member/topic/submit.jhtml').then(
                            function (data) {
                                if (data.type == 'success') {
//                                            跳转专栏
                                    event.openURL(utils.locate('view/member/topic/index.js'),function (data) {

                                    });

                                } else {
                                    event.toast(err.content)
                                }
                            },function (err) {
                                event.toast(err.content)
                            })

                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })

            },
            //            监听设备型号,控制导航栏
            classTop:function () {
                let dc = utils.addTop();
                return dc;
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
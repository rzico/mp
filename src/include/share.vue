<template>
    <div >
        <!--<div class="mask" @click="maskTouch"></div>-->
        <div class="shareBox">
            <div style="width: 750px;align-items: center">
                <text class="fz30 pt30 " style="color: #444">分享到</text>
            </div>
            <div>
                <div class="bottomBorder shareLineBox" >
                    <div  class="singleBox" @click="doShare(0)">
                        <div class="imgBox"  @click="doShare(0)">
                            <image class="shareImg" :src="timeLineImg" ></image>
                            <!--<text class="shareImg " style="font-size: 90px;"  :style="{fontFamily:'iconfont'}">&#xe625;</text>-->
                        </div>
                        <text class="fz28 mt20 color444" >朋友圈</text>
                    </div>
                    <div class="singleBox" @click="doShare(1)">
                        <div class="imgBox" @click="doShare(1)">
                            <image class="shareImg" :src="weChatImg" ></image>

                            <!--<text class="shareImg " style="font-size: 90px;color: green;"  :style="{fontFamily:'iconfont'}">&#xe659;</text>-->
                        </div>
                        <text class="fz28 mt20 color444">微信</text>
                    </div>
                    <div  class="singleBox"  @click="doShare(2)">
                        <div class="imgBox"  @click="doShare(2)">
                            <!--<text class="shareImg " style="font-size: 90px;color:#858F9A;"  :style="{fontFamily:'iconfont'}">&#xe615;</text>-->
                            <image class="shareImg" :src="copyLinkImg" ></image>
                        </div>
                        <text class="fz28 mt20 color444">复制链接</text>
                    </div>
                    <div  class="singleBox"  @click="doShare(3)">
                        <div class="imgBox" @click="doShare(3)">
                            <!--<text class="shareImg " style="font-size: 90px;color:#858F9A;"  :style="{fontFamily:'iconfont'}">&#xe615;</text>-->
                            <image class="shareImg" :src="browserImg" ></image>
                        </div>
                        <text class="fz28 mt20 color444">浏览器打开</text>
                    </div>
                    <!--<div class="singleBox">-->
                    <!--<div class="imgBox">-->
                    <!--<image class="shareImg" :src="qqSpaceImg" ></image>-->
                    <!--</div>-->
                    <!--<text class="fz28 mt20 color444">QQ空间</text>-->
                    <!--</div>-->
                    <!--<div class="singleBox">-->
                    <!--<div class="imgBox">-->
                    <!--<image class="shareImg" :src="qqImg" ></image>-->
                    <!--</div>-->
                    <!--<text class="fz28 mt20 color444">QQ</text>-->
                    <!--</div>-->
                    <!--<div style="align-items: center" >-->
                    <!--<div class="imgBox" >-->
                    <!--<image class="shareImg" :src="shareFriendImg" ></image>-->
                    <!--</div>-->
                    <!--<text class="fz28 mt20 color444">好友</text>-->
                    <!--</div>-->
                </div>
                <!--<div class="shareLineBox" >-->
                <!--<div class="singleBox">-->
                <!--<div class="imgBox">-->
                <!--<text class="shareImg " style="font-size: 90px;color:#858F9A;"  :style="{fontFamily:'iconfont'}">&#xe615;</text>-->
                <!--&lt;!&ndash;<image class="shareImg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510221848070&di=be3e54d3a819bddbf6fc309643a3fa2b&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F00%2F17%2F16pic_17711_b.jpg" ></image>&ndash;&gt;-->
                <!--</div>-->
                <!--<text class="fz28 mt20 color444">举报</text>-->
                <!--</div>-->
                <!--<div  class="singleBox">-->
                <!--<div class="imgBox">-->
                <!--&lt;!&ndash;<text class="shareImg " style="font-size: 90px;color:#858F9A;"  :style="{fontFamily:'iconfont'}">&#xe615;</text>&ndash;&gt;-->
                <!--<image class="shareImg" :src="copyLinkImg" ></image>-->
                <!--</div>-->
                <!--<text class="fz28 mt20 color444">复制链接</text>-->
                <!--</div>-->
                <!--<div  class="singleBox">-->
                <!--<div class="imgBox">-->
                <!--&lt;!&ndash;<text class="shareImg " style="font-size: 90px;color:#858F9A;"  :style="{fontFamily:'iconfont'}">&#xe615;</text>&ndash;&gt;-->
                <!--<image class="shareImg" :src="browserImg" ></image>-->
                <!--</div>-->
                <!--<text class="fz28 mt20 color444">浏览器</text>-->
                <!--</div>-->
                <!--<div  class="singleBox">-->
                <!--<div class="imgBox">-->
                <!--<text class="shareImg " style="font-size: 90px;color:#858F9A;"  :style="{fontFamily:'iconfont'}">&#xe611;</text>-->
                <!--&lt;!&ndash;<image class="shareImg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510221848070&di=be3e54d3a819bddbf6fc309643a3fa2b&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F00%2F17%2F16pic_17711_b.jpg" ></image>&ndash;&gt;-->
                <!--</div>-->
                <!--<text class="fz28 mt20 color444">其他</text>-->
                <!--</div>-->
                <!--</div>-->
            </div>
            <div class="cancelBox" @click="doCancel()">
                <text class="fz32">取消</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
    .singleBox{
        align-items: center;margin-right: 15px;
    }
    .shareLineBox{
        width: 730px;margin-left: 20px;padding-right: 20px;flex-direction: row;padding-top: 30px;padding-bottom: 30px;
    }
    .bottomBorder{
        border-style: solid;border-color: gainsboro;border-bottom-width: 1px;
    }
    .cancelBox{
        width: 750px;align-items: center;height:100px;background-color: #fff;justify-content: center;
    }
    .cancelBox:active{
        background-color: #999;
    }
    .imgBox:active{
        background-color: #999;
    }
    .color444{
        color: #666;
    }
    .imgBox{
        background-color: #fff;
        padding-left: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-right: 20px;
        border-radius: 30px;
    }
    .shareImg{
        width: 90px;
        height: 90px;
    }
    .shareBox{
        background-color:#F5F4F5;
        position: fixed;
        bottom:0px ;
        left: 0;
        right:0;
        /*height: 650px;*/
    }
</style>
<script>
    import utils from '../assets/utils';
    const event = weex.requireModule('event');
    import { POST, GET } from '../assets/fetch';
    export default {
        data:function () {
            return{
                isOperation:false,
            }
        },
        computed:{
            timeLineImg:function(){
                return utils.locate('resources/images/timeLine.png');
            },
            weChatImg:function () {
                return utils.locate('resources/images/weChat.png');
            },
            shareFriendImg:function(){
                return utils.locate('resources/images/shareFriend.png');
            },
            qqSpaceImg:function () {
                return utils.locate('resources/images/qqSpace.png');
            },
            qqImg:function(){
                return utils.locate('resources/images/qq.png');
            },
            copyLinkImg:function () {
                return utils.locate('resources/images/copyLink.png');
            },
            browserImg:function () {
                return utils.locate('resources/images/browser.png');
            }
        },
        methods:{
            doCancel(){
                this.$emit("doCancel");
            },
            doShare(id){
                this.$emit("doShare",id);
            }
        }
    }
</script>
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
                            <image class="shareImg" src="http://pic.qiantucdn.com/58pic/27/25/01/31n58PICz4s_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center" ></image>
                            <!--<text class="shareImg " style="font-size: 90px;"  :style="{fontFamily:'iconfont'}">&#xe625;</text>-->
                        </div>
                        <text class="fz28 mt20 color444" >朋友圈</text>
                    </div>
                    <div class="singleBox" @click="doShare(1)">
                        <div class="imgBox" @click="doShare(1)">
                            <!--<image class="shareImg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510221848070&di=be3e54d3a819bddbf6fc309643a3fa2b&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F00%2F17%2F16pic_17711_b.jpg" ></image>-->

                            <text class="shareImg " style="font-size: 90px;color: green;"  :style="{fontFamily:'iconfont'}">&#xe659;</text>
                        </div>
                        <text class="fz28 mt20 color444">微信</text>
                    </div>
                    <div class="singleBox" >
                        <div class="imgBox" >
                            <image class="shareImg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510223917779&di=b003e7611dd9cdc0da2f1cc1692cca29&imgtype=0&src=http%3A%2F%2Fm.qqzhi.com%2Fupload%2Fimg_2_3089124672D1494971208_23.jpg" ></image>
                        </div>
                        <text class="fz28 mt20 color444">微信收藏</text>
                    </div>
                    <div class="singleBox">
                        <div class="imgBox">
                            <image class="shareImg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510221848070&di=be3e54d3a819bddbf6fc309643a3fa2b&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F00%2F17%2F16pic_17711_b.jpg" ></image>
                        </div>
                        <text class="fz28 mt20 color444">微信小程序</text>
                    </div>
                    <div style="align-items: center;">
                        <div class="imgBox">
                            <image class="shareImg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510223979401&di=63dbd861541d61af68b9207210ef39bd&imgtype=0&src=http%3A%2F%2Fsc.admin5.com%2Fuploads%2Fallimg%2F100212%2F1112061C9-0-lp.png" ></image>
                        </div>
                        <text class="fz28 mt20 color444">QQ</text>
                    </div>
                </div>
                <div class="shareLineBox" >
                    <div style="align-items: center;margin-right: 15px">
                        <div class="imgBox">
                            <text class="shareImg " style="font-size: 90px;color:#858F9A;"  :style="{fontFamily:'iconfont'}">&#xe615;</text>
                            <!--<image class="shareImg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510221848070&di=be3e54d3a819bddbf6fc309643a3fa2b&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F00%2F17%2F16pic_17711_b.jpg" ></image>-->
                        </div>
                        <text class="fz28 mt20 color444">举报</text>
                    </div>
                    <div  class="singleBox">
                        <div class="imgBox">
                            <text class="shareImg " style="font-size: 90px;color:#858F9A;"  :style="{fontFamily:'iconfont'}">&#xe615;</text>
                            <!--<image class="shareImg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510221848070&di=be3e54d3a819bddbf6fc309643a3fa2b&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F00%2F17%2F16pic_17711_b.jpg" ></image>-->
                        </div>
                        <text class="fz28 mt20 color444">复制链接</text>
                    </div>
                    <div  class="singleBox">
                        <div class="imgBox">
                            <text class="shareImg " style="font-size: 90px;color:#858F9A;"  :style="{fontFamily:'iconfont'}">&#xe615;</text>
                            <!--<image class="shareImg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510221848070&di=be3e54d3a819bddbf6fc309643a3fa2b&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F00%2F17%2F16pic_17711_b.jpg" ></image>-->
                        </div>
                        <text class="fz28 mt20 color444">浏览器</text>
                    </div>
                    <div  class="singleBox">
                        <div class="imgBox">
                            <text class="shareImg " style="font-size: 90px;color:#858F9A;"  :style="{fontFamily:'iconfont'}">&#xe611;</text>
                            <!--<image class="shareImg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510221848070&di=be3e54d3a819bddbf6fc309643a3fa2b&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F00%2F17%2F16pic_17711_b.jpg" ></image>-->
                        </div>
                        <text class="fz28 mt20 color444">其他</text>
                    </div>
                </div>
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
        bottom:0;
        left: 0;
        right:0;
        height: 650px;
    }
    .mask{
        position: fixed;top: 0px;left: 0px;right: 0px;bottom: 0px;background-color: #000;opacity: 0.5;
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
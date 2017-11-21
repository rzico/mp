<template>
    <div style="background-color: white">
        <div class="header">
        <navbar :title="title"  @goback="goback"  > </navbar>
        </div>
        <div class="head">
            <text class="one">① 新增  一</text>
            <text class="two">② 物料铺设  一</text>
            <text class="three">③ 激活  一</text>
            <text class="four">④ 交易测试</text>
        </div>
        <scroller class="scroller">
        <div class="material">
            <text class="materialText">铺设基础物料</text>
        </div>
        <div class="facade">
            <text class="number">①</text>
            <text class="facadeText">拍摄门头照</text>
        </div>
        <div class="iconfontOne">
            <div class="image">
                <image style="width: 200px;height: 200px;"  class="img" :src="logo"></image>
            </div>
            <div class="iconfont" >
                <text class="plusSign" :style="{fontFamily:'iconfont'}" @click="facade" >&#xe618;</text>
            </div>
        </div>
        <div class="place">
            <text class="number">②</text>
            <text class="placeText">拍摄经营场所照</text>
        </div>
        <div class="iconfontTwo">
            <div class="image">
                <image style="width: 200px;height: 200px;"  class="img" :src="palcePhoto"></image>
            </div>
            <div class="iconfont">
                <text class="plusSign" :style="{fontFamily:'iconfont'}" @click="place" >&#xe618;</text>
            </div>
        </div>
        <div class="license">
            <text class="number">③</text>
            <text class="licenseText">拍摄营业执照</text>
        </div>
        <div class="iconfontThree">
            <div class="image">
                <image style="width: 200px;height: 200px;"  class="img" :src="licensePhoto"></image>
            </div>
            <div class="iconfont">
                <text class="plusSign" :style="{fontFamily:'iconfont'}" @click="license">&#xe618;</text>
            </div>
        </div>
        <div class="button">
            <text class="buttonText">下一步</text>
        </div>
        </scroller>
    </div>
</template>
<style>
    .head{
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-bottom-color: #cccccc;
        border-bottom-width: 1px;
        height: 120px;
    }
    .one{
        font-size: 28px;
        color:deepskyblue;
    }
    .two{
        padding-left: 20px;
        font-size: 28px;
        color: deepskyblue;
    }
    .three{
        padding-left: 20px;
        font-size: 28px;
        color: #cccccc;
    }
    .four{
        padding-left: 20px;
        font-size: 28px;
        color: #cccccc;
    }
    /*铺设基础物料*/
    .material{
        border-width:0px;
        padding-top: 40px;
        padding-bottom: 40px;
        padding-left: 30px;
    }
    .materialText{
        font-size: 32px;
        font-weight: bold;
    }
    /*门头照*/
    .facade{
        flex-direction: row;
        align-items: center;
        border-width: 0px;
        padding-left: 30px;
        margin-bottom: 10px;
    }
    .number{
        font-size: 40px;
        color: #cccccc;
    }
    .facadeText{
        font-size: 28px;
        padding-left: 20px;
    }
    .iconfontOne{
        flex-direction: row;
        align-items: center;
        border-left-width: 2px;
        border-left-color: #cccccc;
        margin-left: 50px;
        margin-bottom: 20px;
        height: 250px;
    }
    .image{
        border-radius:150px;
        margin-left: 40px;
    }
    .img{
        border-radius:150px;
    }
    .iconfont{
        width: 200px;
        height: 200px;
        border-width: 10px;
        border-radius:15px;
        margin-left: 30px;
        align-items: center;
        justify-content: center;
    }
    .plusSign{
        font-size: 180px;
        margin-top: 20px;
    }
    /*经营场所*/
    .place{
        flex-direction: row;
        align-items: center;
        border-width: 0px;
        padding-left: 30px;
        margin-bottom: 10px;
    }
    .placeText{
        font-size: 28px;
        padding-left: 20px;
    }
    .iconfontTwo{
        flex-direction: row;
        align-items: center;
        border-left-width: 2px;
        border-left-color: #cccccc;
        margin-left: 50px;
        margin-bottom: 20px;
        height: 250px;
    }
    /*营业执照*/
    .license{
        flex-direction: row;
        align-items: center;
        border-width: 0px;
        padding-left: 30px;
        margin-bottom: 10px;
    }
    .licenseText{
        font-size: 28px;
        padding-left: 20px;
    }
    .iconfontThree{
        flex-direction: row;
        align-items: center;
        margin-left: 50px;
        height: 250px;
    }
    /*下一步*/
    .button{
        background-color:#D9141E;
        margin-left:40px;
        margin-right:40px;
        height:82px;
        align-items:center;
        justify-content: center;
        border-radius:15px;
        margin-top: 30px;
        bottom:30px;
    }
    .buttonText{
        font-size: 40px;
        color: white;
    }
</style>
<script>
    const album = weex.requireModule('album');
    const storage = weex.requireModule('storage');
    var event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import { POST, GET } from '../../../assets/fetch'

    export default {
        data: function () {
            return{
                logo:'',
                palcePhoto:'',
                licensePhoto:''
        }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "第二步"},

        },
        created() {
            utils.initIconFont();
        },
        methods:{
            goback:function () {
                event.closeURL()
            },

//            门面照上传
            facade:function () {
                var _this = this;
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    true,function (data) {
                        if(data.type == 'success') {
//                            _this.logo = data.data.thumbnailSmallPath;
//                    data.data里存放的是用户选取的图片路
//                            _this.original = data.data.originalPath
//                            上传原图
                            event.upload(data.data.originalPath,function (data) {
//                                event.toast(data);
                                if (data.type == 'success' ) {
//                            修改后访问修改专栏信息接口
//                                    utils.debug('weex/member/shop/submit.jhtml?thedoor=' + data.data)
                                    POST('weex/member/shop/submit.jhtml?thedoor=' + data.data).then(
                                        function (mes) {
                                            if (mes.type == "success") {
//                                                将服务器上的路径写入页面中
                                                _this.logo = data.data;
//                                              event.toast(data);
                                            } else {
                                                event.toast(mes.content);
                                            }
                                        }, function (err) {
                                            event.toast("网络不稳定");
                                        }
                                    )
                                } else {
                                    event.toast(data.content);
                                }
                            })
                        }
                    })
            },

//            经营场所照片上传
            place:function () {
                var _this = this;
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    true,function (data) {
                        if(data.type == 'success') {
//                            _this.logo = data.data.thumbnailSmallPath;
//                    data.data里存放的是用户选取的图片路
//                            _this.original = data.data.originalPath
//                            上传原图
                            event.upload(data.data.originalPath,function (data) {
//                                event.toast(data);
                                if (data.type == 'success' ) {
//                            修改后访问修改专栏信息接口
//                                    utils.debug('weex/member/shop/submit.jhtml?thedoor=' + data.data)
                                    POST('weex/member/shop/submit.jhtml?scene=' + data.data).then(
                                        function (mes) {
                                            if (mes.type == "success") {
//                                                将服务器上的路径写入页面中
                                                _this.palcePhoto = data.data;
//                                              event.toast(data);
                                            } else {
                                                event.toast(mes.content);
                                            }
                                        }, function (err) {
                                            event.toast("网络不稳定");
                                        }
                                    )
                                } else {
                                    event.toast(data.content);
                                }
                            })
                        }
                    })
            },
//            营业执照上传
            license:function () {
                var _this = this;
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    true,function (data) {
                        if(data.type == 'success') {
//                            _this.logo = data.data.thumbnailSmallPath;
//                    data.data里存放的是用户选取的图片路
//                            _this.original = data.data.originalPath
//                            上传原图
                            event.upload(data.data.originalPath,function (data) {
//                                event.toast(data);
                                if (data.type == 'success' ) {
//                            修改后访问修改专栏信息接口
//                                    utils.debug('weex/member/shop/submit.jhtml?thedoor=' + data.data)
                                    POST('weex/member/shop/submit.jhtml?license=' + data.data).then(
                                        function (mes) {
                                            if (mes.type == "success") {
//                                                将服务器上的路径写入页面中
                                                _this.licensePhoto = data.data;
//                                              event.toast(data);
                                            } else {
                                                event.toast(mes.content);
                                            }
                                        }, function (err) {
                                            event.toast("网络不稳定");
                                        }
                                    )
                                } else {
                                    event.toast(data.content);
                                }
                            })
                        }
                    })
            }
        }
    }
</script>
<template>
    <div style="background-color: white">
        <navbar :title="title"  @goback="goback"  > </navbar>
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
                <text class="plusSign" :style="{fontFamily:'iconfont'}" @click="facelogo" >&#xe618;</text>
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
                <text class="plusSign" :style="{fontFamily:'iconfont'}" @click="palcelogo" >&#xe618;</text>
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
                <text class="plusSign" :style="{fontFamily:'iconfont'}" @click="licenselogo">&#xe618;</text>
            </div>
        </div>
        </scroller>
        <div class="button bkg-primary" @click="goComplete">
            <text class="buttonText">下一步</text>
        </div>

    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
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
//              商家名称
                vendorName:'',
//              联系人
                contactName:'',
//              联系电话
                contactNumber:'',
//              地址
                detailedAddress:'',
//              店铺id
                shopId:'',
//              营业执照
                licensePhoto:'',
//              场所照片
                palcePhoto:'',
//              门面照
                logo:'',
//              区位id
                areaId:'',
                category:'',
                addressName:'',
                originalone:'',
                originaltwo:'',
                originalthree:'',
                clicked:false
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
            var _this=this;
            var eleven = utils.getUrlParameter('name');
            storage.getItem(eleven, e => {
                let elevendata =  JSON.parse(e.data);
                _this.addressName =elevendata.addressName;
                _this.licensePhoto =elevendata.licensePhoto;
                _this.originalthree =elevendata.licensePhoto;
                _this.logo = elevendata.logo;
                _this.originalone =elevendata.logo;
                _this.palcePhoto =elevendata.palcePhoto;
                _this.originaltwo =elevendata.palcePhoto;
                _this.vendorName = elevendata.name;
                _this.areaId = elevendata.areaId;
                _this.detailedAddress = elevendata.address;
                _this.contactName = elevendata.inkman;
                _this.contactNumber = elevendata.telephone;
                _this.category =elevendata.categoryId;
                _this.shopId = elevendata.id;
                _this.industryName = elevendata.categoryName;
                storage.removeItem(eleven);
            });

        },
        methods:{
            goback:function () {
                event.closeURL()
            },

//          拍摄照片上传
            facelogo:function () {
                var _this = this;
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    true,function (mes) {
                        if(mes.type == 'success') {
                            event.upload(mes.data.originalPath,function (data) {
                                _this.originalone =data.data
                            },function () {
                                
                            });
                            _this.logo = mes.data.thumbnailSmallPath;

                        }
                    })
            },
            palcelogo:function () {
                var _this = this;
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    true,function (mes) {
                        if(mes.type == 'success') {
                            event.upload(mes.data.originalPath,function (data) {
                                _this.originaltwo =data.data
                                _this.palcePhoto = mes.data.thumbnailSmallPath;
                            },function () {
                            });

                        }
                    })
            },
            licenselogo:function () {
                var _this = this;
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    true,function (mes) {
                        if(mes.type == 'success') {
                            event.upload(mes.data.originalPath,function (data) {
                                _this.originalthree =data.data
                            },function () {

                            });
                            _this.licensePhoto = mes.data.thumbnailSmallPath;
                        }
                    })
            },
            goComplete:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this=this;
                if(_this.logo ==''){
                    event.toast('门头照未选择');
                    _this.clicked =false
                    return
                }if(_this.palcePhoto == ''){
                    event.toast('经营场所照未选择');
                    _this.clicked =false
                    return
                }if(_this.licensePhoto == ''){
                    event.toast('营业执照未选择');
                    _this.clicked =false
                    return
                }
                POST('weex/member/shop/submit.jhtml?id='+this.shopId +'&name=' +encodeURI(this.vendorName)+'&areaId='+this.areaId+'&address=' +encodeURI(this.detailedAddress)+'&license=' +this.originalthree+
                    '&scene=' +this.originaltwo+'&thedoor=' +this.originalone+'&linkman=' +encodeURI(this.contactName)+'&telephone=' +this.contactNumber+'&categoryId='+this.category).then(
                    function (mes) {
                        _this.clicked =false
                        if (mes.type == "success") {
                                event.openURL(utils.locate('view/shop/shop/activate.js?shopId='+mes.data.id+'&code='+mes.data.code), function (message) {
                                    _this.clicked =false
                                    if (message.type == "success") {
                                        event.closeURL(message);
                                    }
                                })
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast("网络不稳定");
                        _this.clicked =false
                    }
                )
            }

        }
    }
</script>
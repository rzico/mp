<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"></navbar>
        <wxc-tab-page ref="wxc-tab-page"
                      :tab-titles="list"
                      :tab-styles="tabStyles"
                      :tab-page-height="listHeight"
                      @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
            <div class="page">
                <list class="page" :style="{height:listHeight + 'px'}">
                    <cell>
                        <div class="appellation">
                            <text class="vendorName">商家名称</text>
                            <div style="flex-direction: row;align-items: center">
                                <input type="text" placeholder="请输入商家名称" class="input" v-model="vendorName"/>
                                <text class="fontsIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                            </div>
                        </div>
                    </cell>
                    <cell>
                        <div class="industry" @click="industry">
                            <div class="left">
                                <text class="belongIndustry">所属行业</text>
                            </div>
                            <div class="right">
                                <text class="industryName">{{industryName}}</text>
                                <text class="fontsIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                            </div>
                        </div>
                    </cell>
                    <cell>
                        <div class="location" @click="pick">
                            <div class="left">
                                <text class="businessLocation">公司类型</text>
                            </div>
                            <div class="right">
                                <text class="generalLocation">{{shopType | watchType}}</text>
                                <text class="fontsIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                            </div>
                        </div>
                    </cell>
                    <cell>
                        <div class="location" @click="location">
                            <div class="left">
                                <text class="businessLocation">所在地区</text>
                            </div>
                            <div class="right">
                                <text class="generalLocation">{{addressName}}</text>
                                <text class="fontsIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                            </div>
                        </div>
                    </cell>

                    <cell>
                        <div class="appellation">
                            <text class="detailedAddress">详细地址</text>
                            <div class="flex-row">
                                <input type="text" placeholder="请输入详细地址" class="addressInput" v-model="detailedAddress"/>
                                <text class="fontsIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                            </div>
                        </div>
                    </cell>
                    <cell>
                        <div class="appellation">
                            <text class="contactName">联系姓名</text>
                            <div style="flex-direction: row;align-items: center">
                                <input type="text" placeholder="请输入法人姓名" class="input" v-model="contactName"/>
                                <text class="fontsIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                            </div>
                        </div>
                    </cell>
                    <cell>
                        <div class="appellation">
                            <text class="contactNumber">联系电话</text>
                            <div style="flex-direction: row;align-items: center">
                                <input type="number" placeholder="请输入法人电话" maxlength="11" class="input"
                                       v-model="contactNumber"/>
                                <text class="fontsIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                            </div>
                        </div>
                    </cell>
                    <cell>
                        <div style="height: 750px"></div>
                    </cell>
                </list>
                <div class="button bkg-primary button-bkg-img" @click="goTwoStep">
                    <text class="buttonText">下一步</text>
                </div>
            </div>
            <div class="page">
                <list class="page" :style="{height:listHeight + 'px'}">
                    <cell>
                        <div class="material">
                            <text class="materialText">铺设基础物料</text>
                        </div>
                    </cell>
                    <cell>
                        <div class="facade">
                            <text class="number">①</text>
                            <text class="facadeText">门头照(经营者手持有效证件合照)</text>
                        </div>
                        <div class="iconfontOne">
                            <div class="image">
                                <image style="width: 200px;height: 200px;" class="img" :src="logo"></image>
                            </div>
                            <div class="iconfont">
                                <text class="plusSign" :style="{fontFamily:'iconfont'}" @click="logoUp">&#xe618;</text>
                            </div>
                        </div>
                    </cell>
                    <cell>
                        <div class="facade">
                            <text class="number">②</text>
                            <text class="facadeText">店内场景照(含收银台)</text>
                        </div>
                        <div class="iconfontOne">
                            <div class="image">
                                <image style="width: 200px;height: 200px;" class="img" :src="palcePhoto"></image>
                            </div>
                            <div class="iconfont">
                                <text class="plusSign" :style="{fontFamily:'iconfont'}" @click="palceUp">&#xe618;</text>
                            </div>
                        </div>
                    </cell>
                    <cell v-if="shopType != 'personal'">
                        <div class="license">
                            <text class="number">③</text>
                            <text class="licenseText">营业执照</text>
                        </div>
                        <div class="iconfontTwo">
                            <div class="image">
                                <image style="width: 200px;height: 200px;" class="img" :src="licensePhoto"></image>
                            </div>
                            <div class="iconfont">
                                <text class="plusSign" :style="{fontFamily:'iconfont'}" @click="licenseUp">&#xe618;</text>
                            </div>
                        </div>
                    </cell>
                    <cell>
                        <div class="place">
                            <text class="number">{{shopType == 'personal' ? '③':'④'}}</text>
                            <text class="placeText">{{shopType == 'enterprise'?'开户许可证/开户证明':'银行卡正面照'}}</text>
                        </div>
                        <div class="iconfontTwo">
                            <div class="image">
                                <image style="width: 200px;height: 200px;" class="img" :src="bankinfoPhoto"></image>
                            </div>
                            <div class="iconfont">
                                <text class="plusSign" :style="{fontFamily:'iconfont'}" @click="bankUp">&#xe618;</text>
                            </div>
                        </div>
                    </cell>
                    <cell>
                        <div class="facade">
                            <text class="number">{{shopType == 'personal' ? '④':'⑤'}}</text>
                            <text class="facadeText">{{shopType == 'personal'?'手持身份证正面照':'法人手持身份证正面照'}}</text>
                        </div>
                        <div class="iconfontOne">
                            <div class="image">
                                <image style="width: 200px;height: 200px;" class="img" :src="idCardFront"></image>
                            </div>
                            <div class="iconfont">
                                <text class="plusSign" :style="{fontFamily:'iconfont'}" @click="cardFrontUp">&#xe618;</text>
                            </div>
                        </div>
                    </cell>
                    <cell>
                        <div class="place">
                            <text class="number">{{shopType == 'personal' ? '⑤':'⑥'}}</text>
                            <text class="placeText">{{shopType == 'personal'?'身份证反面照':'法人身份证反面照'}}</text>
                        </div>
                        <div class="iconfontTwo">
                            <div class="image">
                                <image style="width: 200px;height: 200px;" class="img" :src="idCardBack"></image>
                            </div>
                            <div class="iconfont">
                                <text class="plusSign" :style="{fontFamily:'iconfont'}" @click="cardBackUp">&#xe618;</text>
                            </div>
                        </div>
                    </cell>
                    <cell>
                        <div class="place">
                            <text class="number">{{shopType == 'personal' ? '⑥':'⑦'}}</text>
                            <text class="placeText">推广员门头合影</text>
                        </div>
                        <div class="iconfontTwo">
                            <div class="image">
                                <image style="width: 200px;height: 200px;" class="img" :src="promoterPhoto"></image>
                            </div>
                            <div class="iconfont">
                                <text class="plusSign" :style="{fontFamily:'iconfont'}" @click="promoterUp">&#xe618;</text>
                            </div>
                        </div>
                    </cell>
                    <cell>
                        <div class="license">
                            <text class="number">{{shopType == 'personal' ? '⑦':'⑧'}}</text>
                            <text class="licenseText">其他辅助材料(选填)</text>
                        </div>
                        <div class="iconfontThree">
                            <div class="image">
                                <image style="width: 200px;height: 200px;" class="img" :src="otherPhoto"></image>
                            </div>
                            <div class="iconfont">
                                <text class="plusSign" :style="{fontFamily:'iconfont'}" @click="otherUp">&#xe618;</text>
                            </div>
                        </div>
                    </cell>
                    <cell>
                        <div style="height: 400px"></div>
                    </cell>
                </list>
                <div class="button bkg-primary button-bkg-img" @click="goComplete">
                    <text class="buttonText">完成</text>
                </div>
            </div>

        </wxc-tab-page>

    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .page {
        width: 750px;
        position: relative;
    }

    .right {
        flex-direction: row;
        align-items: center;
    }

    /*商家名称*/
    .appellation {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .vendorName {
        font-size: 32px;
    }

    .fontsIcon {
        font-size: 28px;
        color: #999;
    }

    /*所属行业*/
    .industry {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        border-bottom-color: #ccc;
        border-bottom-width: 1px;
        height: 100px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .belongIndustry {
        font-size: 32px;
    }

    .industryName {
        font-size: 32px;
        color: #999;
    }

    /*商家区位*/
    .location {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        border-bottom-color: #ccc;
        border-bottom-width: 1px;
        height: 100px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .businessLocation {
        font-size: 32px;
    }

    .generalLocation {
        font-size: 32px;
        color: #999;
    }

    .detailedAddress {
        font-size: 32px;
        line-height: 32px;
    }

    .contactName {
        font-size: 32px;
    }

    .contactNumber {
        font-size: 32px;
    }

    .input {
        padding-left: 100px;
        font-size: 32px;
        line-height: 32px;
        text-align: right;
        height: 100px;
        width: 500px;
        color: #999;
    }

    .addressInput {
        text-align: right;
        font-size: 32px;
        line-height: 32px;
        width: 500px;
        height: 100px;
        color: #999;
    }

    /*铺设基础物料*/
    .material {
        border-width: 0px;
        padding-top: 40px;
        padding-bottom: 40px;
        padding-left: 30px;
    }

    .materialText {
        font-size: 32px;
        font-weight: bold;
    }

    /*门头照*/
    .facade {
        flex-direction: row;
        align-items: center;
        border-width: 0px;
        padding-left: 30px;
        margin-bottom: 10px;
    }

    .number {
        font-size: 40px;
        color: #cccccc;
    }

    .facadeText {
        font-size: 28px;
        padding-left: 20px;
    }

    .iconfontOne {
        flex-direction: row;
        align-items: center;
        border-left-width: 2px;
        border-left-color: #cccccc;
        margin-left: 50px;
        margin-bottom: 20px;
        height: 250px;
    }

    .image {
        border-radius: 150px;
        margin-left: 40px;
    }

    .img {
        border-radius: 150px;
    }

    .iconfont {
        width: 200px;
        height: 200px;
        border-width: 10px;
        border-radius: 15px;
        margin-left: 30px;
        align-items: center;
        justify-content: center;
    }

    .plusSign {
        font-size: 180px;
        margin-top: 20px;
    }

    /*经营场所*/
    .place {
        flex-direction: row;
        align-items: center;
        border-width: 0px;
        padding-left: 30px;
        margin-bottom: 10px;
    }

    .placeText {
        font-size: 28px;
        padding-left: 20px;
    }

    .iconfontTwo {
        flex-direction: row;
        align-items: center;
        border-left-width: 2px;
        border-left-color: #cccccc;
        margin-left: 50px;
        margin-bottom: 20px;
        height: 250px;
    }

    /*营业执照*/
    .license {
        flex-direction: row;
        align-items: center;
        border-width: 0px;
        padding-left: 30px;
        margin-bottom: 10px;
    }

    .licenseText {
        font-size: 28px;
        padding-left: 20px;
    }

    .iconfontThree {
        flex-direction: row;
        align-items: center;
        margin-left: 50px;
        height: 250px;
    }

    /*下一步*/
    .button {
        margin-left: 40px;
        margin-right: 40px;
        height: 82px;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        position: absolute;
        bottom: 30px;
        left: 0;
        right: 0;
    }

    .buttonText {
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
    import {POST, GET} from '../../../assets/fetch'
    import {WxcTabPage, BindEnv} from 'weex-ui';
    const modal = weex.requireModule('modal');
    const picker = weex.requireModule('picker');
    export default {
        data: function () {
            return {
//              商家名称
                vendorName: '',
//              联系人
                contactName: '',
//              联系电话
                contactNumber: '',
//              地址
                detailedAddress: '',
//              店铺id
                shopId: '',
//              营业执照
                licensePhoto: '',
//              场所照片
                palcePhoto: '',
//              门面照
                logo: '',
                bankinfoPhoto:'',
                promoterPhoto:'',
                otherPhoto:'',
//              区位id
                areaId: '',
//              =========================================
//              具体地址
                addressName: '',
                hasChange: false,
                category: 1,
                industryName: '',
                clicked: false,
//              经纬度
                lng: '',
                lat: '',
                idCardFront: '',
                idCardBack: '',
                food: '',
                shopType:'enterprise',
                shopIndex:0,
                list: [0,1],//该变量几个页面就要有几个值，否者setPage失效
                tabStyles: {
                    bgColor: '#ffffff',// 标签背景色
                    titleColor: '#ffffff',// 标签文本未选中状态颜色
                    activeTitleColor: '#ffffff',// 标签文本选中状态颜色
                    activeBgColor: '#ffffff',// 标签选中状态背景色
                    isActiveTitleBold: true,// 标签选中状态是否使用粗体
                    iconWidth: 0,// 图标宽度
                    iconHeight: 0,// 图标高度
                    width: 0,// 标签宽度
                    height: 0,// 标签高度
                    fontSize: 32,// 标签文本字体大小
                    hasActiveBottom: true,// 选中状态是否带有下划线
                    activeBottomColor: '#ffffff',// 选中状态下划线颜色
                    activeBottomHeight: 6,// 选中状态下划线高度
                    activeBottomWidth: 30,// 选中状态下划线宽度
                    textPaddingLeft: 10,// 文本的padding-left值
                    textPaddingRight: 10// 文本的padding-right值
                },
                headerHeight: 136,
                listHeight: 1334,
                nowClose: false,
                pageIndex: 0
            }
        },
        components: {
            navbar,WxcTabPage
        },
        props: {
            title: {default: "上传资料"},

        },
        filters:{
            watchType(val){
                if(val == 'enterprise'){
                    return '企业'
                }else if(val == 'individual'){
                    return '个体户'
                }else {
                    return '个人'
                }
            }
        },
        created() {
            utils.initIconFont();
            this.headerHeight = utils.getHeaderHeight();
            this.listHeight = utils.fullScreen(this.headerHeight);
            this.modification()
        },
        methods: {
            modification:function () {
                var _this = this;
                GET('weex/member/shop/info.jhtml',function (mes) {
                    if (mes.type == 'success'&& mes.data !=null) {
                        _this.shopId = mes.data.id;
                        _this.addressName = mes.data.areaName;
                        _this.licensePhoto = mes.data.license;
                        _this.logo = mes.data.thedoor;
                        _this.areaId = mes.data.areaId;
                        _this.palcePhoto = mes.data.scene;
                        _this.vendorName = mes.data.name;
                        _this.detailedAddress = mes.data.address;
                        _this.contactName = mes.data.linkman;
                        _this.contactNumber = mes.data.telephone;
                        _this.category = mes.data.categoryId;
                        _this.industryName = mes.data.categoryName;
                        _this.idCardFront = mes.data.idCardFront;
                        _this.idCardBack = mes.data.idCardBack;
                        _this.bankinfoPhoto = mes.data.bankinfoPhoto;
                        _this.promoterPhoto = mes.data.promoterPhoto;
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            pick () {
                var _this = this;
                picker.pick({
                    index:_this.shopIndex,
                    items:['企业','个体户','个人']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0) {
                            _this.shopType = 'enterprise';
                            _this.shopIndex = e.data

                        } else if (e.data == 1) {
                            _this.shopType = 'individual';
                            _this.shopIndex = e.data
                        }
                        else {
                            _this.shopType = 'personal';
                            _this.shopIndex = e.data
                        }
                    }
                })
            },
            wxcTabPageCurrentTabSelected(e) {
                this.pageIndex = e.page;
            },
            goback: function () {
                if (this.nowClose || this.pageIndex == 0) {
                    event.closeURL()
                } else if (this.pageIndex == 1) {
                    this.$refs['wxc-tab-page'].setPage(0);
                }
            },
            industry: function () {
                var _this = this;
                event.openURL(utils.locate('widget/list.js?listId=' + this.category + '&type=category'), function (data) {
                    if (data.type == 'success') {
                        _this.category = parseInt(data.data.listId);
                        _this.industryName = data.data.listName;
                    }
                })
            },
            location: function () {
                var _this = this;
                event.openURL(utils.locate('view/amap-picker/amap-picker.js?title=' + encodeURIComponent('选择地址') + '&isPolygon=false'), function (data) {
                    if (data.type == 'success' && data.data != '') {
                        _this.addressName = data.data.areaName;
                        _this.detailedAddress = data.data.building;
                        _this.areaId = data.data.areaId;
                        _this.lat = data.data.latitude;
                        _this.lng = data.data.longitude;
                    }
                })
            },
            logoUp(){
                var _this = this;
                var options = {
                    isCrop: true,
                    width: 1,
                    height: 1
                };
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    options, function (mes) {
                        if (mes.type == 'success') {
                            event.upload(mes.data.originalPath, function (data) {
                                _this.logo = data.data
                            }, function () {

                            });

                        }
                    })
            },
            palceUp(){
                var _this = this;
                var options = {
                    isCrop: true,
                    width: 1,
                    height: 1
                };
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    options, function (mes) {
                        if (mes.type == 'success') {
                            event.upload(mes.data.originalPath, function (data) {
                                _this.palcePhoto = data.data
                            }, function () {

                            });

                        }
                    })
            },
            //          拍摄照片上传
            cardFrontUp: function () {
                var _this = this;
                var options = {
                    isCrop: true,
                    width: 1,
                    height: 1
                };
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    options, function (mes) {
                        if (mes.type == 'success') {
                            event.upload(mes.data.originalPath, function (data) {
                                _this.idCardFront = data.data
                            }, function () {

                            });

                        }
                    })
            },
            cardBackUp: function () {
                var _this = this;
                var options = {
                    isCrop: true,
                    width: 1,
                    height: 1
                };
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    options, function (mes) {
                        if (mes.type == 'success') {
                            event.upload(mes.data.originalPath, function (data) {
                                _this.idCardBack = data.data
                            }, function () {
                            });

                        }
                    })
            },
            bankUp(){
                var _this = this;
                var options = {
                    isCrop: true,
                    width: 1,
                    height: 1
                };
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    options, function (mes) {
                        if (mes.type == 'success') {
                            event.upload(mes.data.originalPath, function (data) {
                                _this.bankinfoPhoto = data.data
                            }, function () {
                            });

                        }
                    })
            },
            promoterUp(){
                var _this = this;
                var options = {
                    isCrop: true,
                    width: 1,
                    height: 1
                };
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    options, function (mes) {
                        if (mes.type == 'success') {
                            event.upload(mes.data.originalPath, function (data) {
                                _this.promoterPhoto = data.data
                            }, function () {
                            });
                        }
                    })
            },
            otherUp(){
                var _this = this;
                var options = {
                    isCrop: true,
                    width: 1,
                    height: 1
                };
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    options, function (mes) {
                        if (mes.type == 'success') {
                            event.upload(mes.data.originalPath, function (data) {
                                _this.otherPhoto = data.data
                            }, function () {
                            });
                        }
                    })
            },
            licenseUp: function () {
                var _this = this;
                var options = {
                    isCrop: true,
                    width: 1,
                    height: 1
                };
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    options, function (mes) {
                        if (mes.type == 'success') {
                            event.upload(mes.data.originalPath, function (data) {
                                _this.licensePhoto = data.data
                            }, function () {
                            });
                        }
                    })
            },
            uploadFood: function () {
                var _this = this;
                var options = {
                    isCrop: true,
                    width: 1,
                    height: 1
                };
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    options, function (mes) {
                        if (mes.type == 'success') {
                            event.upload(mes.data.originalPath, function (data) {
                                _this.food = data.data
                            }, function () {

                            });
                        }
                    })
            },
            goTwoStep() {
                if (this.clicked == true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if (utils.isNull(_this.vendorName)) {
                    event.toast('商家名称未填写');
                    _this.clicked = false
                    return
                } else if (utils.isNull(_this.industryName)) {
                    event.toast('所属行业未选择');
                    _this.clicked = false
                    return
                } else if (utils.isNull(_this.addressName)) {
                    event.toast('商家区位未选择');
                    _this.clicked = false
                    return
                } else if (utils.isNull(_this.detailedAddress)) {
                    event.toast('商家地址未填写');
                    _this.clicked = false
                    return
                } else if (utils.isNull(_this.contactName)) {
                    event.toast('法人姓名未填写');
                    _this.clicked = false
                    return
                } else if (utils.isNull(_this.contactNumber)) {
                    event.toast('法人电话未填写');
                    _this.clicked = false
                    return
                } else if (!/^[0-9]+$/.test(_this.contactNumber)) {
                    event.toast('请填写正确法人电话');
                    _this.clicked = false
                    return
                }
                this.$refs['wxc-tab-page'].setPage(1);
                this.clicked = false
            },
            goComplete: function () {
                if (this.clicked == true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if (utils.isNull(_this.logo)) {
                    event.toast('门头照未选择');
                    _this.clicked = false
                    return
                }else if (utils.isNull(_this.palcePhoto)) {
                    event.toast('店内场景照未选择');
                    _this.clicked = false
                    return
                }else if (_this.licensePhoto!='personal' &&utils.isNull(_this.licensePhoto)) {
                    event.toast('营业执照未选择');
                    _this.clicked = false
                    return
                }else if (utils.isNull(_this.idCardFront)) {
                    event.toast('身份证正面照未选择');
                    _this.clicked = false
                    return
                }else if (utils.isNull(_this.idCardBack)) {
                    event.toast('身份证反面照未选择');
                    _this.clicked = false
                    return
                }else  if (utils.isNull(_this.bankinfoPhoto)) {
                    event.toast(_this.shopType == 'enterprise'?'开户许可证/开户证明未选择':'银行卡正面照未选择');
                    _this.clicked = false
                    return
                }else  if (utils.isNull(_this.promoterPhoto)) {
                    event.toast('推广员门头合影未选择');
                    _this.clicked = false
                    return
                }
                POST('weex/member/shop/upload.jhtml?name=' + encodeURI(this.vendorName) + '&areaId=' + this.areaId + '&address=' + encodeURI(this.detailedAddress) + '&license=' + this.licensePhoto +
                    '&scene=' + this.palcePhoto+ '&idCardFront='+encodeURIComponent(this.idCardFront) + '&idCardBack='+encodeURIComponent(this.idCardBack)+ '&food=' + encodeURIComponent(this.food)+
                    '&thedoor=' + this.logo + '&linkman=' + encodeURI(this.contactName) + '&telephone=' + this.contactNumber + '&categoryId=' + this.category + "&lng=" + _this.lng + "&lat=" + _this.lat+
                '&bankinfoPhoto='+_this.bankinfoPhoto +'&promoterPhoto='+_this.promoterPhoto+'&otherPhoto='+_this.otherPhoto +'&shopType='+_this.shopType).then(
                    function (mes) {
                        _this.clicked = false
                        if (mes.type == "success") {
                            event.toast(mes.content);
                            //走到这一步，点击返回时直接关掉页面
                            _this.nowClose = true;
                            let  mesData = utils.message('success','成功','');
                            event.closeURL(mesData);
                        } else {
                            //走到这一步，点击返回时直接关掉页面
                            _this.nowClose = true;
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        //走到这一步，点击返回时直接关掉页面
                        _this.nowClose = true;
                        event.toast("网络不稳定");
                        _this.clicked = false
                    }
                )
            }
        }
    }
</script>

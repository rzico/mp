<template>
    <div class="wrapper">
        <!--头部-->
        <div  class="headerCenter bkg-primary" :class="[classHeader()]" >
            <div class="addressBox" >
                <text :style="{fontFamily:'iconfont'}" class="gpsIcon">&#xe792;</text>
                <text class="gpsText">{{address}}</text>
            </div>
            <div class="searchBox" @click="gosearch">
                <text :style="{fontFamily:'iconfont'}" class="searchIcon">&#xe611;</text>
                <text class="searchInput">请输入搜索内容</text>
            </div>
            <div class="moreBox" @click="menu">
                <text :style="{fontFamily:'iconfont'}"  class="moreIcon" >&#xe618;</text>
            </div>
        </div>
        <!--<headerNav @search="gosearch" @menu="menu" ></headerNav>-->
        <!--<liveHeader @search="gosearch" @menu="menu" @doLive="doLive" v-if="!isHeader"></liveHeader>-->
        <tabNav :corpusList="corpusList"   :whichCorpus="whichCorpus" ref="tabRef" @corpusChange="corpusChange"></tabNav>
        <slider class="pageBox" :style="{top:pageBoxTop+'px'}" infinite="false" @change="onSliderChange" :index="whichCorpus">
            <div v-for="(item,index) in corpusList" class="categoryBox">
                <hotsCategory  v-if="item.name == '热点' && item.load == 1"  :articleCategoryId="item.id"></hotsCategory>
                <circleCategory v-else-if="item.name == '关注' && uId != 0 && item.load == 1"    :articleCategoryId="item.id" ></circleCategory>
                <!--<othersCategory v-else-if=" item.load == 1"    :articleCategoryId="item.id" ></othersCategory>-->
            </div>
        </slider>
        <div v-if="showMenu" >
            <div class="maskLayer" @touchstart="maskTouch"></div>
            <div class="showBox"  style="width: 230px;">
                <text class="showBg"></text>
                <div class="arrowUp" >
                    <text class="fz40" style="color: #fff;" :style="{fontFamily:'iconfont'}">&#xe64e;</text>
                </div>
                <div class="flex-row pt25 pb25 pl35 pr35 textActive " style="width: 230px;" @click="goAddFriend()">
                    <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe62a;</text>
                    <text class="fz28 pl10">添加好友</text>
                </div>
                <div class="flex-row pt25 pb25 pl35 pr35 textActive" @click="scan()">
                    <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe607;</text>
                    <text class="fz28 pl10">扫一扫</text>
                </div>
            </div>
        </div>
        <choose @cancelBox="cancelBox" v-if="isMask"></choose>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .headerCenter {
        height: 136px;
        padding-top: 44px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        position:sticky;
    }
    .addressBox{
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-left: 30px;
        width: 175px;
        height: 60px;
        border-radius: 80px;
        background-color: rgba(42,42,44,0.2);
    }
    .moreBox{
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        width: 115px;
        height: 92px;
        padding-right: 30px;
    }
    .searchBox{
        height: 60px;
        width: 400px;
        border-radius: 80px;
        padding-left: 30px;
        flex-direction: row;
        align-items: center;
        margin-left: 30px;
        background-color: rgba(42,42,44,0.2);
    }
    .gpsText{
        font-size: 32px;
        color: #eee;
        max-width: 100px;
        lines:1;
        text-overflow: ellipsis;
    }
    .gpsIcon{
        font-size: 32px;
        color: #eee;
    }
    .searchIcon{
        font-size: 32px;
        color: #eee;
    }
    .moreIcon{
        font-size: 46px;
        color: #fff;
    }
    .searchInput{
        max-width: 300px;
        font-size: 32px;
        color: #eee;
        lines:1;
        text-overflow: ellipsis;
        padding-left: 10px;
    }
    .maskLayer{
        position: fixed;top: 0px;left: 0px;right: 0px;bottom: 0px; background-color: rgba(0,0,0,0.4);
    }
    .pageBox{
        width: 750px;
        position: fixed;
        left: 0;bottom: 0;
    }
    .categoryBox{
        width: 750px;
        bottom:0;
        top:0;
        position: absolute;
    }
</style>
<script>
    const dom = weex.requireModule('dom')
    import headerNav from './header.vue';
    import liveHeader from './liveHeader.vue';
    import choose from '../live/choose.vue';
    import circleCategory from './circle.vue';
    import othersCategory from './others.vue';
    import hotsCategory from './hots.vue';
    import tabNav from '../../include/tabNav.vue';
    import utils from '../../assets/utils';
    const event = weex.requireModule('event');
    const animation = weex.requireModule('animation');
    import { POST, GET ,SCAN} from '../../assets/fetch';
    export default {
        data:function () {
            return{
                whichCorpus:0,
                listCurrent:0,
                listPageSize:10,
                pageWidth:750,
                showMenu:false,
                clicked:false,
                uId:0,
                isHeader:false,
                pageBoxTop:0,
                isMask:false,
                address:'定位中'
            }
        },
        components: {
            choose,liveHeader,headerNav,tabNav,othersCategory,hotsCategory,circleCategory
        },
        props:{
            corpusList:{
                default: function () {
                    return [{}]
                }},
        },

        created(){
            utils.initIconFont();
            this.pageBoxTop = utils.getHeaderHeight()+80;
            this.uId = event.getUId();
            var _this = this;
            this.getGps();
            GET('article_category/list.jhtml',function (data) {
                if(data.type == 'success' && data.data != ''){
                    data.data.forEach(function (item,index) {
//                        if(index == 0){
//                            item.load = 1
//                        }else{
                        item.load = 0
//                        }
                    })
//                    _this.corpusList = data.data;
                    _this.corpusList.splice(0,0,{
                        id:'',
                        name:"热点",
                        load:1
                    })
                    if(_this.uId != 0){
                        _this.corpusList.splice(1,0,{
                            id:'',
                            name:"关注",
                            load:0
                        })
                    }
                    _this.pageWidth = _this.corpusList.length * 750;
                }
            },function (err) {
                event.toast(err.content);
            })
        },
        methods: {
            //            获取经纬度
            getGps:function(){
                let _this = this
                event.getLocation(function (data) {
                    if(data.type == 'success'){
                        _this.address = data.data.district;
                    }else {
                        event.toast('定位失败，请开启GPS')
                    }
                })

            },
            classHeader:function () {
                let dc = utils.device();
                return dc
            },
//            开启直播弹窗
            doLive:function (e) {
                this.isMask = e
            },
//            关闭直播弹窗
            cancelBox:function (e) {
                this.isMask = e
            },
//            滑动切换分类
            onSliderChange:function (e) {
                this.whichCorpus = e.index;
                //                        滑到才渲染页面
                this.corpusList[this.whichCorpus].load = 1;
                let loca = e.index - 3;
                if(loca < 0){
//                            控制顶部导航的滑动
                    const el = this.$refs.tabRef.$refs['corpus0'][0];
                    dom.scrollToElement(el, { offset: 0 });
                }else {
//                            控制顶部导航的滑动
                    const el = this.$refs.tabRef.$refs['corpus' + loca][0];
                    dom.scrollToElement(el, { offset: 0 });
                }
            },
//            点击顶部分类时。
            corpusChange(index){
                this.whichCorpus = index;
                //                        滑到才渲染页面
                this.corpusList[this.whichCorpus].load = 1;
            },
            //            触发自组件的跳转方法
            gosearch:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/home/search.js'),
                    function () {
                        _this.clicked = false;
                    }
                )
            },
            minibarRightButtonClick () {
                this.$refs['wxc-popover'].wxcPopoverShow();
            },
//            点击右上角菜单
            menu:function () {
                this.showMenu = true;
            },
//            触碰遮罩层
            maskTouch(){
                this.showMenu = false;
            },
//            前往添加好友
            goAddFriend(){
                this.showMenu = false;
                event.openURL(utils.locate("view/friend/add.js"),function (message) {
                })

            },
//            触发自组件的二维码方法
            scan:function () {
                this.showMenu = false;
                let _this=this
                event.scan(function (message) {
                    GET('/q/scan.jhtml?code='+ encodeURIComponent(message.data),function (res) {
                        if (res.type=="success") {
                            if(res.data.type =='818801'|| res.data.type =='818802'){
                                _this.scanFindCard(res.data.code)
                            }else if(res.data.type =='818803'){
                                _this.scanCoupon(res.data.code,res.data.captcha)
                            }else if(res.data.type =='818807'){
                                _this.scanSend(res.data.sn)
                            }

                        } else {
                            event.toast(res.content);
                        }

                    }, function (err) {
                        event.toast(err.content);
                    })
                });
            },
            //            扫码搜索会员
            scanFindCard(code){
                GET('weex/member/card/infobycode.jhtml?code='+code,function (mes) {
                    if (mes.type == 'success') {
                        var id = mes.data.card.id;
                        event.openURL(utils.locate('view/shop/card/view.js?id='+id),function (message) {

                        })
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            //            扫码核销优惠券
            scanCoupon(code,captcha){
                GET('weex/member/couponCode/use.jhtml?code='+code +'&captcha='+captcha,function (mes) {
                    if (mes.type == 'success') {
                        modal.alert({
                            message: mes.content,
                            okTitle: 'OK'
                        })
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            //            扫码送达
            scanSend(sn){
                let _this = this
                var uId = event.getUId();
                event.getLocation(function (data) {
                    if(data.type == 'success'){
                        GET('weex/member/shipping/receive.jhtml?sn='+sn+'&lat='+data.data.lat +'&lng='+data.data.lng + '&memo='+encodeURIComponent('扫码送达'),function (mes) {
                            if (mes.type == 'success') {
                                modal.alert({
                                    message: mes.content,
                                    okTitle: 'OK'
                                })
                            } else {
                                event.toast(mes.content);
                            }
                        }, function (err) {
                            event.toast(err.content)
                        })
                    }else {
                        GET('weex/member/shipping/receive.jhtml?sn='+sn+'&lat=0' +'&lng=0' + '&memo='+encodeURIComponent('扫码送达'),function (mes) {
                            if (mes.type == 'success') {
                                modal.alert({
                                    message: mes.content,
                                    okTitle: 'OK'
                                })
                            } else {
                                event.toast(mes.content);
                            }
                        }, function (err) {
                            event.toast(err.content)
                        })
                    }
                })

            },

        }
    }
</script>




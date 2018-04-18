<template>
    <div class="wrapper">
        <!--<headerNav @search="gosearch" @menu="menu"></headerNav>-->
        <liveHeader @search="gosearch" @menu="menu"></liveHeader>
        <tabNav :corpusList="corpusList"   :whichCorpus="whichCorpus" ref="tabRef" @corpusChange="corpusChange"></tabNav>
        <slider class="pageBox" style="width: 750px" infinite="false"  :class="[pageTop()]" @change="onSliderChange" :index="whichCorpus">
            <div v-for="(item,index) in corpusList" class="categoryBox">
                <hotsCategory  v-if="item.name == '热点' && item.load == 1"  :articleCategoryId="item.id" ></hotsCategory>
                <circleCategory v-else-if="item.name == '圈子' && uId != 0 && item.load == 1"    :articleCategoryId="item.id" ></circleCategory>
                <othersCategory v-else-if=" item.load == 1"    :articleCategoryId="item.id" ></othersCategory>
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
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .pageBox{
        position: fixed;
        top: 380px;left: 0;bottom: 0;
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
            }
        },
        components: {
            liveHeader,headerNav,tabNav,othersCategory,hotsCategory,circleCategory
        },
        props:{
            corpusList:{
                default: function () {
                    return [{}]
                }},
        },

        created(){
            utils.initIconFont();
            this.uId = event.getUId();
            var _this = this;
            GET('article_category/list.jhtml',function (data) {
                if(data.type == 'success' && data.data != ''){
                    data.data.forEach(function (item,index) {
//                        if(index == 0){
//                            item.load = 1
//                        }else{
                        item.load = 0
//                        }
                    })
                    _this.corpusList = data.data;
                    _this.corpusList.splice(0,0,{
                        id:'',
                        name:"热点",
                        load:1
                    })
                    if(_this.uId != 0){
                        _this.corpusList.splice(1,0,{
                            id:'',
                            name:"圈子",
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
            //            监听设备型号,控制导航栏高度
            pageTop:function () {
                let dc = utils.pageTop();
                return dc;
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
                event.scan(function (message) {
                    SCAN(message,function (data) {
                    },function (err) {
                    })
                });
            },

        }
    }
</script>




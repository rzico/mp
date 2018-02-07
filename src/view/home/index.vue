<template>
    <div class="wrapper">
        <headerNav @search="gosearch" @menu="menu"></headerNav>
        <tabNav :corpusList="corpusList"   :whichCorpus="whichCorpus" ref="testRef" @corpusChange="corpusChange"></tabNav>
        <div  class="pageBox"  :class="[pageTop()]"   :style="{width:pageWidth + 'px'}" ref="contentBox">
            <div v-for="(item,index) in corpusList" v-if="item.load == 1" :style="{left: index * 750 + 'px'}" class="categoryBox">
                <hotsCategory  v-if="item.name == '热点'" @onpanmove="onpanmove" :articleCategoryId="item.id" :scrollable="canScroll"></hotsCategory>
                <circleCategory v-else-if="item.name == '圈子'"   @onpanmove="onpanmove" :articleCategoryId="item.id" :scrollable="canScroll"></circleCategory>
                <othersCategory v-else   @onpanmove="onpanmove" :articleCategoryId="item.id" :scrollable="canScroll"></othersCategory>
            </div>
        </div>
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
        top: 216px;left: 0;bottom: 0;
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
                canScroll0:true,
                canScroll1:false,
                whichCorpus:0,
                listCurrent:0,
                listPageSize:10,
                canScroll:true,
                pageWidth:750,
                showMenu:false,
                clicked:false,
            }
        },
        components: {
            headerNav,tabNav,othersCategory,hotsCategory,circleCategory
        },
        props:{
            corpusList:{
                default: function () {
                    return [{}]
                }},
//            whichCorpus: {default:0}
        },

        created(){
            utils.initIconFont();
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
                    },{
                        id:'',
                        name:"圈子",
                        load:0
                    })
                    _this.pageWidth = _this.corpusList.length * 750;
                }
            },function (err) {
                event.toast(err.content);
            })

        },
        methods: {
            //            监听设备型号,控制导航栏高度
            pageTop:function () {
                let dc = utils.pageTop();
                return dc;
            },
            data:function () {
            },
            back: function () {
            },
//            点击顶部分类时。
            corpusChange(index){
                this.whichCorpus = index;
                //                        滑到才渲染页面
                this.corpusList[this.whichCorpus].load = 1;
                let distance = index * 750;
                animation.transition(this.$refs.contentBox, {
                    styles: {
                        transform: 'translateX(-' +distance +')',
                    },
                    duration: 300, //ms
                    timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                    needLayout:false,
                    delay: 0 //ms
                },function () {
                })
            },
//            滑动分类里文章内容时
            onpanmove(e){
                var _this = this;
                if(e == 'left'){
                    if(this.whichCorpus == this.corpusList.length - 1){
                        return;
                    }
                    _this.canScroll = false;
                    _this.whichCorpus ++;
                    let loca = this.whichCorpus - 3;
                    if(loca < 0){
                    }else {
//                            控制顶部导航的滑动
                        const el = this.$refs.testRef.$refs['corpus' + loca][0];
                        dom.scrollToElement(el, { offset: 0 });
                    }
                    //                        滑到才渲染页面
                    _this.corpusList[_this.whichCorpus].load = 1;
                    let leftDistance = _this.whichCorpus * 750;
                    animation.transition(this.$refs.contentBox, {
                        styles: {
                            transform: 'translateX(-' + leftDistance +')',
                        },
                        duration: 300, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {
                        _this.canScroll = true;
                    })
                }else if(e == 'right'){
                    if(this.whichCorpus == 0){
                        return;
                    }else{
                        _this.canScroll = false;
                        this.whichCorpus --;
                        let loca = this.whichCorpus - 3;
                        if(loca < 0){
                        }else {
//                            控制顶部导航的滑动
                            const el = this.$refs.testRef.$refs['corpus' + loca][0];
                            dom.scrollToElement(el, { offset: 0 });
                        }
//                        滑到才渲染页面
                        _this.corpusList[_this.whichCorpus].load = 1;
                        let rightDistance = _this.whichCorpus * 750;
                        animation.transition(this.$refs.contentBox, {
                            styles: {
                                transform: 'translateX(-' + rightDistance +')',
                            },
                            duration: 300, //ms
                            timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                            needLayout:false,
                            delay: 0 //ms
                        },function () {
                            _this.canScroll = true;
                        })
                    }
                }
            },
                //            触发自组件的跳转方法
                gosearch:function () {
//                    event.openURL(utils.locate('view/home/search.js'),function (message) {
////                event.openURL('http://192.168.2.157:8081/search.weex.js',function (message) {
//                        if(message.data != ''){
//                            event.closeURL(message);
//                        }
//                    });
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



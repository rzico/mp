<template>
    <div class="wrapper">
        <!--<navbar :title="title"  @goback="goback" ></navbar>-->
        <!--<div style="min-height: 136px">-->
        <div class="header"  :class="[classHeader()]">
            <transition name="component-fade-top" mode="out-in">
                <div class="pageTop" v-if="!doSearch">
                    <div class="nav_back " @click="goback()">
                        <text class="nav_ico"  :style="{fontFamily:'iconfont'}">&#xe669;</text>
                    </div>
                    <div class="nav">
                        <text class="nav_title">{{title}}</text>
                        <div class="navRightBox"  @click="goSearch()">
                            <!--<text class="nav_Complete nav_title" v-if="complete != 'textIcon'">{{complete}}</text>-->
                            <text class="nav_CompleteIcon"  :style="{fontFamily:'iconfont'}" >&#xe611;</text>
                        </div>
                    </div>
                </div>
                <div v-else  class="search">
                    <div class="search_box flex5">
                        <div class="flex-start">
                            <text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                            <input class="search_input" type="text" return-key-type="done" v-model="keyword" @input="oninput" @return = "search" autofocus="true" ref="searchBar" :placeholder="searchHint"/>
                        </div>
                        <text class="clearBuf ico_small gray" style="margin-top: 3px" :style="{fontFamily:'iconfont'}" @click="clearBuf">&#xe60a;</text>
                    </div>
                    <div class="flex-center flex1" @click="noSearch()">
                        <text class="fz32 searchCancelText" >{{searchOrCancel}}</text>
                    </div>
                </div>
            </transition>
        </div>
        <!--输入栏-->
        <!--<searchNav v-else :searchHint="searchHint" :searchOrCancel="searchOrCancel" :showCancel="false" :cancelSearch="true" @noSearch="noSearch" @oninput="oninput" @search="search"  ref="childFind"> </searchNav>-->
        <!--</div>-->
        <div  class="corpusBox" >
            <scroller scroll-direction="horizontal"  class="corpusScroll">
                <div class="articleClass">
                    <text @click="catagoryChange(index,item.id)" class="allArticle" v-for="(item,index) in catagoryList" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</text>
                </div>
            </scroller>
            <div class="corpusIconBox" v-if="!pageType" @click="goCatagory()">
                <text  :style="{fontFamily:'iconfont'}" class="fz35">&#xe603;</text>
            </div>
        </div>
        <list  style="background-color: #fff;"  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="goodsList.length == 0">
                <noData :noDataHint="noDataHint" ndBgColor="#fff"></noData>
            </cell>
            <!--导航栏-->
            <cell v-else v-for="(item,index) in goodsList">
                <div class="goodsLine boder-bottom" :class="[item.id == goodsId ? 'bgActive' : '']" @click="popup(item,index)">
                    <div  v-if="!item.loading"  class="goodsImg coverAbsoTop top20" ></div>
                    <image class="goodsImg" :src="item.thumbnail | watchThumbnail"  @load="onImageLoad(item)"></image>
                    <div class="infoBox">
                        <div class="flex1">
                            <text class="linesCtrl title">{{item.name}}</text>
                        </div>
                        <div class="flex1 " >
                            <div class="bt10 flex1 flex-row" >
                                <text class="goodsPrice" >¥ {{item.price | currencyfmt}}</text>
                                <div v-for="(items,index) in item.tags">
                                <div class="listLabelBoxOne"  :style="addBg(items)" v-if="items.id>0"><text class="listLabelBoxText">{{items.name}}</text> </div>
                                <!--<div class="listLabelBoxTwo" ><text class="listLabelBoxText">推荐</text> </div>-->
                                </div>
                            </div>
                            <div class="space-between bottomInfo flex1">
                                <text class="sub_title fz28">库存: {{item.stock}}</text>
                                <!--<text class="sub_title fz28">销量: {{item.sales}}</text>-->
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
        <div class="mask" v-if="isPopup">
        <div class="shareBox" v-if="isPopup">
            <div style="width: 750px;align-items: center">
                <text class="fz30 pt30 " style="color: #444">操作</text>
            </div>
            <!--标签选择小弹框-->
            <div class="labelBox" v-if="hasLabelBox">
                <div class="switchBox">
                    <text class="fz32">新品</text>
                    <switch  :checked="newSwitch" @change="settingOneLable"></switch>
                </div>
                <div class="switchBox">
                    <text class="fz32">推荐</text>
                    <switch  :checked="recommendSwitch" @change="settingTwoLable"></switch>
                </div>
                <!--小三角-->
                <div class="triangle">
                    <image class="triangleImg" :src="triangleImg"></image>
                </div>
            </div>


            <div>
                <div class="bottomBorder shareLineBox">
                    <div  class="singleBox" @click="doEdit()">
                        <div class="imgBox"  @click="doEdit()">
                            <text class="primary popupImg" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                        </div>
                        <text class="fz28 mt20 color444 ">编辑</text>
                    </div>
                    <div class="singleBox" @click="doPublish()">
                        <div class="imgBox" @click="doPublish()">
                            <text class="primary popupImg" :style="{fontFamily:'iconfont'}">&#xe6b1;</text>
                        </div>
                        <text class="fz28 mt20 color444">详情</text>
                    </div>
                    <div class="singleBox" @click="doDel()">
                        <div class="imgBox" @click="doDel()">
                            <text class="primary popupImg" :style="{fontFamily:'iconfont'}">&#xe652;</text>
                        </div>
                        <text class="fz28 mt20 color444">删除</text>
                    </div>
                    <div class="singleBox" @click="clickLabel()" >
                        <div class="imgBox" @click="clickLabel()">
                            <text class="primary popupImg" :style="{fontFamily:'iconfont'}">&#xe63d;</text>
                        </div>
                        <text class="fz28 mt20 color444">标签</text>
                    </div>
                    <div class="singleBox_end"  @click="goAcitve()">
                        <div class="imgBox"  @click="goAcitve()">
                            <text class="primary popupImg" :style="{fontFamily:'iconfont'}">&#xe632;</text>
                        </div>
                        <text class="fz28 mt20 color444">优惠</text>
                    </div>
                </div>
            </div>
            <div class="cancelBox" @click="doCancel()">
                <text class="fz32">关闭</text>
            </div>
        </div>
        </div>
        <div class="button bw bkg-primary" v-if="!doSearch && !pageType" @click="addGoods()">
            <text class="buttonText ">新增商品</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    /*标签选择小弹窗*/
    .mask{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,0.4);
    }
    .labelBox{
        width: 260px;
        border-radius: 15px;
        position: fixed;
        bottom:345px;
        right:130px;
        background-color: white;
        border-width: 1px;
        border-color: #F5F4F5;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .switchBox{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 220px;
        height: 90px;
    }
    .triangle{
        position: fixed;
        bottom: 312px;
        right:205px;
    }
    .triangleImg{
        height: 50px;
        width: 50px;
    }
    .listLabelBoxOne{
        width: 60px;
        border-radius: 3px;
        background-color: #EB4E40;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
    }
    .listLabelBoxTwo{
        width: 60px;
        border-radius: 3px;
        background-color: #ff700b;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
    }
    .listLabelBoxText{
        color: white;
        font-size: 20px;
    }

    .top20{
        top: 20px;
    }

    /*<!---->*/
    /*动画*/
    .component-fade-top-enter-active{
        transition: all 0.2s;
    }
    .component-fade-top-leave-active {
        transition: all 0.2s;
    }
    .component-fade-top-leave-to{
        transform: translateX(0px);
        opacity: 0;
    }
    .component-fade-top-enter-to{
        transform: translateX(0px);
        opacity: 1;
    }
    .component-fade-top-enter{
        transform: translateX(0px);
        opacity: 0;
    }
    /**/
    .pageTop{
        flex-direction: row;
    }
    /*<!--搜索栏-->*/

    .searchCancelText{
        color: #fff;
    }
    .search {
        position:sticky;
        background:#eee;
        /*height: 100px;*/
        flex-direction: row;
        flex:1;
    }
    .search_box {
        margin-top:20px;
        margin-left:20px;
        margin-right:20px;
        margin-bottom:20px;
        padding-left: 20px;
        height: 60px;
        border-width: 1px;
        border-color: #ccc;
        border-style: solid;
        border-radius:8px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
    }
    .clearBuf {
        width:58px;
        height:58px;
        text-align: center;
        padding-top: 10px;
    }
    .search_input {
        margin-left: 20px;
        font-size:32px;
        line-height: 58px;
        height: 58px;
        width:400px;
    }


    /*<!--顶部导航栏-->*/
    .navRightBox{
        min-width: 92px;
        height: 92px;
        align-items: center;
        justify-content: center;
    }
    .nav_ico {
        font-size: 38px;
        color: #fff;
        margin-top: 2px;
    }
    .nav_CompleteIcon{
        /*如果nav_ico的字体大小改变这个值也需要变。 （左边box宽度-back图标宽度)/2 */
        padding-left: 27px;
        padding-right: 27px;
        /*ios识别不出该字体，warn警告。  推测可能隐藏到字体图标的渲染*/
        /*font-family: Verdana, Geneva, sans-serif;*/
        font-size: 44px;
        line-height: 44px;
        color: #FFFFFF;
    }
    .nav_Complete {
        padding-left: 27px;
        padding-right: 27px;
        /*ios识别不出该字体，warn警告。  推测可能隐藏到字体图标的渲染*/
        /*font-family: Verdana, Geneva, sans-serif;*/
    }
    /**/
    .articleClass{
        flex-direction: row;
        padding-left: 10px;
        height:80px;
        background-color: #fff;
    }
    .corpusIconBox{
        width: 100px;justify-content: center;align-items: center;background-color: white;
    }
    .allArticle{
        font-size: 29px;
        line-height: 80px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .corpusScroll{
        flex-direction: row;width: 650px;
        background-color: #fff;
    }
    .corpusBox{
        flex-direction: row;
        height:80px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
        background-color: #fff;

    }
    /*<!--底部操作-->*/
    .shareBox{
        background-color:#F5F4F5;
        position: fixed;
        bottom:0px ;
        left: 0;
        right:0;
    }
    .singleBox{
        align-items: center;margin-right: 15px;
    }
    .singleBox_end{
        align-items: center;
    }
    .shareLineBox{
        width: 710px;
        margin-left: 20px;margin-right: 20px;
        flex-direction: row;  justify-content:space-between;
        padding-top: 30px;padding-bottom: 30px;
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
        color:#444;
    }
    .popupImg {
        font-size: 78px;
        width:80px;
        height:80px;
    }
    .imgBox{
        background-color: #fff;
        padding-left: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-right: 20px;
        border-radius: 30px;
    }



    .bgActive{
        background-color: #ccc;
    }
    .linesCtrl{
        lines:2;
        text-overflow: ellipsis;
        line-height: 40px;
    }
    .bottomInfo{
        padding-right: 40px;
    }
    .infoBox{
        height: 160px;
        padding-left: 20px;
        width: 560px;
    }
    .goodsPrice{
        color: coral;
        font-size: 37px;
    }
    .goodsLine{
        padding: 20px;
        flex-direction: row;
        width: 750px;
    }
    .goodsImg{
        border-radius: 5px;
        height: 160px;
        width: 160px;
    }
    .bw{
        margin-top:20px;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 20px;
    }
    .buttonText{
        font-size: 32px;
        color:#ffffff;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import {dom,event,animation,storage} from '../../../weex.js';
    import { POST, GET } from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    import noData from '../../../include/noData.vue';
    const modal = weex.requireModule('modal');
    import searchNav from '../../../include/searchNav.vue';
    export default {
        data:{
            goodsList:[],
            goodsId:0,
            goodsIndex:0,
            refreshing:false,
            pageStart:0,
            pageSize:10,
            reviewNum:0,
            isPopup:false,
            refreshImg:utils.locate('resources/images/loading.png'),
            catagoryList:[{
                name:'全部',
                id:''
            }],
            whichCorpus:0,
//                分类id
            productCategoryId:'',
            doSearch:false,
            pageFrom:'',
            searchHint: "输入商品名",
            searchOrCancel:'取消',
            keyword:'',
            clicked:false,
            roles:'',
//            三角形图片
            triangleImg:utils.locate('resources/images/triangle.png'),
//            控制标签气泡渲染
            hasLabelBox:false,
//
//            switch 推荐状态
            recommendSwitch:false,
//            switch 新品状态
            newSwitch:false,
            goodsName:'',
            pageType:false//            选择页过来不让新增商品


        },
        props:{
            noDataHint:{default:'暂无商品'},
            title:{default:'商品管理'},
//            searchHint: { default: "输入商品名" },
//            searchOrCancel:{default:'取消'},
        },
        components: {
            navbar,noData,searchNav
        },
        filters:{
            watchThumbnail(value){
                return utils.thumbnail(value,160,160);
            }
        },
        created(){
            this.permissions()
            utils.initIconFont();
//            获取分类列表
            this.getCatagory();
//            获取商品列表
            this.getAllGoods();
            if(!utils.isNull(utils.getUrlParameter('from'))){
                this.pageFrom = utils.getUrlParameter('from');
            }
            if(!utils.isNull(utils.getUrlParameter('pageType'))){
                this.pageType = utils.getUrlParameter('pageType');
            }
        },
        methods:{
            addBg:function (items) {
                if(items.name == '新品' ){
                    return {
                        backgroundColor:'#EB4E40'
                    }

                }else if(items.name == '推荐'){
                    return {
                        backgroundColor:'#ff700b'
                    }
                }
            },
//            点击标签
            clickLabel:function () {
              this.hasLabelBox = !this.hasLabelBox
            },
//            设置新品标签
            settingOneLable:function (e) {
                var _this = this;
                let rc = 0;
                if(_this.recommendSwitch){
                    rc = 3
                }
                let nw = 0;
                if (e.value==true) {
                    nw = 2;
                }
                _this.newSwitch = (nw==2);
                POST('weex/member/product/tag.jhtml?id=' + this.goodsId +'&tagIds='+nw +'&tagIds=' +rc).then(
                    function (mes) {
                        if (mes.type == "success") {
                            let tags=[{id:nw,name:'新品'},{id:rc,name:'推荐'}]
                            _this.goodsList[_this.goodsIndex].tags = tags;

                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast(err.content);
                    }
                )

            },
//            设置推荐标签
            settingTwoLable:function (e) {
                var _this = this;
                let rc = 0;
                if(e.value == true){
                    rc = 3
                }
                let nw = 0;
                if (_this.newSwitch) {
                    nw = 2;
                }
                _this.recommendSwitch = (rc==3);
                POST('weex/member/product/tag.jhtml?id=' + this.goodsId +'&tagIds='+nw +'&tagIds=' +rc).then(
                    function (mes) {
                        if (mes.type == "success") {
                            let tags=[{id:nw,name:'新品'},{id:rc,name:'推荐'}]
                            _this.goodsList[_this.goodsIndex].tags = tags;

                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast(err.content);
                    }
                )

            },
            //            获取权限
            permissions:function () {
                var _this = this;
                POST("weex/member/roles.jhtml").then(function (mes) {
                    if (mes.type=="success") {
                        _this.roles = mes.data;
                    } else {
                        event.toast(mes.content);
                    }
                },function (err) {
                    event.toast(err.content);
                });
            },
            classHeader:function () {
                let dc = utils.device();
                return dc
            },
//            商品列表
            getAllGoods(){
                let _this = this;
                if(this.pageType == false){
                    //            获取商品列表
                    GET('weex/member/product/list.jhtml?productCategoryId=' + this.productCategoryId + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                        if(data.type == 'success'){
                            if (_this.pageStart == 0) {
                                data.data.data.forEach(function (item) {
//                             （配合懒加载）
                                    item.loading = false;
                                })
                                _this.goodsList = data.data.data;
                            }else{
                                data.data.data.forEach(function (item) {
//                             （配合懒加载）
                                    item.loading = false;
                                    _this.goodsList.push(item);
                                })
                            }
                            _this.pageStart = data.data.start + data.data.data.length;
                        }else{
                            event.toast(data.content);
                        }
                    },function (err) {
                        event.toast(err.content);
                    })
                }else{
                    //            查找选择模式下获取商品列表，多传一个type参数
                    GET('weex/member/product/list.jhtml?type=query&productCategoryId=' + this.productCategoryId + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                        if(data.type == 'success'){
                            if (_this.pageStart == 0) {
                                data.data.data.forEach(function (item) {
//                             （配合懒加载）
                                    item.loading = false;
                                })
                                _this.goodsList = data.data.data;
                            }else{
                                data.data.data.forEach(function (item) {
//                             （配合懒加载）
                                    item.loading = false;
                                    _this.goodsList.push(item);
                                })
                            }
                            _this.pageStart = data.data.start + data.data.data.length;
                        }else{
                            event.toast(data.content);
                        }
                    },function (err) {
                        event.toast(err.content);
                    })
                }

            },
            onloading:function () {
//                判断是否正在搜索
                if(!this.doSearch){
////            获取商品列表
                    this.getAllGoods();
                }else{
//                        重新搜索商品
                    this.searchGoods();
                }
            },
            onrefresh:function () {
                var _this = this;

                _this.pageStart = 0;
                this.refreshing = true;
                animation.transition(_this.$refs.refreshImg, {
                    styles: {
                        transform: 'rotate(360deg)',
                    },
                    duration: 1000, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout:false,
                    delay: 0 //ms
                })
                setTimeout(() => {
                    animation.transition(_this.$refs.refreshImg, {
                        styles: {
                            transform: 'rotate(0)',
                        },
                        duration: 10, //ms
                        timingFunction: 'linear',//350 duration配合这个效果目前较好
                        needLayout:false,
                        delay: 0 //ms
                    })
                    this.refreshing = false;
                    if(!this.doSearch){
////            获取商品列表
                        this.getAllGoods();
                    }else{
//                        重新搜索商品
                        this.searchGoods();
                    }
                }, 1000)
            },
//            重置商品选择状态
            doReset(){
                this.isPopup = false;
                this.goodsId = 0;
                this.hasLabelBox = false;
            },
//            点击取消
            doCancel:function () {
                this.doReset();
            },
            popup:function (item,index) {
                var _this = this
                if(!utils.isNull(this.pageFrom)){
                    let E = utils.message('success','返回商品',item)
                    event.closeURL(E);
                }else{
                    if (this.isPopup==false) {
                        this.isPopup = true;
                    }
                    this.goodsId = item.id;
                    this.goodsName = item.name;
                    this.goodsIndex = index;
                    let tags = this.goodsList[index].tags;
                    _this.recommendSwitch = false;
                    _this.newSwitch = false;
                    tags.forEach(function (items) {
                        if(items.id == 3){
//                            状态为推荐
                            _this.recommendSwitch = true;
                        }
                        if(items.id == 2){
//                            状态为新品
                            _this.newSwitch = true;
                        }
                    })

                }
            },
            addGoods(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if (!utils.isRoles("12",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate('view/shop/goods/edit.js?type=add'), function (res) {
                    _this.clicked = false;
                    if(res.type == 'success'){
//                        res.data.sales = 0;
                        _this.goodsList.splice(0,0,res.data);
//                                此时自己手动添加的数据，pagestart如果没有自增,用户触发上啦加载时，会多返回一条数据来
                        _this.pageStart ++;
                    }
                });
            },
//            分类
            goCatagory(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/shop/goods/catagory.js?name=catagoryList'), function (data) {
                    _this.clicked = false;
                    _this.getCatagory();
                });
            },
                //分类切换
            catagoryChange:function(index,id){
//                event.toast(id);
                var _this = this;
                if(_this.whichCorpus == index){
                    return;
                }
                _this.whichCorpus = index;
                _this.productCategoryId = id;
                this.pageStart = 0;

                this.doReset();
//                如果在搜索状态下就不做数据加载
                if(!this.doSearch){
                    _this.getAllGoods();
                }else{
                    _this.goodsList = [];
                    _this.searchGoods();
                }
            },

//            获取分类
            getCatagory:function () {
                var _this = this;
                GET('weex/member/product_category/list.jhtml',function (data) {
                    if (data.type == "success") {
                        if(data.data == ''){
                        }else{
//                            event.toast(data.data);
                            _this.catagoryList = '';
                            _this.catagoryList =[{
                                name:'全部',
                                id:''
                            }];
//                                将文集名循环插入数组中
                            for(let i = 0; i<data.data.length;i++){
                                _this.catagoryList.splice(1 + i,0,data.data[i]);
                            }
                            data.data = JSON.stringify(data.data);
                            storage.setItem('catagoryList',data.data);
                        }
                    }else {
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
//            发布商品weex/member/product/article.jhtml?id=goodsId
            doPublish(){
                this.hasLabelBox = false
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                let _this = this;
//                判断是否已发布过的商品，是就跳转编辑旧文章，不是就编辑新的文章
                GET('weex/member/product/article.jhtml?id=' + this.goodsId,function (data) {
                    if(data.type == 'success'){
                        if(data.data == 0){
//                        如果没有历史记录就新添加一个缓存
                            var goodsPublish =  _this.goodsList[_this.goodsIndex];
                            goodsPublish = JSON.stringify(goodsPublish);
                            storage.setItem('goodsPublish', goodsPublish , e => {
                                if(e.result == 'success'){
                                    event.openURL(utils.locate('view/member/editor/editor.js?goodsStorageName=goodsPublish&goodsId=' + _this.goodsId), function (data) {
                                        _this.doReset();
                                        _this.clicked = false;
                                        if(!utils.isNull(data.data.isDone) && data.data.isDone == 'complete'){
                                            let E = {
                                                isDone : 'complete'
                                            }
                                            let backData = utils.message('success','成功',E);
                                            event.closeURL(backData);
                                        }
                                    });
                                }else{
                                    _this.clicked = false;
                                    event.toast('网络不稳定');
                                }
                            });
                        }else{
                            event.openURL(utils.locate('view/member/editor/editor.js?articleId=' + data.data + '&goodsId=' + _this.goodsId),function (data) {})
                        }
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })


            },
//            编辑商品
            doEdit(){
                this.hasLabelBox = false
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/goods/edit.js?id=' + this.goodsId), function (res) {
                    _this.clicked = false;
                    _this.doReset();
                    if(res.type == 'success'){
                        _this.goodsList.splice(_this.goodsIndex,1);
                        _this.goodsList.splice(0,0,res.data);
                    }
                });
            },
//            删除商品
            doDel(){
                this.hasLabelBox = false
                let _this = this;
                modal.confirm({
                    message: '是否要删除该商品?',
                    duration: 0.3,
                    okTitle:'删除',
                    cancelTitle:'取消',
                }, function (value) {
                    if (value == '删除') {
                        POST('weex/member/product/delete.jhtml?ids=' + _this.goodsId).then(function (data) {
                            if (data.type == 'success') {
                                _this.goodsList.splice(_this.goodsIndex, 1);
                                event.toast('删除成功');
                                _this.isPopup = false;
                            } else {
                                event.toast(data.content);
                            }
                        }, function (err) {
                            event.toast(err.content);
                        });
                    };
                });
            },
//            前往活动
            goAcitve(){
                this.hasLabelBox = false
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/goods/activityList.js?id=' + this.goodsId+'&goodsName='+encodeURIComponent(this.goodsName)), function (res) {
                    _this.clicked = false;
                    _this.doReset();
//                    if(res.type == 'success'){
//                        _this.goodsList.splice(_this.goodsIndex,1);
//                        _this.goodsList.splice(0,0,res.data);
//                    }
                });
            },
//            返回
            goback:function () {
                event.closeURL();
            },
//            前往搜索
            goSearch:function () {
                this.doSearch = true;
                this.searchOrCancel = '取消'
                let _this = this;
                this.goodsList = [];
                this.noDataHint = "输入查找商品";
//                event.openURL(utils.locate('view/shop/goods/search.js'), function (res) {
//                    _this.doReset();
//                    if(res.type == 'success'){
//
//                    }
//                });
            },
            oninput:function (e) {
                this.isSearch = false;
                this.keyword = e.value;
                this.searchOrCancel = '搜索';
                this.goodsList = [];
                this.noDataHint = "输入查找商品";
                if(e.value.length == 0){
                    this.searchOrCancel = '取消'
                }
            },
            search: function (e) {
                var _this = this;
                this.isSearch = true;
                this.pageStart = 0;
                this.searchOrCancel = '取消';
                this.productCategoryId = '';
                this.whichCorpus = 0;
                this.searchGoods();
            },
//            点击右上角取消或者搜索按钮
            noSearch:function () {
                this.inputBlur();
                if(this.searchOrCancel == '取消'){
                    this.pageStart = 0;
                    this.doSearch = false;
                    this.getAllGoods();
                }else{
                    this.search();
                }
            },
//          查找商品
            searchGoods:function () {
                let _this = this;
                if(this.pageType == false){
                    GET('weex/member/product/list.jhtml?keyword='+ encodeURI(_this.keyword)  + '&productCategoryId=' + this.productCategoryId + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                        if(data.type == 'success'){
                            if (_this.pageStart == 0) {
                                _this.goodsList = data.data.data;
                            }else{
                                data.data.data.forEach(function (item) {
                                    _this.goodsList.push(item);
                                })
                            }
                            _this.noDataHint = '商品不存在';
                            _this.pageStart = data.data.start + data.data.data.length;
                        }else{
                            event.toast(data.content);
                        }
                    },function (err) {
                        event.toast(err.content);
                    })
                }else{
//                    查找选择模式，多传一个type参数
                    GET('weex/member/product/list.jhtml?type=query&keyword='+ encodeURI(_this.keyword)  + '&productCategoryId=' + this.productCategoryId + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                        if(data.type == 'success'){
                            if (_this.pageStart == 0) {
                                _this.goodsList = data.data.data;
                            }else{
                                data.data.data.forEach(function (item) {
                                    _this.goodsList.push(item);
                                })
                            }
                            _this.noDataHint = '商品不存在';
                            _this.pageStart = data.data.start + data.data.data.length;
                        }else{
                            event.toast(data.content);
                        }
                    },function (err) {
                        event.toast(err.content);
                    })
                }

            },
//          清空关键字
            clearBuf:function () {
                this.keyword = '';
            },
            inputBlur(){
                this.$refs['searchBar'].blur();
            },
//            封面加载出来
            onImageLoad(item){
                item.loading = true;
            },
        }
    }
</script>
<template>
    <waterfall class="wrapper" show-scrollbar="false"   @loadmore="onloading" loadmoreoffset="300" column-gap="10" column-width="auto" column-count="2">
        <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'"  >
            <image resize="cover" class="refreshImg" ref="refreshImg" :src="refreshImg" ></image>
        </refresh>
        <header v-if="hasImageList()">
            <!--轮播图-->
            <div class="bt10">
                <slider class="slider" interval="3000" auto-play="true">
                    <div class="frame" v-for="img in imageList">
                        <image class="slideImage" resize="cover"  :src="img.thumbnail"  @click="goArticle(img.id)"></image>
                    </div>
                    <indicator class="indicatorSlider"></indicator>
                </slider>
            </div>
        </header>
        <!--相关用户-->
        <header v-if="userList.length > 3">
            <transverse :userList="userList" @goAuthor="goAuthor"></transverse>
        </header>
        <!--无数据时显示-->
        <header @swipe="onpanmove($event)" >
            <noData :noDataHint="noDataHint" v-if="articleList.length == 0"  :style="{minHeight:screenHeight + 'px'}" ></noData>
        </header>
        <!--文章列表-->
        <cell v-for="(item,index) in articleList" :key="index" @click="goArticle(item.id)"  @swipe="onpanmove($event)" >
            <div>
                <div  class="articleBox">
                    <!--<div class="atricleHead">-->
                    <!--<text class="articleTitle">{{item.title}}</text>-->
                    <!--</div>-->
                    <!--<div class="atricleHead mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
                    <!--<text class="articleContent">{{item.htmlTag}}</text>-->
                    <!--</div>-->
                    <!--文章封面-->
                    <div style="position: relative">
                        <!--不能用过滤器,在上啦加载push时 会渲染不出来-->
                        <image  :src="item.thumbnail "  resize="cover" class="articleCover"></image>
                    </div>

                    <div class="flex-row bt20" >
                        <text class="articleTitle tempOneWidth" >{{item.title}}</text>
                    </div>
                    <div class="flex-row bt20"  v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
                        <text class="articleContent tempOneWidth" >{{item.htmlTag}}</text>
                    </div>

                    <div class="flex-row ml20 bt20" @click="goAuthor(item.authorId)">
                        <!--不能用过滤器,在上啦加载push时 会渲染不出来-->
                        <image :src="item.logo " resize="cover" class="authorImg"></image>
                        <text class="authorName">{{item.author}}</text>
                    </div>
                    <!--文章底部-->
                    <div class="articleFoot">
                        <div class="relevantInfo" v-if="item.articleSign != '样例'">
                            <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                            <text class="relevantText">{{item.hits}}</text>
                            <text class="relevantImage " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                            <text class="relevantText">{{item.laud}}</text>
                            <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                            <text class="relevantText">{{item.review}}</text>
                        </div>
                    </div>
                </div>
            </div>
        </cell>
    </waterfall>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    /*<!--轮播图-->*/
    .indicatorSlider{
        position: absolute;
        bottom: 10px;
        width:750px;
        /*height为10时 底下的点会变成椭圆，20会变成圆 */
        height: 10px;
        align-items: center;
        item-selected-color:#fff;
        item-size:15px;
    }
    .slideImage {
        width: 750px;
        /*height: 280px;*/
        height: 375px;
    }
    .slider {
        width: 750px;
        height: 375px;
        /*height: 280px;*/
    }
    .frame {
        width: 750px;
        /*height: 280px;*/
        height: 375px;
        position: relative;
    }
    /*轮播图*/

    .tempOneWidth{
        width:330px;
        margin-left: 20px;
    }

    .mt20{
        margin-top: 20px;
    }
    .articleContent{
        lines: 3;text-overflow: ellipsis;
        /*font-size: 32px;*/
        font-size:30px;
        color: #888;
    }
    .activeClass{
        visibility: visible;
    }
    .noactive{
        visibility: hidden;
    }
    .relevantImage {
        flex-direction: row;
        font-size: 32px;
        color: #888;
        margin-right: 5px;
        margin-left: 5px;
        align-items: center;
    }
    .relevantText {
        color: #888;
        font-size: 26px;
    }
    .relevantInfo {
        flex-direction: row;
        align-items: center;
    }
    .articleFoot {
        flex-direction: row;
        justify-content: space-between;
        width: 330px;
        margin-left: 20px;
        align-items: center;
    }
    .authorName {
        font-size: 30px;
        margin-left: 10px;
        color: #888;
        width:240px;
        lines:1;
        text-overflow: ellipsis;
    }
    .authorImg{
        width: 60px;height: 60px;border-radius: 30px;
    }
    .articleCover {
        width: 370px;
        height: 370px;
        /*width:690px;*/
        /*border-radius: 5px;*/
        margin-bottom: 20px;
    }
    .articleBox {
        background-color: #ffffff;
        /*padding-left: 30px;*/
        /*padding-right: 30px;*/
        padding-bottom: 20px;
        margin-bottom: 10px;
    }
    .atricleHead {
        flex-direction: row;
        align-items: center;
        margin-left: 20px;
    }
    .articleTitle {
        /*font-size: 38px;*/
        font-size:36px;
        lines: 2;
        text-overflow: ellipsis;
    }
    .articleSign {
        border-radius: 10px;
        padding: 5px;
        color: #888;
        font-size: 26px;
        border-width: 1px;
        border-style: solid;
        border-color: gainsboro;
    }
</style>
<script>
    import utils from '../../assets/utils';
    import {dom,event,animation} from '../../weex.js';
    import { POST, GET } from '../../assets/fetch';
    import noData from '../../include/noData.vue';
    import transverse from '../../widget/transverseList.vue';
    import tabNav from '../../include/tabNav.vue';
    export default {
        data(){
            return{
                refreshing:false,
                showLoading: 'hide',
                pageStart:0,
                pageSize:10,
                articleList:[],
                refreshImg:utils.locate('resources/images/loading.png'),
                hadUpdate:false,
                screenHeight:0,
                clicked:false,
                imageList: [],
                userList:[],
                UId:0,
                corpusList:[{
                    name:'哈哈哈',
                },{
                    name:'哈哈哈1',
                },{
                    name:'哈哈哈2',
                },{
                    name:'哈哈哈3',
                }]
            }
        },
        components: {
            noData,transverse,tabNav
        },
        props:{
//            whichCorpus:{default:0}
            noDataHint:{default:'暂无文章'},
            articleCategoryId:{default:'0'}
        },
        filters:{
            watchThumbnail:function (value) {
//                    没过滤前是原图
                return utils.thumbnail(value,750,375);
            },
            watchlogo:function (value) {
                return utils.thumbnail(value,60,60);
            },
        },
        created(){
            utils.initIconFont();
            var _this = this;
            this.UId = event.getUId();
            this.getAllArticle();
            this.getUserList();
//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(316);
            utils.initIconFont();

        },
        methods:{
            hasImageList(){
              if(utils.isNull(this.imageList)){
                  return false;
              }  else{
                  return true;
              }
            },
//            获取推荐用户列表
            getUserList(){
              let _this = this;
              GET('weex/circle/list.jhtml?id=' + this.UId,function(data){
                  if(data.type == 'success'){
                      _this.userList = data.data;
                  }else{
                      event.toast(data.content);
                  }
              },function(err){
                  event.toast(err.content);
              })
            },
//            获取文章列表
            getAllArticle(){
                let _this = this;
                GET('weex/article/list.jhtml?pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success' && data.data.data != '' ){
                        let dataLength = data.data.data.length;
                        data.data.data.forEach(function (item,index) {
                            if(!utils.isNull(item.logo)){
//                                <!--不能用过滤器,在上啦加载push时 会渲染不出来，具体原因还得分析-->
                                item.logo = utils.thumbnail(item.logo,60,60);
                            }else{
                                item.logo = utils.locate('resources/images/background.png');
                            }
                            if(utils.isNull(item.nickName)){
                                item.nickName = 'author';
                            }
//                          填充轮播图
                            if(!utils.isNull(item.tags) && _this.imageList.length < 5){
                                for(var i = 0;i < item.tags.length; i ++){
                                    if(item.tags[i].id == 5){
                                        _this.imageList.push(item);
                                        data.data.data.splice(index,1);
                                        break;
                                    }
                                }
                            }
//                                <!--不能用过滤器,在上啦加载push时 会渲染不出来，具体原因还得分析-->
                            if(!utils.isNull(item.thumbnail)) {
                                item.thumbnail = utils.thumbnail(item.thumbnail,370, 370);
                            }
                            if(_this.pageStart != 0){
                                _this.articleList.push(item);
                            }
                        })
//                        假如没有精选文章，就从获取到的所有文章里取出
                        if (_this.pageStart == 0) {
                            while(_this.imageList.length < 5){
                                if(data.data.data.length == 0){
                                    break;
                                }
//                                获取原图
                                data.data.data[0].thumbnail = utils.filterThumbnail(data.data.data[0].thumbnail);
//                                获取需要的比例缩略图
                                data.data.data[0].thumbnail = utils.thumbnail(data.data.data[0].thumbnail,750, 375);
                                _this.imageList.push(data.data.data[0]);
                                data.data.data.splice(0,1);
                            }
                            _this.articleList = data.data.data;
                        }
                        _this.pageStart = data.data.start + dataLength;
                    }else  if(data.type == 'success' && data.data.data == '' ){
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
//            前往作者专栏
            goAuthor(id){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                    _this.clicked = false;
                });
//                event.openURL(utils.locate('view/member/author.js?id=5'),function () {})
            },
            goArticle(id){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/article/preview.js?articleId=' + id  + '&publish=true' ),
                    function () {
                        _this.clicked = false;
                    }
                )
            },
            onpanmove(e){
                this.$emit('onpanmove',e.direction);
            },

            onloading:function () {
////            获取文章列表
                this.getAllArticle();
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
                    _this.imageList = [];
                    _this.getAllArticle();
                }, 1000)
            },
        }
    }
</script>
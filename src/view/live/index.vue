<template>
    <div class="wrapper bgWhite" style="background-color: white">
        <div class="header  "  :class="[classHeader()]">
            <!--顶部导航-->
            <div class="nav nw">
                <div class="nav_back" @click="goback()">
                    <text class="nav_ico"   :style="{fontFamily:'iconfont'}">&#xe669;</text>
                </div>
                <!--页面名称-->
                <div class="userBox" >
                    <text class="nav_title">{{pageName}}</text>
                </div>
                <div class="rightTop" >
                </div>
            </div>
        </div>
        <waterfall  show-scrollbar="false"   @loadmore="onloading" ref="listDom" :scrollable="canScroll" loadmoreoffset="300" column-gap="10" column-width="369"  column-count="2" >
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'"  >
                <image resize="cover" class="refreshImg" ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <header v-if="hasImageList()">
                <div class="bt10">
                    <slider class="slider" interval="3000" auto-play="true">
                        <div class="frame" v-for="img in imageList">
                            <!--配合图片懒加载，先显示一个本地图片-->
                            <div  v-if="!img.loading"  class="slideImage coverAbsoTop " ></div>
                            <!--使用组件加载完成事件与组件显示在屏幕上的事件实现图片懒加载,会先触发appear事件,再触发load事件,appear会重复触发(例如：1 2 3,先触发了1 2，在滑动到下方时触发了3，此时1被移动到屏幕外，再移动回顶部，1显示出来，会继续触发1的appear事件)-->
                            <image class="slideImage" resize="cover"    @load="onImageLoad(img)"  :src="img.thumbnail"  @click="goArticle(img.id)"></image>
                        </div>
                        <indicator class="indicatorSlider"></indicator>
                    </slider>
                </div>
            </header>
            <header >
                <noData :noDataHint="noDataHint" v-if="liveList.length == 0" ndBgColor="#fff" :style="{minHeight:screenHeight + 'px'}" ></noData>
            </header>
            <header  v-if="liveList.length > 0" >
                <div class="bkg-white pt20 pb20 pl20 pr20 flex-row" >
                    <text class="fz40 " style="color: #EB4E40" :style="{fontFamily:'iconfont'}" >&#xe653;</text>
                    <text class="title ml10">直播推荐</text>
                </div>
            </header>
            <cell v-for="item in liveList" @click="seeLive(item)">
                <div class="bt30" >
                    <div>
                        <!--配合图片懒加载，先显示一个本地图片-->
                        <div  v-if="!item.loading"  class="liveCover coverAbsoTop " ></div>
                        <image :src="item.frontcover | watchFrontCover" resize="cover" class="liveCover"  @load="onImageLoad(item)"></image>
                        <!--避免 主播上传的是白色封面，会导致标题白色字体看不见-->
                        <div class="tempMask" v-if="item.loading"></div>
                        <div class="space-between coverInfo">
                            <text class="sub_title white">{{item.nickname | watchAuthor}}</text>
                            <text class="sub_title white fzz24"  :style="{fontFamily:'iconfont'}" >&#xe653; {{item.viewerCount | watchOnline}}</text>
                        </div>
                    </div>
                    <div class="pl10 pr10">
                        <text class="liveTitle gameTitle mt10  ">{{item.title}}</text>
                        <!--<text class="liveName">{{item.name}}</text>-->
                    </div>
                </div>
            </cell>
            <!--ios下 waterfall组件内容高度不够时 无法下拉刷新-->
            <header >
                <!--636-->
                <div class="adaptOneHeight"v-if="adaptIosOne()"></div>
            </header>
            <header >
                <!--298-->
                <div class="adaptTwoHeight" v-if="adaptIosTwo()"></div>
            </header>
        </waterfall>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .adaptOneHeight{
      height: 540px;
    }

    .adaptTwoHeight{
        height: 200px;
    }

    .coverAbsoTop{
        position: absolute;
        top:0;
        background-color: rgba(136,136,136,0.1);
    }

    /*直播列表*/
    .fzz24{
        font-size: 24px;
    }
    .liveTitle{
        font-size: 28px;
        color: #444;
    }
    .liveName{
        font-size: 26px;
        color: #F0AD3C;
    }
    .gameTitle{
        lines:1;
        text-overflow: ellipsis;
        width: 350px;
    }
    .coverInfo{
        position: absolute;
        bottom:10px;
        left: 10px;
        right: 10px;
    }
    .liveCover{
        border-radius: 5px;
        width: 369px;
        height: 270px;
    }
    /*直播列表*/

    /*顶部导航栏*/
    .rightTop{
        height: 96px;width: 98px;align-items: center;justify-content: center;margin-top: 5px;
    }
    .nav_ico {
        font-size: 38px;
        color: #fff;
        margin-top: 2px;
    }
    .userBox{
        flex-direction: row;
        align-items: center;
    }
    .nw{
        width: 750px;
    }
    /*顶部导航栏*/

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
        height: 280px;
        /*height: 375px;*/
    }
    .slider {
        width: 750px;
        /*height: 375px;*/
        height: 280px;
    }
    .frame {
        width: 750px;
        height: 280px;
        /*height: 375px;*/
        position: relative;
    }
    /*轮播图*/

    .tempMask{
        position: absolute;top: 0;left: 0px;right: 0px;bottom: 0px;background-color: #000;opacity: 0.2;
    }
</style>
<script>
    const livePlayer = weex.requireModule('livePlayer');
    import filters from '../../filters/filters';
    import utils from '../../assets/utils';
    import {dom,event,animation} from '../../weex.js';
    import { POST, GET } from '../../assets/fetch';
    import noData from '../../include/noData.vue';
    export default {
        data(){
            return{
                refreshing:false,
                showLoading: 'hide',
                pageStart:0,
                pageSize:10,
                canScroll:true,
                liveList:[
//                    {
//                    thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522837629642&di=9671800c4b314f94a4d76931b824b34d&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2Fecd8b4dad519e8635c4d1c5dcf738061ab9cad71.jpg',
//                    title:'第一画质~4K原画 加油～',
//                    name:'绝地求生',
//                    author:'狐狸不太Sao'
//                },{
//                    thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522837714199&di=8247f9f422403c2019ff62b0561f3799&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F200482cfd57bf9805d276cde6cee5b9fc70fb7c8.jpg',
//                    title:'青蛙：CD锤石创始人 平行四边形对角开大',
//                    name:'英雄联盟',
//                    author:'CD锤石创始人青蛙'
//                },{
//                    thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522837743206&di=39be23646c219e97bd18c1d089a0a287&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F0b46f21fbe096b635676cb8f0a338744eaf8ac86.jpg',
//                    title:'马妞妞：今天生日,大家快乐开party～',
//                    name:'美女直播',
//                    author:'47号Gamer'
//                },{
//                    thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522837714200&di=53d79d1ebd04aef8dbf07986ea08dd6e&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F950a062f2f375b1c89fd075a087fe6129b4fbd68.jpg',
//                    title:'[DSL]赛事重播',
//                    name:'热门网游',
//                    author:'DSL斗鱼超级联赛'
//                },{
//                    thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522837629390&di=c49380998b1ae953727b9026cfbfc1d3&imgtype=0&src=http%3A%2F%2Fwww.xbxmw.com%2Fxyy-xbxmwcom%2Fallimg%2F171127%2F001H2J13-6.jpg',
//                    title:'胡戈单人4排',
//                    name:'绝地求生',
//                    author:'胡戈'
//                }
                ],
                refreshImg:utils.locate('resources/images/loading.png'),
                hadUpdate:false,
                screenHeight:0,
                clicked:false,
                imageList: [{
                    thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522832892881&di=c13229432ab1f9a63a12d64b2e0fae04&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F160918%2F102-16091Q14543I9.jpg',
                },{
                    thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523427589&di=3fefbd5f9ea5a1ba3b661b1de4063a68&imgtype=jpg&er=1&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F170217%2F102-1F21G01513Z5.jpg',
                },{
                    thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522832892878&di=2052c72e96d6e2bdfcf6fedd8b8c4485&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F85%2F29%2F50t58PICuba_1024.jpg',
                }],
//                isInit:true,
                pageName:'直播',
            }
        },
        components: {
            noData
        },
        props:{
//            whichCorpus:{default:0}
            noDataHint:{default:'暂无直播'},
            articleCategoryId:{default:'0'}
        },
        filters:{
            watchAuthor:function (value) {
                if(utils.isNull(value)){
                    return value;
                }else{
                    //              如果用户名称过长，便截取拼成名字
                    return utils.changeStrLast(value,7,15);
                }
            },
            watchOnline:function (value) {
               if(utils.isNull(value)){
                   return 0
               }else{
                   return value > 9999 ? parseFloat(utils.currencyfmt(value/10000)) + "万" : value;
               }
            },
            watchFrontCover:function(value){
                return utils.thumbnail(value,369,270);
            }
        },
        created(){
            utils.initIconFont();
            var _this = this;
//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(316);
            this.getLiveList();
        },
        methods:{
            adaptIosOne(){
              if(utils.isIosSystem()){
                  if(this.liveList.length != 0 &&  this.liveList.length < 3){
                      return true;
                  }else{
                      return false;
                  }
              }else{
                  return false;
              }
            },
            adaptIosTwo(){
                if(utils.isIosSystem()){
                    if(this.liveList.length != 0 &&  this.liveList.length >2 && this.liveList.length < 5){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            },
            getLiveList:function () {
                let _this = this;
              GET('weex/live/list.jhtml?pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                  if(data.type == 'success'){
                      if (_this.pageStart == 0) {
                          data.data.data.forEach(function (item) {
//                              配合懒加载
                              item.loading = false;
                          })
                          _this.liveList = data.data.data;
                      }else{
                          data.data.data.forEach(function (item) {
//                              配合懒加载
                              item.loading = false;
                              _this.liveList.push(item);
                          })
                      }
                      _this.pageStart = data.data.start + data.data.data.length;
                  }else{
                      event.toast(data.content);
                  }
              },function (err) {
                  event.toast(err.content);
              })
            },
            classHeader:function () {
                let dc = utils.device();
                return dc
            },
//            封面显示出来
            onImageAppear(item){
                if(utils.isNull(item.loadingImg)){
                    item.loadingImg = item.thumbnail;
                }
            },
//            封面加载出来
            onImageLoad(item){
                item.loading = true;
            },

            hasImageList(){
                if(utils.isNull(this.imageList)){
                    return false;
                }else{
                    return true;
                }
            },


            onloading:function () {
                this.getLiveList();
////            获取文章列表
//                强制触发上啦加载
                this.$refs.listDom.resetLoadmore();
            },
            onrefresh:function () {
                var _this = this;
                _this.canScroll = false;
                _this.pageStart = 0;
//                避免下拉刷新时触发 轮播图的v-if事件 避免销毁,页面跳动
//                if(!utils.isNull(this.imageList)){
//                    this.isInit = false;
//                }else{
//                    this.isInit = true;
//                }
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
                    _this.refreshing = false;
                    _this.canScroll = true;
                    _this.getLiveList();
                }, 1000)
            },
            seeLive(item){
                livePlayer.toLookLiveRoom(item.liveId,function (data) {});
            },
            goback(){
                event.closeURL();
            }
        }
    }
</script>
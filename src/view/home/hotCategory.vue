<template>
    <scroller show-scrollbar="false" >
        <div class="articleBox" v-for="(item,index) in articleList" :key="index" @click="goArticle(item.id)"  @swipe="onpanmove($event)" >
            <div class="atricleHead">
                <text class="articleTitle">{{item.title}}</text>
            </div>
            <div class="atricleHead mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
                <text class="articleContent">{{item.htmlTag}}</text>
            </div>
            <!--文章封面-->
            <div style="position: relative">
                <image :src="item.thumbnail" resize="cover" class="articleCover"></image>
            </div>
            <!--文章底部-->
            <div class="articleFoot">
                <div style="flex-direction: row;align-items: center">
                    <image :src="item.logo" resize="cover" class="authorImg"></image>
                    <text class="authorName">{{item.author}}</text>
                </div>
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
        <loading class="loading" @loading="onloading" :display="showLoading">
            <text class="indicator">Loading ...</text>
        </loading>
    </scroller>
</template>
<style>
    .mt20{
        margin-top: 20px;
    }
    .articleContent{
        lines: 2;width: 690px;text-overflow: ellipsis;
        font-size: 32px;
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
        width: 690px;
        margin-left: 30px;
        align-items: center;
    }
    .authorName {
        font-size: 30px;
        margin-left: 10px;
        color: #888;
    }
    .authorImg{
        width: 60px;height: 60px;border-radius: 30px;
    }
    .articleCover {
        height: 450px;
        /*width:690px;*/
        width:750px;
        /*border-radius: 5px;*/
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .articleBox {
        background-color: #ffffff;
        /*padding-left: 30px;*/
        padding-top: 20px;
        /*padding-right: 30px;*/
        padding-bottom: 20px;
        margin-bottom: 10px;
    }
    .atricleHead {
        flex-direction: row;
        align-items: center;
        margin-left: 30px;
    }
    .articleTitle {
        font-size: 38px;
        lines: 1;width: 690px;text-overflow: ellipsis;
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
    const event = weex.requireModule('event');
    import { POST, GET } from '../../assets/fetch';
    export default {
        data(){
            return{
                showLoading: 'hide',
                listCurrent:0,
                pageSize:10,
//                articleList:[]
                articleList:[
//                    {
//                            id:1,
//                            title:'疆之南,帕米尔高原!',
//                            thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510034474615&di=f2ba9e212ffbcfa644b28772226e453d&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Ff%2F5408127f8221d.jpg',
//                            content:'南疆的秋意，在秋风的轻拂下，透过蓝天上的秋阳，从胡杨的荒野里晕染开去，演绎开去，竟是愈来愈漂亮啊',
//                            author:'YuDie',
//                            logo:'',
//                            hits:666,
//                            review:256,
//                            laud:432
//                        },{
//                        value:{
//                            key:1,
//                            title:'微笑，是一个人最美好的样子',
//                            thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510034474614&di=994c5c48c49cd647333e8500d32d3a73&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2%2F5108bcac48e3b.jpg',
//                            content:'微笑，是一个人最美好的样子。其实每一个微笑都是绽放在我们脸上最美的花朵。法国作家雨果曾说:"微笑，最美好!"',
//                            author:'淘气包',
//                            hits:351,
//                            review:231,
//                            laud:229
//                        }},{
//                        value:{
//                            key:1,
//                            title:'海边的惬意',
//                            thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510034474617&di=78c23715f2816f13a99a2e12eafd9e32&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F32fa828ba61ea8d35e5c44059d0a304e251f58b0.jpg',
//                            content:'南疆的秋意，在秋风的轻拂下，透过蓝天上的秋阳，从胡杨的荒野里晕染开去，演绎开去，竟是愈来愈漂亮啊',
//                            author:'独舟视角',
//                            hits:0,
//                            review:0,
//                            laud:0
//                        }} ,{
//                        value:{
//                            key:1,
//                            title:'鸟瞰图',
//                            thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510034474616&di=13fcb5f3799afc96e11ee5543b45b474&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F1%2F56f5023bbcb03.jpg',
//                            content:'南疆的秋意，在秋风的轻拂下，透过蓝天上的秋阳，从胡杨的荒野里晕染开去，演绎开去，竟是愈来愈漂亮啊',
//                            author:'独舟视角',
//                            hits:0,
//                            review:0,
//                            laud:0
//                        }},
//                    {
//                        value:{
//                            key:1,
//                            title:'你好的',
//                            thumbnail:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                            content:'南疆的秋意，在秋风的轻拂下，透过蓝天上的秋阳，从胡杨的荒野里晕染开去，演绎开去，竟是愈来愈漂亮啊',
//                            author:'kuqi',
//                            hits:0,
//                            review:0,
//                            laud:0
//                        }},{
//                        value:{
//                            key:1,
//                            title:'你好啊',
//                            thumbnail:'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
//                            content:'南疆的秋意，在秋风的轻拂下，透过蓝天上的秋阳，从胡杨的荒野里晕染开去，演绎开去，竟是愈来愈漂亮啊',
//                            author:'无界艺术',
//                            hits:0,
//                            review:0,
//                            laud:0
//                        }},{
//                        value:{
//                            key:1,
//                            title:'你好a',
//                            thumbnail:'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg',
//                            content:'南疆的秋意，在秋风的轻拂下，透过蓝天上的秋阳，从胡杨的荒野里晕染开去，演绎开去，竟是愈来愈漂亮啊',
//                            author:'独舟视角',
//                            hits:0,
//                            review:0,
//                            laud:0
//                        }
//                    }
                    ]
            }
        },
        props:{
//            whichCorpus:{default:0}
            articleCategoryId:{default:'0'}
        },
        created(){
            utils.initIconFont();
            var _this = this;
            GET('weex/article/list.jhtml?articleCategoryId=' + this.articleCategoryId + '&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize ,function (data) {
                if(data.type == 'success'){
                    data.data.data.forEach(function (item) {
                        if(utils.isNull(item.thumbnail)){
                        }else{
                            item.thumbnail = utils.thumbnail(item.thumbnail,750,450);
                        }
                    })
                    _this.articleList = data.data.data;
//                    data.data.data.forEach(function (dss) {
//                        _this.articleList.push(dss);
//                        _this.articleList.push(dss);
//                        _this.articleList.push(dss);
//                        _this.articleList.push(dss);
//                        _this.articleList.push(dss);
//                        _this.articleList.push(dss);
//                        _this.articleList.push(dss);
//                        _this.articleList.push(dss);
//                        _this.articleList.push(dss);
//                    })
                }
            },function (err) {
                event.toast(err.content)
            })

        },
        methods:{
            goArticle(id){
                event.openURL(utils.locate('view/member/editor/preview.js?articleId=' + id  + '&publish=true' ),
                    function () {
                    })

            },
            onpanmove(e){
                this.$emit('onpanmove',e.direction);
            },
            onloading (e) {
                var _this = this;
                this.showLoading = 'show'
                setTimeout(() => {
                    this.listCurrent = this.listCurrent + this.pageSize;
                    GET('weex/article/list.jhtml?articleCategoryId=' + this.articleCategoryId + '&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize,function (data) {
                        if(data.type == 'success'){
                            if(utils.isNull(data.data.data)){
                                event.toast('已经到底了');
                            }else{
                                data.data.data.forEach(function (item) {
                                    _this.articleList.push(item);
                                })
                            }
                        }
                    },function (err) {
                        event.toast(err.content)
                    })
                    this.showLoading = 'hide'
                }, 1500)
            }
        }
    }
</script>
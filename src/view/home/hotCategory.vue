<template>
    <scroller show-scrollbar="false">
        <div class="articleBox" v-for="(item,index) in articleList" :key="index" @click="goArticle(item.key)" @swipe="onpanmove($event)">
            <div class="atricleHead">
                <text class="articleTitle">{{item.value.title}}</text>
            </div>
            <div class="atricleHead mt20" v-if="item.value.content != '' && item.value.content != null && item.value.content != undefined">
                <text class="articleContent">{{item.value.content}}</text>
            </div>
            <!--文章封面-->
            <div style="position: relative">
                <image :src="item.value.thumbnail" resize="cover" class="articleCover"></image>
            </div>
            <!--文章底部-->
            <div class="articleFoot">
                <div style="flex-direction: row;align-items: center">
                    <image :src="item.value.thumbnail" resize="cover" class="authorImg"></image>
                    <text class="authorName">{{item.value.author}}</text>
                </div>
                <div class="relevantInfo" v-if="item.articleSign != '样例'">
                    <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                    <text class="relevantText">{{item.value.hits}}</text>
                    <text class="relevantImage " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                    <text class="relevantText">{{item.value.laud}}</text>
                    <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                    <text class="relevantText">{{item.value.review}}</text>
                </div>
            </div>
        </div>
        <loading class="loading" @loading="onloading" :display="showLoading">
            <text class="indicator">Loading ...</text>
        </loading>
    </scroller>
</template>
<style>
    .authorImg{
        width: 60px;height: 60px;border-radius: 30px;
    }
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
    export default {
        data(){
            return{
                showLoading: 'hide',
                listCurrent:0,
                listPageSize:10,
//                articleList:[]
                articleList:[
                    {
                        value:{
                            key:1,
                            title:'疆之南,帕米尔高原!',
                            thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510034474615&di=f2ba9e212ffbcfa644b28772226e453d&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Ff%2F5408127f8221d.jpg',
                            content:'南疆的秋意，在秋风的轻拂下，透过蓝天上的秋阳，从胡杨的荒野里晕染开去，演绎开去，竟是愈来愈漂亮啊',
                            author:'YuDie',
                            hits:666,
                            review:256,
                            laud:432
                        }},{
                        value:{
                            key:1,
                            title:'微笑，是一个人最美好的样子',
                            thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510034474614&di=994c5c48c49cd647333e8500d32d3a73&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2%2F5108bcac48e3b.jpg',
                            content:'微笑，是一个人最美好的样子。其实每一个微笑都是绽放在我们脸上最美的花朵。法国作家雨果曾说:"微笑，最美好!"',
                            author:'淘气包',
                            hits:351,
                            review:231,
                            laud:229
                        }},{
                        value:{
                            key:1,
                            title:'海边的惬意',
                            thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510034474617&di=78c23715f2816f13a99a2e12eafd9e32&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F32fa828ba61ea8d35e5c44059d0a304e251f58b0.jpg',
                            content:'南疆的秋意，在秋风的轻拂下，透过蓝天上的秋阳，从胡杨的荒野里晕染开去，演绎开去，竟是愈来愈漂亮啊',
                            author:'独舟视角',
                            hits:0,
                            review:0,
                            laud:0
                        }} ,{
                        value:{
                            key:1,
                            title:'鸟瞰图',
                            thumbnail:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510034474616&di=13fcb5f3799afc96e11ee5543b45b474&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F1%2F56f5023bbcb03.jpg',
                            content:'南疆的秋意，在秋风的轻拂下，透过蓝天上的秋阳，从胡杨的荒野里晕染开去，演绎开去，竟是愈来愈漂亮啊',
                            author:'独舟视角',
                            hits:0,
                            review:0,
                            laud:0
                        }},
                    {
                        value:{
                            key:1,
                            title:'你好的',
                            thumbnail:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                            content:'南疆的秋意，在秋风的轻拂下，透过蓝天上的秋阳，从胡杨的荒野里晕染开去，演绎开去，竟是愈来愈漂亮啊',
                            author:'kuqi',
                            hits:0,
                            review:0,
                            laud:0
                        }},{
                        value:{
                            key:1,
                            title:'你好啊',
                            thumbnail:'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                            content:'南疆的秋意，在秋风的轻拂下，透过蓝天上的秋阳，从胡杨的荒野里晕染开去，演绎开去，竟是愈来愈漂亮啊',
                            author:'无界艺术',
                            hits:0,
                            review:0,
                            laud:0
                        }},{
                        value:{
                            key:1,
                            title:'你好a',
                            thumbnail:'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg',
                            content:'南疆的秋意，在秋风的轻拂下，透过蓝天上的秋阳，从胡杨的荒野里晕染开去，演绎开去，竟是愈来愈漂亮啊',
                            author:'独舟视角',
                            hits:0,
                            review:0,
                            laud:0
                        }
                    }]
            }
        },
        props:{
//            whichCorpus:{default:0}
            type:{default:'亲子'}
        },
        created(){
            utils.initIconFont();
            var _this = this;
            let options = {
                type:'article',
                keyword:'',
                orderBy:'desc',
                current:_this.listCurrent,
                pageSize:_this.listPageSize,
            }
            event.findList(options,function (data) {
                if( data.type == "success" && data.data != '' ) {
                    data.data.forEach(function (item) {
//                    将value json化
                        item.value = JSON.parse(item.value);
//                        把读取到的文章push进去文章列表
                        _this.articleList.push(item);
                    })
                }else{
                    return;
                }
            })
        },
        methods:{
            goArticle(){
                event.toast('跳转文章');
            },
            onpanmove(e){
                this.$emit('onpanmove',e.direction);
            },
            onloading (event) {
                this.showLoading = 'show'
                setTimeout(() => {
                    this.articleList.push({
                        value:{
                            key:1,
                            title:'我是新加入的',
                            thumbnail:'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'
                        }
                    })
                    this.showLoading = 'hide'
                }, 1500)
            }
        }
    }
</script>
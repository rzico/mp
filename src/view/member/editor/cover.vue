<template>
    <div class="wrapperBox">
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="goComplete"> </navbar>
        <div class="coverImageBox"  @click="clickImage()">
              <!-- 1张封面图 -->
            <div class="oneImage" >
                <image :src="coverImage" resize="cover" class="coverImage"  ></image>
            </div>
        </div>
        <div class="coverMaskImage" @click="clickImage()"></div>
        <div class="information" @click="clickImage()">
            <text class="infoText">点击图片更换封面</text>
        </div>
        <list>
            <cell>
                <!--分享到社交平台效果-->
                <div class="shareTitleHead">
                    <text class="shareTitleText">分享到社交平台效果</text>
                </div>
                <!--分享效果内容-->
                <div class="shareContent">
                    <!--分享封面的图片-->
                    <div class="shareImageBox">
                        <!-- 1张封面图 -->
                        <div class="oneImage">
                            <!--分享到平台效果的第一张图-->
                            <!--<image :src="shareCoverImage" resize="cover" class="coverImage" ></image>-->
                            <image :src="coverImage | watchShareImg" resize="cover" class="coverImage" ></image>
                        </div>
                    </div>
                    <!--分享封面的内容-->
                    <div class="shareTextBox">
                        <text class="shareTitle">{{shareTitle}}</text>
                        <text class="shareText">{{shareText}}</text>
                    </div>
                </div>
            </cell>
            <!--文章段落预览-->
            <cell>
                <!--分享到社交平台效果-->
                <div class="shareTitleHead">
                    <text class="shareTitleText">发布到本平台效果</text>
                </div>
                <div class="articleBox">
                    <div class="atricleHead">
                        <text class="articleSign">公开</text>
                        <text class="articleTitle">我的文章</text>
                    </div>
                    <!--文章封面-->
                    <div>
                        <image :src="coverImage" resize="cover" class="articleCover"></image>
                    </div>
                    <!--文章底部-->
                    <div class="articleFoot">
                        <div>
                            <text class="articleDate">2017-09-01</text>
                        </div>
                        <div class="relevantInfo" >
                            <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                            <text class="relevantText">0</text>
                            <text class="relevantImage " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                            <text class="relevantText">0</text>
                            <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                            <text class="relevantText">0</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>

<style>
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
        align-items: center;
    }

    .articleDate {
        font-size: 24px;
        color: #888;
    }
    .articleCover {
        height: 345px;
        width:690px;
        border-radius: 5px;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .atricleHead {
        flex-direction: row;
        align-items: center;
    }

    .articleTitle {
        font-size: 32px;
        margin-left: 10px;
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

    .articleBox {
        margin-bottom: 100px;
        background-color: #ffffff;
        padding-left: 30px;
        padding-top: 30px;
        padding-right: 30px;
        padding-bottom: 30px;
        width:750px;
        display: inline-block
    }
    .infoText{
        color: #fff;
        font-size: 35px;
    }
    .coverMaskImage{
             position: absolute;
            top: 136px;
             left:0;
             width:750px;
             height:375px;
             background-color: #888;
             opacity: 0.5;
         }
    .information{
        position: absolute;
        top: 306px;
        left:235px;
    }
    .shareTitle{
        lines:1;
        text-overflow: ellipsis;
        color: #333;
        font-size: 36px;
        line-height: 50px;
    }
    .shareText{
        color: #ccc;
        font-size: 28px;
        line-height: 38px;
        lines:3;
        text-overflow: ellipsis;
    }
    .shareTextBox{
        width:460px;
        padding-left: 10px;
    }
    .shareImageBox{
        height:160px;
        width:160px;
    }
    .shareContent{
        width:660px;
        height:200px;
        margin-left: 45px;
        flex-direction: row;
        background-color: #fff;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .shareTitleText{
        font-size: 32px;
        color: #999;
    }
    .shareTitleHead{
        padding-bottom: 30px;
        padding-top: 40px;
        align-items: center;
        width:750px;
    }
    .wrapperBox{
        background-color: #EFF0F5;
    }
    .coverImageBox{
        width:750px;
        height:375px;
    }
    .oneImage{
        flex:1;
    }
    .coverImage{
        flex:1;
    }
</style>

<script>
    import navbar from '../../../include/navbar.vue'
    import utils from '../../../assets/utils'
    const storage = weex.requireModule('storage');
    const modal = weex.requireModule('modal');
    const album = weex.requireModule('album');
    const event = weex.requireModule('event');
    export default {
        data:function () {
            return{
                coverBorder:'white',
                shareCoverImage:'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg',
                coverImage:'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg',
                shareText:'   《惊喜魔篇》历时三十天，总行程两万里《横穿玛丽亚》历时三十天，总行程两万里《横穿玛丽亚》历时三十天，总行程两万里《横穿玛丽亚》历时三十天，总行程两万里',
                shareTitle:'  《惊喜魔篇》',
                imageList:[],
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "编辑封面"},
            complete: {default : "完成"}
        },
        filters:{
          watchShareImg(value){
//                    没过滤前是原图
                  return utils.thumbnail(value,160,160);
              }

        },
        created(){
            var _this = this;
            utils.initIconFont();
            var cover = utils.getUrlParameter('name');
            storage.getItem(cover, e => {
                let coverData =  JSON.parse(e.data);
                _this.coverImage = coverData.cover;
                _this.imageList = coverData.image;
//                分享图片
                _this.shareCoverImage = coverData.image[0].path;
//                event.toast(coverData.image);
                storage.removeItem(cover);
            })
        },
        methods:{
//            点击图片时
            clickImage:function () {
                var _this = this;
//                如果没有图片就调用单选接口
                let options = {
                    imageArray:_this.imageList,
                    height:500,
                    width:1000
                }
                album.openPuzzle(options,function(data){
                    if(data.type == 'success' && data.data != ''){
                        _this.coverImage = data.data;
//                        还缺少获取所以的合并图片中第一张图的路径

                    }
                })
            },
//            返回
            goback(){
                event.closeURL();
            },
//            完成
            goComplete:function () {
                let backData = utils.message('success','成功',this.coverImage);
                event.closeURL(backData);
            }
        }
    }
</script>
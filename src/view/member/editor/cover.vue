<template>
    <div class="wrapperBox">
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="goComplete"> </navbar>
        <div class="coverImageBox">
              <!-- 1张封面图 -->
            <div class="oneImage" v-if="imageNumber == 1" >
                <image :src="allCoverImage[0].imgUrl" @click="clickImage(0)" class="coverImage"  :style="{borderColor:coverBorder}"></image>
            </div>
             <!-- 2张封面图 -->
            <div class="twoImage" v-if="imageNumber == 2">
                <image :src="allCoverImage[1].imgUrl" @click="clickImage(1)" class="coverImage rightBorderSub" :style="{borderColor:coverBorder}"></image>
                <image :src="allCoverImage[2].imgUrl" @click="clickImage(2)" class="coverImage leftBorderSub" :style="{borderColor:coverBorder}"></image>
            </div>
             <!-- 3张封面图 -->
            <div class="threeImage" v-if="imageNumber == 3">
                <div class="twoImage">
                    <image :src="allCoverImage[3].imgUrl" @click="clickImage(3)" class="coverImage rightBorderSub " :style="{borderColor:coverBorder}"></image>
                    <image :src="allCoverImage[4].imgUrl" @click="clickImage(4)" class="coverImage rightBorderSub leftBorderSub" :style="{borderColor:coverBorder}"></image>
                    <image :src="allCoverImage[5].imgUrl" @click="clickImage(5)" class="coverImage leftBorderSub" :style="{borderColor:coverBorder}"></image>
                </div>
            </div>
             <!-- 4张封面图  -->
            <div class="fourImage" v-if="imageNumber == 4">
                <div class="twoImage">
                    <image :src="allCoverImage[6].imgUrl" @click="clickImage(6)" class="coverImage rightBorderSub bottomBorderSub" :style="{borderColor:coverBorder}"></image>
                    <image :src="allCoverImage[7].imgUrl" @click="clickImage(7)" class="coverImage leftBorderSub bottomBorderSub" :style="{borderColor:coverBorder}"></image>
                </div>
                <div class="twoImage">
                    <image :src="allCoverImage[8].imgUrl" @click="clickImage(8)" class="coverImage rightBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                    <image :src="allCoverImage[9].imgUrl" @click="clickImage(9)" class="coverImage leftBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                </div>
            </div>
             <!-- 5张封面图  -->
            <div class="fiveImage" v-if="imageNumber == 5">
                <div class="twoImage">
                    <image :src="allCoverImage[10].imgUrl" @click="clickImage(10)" class="coverImage rightBorderSub bottomBorderSub" :style="{borderColor:coverBorder}"></image>
                    <image :src="allCoverImage[11].imgUrl" @click="clickImage(11)" class="coverImage leftBorderSub bottomBorderSub" :style="{borderColor:coverBorder}"></image>
                </div>
                <div class="twoImage">
                    <image :src="allCoverImage[12].imgUrl" @click="clickImage(12)" class="coverImage rightBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                    <image :src="allCoverImage[13].imgUrl" @click="clickImage(13)" class="coverImage rightBorderSub leftBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                    <image :src="allCoverImage[14].imgUrl" @click="clickImage(14)" class="coverImage leftBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                </div>
            </div>
            <!-- 6长封面图 -->
            <div class="fiveImage" v-if="imageNumber == 6">
                <div class="twoImage">
                    <image :src="allCoverImage[15].imgUrl" @click="clickImage(15)" class="coverImage rightBorderSub bottomBorderSub" :style="{borderColor:coverBorder}"></image>
                    <image :src="allCoverImage[16].imgUrl" @click="clickImage(16)" class="coverImage leftBorderSub bottomBorderSub rightBorderSub" :style="{borderColor:coverBorder}"></image>
                    <image :src="allCoverImage[17].imgUrl" @click="clickImage(17)" class="coverImage leftBorderSub bottomBorderSub" :style="{borderColor:coverBorder}"></image>
                </div>
                <div class="twoImage">
                    <image :src="allCoverImage[18].imgUrl" @click="clickImage(18)" class="coverImage rightBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                    <image :src="allCoverImage[19].imgUrl" @click="clickImage(19)" class="coverImage rightBorderSub leftBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                    <image :src="allCoverImage[20].imgUrl" @click="clickImage(20)" class="coverImage leftBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                </div>
            </div>
        </div>
        <!--选择图片布局-->
        <div class="chooseNumber">
            <text class="imgNumber" :style="{fontFamily:'iconfont'}"  @click="changeImageNumber(3)" :class = "[imageNumber == 3 ? 'active' : '']">&#xe60e;</text>
            <text class="imgNumber" :style="{fontFamily:'iconfont'}"  @click="changeImageNumber(4)" :class = "[imageNumber == 4 ? 'active' : '']">&#xe602;</text>
            <text class="imgNumber" :style="{fontFamily:'iconfont'}"  @click="changeImageNumber(2)" :class = "[imageNumber == 2 ? 'active' : '']">&#xe60b;</text>
            <text class="imgNumber" :style="{fontFamily:'iconfont'}"  @click="changeImageNumber(1)" :class = "[imageNumber == 1 ? 'active' : '']">&#xe60d;</text>
            <text class="imgNumber" :style="{fontFamily:'iconfont'}"  @click="changeImageNumber(5)" :class = "[imageNumber == 5 ? 'active' : '']">&#xe60f;</text>
            <text class="imgNumber" :style="{fontFamily:'iconfont'}"  @click="changeImageNumber(6)" :class = "[imageNumber == 6 ? 'active' : '']">&#xe610;</text>
        </div>
        <div class="colorChoose">
            <div class="colorTextBox">
                <text class="borderColorSize">边框颜色:</text>
            </div>
            <div class="colorTextBox colorCoral" @click="changeBorderColor('coral')">
                <text class="colorText">褐色</text>
            </div>
            <div class="colorTextBox colorBlue" @click="changeBorderColor('white')">
                <text class="colorText colorBlack">白色</text>
            </div>
            <div class="colorTextBox colorPink" @click="changeBorderColor('pink')">
                <text class="colorText">粉色</text>
            </div>
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
                        <div class="oneImage" v-if="imageNumber == 1">
                            <image :src="allCoverImage[0].imgUrl"  class="coverImage" :style="{borderColor:coverBorder}"></image>
                        </div>
                        <!-- 2张封面图 -->
                        <div class="twoImage" v-if="imageNumber == 2">
                            <image :src="allCoverImage[1].imgUrl"  class="coverImage rightBorderSub" :style="{borderColor:coverBorder}"></image>
                            <image :src="allCoverImage[2].imgUrl"  class="coverImage leftBorderSub" :style="{borderColor:coverBorder}"></image>
                        </div>
                        <!-- 3张封面图 -->
                        <div class="threeImage" v-if="imageNumber == 3">
                            <div class="twoImage">
                                <image :src="allCoverImage[3].imgUrl"  class="coverImage rightBorderSub " :style="{borderColor:coverBorder}"></image>
                                <image :src="allCoverImage[4].imgUrl"  class="coverImage rightBorderSub leftBorderSub" :style="{borderColor:coverBorder}"></image>
                                <image :src="allCoverImage[5].imgUrl"  class="coverImage leftBorderSub" :style="{borderColor:coverBorder}"></image>
                            </div>
                        </div>
                        <!-- 4张封面图  -->
                        <div class="fourImage" v-if="imageNumber == 4">
                            <div class="twoImage">
                                <image :src="allCoverImage[6].imgUrl"  class="coverImage rightBorderSub bottomBorderSub" :style="{borderColor:coverBorder}"></image>
                                <image :src="allCoverImage[7].imgUrl"  class="coverImage leftBorderSub bottomBorderSub" :style="{borderColor:coverBorder}"></image>
                            </div>
                            <div class="twoImage">
                                <image :src="allCoverImage[8].imgUrl"  class="coverImage rightBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                                <image :src="allCoverImage[9].imgUrl"  class="coverImage leftBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                            </div>
                        </div>
                        <!-- 5张封面图  -->
                        <div class="fiveImage" v-if="imageNumber == 5">
                            <div class="twoImage">
                                <image :src="allCoverImage[10].imgUrl"  class="coverImage rightBorderSub bottomBorderSub" :style="{borderColor:coverBorder}"></image>
                                <image :src="allCoverImage[11].imgUrl"  class="coverImage leftBorderSub bottomBorderSub" :style="{borderColor:coverBorder}"></image>
                            </div>
                            <div class="twoImage">
                                <image :src="allCoverImage[12].imgUrl"  class="coverImage rightBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                                <image :src="allCoverImage[13].imgUrl"  class="coverImage rightBorderSub leftBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                                <image :src="allCoverImage[14].imgUrl"  class="coverImage leftBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                            </div>
                        </div>
                        <!-- 6长封面图 -->
                        <div class="fiveImage" v-if="imageNumber == 6">
                            <div class="twoImage">
                                <image :src="allCoverImage[15].imgUrl"  class="coverImage rightBorderSub bottomBorderSub" :style="{borderColor:coverBorder}"></image>
                                <image :src="allCoverImage[16].imgUrl"  class="coverImage leftBorderSub bottomBorderSub rightBorderSub" :style="{borderColor:coverBorder}"></image>
                                <image :src="allCoverImage[17].imgUrl"  class="coverImage leftBorderSub bottomBorderSub" :style="{borderColor:coverBorder}"></image>
                            </div>
                            <div class="twoImage">
                                <image :src="allCoverImage[18].imgUrl"  class="coverImage rightBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                                <image :src="allCoverImage[19].imgUrl"  class="coverImage rightBorderSub leftBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                                <image :src="allCoverImage[20].imgUrl"  class="coverImage leftBorderSub topBorderSub" :style="{borderColor:coverBorder}"></image>
                            </div>
                        </div>
                    </div>
                    <!--分享封面的内容-->
                    <div class="shareTextBox">
                        <text class="shareTitle">{{shareTitle}}</text>
                        <text class="shareText">{{shareText}}</text>
                    </div>
                </div>
            </cell>
        </list>

    </div>
</template>

<style>
    .bottomBorderSub{
        border-bottom-width: 1px;
    }
    .topBorderSub{
        border-top-width: 1px;
    }
    .rightBorderSub{
        border-right-width: 1px;
    }
    .leftBorderSub{
        border-left-width: 1px;
    }
    .colorBlue{
        background-color: #fff;
    }
    .colorBlack{
        color: #000;
    }
    .colorPink{
        background-color: pink;
        margin-right: 1px;
    }
    .colorCoral{
        background-color: coral;
    }
    .colorText{
        color: #fff;
        font-weight: 700;
        font-size: 25px;
    }
    .borderColorSize{
        font-size: 25px;
    }
    .colorTextBox{
        flex:1;
        align-items: center;
        background-color: #fff;
        justify-content: center;
    }
    .colorChoose{
        width:750px;
        height:80px;
        flex-direction: row;
        margin-top: 40px;
        background-color: #fff;
        padding-left: 20px;
        padding-right:20px;
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
    .chooseNumber{
        width:750px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    .active{
        background-color: #88bde6;
        color: #fff;
    }
    .imgNumber{
        border-width: 1px;
        border-style: solid;
        border-color: gainsboro;
        /*background-color:  #F0AD3C;*/
        color: #F0AD3C;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 38px;
        flex:1;
        text-align: center;
    }
    .coverImageBox{
        width:750px;
        height:310px;
    }
    .fiveImage{
        flex:1;
        flex-direction: column;
    }
    .fourImage{
        flex:1;
        flex-direction: column;
    }
    .twoImage{
        flex-direction: row;
        flex:1;
    }
    .threeImage{
        flex:1;
        flex-direction: column;
    }
    .oneImage{
        flex:1;
    }
    .coverImage{
        flex:1;
        border-style: solid;
        border-width: 1px;
    }
</style>

<script>
    import navbar from '../../../include/navbar.vue'
    const modal = weex.requireModule('modal');
    const album = weex.requireModule('album');
    const event = weex.requireModule('event');
    export default {
        data:function () {
            return{
                coverBorder:'white',
                imageNumber:1,
                coverImage:'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg',
                coverImageTwo:'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                coverImageThree:'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg',
                shareText:'   《惊喜魔篇》历时三十天，总行程两万里《横穿玛丽亚》历时三十天，总行程两万里《横穿玛丽亚》历时三十天，总行程两万里《横穿玛丽亚》历时三十天，总行程两万里',
                shareTitle:'  《惊喜魔篇》',
                allCoverImage:[{imgUrl:'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{
                    imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''},{imgUrl:''}]
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "编辑封面"},
            complete: {default : "完成"}
        },
        mounted:function(){
            var domModule = weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
            })
        },
        methods:{
            changeBorderColor:function (value) {
                this.coverBorder = value;
            },
            changeImageNumber:function(num){
                switch(num){
                    case 1:
                        this.imageNumber = 1;
                        break
                    case 2:
                        this.imageNumber = 2;
                        break
                    case 3:
                        this.imageNumber = 3;
                        break
                    case 4:
                        this.imageNumber = 4;
                        break
                    case 5:
                        this.imageNumber = 5;
                        break
                    case 6:
                        this.imageNumber = 6;
                        break

                }
            },
//            点击图片时
            clickImage:function (num) {
                var _this = this;
//                如果没有图片就调用单选接口
                if(_this.allCoverImage[num].imgUrl == ''){
                    album.openAlbumSingle(false,function (data) {
                        if(data.type == 'success'){
                            modal.toast({message:data});
//                        _this.allCoverImage[num].imgUrl =  data.data;
                        }else{
                            modal.toast({message:data.content , duration:3});
                        }
                    })
                }else{
                    var _this = this;
//                    如果已经有图片了就调用裁剪图片
                    album.openCrop(_this.allCoverImage[num].imgUrl,function (data) {
                        _this.allCoverImage[num].imgUrl =  data.data;
                    })
                }
            },
            goback(){
                event.closeURL();
            }
        }
    }
</script>
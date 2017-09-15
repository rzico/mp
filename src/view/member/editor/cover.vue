<template>
    <div class="wrapperBox">
        <div class="coverImageBox">
              <!-- 1张封面图 -->
            <div class="oneImage" v-if="imageNumber == 1">
                <image :src="coverImage" class="coverImage"></image>
            </div>
             <!-- 2张封面图 -->
            <div class="twoImage" v-if="imageNumber == 2">
                <image :src="coverImage" class="coverImage"></image>
                <image :src="coverImageTwo" class="coverImage"></image>
            </div>
             <!-- 3张封面图 -->
            <div class="threeImage" v-if="imageNumber == 3">
                <div class="twoImage">
                    <image :src="coverImage" class="coverImage"></image>
                    <image :src="coverImageThree" class="coverImage"></image>
                    <image :src="coverImageTwo" class="coverImage"></image>
                </div>
            </div>
             <!-- 4张封面图  -->
            <div class="fourImage" v-if="imageNumber == 4">
                <div class="twoImage">
                    <image :src="coverImage" class="coverImage"></image>
                    <image :src="coverImageTwo" class="coverImage"></image>
                </div>
                <div class="twoImage">
                    <image :src="coverImageThree" class="coverImage"></image>
                    <image :src="coverImage" class="coverImage"></image>
                </div>
            </div>
             <!-- 5张封面图  -->
            <div class="fiveImage" v-if="imageNumber == 5">
                <div class="twoImage">
                    <image :src="coverImage" class="coverImage"></image>
                    <image :src="coverImageTwo" class="coverImage"></image>
                </div>
                <div class="twoImage">
                    <image :src="coverImageThree" class="coverImage"></image>
                    <image :src="coverImage" class="coverImage"></image>
                    <image :src="coverImage" class="coverImage"></image>
                </div>
            </div>
            <!-- 6长封面图 -->
            <div class="fiveImage" v-if="imageNumber == 6">
                <div class="twoImage">
                    <image :src="coverImage" class="coverImage"></image>
                    <image :src="coverImageTwo" class="coverImage"></image>
                    <image :src="coverImage" class="coverImage"></image>
                </div>
                <div class="twoImage">
                    <image :src="coverImageThree" class="coverImage"></image>
                    <image :src="coverImage" class="coverImage"></image>
                    <image :src="coverImageThree" class="coverImage"></image>
                </div>
            </div>
            <!--选择图片布局-->
            <div class="chooseNumber">
                <text class="imgNumber" @click="changeImageNumber(1)">1</text>
                <text class="imgNumber" @click="changeImageNumber(2)">2</text>
                <text class="imgNumber" @click="changeImageNumber(3)">3</text>
                <text class="imgNumber" @click="changeImageNumber(4)">4</text>
                <text class="imgNumber" @click="changeImageNumber(5)">5</text>
                <text class="imgNumber" @click="changeImageNumber(6)">6</text>
            </div>
        </div>
        <list>
            <cell>
                <!--分享到社交平台效果-->
                <div class="shareTitle">
                    <text class="shareTitleText">分享到社交平台效果</text>
                </div>
                <!--分享效果内容-->
                <div class="shareContent">
                    <!--分享封面的图片-->
                    <div class="shareImageBox">
                        <!--1张封面图 -->
                        <div class="oneImage" v-if="imageNumber == 1">
                            <image :src="coverImage" class="coverImage"></image>
                        </div>
                        <!--2张封面图 -->
                        <div class="twoImage" v-if="imageNumber == 2">
                            <image :src="coverImage" class="coverImage"></image>
                            <image :src="coverImageTwo" class="coverImage"></image>
                        </div>
                        <!--3张封面图 -->
                        <div class="threeImage" v-if="imageNumber == 3">
                            <div class="twoImage">
                                <image :src="coverImage" class="coverImage"></image>
                                <image :src="coverImageThree" class="coverImage"></image>
                                <image :src="coverImageTwo" class="coverImage"></image>
                            </div>
                        </div>
                        <!--4张封面图  -->
                        <div class="fourImage" v-if="imageNumber == 4">
                            <div class="twoImage">
                                <image :src="coverImage" class="coverImage"></image>
                                <image :src="coverImageTwo" class="coverImage"></image>
                            </div>
                            <div class="twoImage">
                                <image :src="coverImageThree" class="coverImage"></image>
                                <image :src="coverImage" class="coverImage"></image>
                            </div>
                        </div>
                        <!--5张封面图  -->
                        <div class="fiveImage" v-if="imageNumber == 5">
                            <div class="twoImage">
                                <image :src="coverImage" class="coverImage"></image>
                                <image :src="coverImageTwo" class="coverImage"></image>
                            </div>
                            <div class="twoImage">
                                <image :src="coverImageThree" class="coverImage"></image>
                                <image :src="coverImage" class="coverImage"></image>
                                <image :src="coverImage" class="coverImage"></image>
                            </div>
                        </div>
                        <!-- 6长封面图 -->
                        <div class="fiveImage" v-if="imageNumber == 6">
                            <div class="twoImage">
                                <image :src="coverImage" class="coverImage"></image>
                                <image :src="coverImageTwo" class="coverImage"></image>
                                <image :src="coverImage" class="coverImage"></image>
                            </div>
                            <div class="twoImage">
                                <image :src="coverImageThree" class="coverImage"></image>
                                <image :src="coverImage" class="coverImage"></image>
                                <image :src="coverImageThree" class="coverImage"></image>
                            </div>
                        </div>
                    </div>
                    <!--分享封面的内容-->
                    <div class="shareTextBox">
                        <text class="shareText">{{shareText}}</text>
                    </div>
                </div>
            </cell>
        </list>

    </div>
</template>

<style>
    .shareText{
        color: #ccc;
        font-size: 28px;
        line-height: 38px;
        lines:4;
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
    .shareTitle{
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
    .imgNumber{
        border-width: 1px;
        border-style: solid;
        background-color: gainsboro;
        padding-top: 20px;
        padding-bottom: 20px;
        flex:1;
        text-align: center;
    }
    .coverImageBox{

        width:750px;
        height:450px;
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
        border-width: 2px;
        border-color:#fff;
    }
</style>

<script>
    export default {
        data:function () {
            return{
                imageNumber:1,
                coverImage:'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg',
                coverImageTwo:'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                coverImageThree:'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg',
                shareText:'《横穿玛丽亚》历时三十天，总行程两万里《横穿玛丽亚》历时三十天，总行程两万里《横穿玛丽亚》历时三十天，总行程两万里《横穿玛丽亚》历时三十天，总行程两万里'
            }
        },
        methods:{
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
            }
        }
    }
</script>
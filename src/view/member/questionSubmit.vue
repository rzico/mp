<template>
    <div class="wrapper" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <scroller  style="background-color: #fff;"  >
            <!--问题描述-->
            <div class="textareaBox  " ref="textareaRef">
                <textarea class="textarea " v-model="questionContent" maxlength="100" autofocus="true" rows="10"  return-key-type="next"  placeholder="请描述您的问题，以便我们更好地解决问题。" @input="onInput"></textarea>
                <div class="numBox">
                    <text class="fz28">{{contentLength}}</text>
                    <text class="fz28" style="color: #999">/100</text>
                </div>
            </div>
            <div  class="imageBox mt40 ml30" v-if="hasImage()" >
                <div v-for="(item,index) in imageList">
                    <image class="goodsImg " resize="cover" :src="item.thumbnailImage"></image>
                    <!--右上角关闭按钮"x"-->
                    <div class="paraClose bkg-primary" @click="delImage(index)" >
                        <text class="paraCloseSize" :style="{fontFamily:'iconfont'}" >&#xe60a;</text>
                    </div>
                </div>
            </div>
            <!--底部添加照片-->
            <div class="flex-row ml30 pt40 " @click="addPhotos()" v-if="imageLength()">
                <text class="fz40 primary" style="margin-top: 3px" :style="{fontFamily:'iconfont'}">&#xe6b5;</text>
                <text class="fz35 ml10">添加照片</text>
            </div>
            <div class="button bw bkg-primary ml30 mr30 mt40" @click="submitNow()">
                <text class="buttonText fz32 white">立即提交</text>
            </div>
        </scroller>
        <!--遮罩-->
        <div class="sendMask" @click="maskClick()" v-if="toSendArticle">
            <!--进度条-->
            <div class="processBox">
                <text class="processText">正在云同步,请稍候...</text>
                <!--进度条背景-->
                <div class="processStyle processBg"></div>
                <!--进度条进度与颜色-->
                <div :style="{width:processWidth + 'px'}"  class="processStyle bkg-primary"></div>
                <text class="processTotal">{{currentPro}}/{{proTotal}}</text>
            </div>
        </div>
        <!--遮罩-->
        <process  v-if="toSendArticle" :processWidth="processWidth" :currentPro="currentPro" :proTotal="proTotal" ></process>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .numBox{
        position: absolute;bottom: 10px;right: 10px;flex-direction: row;
    }
    .paraClose{
        position: absolute;
        top:10px;
        right:0px;
        padding-left: 10px;
        padding-top: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
        border-radius:22px;
    }
    .paraCloseSize{
        color: #fff;
        font-size: 24px;
    }
    .imageBox{
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        width:690px;
    }
    .textareaBox{
        margin-top: 40px;
        margin-left:30px;
        background-color: #eee;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius:15px;
        width: 690px;
    }
    .textarea {
        height: 240px;
        font-size: 30px;

    }

    .goodsImg{
        border-radius: 5px;
        height: 160px;
        width: 160px;
        margin-left: 10px;
        margin-top: 10px;
    }

    .goodsImgBorder{
        border-width: 1px;
        border-color: #ccc;
        border-style: dashed;
    }
</style>
<script>
    import navbar from '../../include/navbar.vue';
    import utils from '../../assets/utils';
    import {dom,event,animation} from '../../weex.js';
    const modal = weex.requireModule('modal');
    import { POST, GET } from '../../assets/fetch';
    import filters from '../../filters/filters.js';
    import process from '../../widget/process.vue';
    const album = weex.requireModule('album');
    export default {
        data:{
            pageStart:0,
            pageSize:15,
            clicked:false,
            imageList:[],
            contentLength:0,
            questionContent:'',
            toSendArticle:false,//控制进度条 遮罩显示
            currentPro:0,//当前进度
            proTotal:0,//总的进度
            processWidth:0,//进度条宽度
        },
        props:{
            title:{default:'问题反馈'}
        },
        components: {
            navbar,process
        },
        created(){
            utils.initIconFont();
            let _this = this;

        },
        methods:{
//            立即提交
            submitNow(){
                this.clicked = true;
                var _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                this.toSendArticle = true;
                //                判断段落图片是否已上传
                this.imageList.forEach(function (item) {
                    if(!utils.isNull(item.paraImage) && item.paraImage.substring(0,4) != 'http'){
                        _this.proTotal ++;
                    }
                });
                if(this.imageList.length > 0){
                    this.sendImage(0);
                }else{
                    this.realSave();
                }
            },
            sendImage(sendIndex){
                let _this = this;
                let sendLength = _this.imageList.length;//获取图片数组总长度
                var frontUrl = '';
                if(!utils.isNull(_this.imageList[sendIndex].paraImage)){
                    frontUrl = _this.imageList[sendIndex].paraImage.substring(0,4);
                }
//                判断是否已经是服务器图片
                if(frontUrl == 'http'){
                    sendIndex ++ ;
//                        判断是否最后一张图
                    if(sendIndex < sendLength){
//                            回调自己自己
                        _this.sendImage(sendIndex)
                    }else{//进行上传文章
                        _this.realSave();
                    }
                }else{
                    event.upload(_this.imageList[sendIndex].paraImage,function (data) {
                        if (data.type == 'success') {
                            _this.imageList[sendIndex].paraImage = data.data;
                            sendIndex ++ ;
//                        判断是否最后一张图
                            if(sendIndex < sendLength){
//                            回调自己自己
                                _this.sendImage(sendIndex)
                            }else{//进行上传文章
                                _this.realSave();
                            }
                        } else {
                            //上传失败
                            _this.toSendArticle = false;
//                防止重复点击
                            _this.clicked = false;
                            _this.currentPro = 0;//当前进度
                            _this.proTotal = 0;//总的进度
                            _this.processWidth = 0;//进度条宽度
                            event.toast(data.content);
                            return;

                        }
                    },function (data) {
                        _this.ctrlProcess(data);
                    })
                }
            },
            realSave(){
                let _this = this;
                var imgsList = [];
                if(this.imageList.length > 0){
                    this.imageList.forEach(function (item) {
                        imgsList.push(item.paraImage);
                    })
                }
                POST('weex/member/feedback/add.jhtml?content=' + encodeURIComponent(this.questionContent) + '&imgs=' + imgsList ).then(
                    function (data) {
                        if(data.type == 'success'){
                            utils.debug('提交成功');
                            event.closeURL();
                        }else{
                            event.toast(data.content);
                            //上传失败
                            _this.toSendArticle = false;
                            _this.currentPro = 0;//当前进度
                            _this.proTotal = 0;//总的进度
                            _this.processWidth = 0;//进度条宽度
                        }

                    },function (err) {
                        event.toast(err.content);
                        //上传失败
                        _this.toSendArticle = false;
                        _this.currentPro = 0;//当前进度
                        _this.proTotal = 0;//总的进度
                        _this.processWidth = 0;//进度条宽度
                    }
                )

            },
            hasImage(){
              return this.imageList.length > 0;
            },
            imageLength(){
                return this.imageList.length < 5;
            },
//            删除图片
            delImage(index){
                this.imageList.splice(index,1);
            },
//            添加图片
            addPhotos(){
                let _this = this;
                var options = {
                    isCrop:false,
                    width:1,
                    height:1
                };
                album.openAlbumSingle(options, function(data){
                    if(data.type == 'success'){
                        let item = {
                            paraImage : data.data.originalPath,
                            thumbnailImage : data.data.thumbnailSmallPath
                        }
                        _this.imageList.push(item);
                    }
                })
            },
            goback(){
                event.closeURL();
            },
            onInput(){
                this.contentLength = this.questionContent.length;
            },
//            控制进度条
            ctrlProcess(data){
                this.processWidth = parseInt(data.data) * 5;
                if(this.processWidth == 500){
                    this.currentPro ++ ;
                };
            },
        }
    }
</script>
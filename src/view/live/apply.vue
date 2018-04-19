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
        <div class="applyBox allWidth mtt80">
            <div class="flex-center  bt20" >
                <image :src="coverThumbnail" resize="cover" class="coverImg allWidth" @click="chooseCover()"></image>
                <div class="addCover flex-row allWidth" v-if="coverThumbnail == ''" @click="chooseCover()">
                    <text class="fzz50 grayY btt3" :style="{fontFamily:'iconfont'}">&#xe618; </text>
                    <text class="fz35 grayY">设置封面图</text>
                </div>
            </div>
            <div class="borderBottom">
                <input  type="text" class="titleInput allWidth" return-key-type="done" v-model="titleWord"  placeholder="请输入直播标题..." />
            </div>
        </div>
        <div class="bottomBox">
            <div class="rules allWidth">
                <div>
                    <div class="flex-row "  @click="isRecorded()">
                        <div class="checkBox" >
                            <div class="checkBorder" :class="[isRecord ? 'redBorder' : '']"></div>
                            <text class="check takeCheck" v-if="isRecord" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                        </div>
                        <text class="fzz24 ml10">是否</text>
                        <text class="fzz24 ">录播</text>
                    </div>
                    <div class="flex-row mt30">
                        <div class="checkBox" @click="isAgreeRules()">
                            <div class="checkBorder " :class="[isAgreeRule ? 'redBorder' : '']" ></div>
                            <text class="check takeCheck" v-if="isAgreeRule" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                        </div>
                        <text class="fzz24 ml10" @click="isAgreeRules()">同意</text>
                        <text class="fzz24 redColor">《nihtan直播管理条例》</text>
                    </div>
                </div>
            </div>
            <div class="button bkg-primary  mt30 allWidth" @click="complete" :class="[isAgreeRule ? 'bkg-primary' : 'bkg-gray']">
                <text class="fz32 white" :class="[isAgreeRule ? 'white' : 'redColor']">下一步</text>
            </div>
        </div>
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
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .redBorder{
        border-color: #ff4848;
    }
    .redColor{
        color: red;
    }
    .fzz50{
        font-size: 50px;
    }
    .fzz24{
        font-size: 24px;
    }
    .btt3{
        margin-bottom: 3px;
    }
    .mtt80{
        margin-top: 80px;
    }
    .allWidth{
        width:370px;
    }
    .bottomBox{
        position:absolute;bottom:80px;left: 190px;
    }
    /*条例*/
    .rules{
        justify-content: center;
        align-items: center;
    }
    .redColor{
        color: red;
    }
    .takeCheck{
        position: absolute;
        left: 3px;
        top: 5px;
        color: red;
    }
    .checkBox{
        width: 33px;
        height: 33px;
    }
    .checkBorder{
        width: 30px;
        height: 30px;
        border-radius: 2px;
        border-color: #888;
        border-style: solid;
        border-width: 2px;
    }
    /*条例*/

    .titleInput{
        font-size: 28px;
        height: 60px;
        align-items: center;
    }

    /*设置封面*/
    .addCover{
        position: absolute;top:0;height: 270px;left: 0px;align-items: center;justify-content: center;
    }
    .grayY{
        color: #666;
    }
    .coverImg{
        height: 270px;
        border-width: 1px;
        border-style: dashed;
        border-color: #ccc;
    }
    /*设置封面*/

    .applyBox{
        margin-left:190px;
    }

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

</style>
<script>
    const album = weex.requireModule('album');
    const livePlayer = weex.requireModule('livePlayer');
    import filters from '../../filters/filters';
    import utils from '../../assets/utils';
    import {dom,event,animation} from '../../weex.js';
    import { POST, GET } from '../../assets/fetch';
    import noData from '../../include/noData.vue';
    export default {
        data(){
            return{
                clicked:false,
//                isInit:true,
                pageName:'申请直播间',
                coverParaImage:'',
                coverThumbnail:'',
                titleWord:'',
                isRecord:false,
                isAgreeRule:false,
                toSendArticle:false,//控制进度条 遮罩显示
                currentPro:0,//当前进度
                proTotal:0,//总的进度
                processWidth:0,//进度条宽度
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

            }
        },
        created(){
            utils.initIconFont();
        },
        methods:{
            classHeader:function () {
                let dc = utils.device();
                return dc
            },
            hasImageList(){
                if(utils.isNull(this.imageList)){
                    return false;
                }else{
                    return true;
                }
            },
            goback(){
                event.closeURL();
            },
            chooseCover(){
                let _this = this;
                //                ***** 单选裁剪 *****
                var options = {
                    isCrop:true,
                    width:10,
                    height:7
                };
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    options,function (data) {
                        _this.coverParaImage = data.data.originalPath;
                        _this.coverThumbnail = data.data.thumbnailSmallPath;
                    }
                )
            },
//            是否录播
            isRecorded(){
                this.isRecord = !this.isRecord;
            },
//            是否同意条例
            isAgreeRules(){
                this.isAgreeRule = !this.isAgreeRule;
            },
//            下一步
            complete(){
                if(!this.isAgreeRule){
                    return;
                }
                if(utils.isNull(this.coverThumbnail)){
                    event.toast('请先设置封面');
                    return;
                }
                if(utils.isNull(this.titleWord) || utils.isAllEmpty(this.titleWord)){
                    event.toast('请先设置标题');
                    return;
                }
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                this.sendImage();
            },
            //上传图片到服务器
            sendImage() {
                this.toSendArticle = true;
                this.proTotal = 1;
                var _this = this;
                event.upload(_this.coverParaImage, function (data) {
                    if (data.type == 'success') {
                        _this.coverParaImage = data.data;
//                        进行创建直播
                        _this.createLive();
                    } else {//上传失败
                        _this.toSendArticle = false;
                        _this.currentPro = 0;//当前进度
                        _this.proTotal = 0;//总的进度
                        _this.processWidth = 0;//进度条宽度
                        event.toast(data.content);
                        return;
                    }
                }, function (data) {
//                    上传进度
                    _this.ctrlProcess(data);
                })
            },
            //            控制进度条
            ctrlProcess(data){
                this.processWidth = parseInt(data.data) * 5;
                if(this.processWidth == 500){
                    this.currentPro ++ ;
                };
            },
//            创建直播
            createLive(){
                let _this = this;
                POST('weex/live/create.jhtml?title=' + encodeURIComponent(this.titleWord) + '&frontcover=' + this.coverParaImage).then(
                    function (data) {
                        if(data.type == 'success'){
                            let backData = {
                                liveId:data.data.liveId,
                                play:false,
                                record:_this.isRecord
                            }
                            event.closeURL(utils.message('success','申请成功',backData));
                        }else{
                            event.toast(data.content);
                        }
                    },function (err) {
                        event.toast(err.content);
                    }
                )
            },
            maskClick(){
                return;
            },
        }
    }
</script>
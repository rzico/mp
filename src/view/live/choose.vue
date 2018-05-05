<template>
        <!--遮罩-->
        <div class="maskLayer" @click="maskClick()">
            <div class="pageBox">
                <div class="titleBox">
                <text class="title">是否开始直播？</text>
                </div>

                <div class="allWidth bt20">
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

                <div class="switchBox">
                    <text class="fz32">开启录播</text>
                    <switch class="switch"   @change="recording"></switch>
                </div>
                <div class="switchBox">
                    <text class="fz32">VIP专场</text>
                    <switch class="switch" disabled="true"  @change=""></switch>
                </div>
                <div class="switchBox cell-clear">
                    <text class="fz32">付费直播</text>
                    <switch class="switch" disabled="true"  @change=""></switch>
                </div>
                <div class="bottomBox">
                    <div class="cancelBox" @click="cancelBox">
                        <text class="bottomBoxText">取消</text>
                    </div>
                    <div class="okBox" @click="complete">
                        <text class="bottomBoxText">确认</text>
                    </div>
                </div>
            </div>
        </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .pageBox{
        width: 550px;
        background-color: white;
        flex-direction: column;
        align-items:center;
        border-radius: 15px;
        box-shadow:0 0  3px 1px #ccc;
        position: fixed;
        top:200px;
        left: 100px;
    }
    .titleBox{
        height: 80px;
        align-items: center;
        justify-content: center;
        width: 400px;
    }
    .title{
        font-size: 40px;
        color: #0088fb;
    }
    .switchBox{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 80px;
        width: 550px;
        padding-left: 20px;
        padding-right: 20px;
        border-bottom-width: 1px;
        border-color: #cccccc;
    }
    .bottomBox{
        height: 100px;
        width: 550px;
        flex-direction: row;
        align-items: center;
    }
    .cancelBox{
        height: 100px;
        flex: 1;
        border-top-width: 2px;
        border-right-width: 2px;
        border-color: #0088fb;
        align-items: center;
        justify-content: center;
    }
    .cancelBox:active {
        background-color:#ccc;
    }
    .okBox{
        height: 100px;
        flex: 1;
        border-top-width: 2px;
        border-color: #0088fb;
        align-items: center;
        justify-content: center;
    }
    .okBox:active {
        background-color:#ccc;
    }
    .bottomBoxText{
        font-size: 35px;
        color: #0088fb;
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
        margin-left:90px;
    }
</style>
<script>
    const album = weex.requireModule('album');
    const livePlayer = weex.requireModule('livePlayer');
    import filters from '../../filters/filters';
    import utils from '../../assets/utils';
    import {dom,event,animation} from '../../weex.js';
    import { POST, GET } from '../../assets/fetch';
    export default {
        data(){
            return{
                clicked:false,
                coverParaImage:'',
                coverThumbnail:'',
                titleWord:'',
                isRecord:false,
                isAgreeRule:false,
                toSendArticle:false,//控制进度条 遮罩显示
                currentPro:0,//当前进度
                proTotal:0,//总的进度
                processWidth:0,//进度条宽度
//                是否录播
                isRecording:false
            }
        },
        components: {

        },
        props:{

        },
        filters:{

        },
        created(){
            utils.initIconFont();
        },
        methods:{
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
                        if(data.type == 'success') {
                            _this.coverParaImage = data.data.originalPath;
                            _this.coverThumbnail = data.data.thumbnailSmallPath;
                            //                            上传原图
                            event.upload(data.data.originalPath,function (data) {
                                if (data.type == 'success' ) {
                                    event.toast(data.content);
                                } else {
                                    event.toast(data.content);
                                }
                            })
                        }
                    }
                )
            },
            recording:function (e) {
                this.isRecording = e.value
            },
//            取消
            cancelBox:function () {
//               告诉父组件关闭弹窗
                var ismask = false;
                this.$emit('cancelBox',ismask);
            },
//            确认
            complete(){

                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500);
                POST('weex/live/create.jhtml?title=' + encodeURIComponent(this.titleWord) + '&frontcover=' + this.coverParaImage).then(
                    function (res) {
                        if(res.type == 'success'){
                            GET('weex/live/check.jhtml?memberId=' + event.getUId(),function (data) {
                                if(data.type == 'success' && !utils.isNull(data.data)){
//                            开始直播
                                    livePlayer.toPlayLiveRoom(data.data.liveId,true,_this.isRecording,function(mes){});
//                                    告诉父组件关闭弹窗
                                    _this.cancelBox()
                                }else{
                                    event.toast(data.content);
                                }
                            },function (err) {
                                event.toast(err.content);
                            })
                        }else{
                            event.toast(res.content);
                        }
                    },function (err) {
                        event.toast(err.content);
                    }
                )
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
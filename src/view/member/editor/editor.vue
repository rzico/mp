<template>
    <div >
        <navbar :title="title" :complete="complete" @goback="goBack" @goComplete="goComplete"> </navbar>
        <list class="wrapperBox" >
            <!--<refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown"  :display="refreshing ? 'show' : 'hide'"></refresh>-->
            <cell>
                <div >
                    <image class="coverImage" resize="cover" :src="coverImage"></image>
                    <div class="coverMaskImage"></div>
                    <text class="setTitle" @trigger="articleTitle(setTitle)" @click="articleTitle(setTitle)">{{setTitle}}</text>
                    <div class="bottomBtn addMusic" >
                        <text class="musicSize"  @click="goMusic()" v-if="this.musicName == ''">{{addMusic}}</text>
                        <text class="musicSize"  @click="goMusic()" v-else :style="{fontFamily:'iconfont'}">&#xe65a; {{musicName}}</text>
                    </div>
                    <text class="bottomBtn editCover musicSize" @click="goCover()">编辑封面</text>
                </div>
            </cell>
            <cell >
                <!--加号跟功能盒子-->
                <div class="addBox" @click="clearIconBox()">
                    <!--加号-->
                    <div  v-if="firstPlusShow" @click="firstShow()">
                        <text class="plusSign" :style="{fontFamily:'iconfont'}" >&#xe618;</text>
                    </div>
                    <!--图标-->
                    <div class="iconBox" v-else>
                        <!--添加文本-->
                        <div class="addIconBox " @click="addTextPara(0)">
                            <text class="addText iconSize" :style="{fontFamily:'iconfont'}">&#xe609;</text>
                        </div>
                        <!--添加图片-->
                        <div class="addIconBox " @click="addImgPara(0)">
                            <text class="addImage iconSize" :style="{fontFamily:'iconfont'}">&#xe61a;</text>
                        </div>
                        <!--添加视频-->
                        <div class="addIconBox ">
                            <text class="addVideo iconSize" :style="{fontFamily:'iconfont'}">&#xe624;</text>
                        </div>
                    </div>
                </div>
            </cell>
            <cell>
                <!--绑定动画-->
                <transition-group name="paraTransition" tag="div">
                    <div  v-for="(item,index) in paraList" :key="item" >
                        <!--<div  v-for="(item,index) in paraList" >-->
                        <!--段落-->
                        <div class="paraBox paraBoxHeight">
                            <!--左上角关闭按钮"x"-->
                            <div class="paraClose" @click="showConfirm(index)" >
                                <text class="paraCloseSize" :style="{fontFamily:'iconfont'}" >&#xe60a;</text>
                            </div>
                            <!--上箭头-->
                            <div class="rightArrow upArrow" v-if="index != 0" @click="moveUp(index)">
                                <text class="arrowSize" :style="{fontFamily:'iconfont'}" >&#xe608;</text>
                            </div>
                            <!--下箭头-->
                            <div class="rightArrow downArrow" v-if="lastPara(index)" @click="moveBottom(index)">
                                <text class="arrowSize" :style="{fontFamily:'iconfont'}" >&#xe601;</text>
                            </div>
                            <!--图片-->
                            <div>
                                <image class="paraImage" resize="cover" @click="editParaImage(item.paraImage,index)" :src="item.thumbnailImage | watchThumbImg"></image>
                            </div>
                            <!--文章内容-->
                            <div class="paraText" @click="editorText(index)">
                                <!--判断是否有文字，没有文字就显示  "点击添加文字"-->
                                <text class="paraTextSize" v-if="item.paraText != ''">{{item.paraText | htmlDeal}}</text>
                                <text class="paraTextSize greyColor" v-else  >点击添加文字</text>
                            </div>
                        </div>
                        <!--加号跟功能盒子-->
                        <div class="addBox" @click="clearIconBox()">
                            <!--加号-->
                            <div v-if="item.show"  @click="showIconBox(index)" >
                                <text class="plusSign" :style="{fontFamily:'iconfont'}" >&#xe618;</text>
                            </div>
                            <!--图标-->
                            <div class="iconBox"  v-else >
                                <!--添加文本-->
                                <div class="addIconBox "  @click="addTextPara(index + 1)">
                                    <text class="addText iconSize" :style="{fontFamily:'iconfont'}">&#xe609;</text>
                                </div>
                                <!--添加图片-->
                                <div class="addIconBox " @click="addImgPara(index + 1)">
                                    <text class="addImage iconSize" :style="{fontFamily:'iconfont'}">&#xe61a;</text>
                                </div>
                                <!--添加视频-->
                                <div class="addIconBox ">
                                    <text class="addVideo iconSize" :style="{fontFamily:'iconfont'}">&#xe624;</text>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </cell>
            <cell>
                <!--投票-->
                <div  v-for="(item,index) in voteList"  class="voteMargin" @click="editVote(index)">
                    <div class="paraBox paraBoxHeight">
                        <!--左上角关闭按钮"x"-->
                        <div class="paraClose" @click="closeVote(index)">
                            <text class="paraCloseSize" :style="{fontFamily:'iconfont'}" >&#xe60a;</text>
                        </div>
                        <!--图片-->
                        <div>
                            <image class="paraImage" :src="voteImg"></image>
                        </div>
                        <!--文章内容-->
                        <div class="paraText">
                            <!--判断是否有文字，没有文字就显示  "点击添加文字"-->
                            <text class="paraTextSize">{{item.textAreaTitle}}</text>
                        </div>
                    </div>
                </div>
                <!--添加投票-->
                <div class="paraBox flexRow " @click="goVote()">
                    <text class="addVote addVoteIcon " :style="{fontFamily:'iconfont'}">&#xe629;</text>
                    <text class="addVote">添加投票</text>
                </div>
            </cell>
            <!--用来撑起底部空白区域-->
            <cell><div class="emptyBox"></div></cell>
        </list>
        <!--遮罩-->
        <div class="sendMask" v-if="toSendArticle">
            <!--进度条-->
            <div class="processBox">
                <text class="processText">正在云同步,请稍后...</text>
                <!--进度条背景-->
                <div class="processStyle processBg"></div>
                <!--进度条进度与颜色-->
                <div :style="{width:processWidth + 'px'}" style="background-color: #D9141E" class="processStyle"></div>
                <text class="processTotal">{{currentPro}}/{{proTotal}}</text>
            </div>
        </div>
    </div>
</template>
<style scoped>

    .processTotal{
        position: absolute;
        bottom: 40px;
        right: 50px;
        font-size: 28px;
        color: #888;
    }
    .processBg{
        background-color: #ccc;
        width:500px;
    }
    .processStyle{
        height:10px;
        position: absolute;
        left: 50px;
        bottom:100px;
    }
    .processText{
        position: absolute;
        top:40px;
        left: 50px;
        font-size: 32px;
    }
    .processBox{
        height:250px;
        border-radius: 5px;
        width:600px;
        background-color: #fff;
        justify-content: space-between;
    }
    .sendMask{
        position: absolute;
        top: 0;
        bottom: 0;
        left:0;
        right: 0;
        background-color: rgba(0,0,0,0.8);
        align-items: center;
        justify-content: center;
    }
    .voteMargin{
        margin-bottom: 15px;
    }

    .paraTransition-enter-active, .paraTransition-leave-active {
        transition: all 0.2s;
    }
    .paraTransition-leave-to{
        transform: translateX(300px);
        opacity: 0;
    }

    .paraTransition-enter{
        transform: translateX(0px);
        opacity: 1;
    }
    .addVoteIcon{
        font-size: 39px;
    }
    .addVote{
        color: #A89F95;
        font-size: 34px;
        margin-left: 10px;
    }
    .flexRow{
        padding-top: 20px;
        padding-bottom: 20px;
        justify-content: center;
    }
    .greyColor{
        color: #999;
    }
    .emptyBox{
        height:40px;
    }
    .arrowSize{
        color: #999;
        font-size: 34px;
        font-weight: 700;
    }
    .upArrow{
        top:0px;
        padding-top: 5px;
        padding-left: 10px;
        padding-bottom: 10px;
    }
    .downArrow{
        bottom:0px;
        padding-top: 10px;
        padding-bottom: 5px;
        padding-left: 10px;
    }
    .rightArrow{
        position: absolute;
        right: 0px;
        padding-right: 10px;
    }
    .paraClose{
        position: absolute;
        top:0px;
        left:0px;
        padding-left: 5px;
        padding-top: 5px;
        padding-right: 5px;
        padding-bottom: 5px;
    }
    .paraCloseSize{
        color: #999;
        font-size: 34px;

    }
    .paraTextSize{
        font-size: 32px;
        line-height:38px;
        color: #444;
        lines:4;
        text-overflow: ellipsis;
    }
    .paraText{
        margin-left: 20px;
        /*background-color: red;*/
        width:445px;
    }
    .paraImage{
        width:155px;
        height:155px;
        border-radius: 10px;
    }
    .paraBoxHeight{
        height:225px;
    }
    .paraBox{
        flex-direction: row;
        padding-left: 35px;
        padding-right: 35px;
        padding-top: 35px;
        padding-bottom: 35px;
        width:700px;
        margin-left: 25px;
        background-color: #fff;
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        border-top-left-radius: 20px;
    }
    .wrapperBox{
        background-color: #EFF0F5;
    }
    .addText{
        color: #FFE394;
    }
    .addImage{
        color: #1E7DEB;
    }
    .addVideo{
        color: #CCA7FC;
    }
    .iconSize{
        font-size: 38px;
    }
    .addIconBox{
        padding-top: 15px;
        padding-bottom: 15px;
        padding-right:40px;
        padding-left: 40px;
    }
    .iconBox{
        flex-direction: row;
        background-color: #fff;
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        border-top-left-radius: 20px;
    }
    .plusSign{
        padding-left: 12px;
        padding-right: 12px;
        padding-top: 1px;
        padding-bottom: 1px;
        background-color:#D7DBD5;
        color: #fff;
        border-style: solid;
        border-width: 1px;
        border-color: rgba(133,133,133,0.2);
        border-radius: 30px;
        font-size: 30px;
        font-weight: 700;
    }
    .addBox{
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .setTitle{
        position: absolute;
        top:40px;
        color: #fff;
        font-size: 40px;
        left: 25px;
        right:25px;
    }
    .musicSize{
        color: #666;
        font-size: 27px;
    }
    .bottomBtn{
        position: absolute;
        bottom: 20px;
        border-radius: 10px;
        color: #666;
        padding-bottom: 5px;
        justify-content: center;
        padding-right: 12px;
        padding-left: 12px;
        padding-top: 5px;
        background-color: #fff;

    }
    .addMusic{
        left: 25px;
        max-width: 500px
    }
    .editCover{
        right: 25px;
    }
    .coverMaskImage{
        position: absolute;
        top:0;
        left:0;
        width:750px;
        height:300px;
        background-color: #888;
        opacity: 0.5;
    }
    .coverImage{
        width:750px;
        height:300px;
    }
</style>

<script>
    import { POST, GET } from '../../../assets/fetch'
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    const storage = weex.requireModule('storage');
    const event = weex.requireModule('event');
    const album = weex.requireModule('album');
    var modal = weex.requireModule('modal');
    const stream = weex.requireModule('stream');
    var lastIndex = -1;
    var musicId = -1 ;
    export default {
        data:function(){
            return{
                toSendArticle:false,//控制进度条 遮罩显示
                currentPro:0,//当前进度
                proTotal:2,//总的进度
                processWidth:0,//进度条宽度
                articleId:'',
                refreshing: false,
                firstPlusShow:true,
                coverImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                setTitle:'点击设置标题',
                addMusic:'添加音乐',
                musicName:'',
                paraList:[],
                voteList:[],
                proportion:'',//缩略图的比例
                serveCover:'',//用来保存图片上传服务器后存储服务器图片路径，避免覆盖图片时产生闪屏
                catalogId:'',
                publish:false,
            }
        },
        filters:{
//            过滤html标签
            htmlDeal:function(value){
//                将h1-h5换成\n
                let takeEnter=value.replace(/<\/h[0-9]>/g,"\n");
//                将html标签替换，可能遗留空格
                let nbspText=takeEnter.replace(/<\/?.+?>/g,"");
//                将空格 &nbsp; 替换成 。
                let spaceText=nbspText.replace(/&nbsp;/g," ");
                return spaceText;
                //                将空格去除
//                var onlyText=spaceText.replace(/ /g,"");
            },
            watchThumbImg:function (value) {
                if(value == ''){
                    return utils.locate('resources/images/text.png');
                }else{
                    return value;
                }

            }
        },
        computed:{
            voteImg:function(){
                return utils.locate('resources/images/vote.png');
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "编辑"},
            complete:{default:"完成"}
        },
        created:function(){
            utils.initIconFont();
            var _this = this;
//            bundleUrl = new String(bundleUrl);
//            取当前页面rul，将musicId取出来
            var bundleUrl = this.$getConfig().bundleUrl;
            var getVal = bundleUrl.split('?')[1];
//          创建文章编辑（首次）
            if(getVal == '' || getVal == null || getVal == 'undefined'){
                //       多选图片
                //      调用安卓的相册
                var _this = this;
                album.openAlbumMuti(
                    //选完图片后触发回调函数
                    function (data) {
                        if(data.type == 'success'){
                            _this.coverImage =  data.data[0].originalPath;
//                    data.data里存放的是用户选取的图片路径
                            for(let i = 0;i < data.data.length;i++){
                                _this.paraList.push({
                                    //原图
                                    paraImage: data.data[i].originalPath,
                                    //小缩略图
                                    thumbnailImage: data.data[i].thumbnailSmallPath,
                                    paraText:'',
                                    show:true,
                                    serveThumbnail:''
                                }) ;
//                                event.toast(data.data[i].originalPath);
//                                event.toast('缩略图路径');
//                                event.toast(data.data[i].thumbnailSmallPath);
                            }
                        }else{
                            event.closeURL();
                        }
                    }
                )
            }else{//再次文章编辑
                var op = getVal.split('=');
                if(op[0] == 'articleId') {
                    let options = {
                        type:'article',
                        key:op[1]
                    };
                    _this.articleId = op[1];
                    GET('weex/member/article/option.jhtml?id=' + _this.articleId,function (data) {
                        if(data.type == 'success' && data.data != ''){
                            _this.catalogId = data.data.articleCatalog.id;
                        }
                    },function (err) {
                        event.toast(err.content);
                    })

                    event.find(options,function (data) {
                        if(data.type == 'success' && data.data != ''){
                            let articleData = JSON.parse(data.data.value);
//                            event.toast(articleData);
                            _this.setTitle = articleData.title;
                            _this.coverImage = articleData.thumbnail;
                            _this.musicName = articleData.music.name;
                            _this.publish = articleData.articleOption.publish;
                            musicId = articleData.music.id;
                            let templatesData = articleData.templates;
                            for(let i = 0;i < templatesData.length;i++){
                                _this.paraList.push({
                                    //原图
                                    paraImage:templatesData[i].original,
                                    //小缩略图
                                    thumbnailImage: templatesData[i].thumbnail,
                                    paraText:templatesData[i].content,
                                    show:true,
                                    serveThumbnail:'' //用来保存图片上传服务器后存储服务器图片路径，避免覆盖图片时产生闪屏
                                })
                            }
//                            投票
                            if(!utils.isNull(articleData.votes)){
                                articleData.votes.forEach(function (item) {
                                    let startDate = '';
                                    let startTime = '';
//                                    event.toast('投票时间');
//                                    event.toast(item.expire);
                                    if(utils.isNull(item.expire)){
                                        startDate = '无截止时间'
                                    }else{
                                        let time =  utils.timeChange(item.expire);
                                        startDate = time.substring(0,10);
                                        startTime = time.substring(11,19);
                                    }
                                    let optionIndex = 0;
                                    switch(item.voteType){
                                        case 'radiobox':
                                            optionIndex = 0;
                                            break;
                                        case 'checkbox':
                                            optionIndex = 1;
                                            break;
                                        case 'nolimit':
                                            optionIndex = 2;
                                            break;
                                        default:
                                            break;
                                    }
                                    //选项
                                    let optionBox = [];
                                    item.options.forEach(function (value) {
                                        optionBox.push({
                                            textAreaMessage:value,
                                            textHeight:'48',
                                            rowsNum:'1',
                                            editSign:-1,
                                        })
                                    })

                                    _this.voteList.push({
                                        chooseDate:startDate,
                                        chooseTime:startTime,
                                        optionsIndex:optionIndex,
                                        textAreaTitle:item.title,
                                        pageBox:optionBox
                                    })
                                })
                            }

                        }else{
                            modal.alert({
                                message:'系统繁忙，请稍后重试',
                                duration: 0.3
                            },function () {
                                event.closeURL();
                            })
                        }
                    })
                }
            }

        },
        methods:{
//            控制进度条
            ctrlProcess(data){
                this.processWidth = parseInt(data.data) * 5;
                if(this.processWidth == 500){
                    this.currentPro ++ ;
                }
            },

//            设置文章标题
            articleTitle:function(title){
                let _this = this;
                if(title == '点击设置标题'){
                    title = '';
                }
                modal.prompt({
                    message: '请输入标题',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                    default:title,
                }, function (value) {
                    if(value.result == '确定'){
                        if(value.data == '' || value.data == null ){
                            modal.toast({message:'请输入标题',duration:1})
                        }else{
                            _this.setTitle = value.data;
                            modal.toast({message:'设置成功',duration:1});
                        }
                    }
                })
            },
//            段落里的文本编辑
            editorText(index){
                var _this = this;
                event.openEditor(_this.paraList[index].paraText,function (data) {
                    if(data.data != '') {
//                    将返回回来的html数据赋值进去
                        _this.paraList[index].paraText = data.data;
                    }
                })
            },
//            返回
            goBack:function () {
                event.closeURL();
            },
//            完成
            goComplete:function () {

                var _this = this;

                if(this.setTitle == '点击设置标题'){
                    modal.alert({
                        message: '请设置标题',
                        duration: 0.3
                    },function () {
                        _this.articleTitle(_this.setTitle);
                    })
                    return;
                }

                this.toSendArticle = true;
                this.proTotal = _this.paraList.length + 1;
////                获取设备宽度
//                let devWidth = weex.config.env.deviceWidth;
////                获取缩略图的宽高
//                _this.proportion = parseInt(155 * devWidth/750);
                let frontcoverUrl = this.coverImage.substring(0,5);
//                event.toast(frontcoverUrl);
                if(frontcoverUrl == 'http:'){
//                    event.toast('1');
                    _this.serveCover = this.coverImage;
                    _this.sendImage(0);
                }else{
//                    modal.toast({message:this.coverImage,duration:3});
//                    modal.toast({message:'substring后',duration:3});
//                    event.toast(this.coverImage);
//                    event.toast('substring后');


//                    var sendcover = frontcoverUrl == 'file:' ? this.coverImage.substring(6) : this.coverImage;
////                    ios是file:/ 安卓是file://
//                    sendcover = sendcover.substring(0,1) == '/' ? sendcover.substring(1) : sendcover;


//                    event.toast(sendcover);
//                    modal.toast({message:sendcover,duration:3});
                    //                将封面上传服务器
                    event.upload(this.coverImage,function (data) {
                        if(data.type == 'success'){
                            //这边会由于避免重复渲染而需要再次向服务器上传该图片
                            _this.serveCover = data.data;
//                        上传段落图片
                            _this.sendImage(0);
                        }else{
                            _this.toSendArticle = false;
                            event.toast(data.content);
                        }
                    },function (data) {
                        _this.ctrlProcess(data);
                    })
                }


            },
            //上传图片到服务器
            sendImage (sendIndex) {
                var _this = this;
                let sendLength = _this.paraList.length;//获取图片数组总长度
                let frontUrl = _this.paraList[sendIndex].paraImage.substring(0,5);
//                判断是否已经是服务器图片
                if(frontUrl == 'http:'){
//                    如果已经是http的图片 就直接将图片赋予要上传的变量；
                    _this.paraList[sendIndex].serveThumbnail = utils.thumbnail(_this.paraList[sendIndex].paraImage,155,155);
                    sendIndex ++ ;
//                        判断是否最后一张图
                    if(sendIndex < sendLength){
//                            回调自己自己
                        _this.sendImage(sendIndex)
                    }else{//进行上传文章
                        _this.realSave();
                    }
                }else if(_this.paraList[sendIndex].paraImage == ''){//判断是否只有文字
                    _this.paraList[sendIndex].serveThumbnail = '';
                    sendIndex ++ ;
//                        判断是否最后一张图
                    if(sendIndex < sendLength){
//                            回调自己自己
                        _this.sendImage(sendIndex)
                    }else{//进行上传文章
                        _this.realSave();
                    }
                }else{
//                    let sendparaimg = frontUrl == 'file:' ? _this.paraList[sendIndex].paraImage.substring(7) : _this.paraList[sendIndex].paraImage;//将图片前的file://字符去掉
//                    var sendparaimg = frontUrl == 'file:' ? _this.paraList[sendIndex].paraImage.substring(6) :  _this.paraList[sendIndex].paraImage;
////                    ios是file:/ 安卓是file://
//                    sendparaimg = sendparaimg.substring(0,1) == '/' ? sendparaimg.substring(1) : sendparaimg;
                    event.upload(_this.paraList[sendIndex].paraImage,function (data) {
                        if(data.type == 'success'){
                            _this.paraList[sendIndex].paraImage = data.data;
                            //                            向后台获取缩略图
                            _this.paraList[sendIndex].serveThumbnail = utils.thumbnail(data.data,155,155);
                            sendIndex ++ ;
//                        判断是否最后一张图
                            if(sendIndex < sendLength){
//                            回调自己自己
                                _this.sendImage(sendIndex);
                            }else{//进行上传文章
                                _this.realSave();
                            }
                        }else{//上传失败
                            _this.toSendArticle = false;
                            _this.currentPro = 0;//当前进度
                            _this.proTotal = 2;//总的进度
                            _this.processWidth = 0;//进度条宽度
                            event.toast('2');
                            event.toast(data.content);
                        }
                    },function (data) {
//                    上传进度
                        _this.ctrlProcess(data);
                    })
                }
            },
//            图片上传后，正式将文章数据上传服务器
            realSave(){
                var _this = this;
                let musicData = {
                    name:_this.musicName,
                    id:musicId
                }
                let voteData = [];
//                投票组
                this.voteList.forEach(function (item) {
//                    投票选项
                    let voteOptions = [];
                    item.pageBox.forEach(function (value) {
                        voteOptions.push(value.textAreaMessage);
                    })
                    let expireTime = '';
                    if(item.chooseDate == '无截止时间'){
                    }else{
                        let merge = item.chooseDate + ' ' +item.chooseTime + ':00';
                        let mergeMore = new Date(Date.parse(merge.replace(/-/g, "/")));
                        expireTime = mergeMore.getTime()/1000;
                    }
                    voteData.push({
                        title:item.textAreaTitle,
                        expire:expireTime,
                        voteType:item.optionsIndex,
                        options:voteOptions,
                    })
//                    event.toast(voteData);
                });
                //            获取当前时间戳 作为唯一标识符key
                var timestamp = Math.round(new Date().getTime()/1000);
                var atticleTemplates = [];
                this.paraList.forEach(function(item){
                    atticleTemplates.push({
                        thumbnail:item.serveThumbnail,
                        original:item.paraImage,
                        mediaType: "image",
                        content:item.paraText
                    })
                })
//                判断是再次编辑还是初次编辑;
                let sendId =  _this.articleId == '' ? timestamp : _this.articleId;
                let articleData = {
                    thumbnail:this.serveCover,
                    music:musicData,
                    templates:atticleTemplates,
                    id:sendId,
                    title:_this.setTitle,
                    votes:voteData,
                    isDraft:false,
                }

//                转成json字符串后上传服务器
                articleData = JSON.stringify(articleData);
//                网络请求，保存文章
                POST('weex/member/article/submit.jhtml',articleData).then(
                    function (res) {
                        if(res.data != '' && res.type == 'success'){
                            _this.articleId = res.data.id;
//                            event.toast(res);
                            let resDataStr = JSON.stringify(res.data);
                            let saveData = {
                                type:"article",
                                key:res.data.id,
                                value:resDataStr,
                                sort:'0,'+ timestamp +'',
                                keyword:',[ '+ _this.catalogId + '],' + _this.setTitle + ','
                            }
//                            event.toast(saveData);
//                1是置顶（默认倒序）  keyword ",[1],文章title,"
//                            utils.save("article",res.data.id,res.data.data,'0,'+ timestamp +'',',[ '+ _this.catalogId + '],' + _this.setTitle + ',',function (data) {
                            event.save(saveData,function(data){
                                if(data.type == 'success'){
//                                    event.closeURL();
                                    _this.toSendArticle = false;
//                                    event.openURL('http://192.168.2.157:8081/preview.weex.js?articleId=' + res.data.id,function (data) {
                                        event.openURL(utils.locate('view/member/editor/preview.js?articleId=' + res.data.id + '&publish=' + _this.publish),function (data) {
                                        _this.currentPro = 0;//当前进度
                                        _this.proTotal = 2;//总的进度
                                        _this.processWidth = 0;//进度条宽度
//                                        if(!utils.isNull(data.data.isDone) && data.data.isDone == 'complete'){
                                            let E = {
                                                isDone : 'complete'
                                            }
                                            let backData = utils.message('success','成功',E);
                                            event.closeURL(backData);
//                                        }
                                    })
                                }else{
                                    _this.toSendArticle = false;
                                    _this.currentPro = 0;//当前进度
                                    _this.proTotal = 2;//总的进度
                                    _this.processWidth = 0;//进度条宽度
                                    modal.alert({
                                        message: data.content,
                                        duration: 0.3
                                    })
                                }
                            })
                        }else{
                            event.toast(res.content);
                            _this.toSendArticle = false;
                            _this.currentPro = 0;//当前进度
                            _this.proTotal = 2;//总的进度
                            _this.processWidth = 0;//进度条宽度
                        }
                    },
                    function (err) {
                        event.toast(err.content);
                        _this.toSendArticle = false;
                        _this.currentPro = 0;//当前进度
                        _this.proTotal = 2;//总的进度
                        _this.processWidth = 0;//进度条宽度
                    }
                )

//                网络请求，保存文章
//                _this.saveArticle(articleData,res=>{
////                    modal.toast({message:res});
//                    if(utils.isNull(res)){
//                        event.toast('系统繁忙,请稍后重试');
//                    }else{
//                        event.toast(res);
//                        if(res.data != '' && res.data.type == 'success'){
//                            event.toast(res.data.data.id);
////                1是置顶（默认倒序）  keyword ",[1],文章title,"
//                            utils.save("article",res.data.data.id,res.data.data,'0,'+ timestamp +'',',[],' + _this.setTitle + ',',function (data) {
//                                if(data.type == 'success'){
////                                    event.closeURL();
//                                    _this.toSendArticle = false;
//                                    event.openURL('http://192.168.2.157:8081/preview.weex.js?articleId=' + res.data.data.id,function (message) {
//                                            _this.currentPro = 0;//当前进度
//                                            _this.proTotal = 2;//总的进度
//                                            _this.processWidth = 0;//进度条宽度
//                                    })
//                                }else{
//                                    modal.alert({
//                                        message: '系统繁忙,请稍后重试',
//                                        duration: 0.3
//                                    })
//                                }
//                            })
//                        }
//                    }
//
//                })
            },
//        向服务器发送保存文章
//            saveArticle(articleData,callback) {
////                modal.toast({message:articleData,duration:3});
//                return stream.fetch({
//                    method: 'POST',
//                    type: 'json',
//                    body:articleData,
//                    url: 'weex/member/article/submit.jhtml'
//                }, callback)
//            },
//            点击"+"号里的文本时
            addTextPara:function(index){
                var _this = this;
                event.openEditor('',function (data) {
                    let textImg = utils.locate('resources/images/text.png');
//                    event.toast(data);
//                    将返回回来的html数据赋值进去
                    let newPara = {
                        //原图
                        paraImage:'',
//                                    小缩略图
                        thumbnailImage:textImg,
                        paraText:data.data,
                        show:true
                    }
                    _this.paraList.splice(index,0,newPara)
//                    modal.toast({message:_this.paraList[index].paraText,duration:3});
                })
            },
//            点击"+"号里的图片时
            addImgPara:function (index) {
                var _this = this;
                album.openAlbumMuti(
                    //选完图片后触发回调函数
                    function (data) {
                        if(data.type == 'success'){
//                    data.data里存放的是用户选取的图片路径
                            for(let i = 0;i < data.data.length;i++){
                                let newPara = {
                                    //原图
                                    paraImage: data.data[i].originalPath,
//                                    小缩略图
                                    thumbnailImage: data.data[i].thumbnailSmallPath,
                                    paraText:'',
                                    show:true
                                }
                                _this.paraList.splice(index + i,0,newPara)
                                _this.clearIconBox();
                            }
                        }
                    }
                )
            },
//            点击第一个"+"号时触发
            firstShow:function(){
                this.firstPlusShow = !this.firstPlusShow;
                if(lastIndex != -1){
                    setTimeout(()=>{
                        if(this.paraList[lastIndex].show == false){
                            this.paraList[lastIndex].show = true;
                        }
                        lastIndex = -1;
                    },60)
                }
            },
//            点击第2个以后的"+"号时，触发
            showIconBox:function (index) {
                setTimeout(()=>{
                    if(this.firstPlusShow == false){
                        this.firstPlusShow = true;
                    }
                },60)
                if(lastIndex == -1){
                    this.paraList[index].show = !this.paraList[index].show;
                }else{
                    this.paraList[index].show = !this.paraList[index].show;
                    //需要加延迟 否则画面会出现卡顿。先将点击的加号转变成功能盒，再将上一个功能后转变为"+"号
                    setTimeout(()=>{
                        if(this.paraList[lastIndex].show == false){
                            this.paraList[lastIndex].show = true;
                        }
                    },60)
                }
                setTimeout(()=>{
                    lastIndex = index;
                },60)

            },
//            点击空白区域时，将功能盒子隐藏，显示出"+"号
            clearIconBox:function(){
                if(lastIndex != -1){
                    if(this.paraList[lastIndex].show == false){
                        this.paraList[lastIndex].show = true;
                    }
                    lastIndex = -1;
                }
                if(this.firstPlusShow == false){
                    this.firstPlusShow = true;
                }
            },
//            判断是否最后一个段落来添加向下移动的箭头。
            lastPara:function(index){
                if(index != this.paraList.length-1){
                    return true;
                }else{
                    return false;
                }
            },
//            上箭头
            moveUp:function (index) {
                this.firstPlusShow = true;
                if(lastIndex != -1){
                    this.paraList[lastIndex].show = true;
                    lastIndex = -1;
                }
//         方法2
                let a = this.paraList[index].thumbnailImage;
                let b = this.paraList[index].paraText;
                this.paraList[index].thumbnailImage = this.paraList[index - 1].thumbnailImage;
                this.paraList[index].paraText = this.paraList[index - 1].paraText;
                this.paraList[index - 1].thumbnailImage = a;
                this.paraList[index - 1].paraText = b;
            },
//            下箭头
            moveBottom:function (index) {
                this.firstPlusShow = true;
                if(lastIndex != -1){
                    this.paraList[lastIndex].show = true;
                    lastIndex = -1;
                }
//         方法2
                let a = this.paraList[index].thumbnailImage;
                let b = this.paraList[index].paraText;
                this.paraList[index].thumbnailImage = this.paraList[index + 1].thumbnailImage;
                this.paraList[index].paraText = this.paraList[index + 1].paraText;
                this.paraList[index + 1].thumbnailImage = a;
                this.paraList[index + 1].paraText = b;
            },
//            用户执行删除时触发询问。
            showConfirm :function(index) {
                var _this = this;
                if(this.paraList.length == 1){
                    modal.toast({message: '至少要保留一张图片', duration: 0.5})
                }else{
                    modal.confirm({
                        message: '确定删除该段?',
                        okTitle:'确定',
                        cancelTitle:'取消',
                        duration: 0.3
                    }, function (value) {
                        if(value == '确定'){
                            //    将内容删掉
                            _this.paraList.splice(index,1);
                        }
                    })
                }
            },
//            删除投票
            closeVote:function (index) {
                var _this = this;
                modal.confirm({
                    message: '确定删除投票?',
                    okTitle:'删除',
                    cancelTitle:'取消',
                    duration: 0.3
                }, function (value) {
                    console.log(value);
                    if(value == '删除'){
                        //                将内容删掉
                        _this.voteList.splice(index,1);
                    }
                })
            },
//            编辑段落图片
            editParaImage(imgSrc,index){
                var _this = this;
//                判断是否没有图片
                if(imgSrc == ''){
                    album.openAlbumSingle(false, function(data){
                        _this.paraList[index].paraImage = data.data.originalPath;
                        _this.paraList[index].thumbnailImage = data.data.thumbnailSmallPath;
                    })
                    return;
                }else{
//                    modal.confirm({
//                        message: '请选择裁剪或者更换图片',
//                        duration: 0.3,
//                        okTitle:'裁剪',
//                        cancelTitle:'更换',
//                    }, function (value) {
//                        event.toast(value);
//                        if(value == '更换'){
////                                调用单选图片接口
//                            album.openAlbumSingle(false, function(data){
//                                _this.paraList[index].paraImage ='file:/' + data.data.originalPath;
//                                _this.paraList[index].thumbnailImage ='file:/' + data.data.thumbnailSmallPath;
//                            })
//                        }else if(value == '裁剪'){
//                                调用裁剪图片
                            album.openCrop(imgSrc,function (data) {
                                if(data.type == 'success'){
                                    _this.paraList[index].paraImage = data.data.originalPath;
                                    _this.paraList[index].thumbnailImage = data.data.thumbnailSmallPath;
                                }else{
                                    if(data.content == '用户取消'){
                                    }else{
                                        event.toast(data.content);
                                    }
                                }
                            })
//                        }else{
//                            event.toast(value);
//                        }
//                    })
                }
            },
//            下拉刷新
            onrefresh (event) {
                console.log('is refreshing')
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                }, 10)
            },
//            正在下拉
            onpullingdown (event) {
                console.log('is onpulling down')
            },
//            跳转封面页面
            goCover:function () {
//                event.openURL('file://assets/member/editor/cover.js');
                var _this = this;
                let paraLength =  _this.paraList.length;
                let listLength = paraLength >= 6 ? 6 : paraLength;
                let imgList = [];
                for(let i = 0;i < listLength; i++){
                    imgList.push({
                        path:_this.paraList[i].paraImage
                    });
                }
                var  coverData = {
                    image : imgList,
                    cover : _this.coverImage
                }
                coverData = JSON.stringify(coverData);
                storage.setItem('coverImage', coverData);
                event.openURL(utils.locate('view/member/editor/cover.js?name=coverImage'),function (message) {
//                event.openURL('http://192.168.2.157:8081/cover.weex.js?name=coverImage',function (message) {
//                    let jsonData = JSON.parse(data);
//                    modal.toast({message:message,duration:1});
                    if(message.type == 'success' && message.data != ''){
                        _this.coverImage = message.data;
                    }
                });
            },
//            跳转音乐页面
            goMusic:function () {
//                event.openURL('file://assets/member/editor/music.js');
                let _this = this;
//                event.toast(musicId);
                event.openURL(utils.locate('view/member/editor/music.js?musicId=' + musicId),function (message) {
//                event.openURL('http://192.168.2.157:8081/music.weex.js?musicId=' + musicId,function (message) {
//                    event.toast(message);
//                    let jsonData = JSON.parse(data);
//                    modal.toast({message:message,duration:1});
                    if(message.data != ''){
                        _this.musicName = message.data.chooseMusicName;
                        musicId = message.data.chooseMusicId;
                    }
                });
            },
//            跳转投票页面
            goVote:function () {
                let _this = this;
//                event.openURL('http://192.168.2.157:8081/vote.weex.js',function (message) {
                event.openURL(utils.locate('view/member/editor/vote.js'),function (message) {
                    if(message.data != '') {
                        _this.voteList.push(message.data);
                    }
                });
            },
//            编辑投票
            editVote:function (index) {
                let _this = this;
                let voteData = JSON.stringify(_this.voteList[index]);
                storage.setItem('voteData', voteData);
//                event.openURL('http://192.168.2.157:8081/vote.weex.js?name=voteData',function (message) {
                event.openURL(utils.locate('view/member/editor/vote.js?name=voteData'),function (message) {
                    event.toast( _this.voteList);
                    if(message.data != '') {
//                        直接=无法重新渲染页面。需要push后才可以
                        _this.voteList[index] = message.data;
                    }
                });
            }
        }
    }
</script>







<template>
    <div class="wrapper">
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
                        <div class="addIconBox " @click="addVideoPara(0)">
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
                            <div @click="editParaImage(item.paraImage,index,item.mediaType)">
                                <image class="paraImage" resize="cover"  :src="item.thumbnailImage | watchThumbImg"></image>
                                <div class="videoIconBox" v-if="item.mediaType == 'video'">
                                    <text class="videoIcon" :style="{fontFamily:'iconfont'}" >&#xe644;</text>
                                </div>
                            </div>
                            <!--文章内容-->
                            <div class="paraText" @click="editorText(index)">
                                <!--判断是否有文字，没有文字就显示  "点击添加文字"-->
                                <text class="paraTextSize" v-if="item.paraText != '' && item.paraText != null && item.paraText != undefined && item.paraText != 'undefined'">{{item.paraText | htmlDeal}}</text>
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
                                <div class="addIconBox " @click="addVideoPara(index + 1)">
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
        <div class="sendMask" @click="maskClick()" v-if="toSendArticle">
            <!--进度条-->
            <div class="processBox">
                <text class="processText">正在云同步,请稍候...</text>
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
    .videoIconBox{
        position: absolute;
        left: 0;
        top:0;
        width: 155px;
        height: 155px;
        background-color: rgba(136,136,136,0.3);
    }
    .videoIcon{
        color: #fff;
        font-size: 70px;
        position:absolute;
        top:42.5px;
        left:42.5px;
    }
    .addIconBox:active{
        background-color: #ccc;
    }
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
                proTotal:0,//总的进度
                processWidth:0,//进度条宽度
                articleId:'',
                refreshing: false,
                firstPlusShow:true,
                coverImage:utils.locate('resources/images/background.png'),
                setTitle:'点击设置标题',
                addMusic:'添加音乐',
                musicName:'',
                paraList:[],
                voteList:[],
                proportion:'',//缩略图的比例
                serveCover:'',//用来保存图片上传服务器后存储服务器图片路径，避免覆盖图片时产生闪屏
                catalogId:'',
                publish:false,
                sortStatus:'0,',
                timestamp:'',
                articleTemplates:[],//文章段落数组
                musicData:'',//音乐数据
                voteData:[],//投票的数组
                hadChange:0,
//                缓存有用
                articleOption:{
                    articleCatalog:{count:0},
                    articleCategory:{},
                    authority:'draft',
                    pitch:false,
                    publish:false,
                    top:false,
                },
                hits:0,
                laud:0,
                products:[],
                review:0,
            }
        },
        filters:{
//            过滤html标签
            htmlDeal:function(value){
                if(utils.isNull(value)){
                    return value;
                }
//                将h1-h5换成\n
                let takeEnter=value.replace(/<\/h[0-9]>/g,"\n");
//                将html标签替换，可能遗留空格
                let nbspText=takeEnter.replace(/<\/?.+?>/g,"");
//                将空格 &nbsp; 替换成 。
                let spaceText=nbspText.replace(/&nbsp;/g," ");
                return spaceText;
//                //                将空格去除
////                var onlyText=spaceText.replace(/ /g,"");
            },
            watchThumbImg:function (value) {
                if(utils.isNull(value)){
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
            //            获取当前时间戳 作为唯一标识符key
            this.timestamp = Math.round(new Date().getTime()/1000);
//            bundleUrl = new String(bundleUrl);
//            取当前页面rul，将musicId取出来
            var bundleUrl = this.$getConfig().bundleUrl;
            var getVal = bundleUrl.split('?')[1];
//          创建文章编辑（首次）
            if(utils.isNull(getVal)){

                //       多选图片
                //      调用安卓的相册
                var _this = this;
                //判断是否第一次编辑该文章
                var findDelete = {
                    type:'articleDraft',
                    key:'0'
                }
                event.find(findDelete,function (delData) {
                    if(delData.type == 'success' && delData.data != ''){
                        //从缓存读取数据 写入界面
                        _this.readData(findDelete);
                    }else{
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
                                            mediaType: "image",
                                            paraText:'',
                                            show:true,
                                            serveThumbnail:''
                                        });
                                        _this.saveDraft();
                                    }
                                }else{
                                    event.closeURL();
                                }
                            }
                        )
                    }
                });
            }else{//再次文章编辑
                _this.delOnceDraft('noclose');
                var op = getVal.split('=');
                if(op[0] == 'articleId') {
                    let options = {
                        type:'article',
                        key:op[1]
                    };
                    _this.articleId = op[1];
                    if(_this.articleId.length == 13){//13位的id为草稿文章
                    }else{
                        GET('weex/member/article/option.jhtml?id=' + _this.articleId,function (data) {
                            if(data.type == 'success' && data.data != ''){
                                _this.catalogId = data.data.articleCatalog.id;
                            }
                        },function (err) {
                            event.toast(err.content);
                            return;
                        });
                    }
                    //从缓存读取数据 写入界面
                    _this.readData(options);
                };
            };
        },
        methods:{
            //从缓存读取数据 写入界面
            readData(options){
                let _this =this;
                event.find(options,function (data) {
                    if(data.type == 'success' && data.data != ''){
                        let articleData = JSON.parse(data.data.value);
                        if(!utils.isNull(data.data.sort)){
//                            保存置顶状态。
                            _this.sortStatus = data.data.sort.substring(0,2);
                        }
                        _this.setTitle = articleData.title;
                        _this.coverImage = articleData.thumbnail;
                        if(!utils.isNull(articleData.music.name)){
                            _this.musicName = articleData.music.name;
                        }
                        _this.publish = articleData.articleOption.publish;
                            _this.articleOption = articleData.articleOption,
                            _this.hits = articleData.hits,
                            _this.laud = articleData.laud,
                            _this.products = articleData.products,
                            _this.review = articleData.review,
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
                                mediaType:templatesData[i].mediaType,
                                serveThumbnail:'' //用来保存图片上传服务器后存储服务器图片路径，避免覆盖图片时产生闪屏
                            })
                        }
//                            投票
                        if(!utils.isNull(articleData.votes)){
                            articleData.votes.forEach(function (item) {
                                let startDate = '';
                                let startTime = '';
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
                        if(this.articleId.length == 13){
                            event.toast('本地数据已被删除')
                            event.closeURL();
                            return;
                        }
//                        从服务器获取文章信息并存入缓存
                        _this.getServerArticle(function () {
                                let options = {
                                    type:'article',
                                    key:_this.articleId
                                };
                                _this.readData(options)
                            }
                        )
                    };
                });
            },
//           从服务器获取文章信息并存入缓存
            getServerArticle(callback){
                let _this = this;
                GET('weex/member/article/view.jhtml?id=' + _this.articleId,function (res) {
                    if (res.data != '' && res.type == 'success') {
//                                   将服务器的缩略图换成原图的缩略图
//                                    res.data.templates.forEach(function (item) {
//                                        item.thumbnail = utils.thumbnail(item.original,155,155);
//                                    })
                        let resDataStr = JSON.stringify(res.data);
                        let saveData = {
                            type: "article",
                            key: res.data.id,
                            value:resDataStr,
                            sort: '0,' + res.data.modifyDate,
                            keyword: ',[' + _this.catalogId + '],' + _this.setTitle + ','
                        };
                        event.save(saveData, function (data) {
                            if (data.type == 'success') {
                                callback();
                            } else {
                                event.toast(data.content);
                            }
                        })
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
//            保存临时草稿
            saveDraft(callback){
                let _this = this;
//                将数据保存到变量里
                this.savePage();
                var allPageData = {
                    articleOption:this.articleOption,
                    hits:this.hits,
                    laud:this.laud,
                    products:this.products,
                    review:this.review,
                    id:this.articleId,
                    isDraft:true,
                    modifyDate:this.timestamp,
                    music:this.musicData,
                    templates:this.articleTemplates,
                    thumbnail:this.coverImage,
                    title:this.setTitle,
                    votes:this.voteData
                }
                allPageData = JSON.stringify(allPageData);
                var storageType;
                var storageKey;
                if(utils.isNull(this.articleId)){
                    storageType = "articleDraft";
                    storageKey = '0';
                }else {
                    storageType = "article";
                    storageKey = this.articleId;
                }
                let draftOptions = {
                    type:storageType,
                    key:storageKey,
                    value:allPageData,
                    sort:_this.sortStatus + _this.timestamp,
                    keyword:',['+ _this.catalogId + '],' + _this.setTitle + ','
                }
                event.save(draftOptions,function(data){
                    if(data.type == 'success' && !utils.isNull(_this.articleId)){

//                                    全局监听文章变动
                        let listenData = utils.message('success','文章改变','')
                        event.sendGlobalEvent('onArticleChange',listenData);
                        if(!utils.isNull(callback)){
                            callback();
                        }
                    }else if(data.type == 'success'){
                        if(!utils.isNull(callback)){
                            callback();
                        }
                    }else{
                        event.toast(data.content);
                    }
                })
            },

//            控制进度条
            ctrlProcess(data){
                this.processWidth = parseInt(data.data) * 5;
                if(this.processWidth == 500){
                    this.currentPro ++ ;
                };
            },

//            设置文章标题
            articleTitle:function(title){
                let _this = this;
                if(title == '点击设置标题'){
                    title = '';
                };
                let textData = {
                    autograph:title
                };
                textData = JSON.stringify(textData);
                storage.setItem('articleTitle', textData,e=> {
                    event.openURL(utils.locate('widget/autograph.js?name=articleTitle'), function (message) {
                        if (message.type == 'success' && message.data != ''   && message.data.text != '') {
                            _this.setTitle = message.data.text;
                            _this.hadChange = 1;
//                            if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                            _this.saveDraft();
//                            }
                        }
                    })
                })

            },
//            段落里的文本编辑
            editorText(index){
                var _this = this;
                event.openEditor(_this.paraList[index].paraText,function (data) {
                    if(data.data != '') {
//                    将返回回来的html数据赋值进去
                        _this.paraList[index].paraText = data.data;
                        _this.hadChange = 1;
//                        if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                        _this.saveDraft();
//                        }
                    }
                })
            },
//            返回
            goBack:function () {
                let _this = this;
//                判断是草稿还是已经发布文章
                if(utils.isNull(this.articleId) || this.articleId.length == 13){
                    modal.confirm({
                        message: '请选择方式?',
                        duration: 0.3,
                        okTitle:'删除草稿',
                        cancelTitle:'存草稿',
                    }, function (value) {
                        if(value == '存草稿'){
                            if(utils.isNull(_this.articleId)){
                                //            获取当前时间戳 作为唯一标识符key
                                _this.articleId = Math.round(new Date().getTime());
                            }
                            _this.saveDraft(function () {
                                _this.delOnceDraft();
                            });
                        }else if(value == '删除草稿'){
                            _this.deleteDraft();
                        }
                    })
                }else{
//                    判断是否有修改过
                    if(this.hadChange == 1){
                        modal.confirm({
                            message: '请选择方式?',
                            duration: 0.3,
                            okTitle:'撤销编辑',
                            cancelTitle:'存草稿',
                        }, function (value) {
                            if(value == '存草稿'){
                                _this.saveDraft(function () {
                                    let E = {
                                        isDone : 'complete'
                                    }
                                    let backData = utils.message('success','成功',E);
                                    event.closeURL(backData);
                                });
                            }else if(value == '撤销编辑'){
                                _this.getServerArticle(
                                    function () {
//                                    全局监听文章变动
                                        let listenData = utils.message('success','文章改变','')
                                        event.sendGlobalEvent('onArticleChange',listenData);
                                        event.closeURL();
                                    }
                                )
                            }
                        })
                    }else{
                        event.closeURL();
                    }
                }
            },
//            删除临时缓存和草稿缓存
            deleteDraft(){
                let _this = this;
                var storageType;
                var storageKey;
                if(utils.isNull(this.articleId)){
                    storageType = "articleDraft";
                    storageKey = '0';
                }else {
                    storageType = "article";
                    storageKey = this.articleId;
                }
//                                    判断是否第一次编辑该文章
                let findDel = {
                    type:storageType,
                    key:storageKey
                }
                event.find(findDel,function (delData) {
                    if(delData.type == 'success' && delData.data != ''){
                        //  将临时缓存删除;
                        let delOption = {
                            type:storageType,
                            key:storageKey
                        }
                        event.delete(delOption,function (data) {
                            if(data.type == 'success' && !utils.isNull(_this.articleId)){
//                                    全局监听文章变动
                                let listenData = utils.message('success','文章改变','')
                                event.sendGlobalEvent('onArticleChange',listenData);
                                event.closeURL();
                            }else if(data.type == 'success'){
                                event.closeURL();
                            }
                        });
                    }else{
                        event.toast(delData.content);
                    }
                });
            },
//            删除临时缓存
            delOnceDraft(close){
                let _this = this;
//   将临时草稿删除
                let findDel = {
                    type:'articleDraft',
                    key:'0'
                }
                event.find(findDel,function (delData) {
                    if(delData.type == 'success' && delData.data != ''){
                        //  将临时缓存删除;
                        let delOption = {
                            type:'articleDraft',
                            key:'0'
                        }
                        event.delete(delOption,function (data) {
                            if(data.type == 'success' ){
                                if(utils.isNull(close)){
                                    let E = {
                                        isDone : 'complete'
                                    }
                                    let backData = utils.message('success','成功',E);
                                    event.closeURL(backData);
                                }
                            }else{
                                event.toast(data.content);
                            }
                        });
                    }else{
                        if(utils.isNull(close)){
                            event.closeURL();
                        }
                    }
                });
            },
//            完成
            goComplete:function () {
                var _this = this;
                if(this.setTitle == '点击设置标题'){
                    event.toast('请设置标题');
                    return;
                }
//                判断封面是否有值。
                if(this.coverImage == utils.locate('resources/images/background.png')){
                    event.toast('请设置封面');
                    return;
                }
                var imageNum = 0;
//                上传时判断至少要有一张图;
                _this.paraList.forEach(function (item) {
                    if(item.mediaType == 'image' && item.paraImage != ''){
                        imageNum ++;
                    }
                })
                if(imageNum == 0){
//                        modal.toast({message: '至少要保留一张图片', duration: 0.5});
                    event.toast('至少要有一张图片');
                    return;
                }
                this.toSendArticle = true;
                this.proTotal = 0;
//                判断封面图片是否已上传过
                if(!utils.isNull(this.coverImage) && this.coverImage.substring(0,4) != 'http'){
                    this.proTotal ++;
                };
//                判断段落图片是否已上传
                this.paraList.forEach(function (item) {
                    if(!utils.isNull(item.paraImage) && item.paraImage.substring(0,4) != 'http'){
                        _this.proTotal ++;
                    }
                });
////                获取设备宽度
//                let devWidth = weex.config.env.deviceWidth;
////                获取缩略图的宽高
//                _this.proportion = parseInt(155 * devWidth/750);
                var frontcoverUrl = '';
                if(!utils.isNull(this.coverImage)){
                    frontcoverUrl = this.coverImage.substring(0,4);
                }
//                event.toast(frontcoverUrl);
                if(frontcoverUrl == 'http'){
//                    event.toast('1');
                    _this.serveCover = this.coverImage;
                    _this.sendImage(0);
                }else{
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
                            return;
                        }
                    },function (data) {
                        _this.ctrlProcess(data);
                    })
                }


            },
            //上传图片到服务器
            sendImage (sendIndex) {
                var _this = this;
//                var frontUrl;
                let sendLength = _this.paraList.length;//获取图片数组总长度
                var mediaType = _this.paraList[sendIndex].mediaType;
                var frontUrl = '';
                if(!utils.isNull(_this.paraList[sendIndex].paraImage)){
                    frontUrl = _this.paraList[sendIndex].paraImage.substring(0,4);
                }
//                if(mediaType == 'image') {
//                    modal.toast({message:frontUrl,duration:1});
//                }else if(mediaType == 'video'){//如果是视频
//                    frontUrl = _this.paraList[sendIndex].thumbnailImage.substring(0,5);
//
//                    modal.toast({message:frontUrl,duration:1});
//                }
//                判断是否已经是服务器图片
                if(frontUrl == 'http'){

                    if(mediaType == 'image'){
//                    如果已经是http的图片 就直接将图片赋予要上传的变量；
                        _this.paraList[sendIndex].serveThumbnail = utils.thumbnail(_this.paraList[sendIndex].paraImage,155,155);
                    }else if(mediaType == 'video'){//如果是视频就将缩略图进行赋值
                        _this.paraList[sendIndex].serveThumbnail = _this.paraList[sendIndex].thumbnailImage;
                    }
                    sendIndex ++ ;

//                        判断是否最后一张图
                    if(sendIndex < sendLength){
//                            回调自己自己
                        _this.sendImage(sendIndex)
                    }else{//进行上传文章
                        _this.realSave();
                    }
                }else if(utils.isNull(_this.paraList[sendIndex].paraImage)){//判断是否只有文字
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
                    event.upload(_this.paraList[sendIndex].paraImage,function (data) {
                        if(data.type == 'success'){
                            _this.paraList[sendIndex].paraImage = data.data;
//                            判断是图片还是视频
                            if(mediaType == 'image'){
                                //                            向后台获取缩略图
                                _this.paraList[sendIndex].serveThumbnail = utils.thumbnail(data.data,155,155);
//                                    因为异步操作,所以要分别在if elseif里写下列代码
                                sendIndex ++ ;
//                        判断是否最后一张图
                                if(sendIndex < sendLength){
//                            回调自己自己
                                    _this.sendImage(sendIndex);
                                }else{//进行上传文章
                                    _this.realSave();
                                }
                            }else if(mediaType == 'video'){
//                                将视频的封面上传
                                event.upload(_this.paraList[sendIndex].thumbnailImage,function (e) {
                                    if(e.type == 'success'){
                                        //                            向后台获取缩略图 (视频不需要获取缩略图)
                                        _this.paraList[sendIndex].serveThumbnail = e.data;
//                                        event.toast(_this.paraList[sendIndex].serveThumbnail);
                                    }else{//上传失败
                                        _this.toSendArticle = false;
                                        _this.currentPro = 0;//当前进度
                                        _this.proTotal = 0;//总的进度
                                        _this.processWidth = 0;//进度条宽度
                                        event.toast(e.content);
                                        return;
//                                        这边出错 11.30
                                    }
//                                    因为异步操作,所以要分别在if elseif里写下列代码
                                    sendIndex ++ ;
//                        判断是否最后一张图
                                    if(sendIndex < sendLength){
//                            回调自己自己
                                        _this.sendImage(sendIndex);
                                    }else{//进行上传文章
                                        _this.realSave();
                                    }
                                },function (data) {
                                })
                            }
                        }else{//上传失败
                            _this.toSendArticle = false;
                            _this.currentPro = 0;//当前进度
                            _this.proTotal = 0;//总的进度
                            _this.processWidth = 0;//进度条宽度
                            event.toast(data.content);
                            return;
                        }
                    },function (data) {
//                    上传进度
                        _this.ctrlProcess(data);
                    })
                }
            },
//            将页面上的数据存储起来
            savePage(){

//                每次保存前 将下列3个变量重新置空;
                this.articleTemplates=[];//文章段落数组
                this.musicData='';//音乐数据
                this.voteData=[];//投票的数组

                let _this = this;
                this.musicData = {
                    name:_this.musicName,
                    id:musicId
                }
//                let voteData = [];
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
                    _this.voteData.push({
                        title:item.textAreaTitle,
                        expire:expireTime,
                        voteType:item.optionsIndex,
                        options:voteOptions,
                    })
//                    event.toast(voteData);
                });
//                var articleTemplates = [];
                if(!utils.isNull(this.articleId) && this.articleId.length == 13){//判断id为13位的是草稿，或者有文章id时。
                    var uploadThumbnailImg ;
                    this.paraList.forEach(function(item){
                        if(!utils.isNull(item.serveThumbnail)){
                            uploadThumbnailImg = item.serveThumbnail;
                        }else{
                            uploadThumbnailImg = item.thumbnailImage;
                        }
                        _this.articleTemplates.push({
                            thumbnail:uploadThumbnailImg,
                            original:item.paraImage,
                            mediaType: item.mediaType,
                            content:item.paraText
                        })
                    })
                }else{
                    var uploadThumbnail ;
//                    如果是临时缓存 是没有上传过的本地图片； thumbnail:item.thumbnailImage,
                    this.paraList.forEach(function(item){
                        if(!utils.isNull(item.paraImage) &&  item.paraImage.substring(0,4) == 'http' && !utils.isNull(item.serveThumbnail)){
                            uploadThumbnail = item.serveThumbnail;
                        }else{
                            uploadThumbnail = item.thumbnailImage;
                        }
                        _this.articleTemplates.push({
                            thumbnail:uploadThumbnail,
                            original:item.paraImage,
                            mediaType: item.mediaType,
                            content:item.paraText
                        })
                    })
                }
            },
//            图片上传后，正式将文章数据上传服务器
            realSave(){
                var _this = this;
//                将页面上的数据存储起来
                this.savePage();
//                判断是再次编辑还是初次编辑;
                let sendId =  utils.isNull(_this.articleId) ? _this.timestamp : _this.articleId;
                let articleData = {
                    thumbnail:this.serveCover,
                    music:_this.musicData,
                    templates:_this.articleTemplates,
                    id:sendId,
                    title:_this.setTitle,
                    votes:_this.voteData,
                    isDraft:false,
                };
//                转成json字符串后上传服务器
                articleData = JSON.stringify(articleData);
//                网络请求，保存文章
                POST('weex/member/article/submit.jhtml',articleData).then(
                    function (res) {
                        if(res.data != '' && res.type == 'success'){
//                            _this.articleId = res.data.id;
                            let resDataStr = JSON.stringify(res.data);
                            let saveData = {
                                type:"article",
                                key:res.data.id,
                                value:resDataStr,
                                sort:_this.sortStatus + _this.timestamp,
                                keyword:',['+ _this.catalogId + '],' + _this.setTitle + ','
                            };
//                1是置顶（默认倒序）  keyword ",[1],文章title,"
                            event.save(saveData,function(data){
                                if(data.type == 'success'){
//                                    event.closeURL();
                                    _this.toSendArticle = false;
//                                    全局监听文章变动
                                    let listenData = utils.message('success','文章改变','')
                                    event.sendGlobalEvent('onArticleChange',listenData);
                                    _this.deleteDraft();
                                    event.openURL(utils.locate('view/article/preview.js?articleId=' + res.data.id + '&publish=' + _this.publish),function (data) {
                                        _this.currentPro = 0;//当前进度
                                        _this.proTotal = 0;//总的进度
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
                                    _this.proTotal = 0;//总的进度
                                    _this.processWidth = 0;//进度条宽度
                                    event.toast(data.content);
                                };
                            });
                        }else{
                            event.toast(res.content);
                            _this.toSendArticle = false;
                            _this.currentPro = 0;//当前进度
                            _this.proTotal = 0;//总的进度
                            _this.processWidth = 0;//进度条宽度
                        }
                    },
                    function (err) {
                        event.toast(err.content);
                        _this.toSendArticle = false;
                        _this.currentPro = 0;//当前进度
                        _this.proTotal = 0;//总的进度
                        _this.processWidth = 0;//进度条宽度
                    }
                )
            },

//            点击"+"号里的文本时
            addTextPara:function(index){
                var _this = this;
                event.openEditor('',function (data) {
                    let textImg = utils.locate('resources/images/text.png');
//                    将返回回来的html数据赋值进去
                    let newPara = {
                        //原图
                        paraImage:'',
//                                    小缩略图
                        thumbnailImage:textImg,
//                        paraText:_this.checkInput(data.data),
                        paraText:data.data,
                        mediaType: "image",
                        show:true
                    };
                    _this.paraList.splice(index,0,newPara);

//                    添加修改标志
                    _this.hadChange = 1;
//                    if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                    _this.saveDraft();
//                    }
//                    modal.toast({message:_this.paraList[index].paraText,duration:3});
                });
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
                                    show:true,
                                    mediaType: "image",
                                }
                                _this.paraList.splice(index + i,0,newPara)
                                _this.clearIconBox();


//                    添加修改标志
                                _this.hadChange = 1;
//                                if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                                _this.saveDraft();
//                                }
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
                let _this = this;
                this.firstPlusShow = true;
                if(lastIndex != -1){
                    this.paraList[lastIndex].show = true;
                    lastIndex = -1;
                }
//         方法2
                let a = this.paraList[index].thumbnailImage;
                let b = this.paraList[index].paraText;
                let c = this.paraList[index].mediaType;
                let d = this.paraList[index].paraImage;
                this.paraList[index].mediaType = this.paraList[index - 1].mediaType;
                this.paraList[index].thumbnailImage = this.paraList[index - 1].thumbnailImage;
                this.paraList[index].paraText = this.paraList[index - 1].paraText;
                this.paraList[index].paraImage = this.paraList[index - 1].paraImage;
                this.paraList[index - 1].thumbnailImage = a;
                this.paraList[index - 1].paraText = b;
                this.paraList[index - 1].mediaType = c;
                this.paraList[index - 1].paraImage = d;
                if(!utils.isNull(this.paraList[index].serveThumbnail)){
                    let e = this.paraList[index].serveThumbnail;
                    this.paraList[index].serveThumbnail = this.paraList[index - 1].serveThumbnail;
                    this.paraList[index - 1].paraImage = e;
                }

//                    添加修改标志
                this.hadChange = 1;
                if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                    this.saveDraft();
                }
            },
//            下箭头
            moveBottom:function (index) {
                let _this = this;
                this.firstPlusShow = true;
                if(lastIndex != -1){
                    this.paraList[lastIndex].show = true;
                    lastIndex = -1;
                }
//         方法2
                let a = this.paraList[index].thumbnailImage;
                let b = this.paraList[index].paraText;
                let c = this.paraList[index].mediaType;
                let d = this.paraList[index].paraImage;
                this.paraList[index].mediaType = this.paraList[index + 1].mediaType;
                this.paraList[index].thumbnailImage = this.paraList[index + 1].thumbnailImage;
                this.paraList[index].paraText = this.paraList[index + 1].paraText;
                this.paraList[index].paraImage = this.paraList[index + 1].paraImage;
                this.paraList[index + 1].thumbnailImage = a;
                this.paraList[index + 1].paraText = b;
                this.paraList[index + 1].mediaType = c;
                this.paraList[index + 1].paraImage = d;
                if(!utils.isNull(this.paraList[index].serveThumbnail)){
                    let e = this.paraList[index].serveThumbnail;
                    this.paraList[index].serveThumbnail = this.paraList[index + 1].serveThumbnail;
                    this.paraList[index + 1].paraImage = e;
                }
//                    添加修改标志
                this.hadChange = 1;
                if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                    this.saveDraft();
                }
            },
//            用户执行删除时触发询问。
            showConfirm :function(index) {
                var _this = this;
                var imageNum = 0;
//                判断至少要保留一张图;
                if(_this.paraList[index].mediaType == 'image' && _this.paraList[index].paraImage != ''){//判断是不是图片
                    _this.paraList.forEach(function (item) {
                        if(item.mediaType == 'image' && item.paraImage != ''){
                            imageNum ++;
                        }
                    })
                    if(imageNum <= 1){
//                        modal.toast({message: '至少要保留一张图片', duration: 0.5});
                        event.toast('至少要保留一张图片');
                        return;
                    }
                }
                modal.confirm({
                    message: '确定删除该段?',
                    okTitle:'确定',
                    cancelTitle:'取消',
                    duration: 0.3
                }, function (value) {
                    if(value == '确定'){
                        //    将内容删掉
                        _this.paraList.splice(index,1);
//                    添加修改标志
                        _this.hadChange = 1;
//                        if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                        _this.saveDraft();
//                        }
                    }
                });
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
//                    添加修改标志
                        _this.hadChange = 1;
//                        if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                        _this.saveDraft();
//                        }
                    }
                })
            },
//            编辑段落图片或者视频
            editParaImage(imgSrc,index,mediaType){
                var _this = this;
//                判断是否没有图片
                if(utils.isNull(imgSrc)){
                    album.openAlbumSingle(false, function(data){
                        _this.paraList[index].paraImage = data.data.originalPath;
                        _this.paraList[index].thumbnailImage = data.data.thumbnailSmallPath;
//                    添加修改标志
                        _this.hadChange = 1;
//                        if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                        _this.saveDraft();
//                        }
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
                    if(mediaType == 'image'){
//                                调用裁剪图片
                        album.openCrop(imgSrc,function (data) {
                            if(data.type == 'success'){
                                _this.paraList[index].paraImage = data.data.originalPath;
                                _this.paraList[index].thumbnailImage = data.data.thumbnailSmallPath;
//                    添加修改标志
                                _this.hadChange = 1;
//                                if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                                _this.saveDraft();
//                                }
                            }else{
                                if(data.content == '用户取消'){
                                }else{
                                    event.toast(data.content);
                                }
                            }
                        })
                    }else if(mediaType == 'video'){
                        album.openVideo(function (data) {
                            if(data.type == 'success'){
                                _this.paraList[index].paraImage = data.data.videoPath;
                                _this.paraList[index].thumbnailImage = data.data.coverImagePath;
//                    添加修改标志
                                _this.hadChange = 1;
//                                if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                                _this.saveDraft();
//                                }
                            }else{
                                if(data.content == '用户取消'){
                                }else{
                                    event.toast(data.content);
                                }
                            }
                        })
                    }


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
                var uploadLength = 0;
                let imgList = [];
//                控制最多只传6张图
                for(let i = 0;i < paraLength; i++){
                    if(uploadLength < 6){
//                        区分字体 图像 视频
                        if(_this.paraList[i].paraImage != '' && _this.paraList[i].mediaType == 'image'){
                            imgList.push({
                                path:_this.paraList[i].paraImage
                            });
                            uploadLength ++ ;
                        }else if(_this.paraList[i].paraImage != '' && _this.paraList[i].mediaType == 'video'){
                            imgList.push({
                                path:_this.paraList[i].thumbnailImage
                            });
                            uploadLength ++ ;
                        }
                    }
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
//                    添加修改标志
                        _this.hadChange = 1;
//                        if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                        _this.saveDraft();
//                        }
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
//                    添加修改标志
                        _this.hadChange = 1;
//                        if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                        _this.saveDraft();
//                        }
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
//                    添加修改标志
                        _this.hadChange = 1;
//                        if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                        _this.saveDraft();
//                        }
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
                    if(message.type=='success' && message.data != '') {
//                        直接=无法重新渲染页面。需要push后才可以
//                        _this.voteList[index] = message.data;
                        _this.voteList.splice(index,1);
                        _this.voteList.splice(index,0,message.data);
//                    添加修改标志
                        _this.hadChange = 1;
//                        if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                        _this.saveDraft();
//                        }
                    }
                });
            },
//            点击加号里的添加视频
            addVideoPara:function (index) {
                let _this = this;
                album.openVideo(function (data) {
                    if(data.type == 'success'){
//                    data.data里存放的是用户选取的图片路径
                        let newPara = {
                            //原图
//                                    paraImage: data.data[i].originalPath,
                            paraImage: data.data.videoPath,
//                                    小缩略图
//                                    thumbnailImage: data.data[i].thumbnailSmallPath,
                            thumbnailImage: data.data.coverImagePath,
                            mediaType: "video",
                            paraText:'',
                            show:true,
//                          serveThumbnail:''
                        }
                        _this.paraList.splice(index,0,newPara);
                        _this.clearIconBox();

//                    添加修改标志
                        _this.hadChange = 1;
//                        if(utils.isNull(_this.articleId)){
//                        临时保存到缓存
                        _this.saveDraft();
//                        }
                    }
                })
            },
            maskClick(){
                return;
            },
        }
    }
</script>







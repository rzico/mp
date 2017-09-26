<template>
    <div>
        <navbar :title="title" :complete="complete" @goback="goBack" @goComplete="goComplete"> </navbar>
        <list class="wrapperBox" >
            <!--<refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown"  :display="refreshing ? 'show' : 'hide'"></refresh>-->
            <cell>
                <div>
                    <image class="coverImage" :src="coverImage"></image>
                    <div class="coverMaskImage"></div>
                    <text class="setTitle">{{setTitle}}</text>
                    <div class="bottomBtn addMusic">
                        <text class="musicSize"  @click="goMusic()" v-if="this.musicName == ''">{{addMusic}}</text>
                        <text class="musicSize"  @click="goMusic()" v-else :style="{fontFamily:'iconfont'}">&#xe65a; {{musicName}}</text>
                    </div>
                    <text class="bottomBtn editCover" @click="goCover()">编辑封面</text>
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
                        <div class="addIconBox ">
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
                    <div  v-for="(item,index) in paraList" :key="item"  class="paraTransitionDiv">
                        <!--<div  v-for="(item,index) in paraList" >-->
                        <!--段落-->
                        <div class="paraBox paraBoxHeight">
                            <!--左上角关闭按钮"x"-->
                            <div class="paraClose" @click="showConfirm(index)">
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
                                <image class="paraImage" @click="editParaImage(item.paraImage,index)" :src="item.thumbnailImage"></image>
                            </div>
                            <!--文章内容-->
                            <div class="paraText">
                                <!--判断是否有文字，没有文字就显示  "点击添加文字"-->
                                <text class="paraTextSize" v-if="item.paraText != ''">{{item.paraText}}</text>
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
                                <div class="addIconBox ">
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
                <!--添加投票-->
                <div class="paraBox flexRow" @click="goVote()" v-if="hadVote">
                    <text class="addVote addVoteIcon " :style="{fontFamily:'iconfont'}">&#xe629;</text>
                    <text class="addVote">添加投票</text>
                </div>
                <div v-else v-for="(item,index) in voteList"  class="paraTransitionDiv">
                    <div class="paraBox paraBoxHeight">
                        <!--左上角关闭按钮"x"-->
                        <div class="paraClose" @click="closeVote(index)">
                            <text class="paraCloseSize" :style="{fontFamily:'iconfont'}" >&#xe60a;</text>
                        </div>
                        <!--图片-->
                        <div>
                            <image class="paraImage" :src="item.paraImage"></image>
                        </div>
                        <!--文章内容-->
                        <div class="paraText">
                            <!--判断是否有文字，没有文字就显示  "点击添加文字"-->
                            <text class="paraTextSize">{{item.paraText}}</text>
                        </div>
                    </div>
                </div>
            </cell>
            <!--用来撑起底部空白区域-->
            <cell><div class="emptyBox"></div></cell>
        </list>
    </div>
</template>
<style scoped>


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
        top:5px;
    }
    .downArrow{
        bottom:5px;
    }
    .rightArrow{
        position: absolute;
        right: 10px;
    }
    .paraClose{
        position: absolute;
        top:5px;
        left:5px;
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
        font-size: 27px;
        padding-bottom: 8px;
        padding-right: 12px;
        padding-left: 12px;
        padding-top: 8px;
        background-color: #fff;
    }
    .addMusic{
        left: 25px;
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
    import navbar from '../../../include/navbar.vue'
    const event = weex.requireModule('event');
    const album = weex.requireModule('album');
    const native = weex.requireModule('app')
    var modal = weex.requireModule('modal');
    var lastIndex = -1;
    var musicId = -1 ;
    var articleId = 1;
    export default {
        data:function(){
            return{
                refreshing: false,
                firstPlusShow:true,
                coverImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                setTitle:'点击设置标题',
                addMusic:'添加音乐',
                musicName:'',
                paraList:[],
                voteList:[{
                    paraImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    thumbnailImage:'',
                    paraText:'',
                }],
                hadVote:true,
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
//                    data.data里存放的是用户选取的图片路径
                            for(let i = 0;i < data.data.length;i++){
                                _this.paraList.push({
                                    //原图
                                    paraImage:'file:/' + data.data[i].originalPath,
                                    //小缩略图
                                    thumbnailImage:'file:/' + data.data[i].thumbnailSmallPath,
                                    paraText:'i:' + i,
                                    show:true
                                }) ;
                            }
                        }else{
                            modal.toast({message:data.content,duration:10});
                        }
                    }
                )
            }else{//再次文章编辑
                var op = getVal.split('=');
                if(op[0] == 'articleId') {
                    native.find(1,op[1],function (data) {
//                         modal.toast({message:data.data})
                        let articleData = JSON.parse(data.data.value);
                        modal.toast({message:articleData[0].templates[0].original,duration:1});
                        _this.setTitle = articleData[0].title;
                        _this.coverImage = articleData[0].thumbnail;
                        _this.musicName = articleData[0].music.name;
                        musicId = articleData[0].music.id;
                        let templatesData = articleData[0].templates;
                        for(let i = 0;i < templatesData.length;i++){
                            _this.paraList.push({
                                //原图
                                paraImage:templatesData[i].original,
                                //小缩略图
                                thumbnailImage:templatesData[i].thumbnail,
                                paraText:templatesData[i].content,
                                show:true
                            })
                        }
                    })
                }
            }

        },
        mounted:function(){
            var domModule = weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
            })
        },
        methods:{
//            返回
            goBack:function () {
                event.closeURL();
            },
//            完成
            goComplete:function () {
                var _this = this;
//            获取当前时间戳 作为唯一标识符key
                var timestamp = Math.round(new Date().getTime()/1000);
                var atticleTemplates = [];
                this.paraList.forEach(function(item){
                    atticleTemplates.push({
                        thumbnail:item.thumbnailImage,
                        original:item.paraImage,
                        mediaType: "image",
                        content:item.paraText
                    })
                })
                let musicData = {
                    name:_this.musicName,
                    id:musicId
                }
                let articleData = [{
                    thumbnail:this.coverImage,
                    music:musicData,
                    templates:atticleTemplates,
                    id:timestamp,
//                  null需要加引号
                    articleTitleModel:{
                        image5: "null",
                        titleType: "null",
                        image6: "null",
                        image3: "null",
                        image4: "null",
                        image1: 'null',
                        image2: "null"
                    },
                    title:this.setTitle,
                }]
//                articleData = JSON.stringify(articleData)
                native.save(1,timestamp,articleData,1,'articleListTest',function (data) {
                    if(data.type == 'success'){
                        event.closeURL();
                    }else{
                        modal.alert({
                            message: '系统繁忙,请稍后重试',
                            duration: 0.3
                        })
                    }
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
                                let a = {
                                    //原图
                                    paraImage:'file:/' + data.data[i].originalPath,
//                                    小缩略图
                                    thumbnailImage:'file:/' + data.data[i].thumbnailSmallPath,
                                    paraText:'i:' + i + '我是后来插入的',
                                    show:true
                                }
                                _this.paraList.splice(index,0,a)
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
                let a = this.paraList[index].paraImage;
                let b = this.paraList[index].paraText;
                this.paraList[index].paraImage = this.paraList[index - 1].paraImage;
                this.paraList[index].paraText = this.paraList[index - 1].paraText;
                this.paraList[index - 1].paraImage = a;
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
                let a = this.paraList[index].paraImage;
                let b = this.paraList[index].paraText;
                this.paraList[index].paraImage = this.paraList[index + 1].paraImage;
                this.paraList[index].paraText = this.paraList[index + 1].paraText;
                this.paraList[index + 1].paraImage = a;
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
                        if(value == '删除'){
                            //                将内容删掉
                            _this.voteList.splice(index,1);
                            _this.hadVote = true;
                        }
                    })
            },
//            编辑段落图片
            editParaImage(imgSrc,index){
                var _this = this;
                album.openCrop(imgSrc,function (data) {
                    if(data.type == 'success'){
                        _this.paraList[index].paraImage ='file:/' + data.data.originalPath;
                        _this.paraList[index].thumbnailImage ='file:/' + data.data.thumbnailSmallPath;
                    }else{
                        modal.toast({message:data.content,duration:10});
                    }
                })
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
                event.openURL('file://assets/member/editor/cover.js');
            },
//            跳转音乐页面
            goMusic:function () {
//                event.openURL('file://assets/member/editor/music.js');
                let _this = this;
                event.openURL('http://192.168.1.110:8081/music.weex.js?musicId=' + musicId,function (data) {
                    modal.toast({message:data,duration:1});
                    let jsonData = JSON.parse(data);
                    _this.musicName = jsonData.chooseMusicName;
                    musicId = jsonData.chooseMusicId;
                });
            },
//            跳转投票页面
            goVote:function () {
                let _this = this;
                event.openURL('http://192.168.1.110:8081/vote.weex.js',function (data) {
                    _this.voteList[0].paraText = data;
                    _this.hadVote = false;
                });
            },
        }
    }
</script>



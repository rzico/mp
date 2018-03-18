<template>
    <div class="wrapper" >
        <navbar :title="title" @goback="goback" > </navbar>
        <list style="background-color: #fff;" :scrollable="canScroll" @loadmore="onloading" loadmoreoffset="50" >
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell>
                <noData :noDataHint="noDataHint" ndBgColor="#fff" v-if="collectList.length == 0"></noData>
            </cell>
            <cell v-for="(item,index) in collectList"  >
                <div class="deleteBox bkg-delete" @click="deleteMessage(item.id,index)" v-if="isSelf" >
                    <text class="deleteText">取</text>
                    <text class="deleteText">消</text>
                    <text class="deleteText">收</text>
                    <text class="deleteText">藏</text>
                </div>
                <div class="collectBox"  @click="goArticle(item.id)"  @swipe="onpanmove($event,index)" @touchstart="ontouchstart($event,index)">
                    <!--名字与日期-->
                    <div class="nameDate">
                        <div class="nameImg" @click="goAuthor(item.authorId)">
                            <image resize="cover" class="authorImg" :src="item.logo | watchLogo"></image>
                            <text class="authorName ml10">{{item.author | watchNickName}}</text>
                        </div>
                        <text class="authorName">{{item.createDate | timeDatefmt}}</text>
                    </div>
                    <div class="flex-row">
                        <!--文章封面-->
                        <image resize="cover" class="articleImg" :src="item.thumbnail  " ></image>
                        <!--文章相关信息。标题点赞...-->
                        <div class="articleInfo">
                            <text class="fz30 articleTitle">{{item.title}}</text>
                            <div class="relevantInfo">
                                <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                                <text class="relevantText">{{item.hits}}</text>
                                <text class="relevantImage ml20" style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                                <text class="relevantText">{{item.laud}}</text>
                                <text class="relevantImage ml20" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                                <text class="relevantText">{{item.review}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .deleteText{
        font-size: 32px;color: #fff;
    }
    .deleteBox{
        position: absolute;right: 0px;top: 0px;height: 270px;align-items: center;width: 130px;justify-content: center;
    }
    .nameImg{
        flex-direction: row;
        align-items: center;
        height: 80px;
        padding-right: 20px;
    }
    .articleTitle{
        color: #444;
        lines:2;
        text-overflow: ellipsis;
    }
    .authorName {
        font-size: 28px;
        color: #888;
    }
    .authorImg{
        width: 40px;height: 40px;
        border-radius: 20px;
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
    .articleInfo{
        padding-top: 5px;
        padding-bottom: 5px;
        height: 150px;
        width: 400px;
        margin-left: 20px;
        margin-right: 20px;
        justify-content: space-between;
    }
    .articleImg{
        width: 250px;
        height: 150px;
        border-radius: 5px;
    }
    .nameDate{
        flex-direction: row;
        justify-content: space-between;
        height: 80px;
        align-items: center;
    }
    .collectBox{
        padding-bottom: 20px;
        padding-top: 20px;
        padding-left: 30px;
        padding-right: 30px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color:#ccc;
        background-color:#fff;
    }

</style>
<script>
    import navbar from '../../include/navbar.vue';
    const modal = weex.requireModule('modal');
    import { POST, GET } from '../../assets/fetch';
    import utils from '../../assets/utils';
    import filters from '../../filters/filters.js';
    import noData from '../../include/noData.vue';
    import {dom,event,animation} from '../../weex.js';
    var animationPara;//执行动画的消息
    export default {
        components: {
            navbar,noData
        },
        data(){
            return{
                collectList:[],
                refreshing:false,
                showLoading:false,
                pageStart:0,
                pageSize:10,
                UId:'',
                canScroll:true,
                isSelf:false,
                userName:'我',
                refreshImg:utils.locate('resources/images/loading.png'),
                clicked:false,
            }
        },
        filters:{
            watchThumbnail:function (value) {
                return utils.thumbnail(value,250,150);
            },
            watchLogo:function (value) {
                return utils.thumbnail(value,40,40);
            },
            watchNickName:function (value) {
                if(utils.isNull(value)){
                    return 'author';
                }else{
                    return utils.changeStrLast(value,8);
                }
            }
        },
        props:{
            noDataHint:{default:'暂无收藏'},
        },
        computed:{
            title:function () {
//              如果用户名称过长，便截取拼成名字
                if((utils.getLength(this.userName) > 20)){
                    this.userName = utils.changeStr(this.userName);
                }
                return this.userName + '的收藏';
            }
        },
        created(){
            let _this = this;
            utils.initIconFont();
            this.UId = utils.getUrlParameter('id');
            let selfId = event.getUId();
            if(this.UId == selfId){
                this.isSelf = true;
            }else{
                let name = decodeURI(utils.getUrlParameter('name'));
                this.userName = utils.isNull(name) ? '我' : name;
            }
            this.getAllCollect();
        },
        methods:{
//            获取收藏列表
            getAllCollect(){
                let _this = this;
                GET('weex/favorite/list.jhtml?id=' + this.UId + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success' && data.data.data != '' ){
                        if (_this.pageStart == 0) {
                            data.data.data.forEach(function (item) {
                                if(!utils.isNull(item.thumbnail)){
                                    item.thumbnail = utils.thumbnail(item.thumbnail,250,150);
                                }
                            })
                            _this.collectList = data.data.data;
                        }else{
                            data.data.data.forEach(function (item) {
                                if(!utils.isNull(item.thumbnail)){
                                    item.thumbnail = utils.thumbnail(item.thumbnail,250,150);
                                }
                                _this.collectList.push(item);
                            })
                        }
                        _this.pageStart = data.data.start + data.data.data.length;
                    }else  if(data.type == 'success' && data.data.data == '' ){
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            onloading:function () {
////            获取收藏列表
                this.getAllCollect();
            },
            onrefresh:function () {
                var _this = this;

                _this.pageStart = 0;
                this.refreshing = true;
                animation.transition(_this.$refs.refreshImg, {
                    styles: {
                        transform: 'rotate(360deg)',
                    },
                    duration: 1000, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout:false,
                    delay: 0 //ms
                })
                setTimeout(() => {
                    animation.transition(_this.$refs.refreshImg, {
                        styles: {
                            transform: 'rotate(0)',
                        },
                        duration: 10, //ms
                        timingFunction: 'linear',//350 duration配合这个效果目前较好
                        needLayout:false,
                        delay: 0 //ms
                    })
                    this.refreshing = false
                    _this.getAllCollect();
                }, 1000)
            },
            goback(){

                event.closeURL();
            },
            goAuthor(id){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                    _this.clicked = false;
                });
            },
            goArticle(id){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/article/preview.js?articleId=' + id  + '&publish=true' ),
                    function () {
                        _this.clicked = false;
                    }
                )
            },
            //            点击屏幕时
            ontouchstart:function (e,index) {
                var _this = this;
                if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                }else{
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    })
                }
//                获取当前点击的元素。
                animationPara =  e.currentTarget;
            },
//            移动时
            onpanmove:function (e,index) {
//                获取当前点击的元素。
                var _this = this;
                if(e.direction == 'right'){
                    _this.canScroll = false;
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {
                        _this.canScroll = true;
                    })
                }else if(e.direction == 'left'){
                    _this.canScroll = false;
//                  modal.toast({message:distance});
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(-130)',
                        },
                        duration:350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {
                        _this.canScroll = true;
                    })
                }
            },
//            取消收藏
            deleteMessage(id,index){
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                POST('weex/member/favorite/delete.jhtml?articleId=' + id).then(
                    function(data){
                        if(data.type == 'success'){
//                            把动画收回来。
                            if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                            }else{
                                animation.transition(animationPara, {
                                    styles: {
                                        transform: 'translateX(0)',
                                    },
                                    duration: 10, //ms
                                    timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                                    needLayout:false,
                                    delay: 0 //ms
                                })
                            }
                            _this.collectList.splice(index,1);
                            event.sendGlobalEvent('onUserInfoChange',data);
                            event.toast('取消收藏成功');
                        }else{
                            event.toast(data.content);
                        }
                        _this.clicked = false;
                    },function (err) {
                        _this.clicked = false;
                        event.toast(err.content);
                    }
                )
            },
        }
    }
</script>
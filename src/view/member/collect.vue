<template>
    <div>
        <navbar :title="title" @goback="goback" > </navbar>
        <scroller style="background-color: #fff" :scrollable="canScroll">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">{{refreshState}}</text>
            </refresh>
            <div :style="{minHeight:screenHeight + 'px'}">
                <noData :noDataHint="noDataHint" ndBgColor="#fff" v-if="collectList.length == 0"></noData>
                <div v-for="(item,index) in collectList" >
                    <div class="deleteBox bkg-delete" @click="deleteMessage(item.id,index)" v-if="isSelf">
                        <text class="deleteText">取</text>
                        <text class="deleteText">消</text>
                        <text class="deleteText">收</text>
                        <text class="deleteText">藏</text>
                    </div>
                    <div class="collectBox"  @click="goArticle(item.id)"  @swipe="onpanmove($event,index)" @touchstart="ontouchstart($event,index)">
                        <!--名字与日期-->
                        <div class="nameDate">
                            <div class="nameImg" @click="goAuthor(item.authorId)">
                                <image resize="cover" class="authorImg" :src="item.logo"></image>
                                <text class="authorName ml10">{{item.author}}</text>
                            </div>
                            <text class="authorName">{{item.createDate | timeDatefmt}}</text>
                        </div>
                        <div class="flex-row">
                            <!--文章封面-->
                            <image resize="cover" class="articleImg" :src="item.thumbnail" ></image>
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
                </div>
                <!--<div class="collectBox">-->
                <!--<div class="nameDate">-->
                <!--<div style="flex-direction: row;align-items: center">-->
                <!--<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510323202682&di=b6fdee68edcf56c0aaab3cba73e441dc&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F3801213fb80e7beca9004ec5252eb9389b506b38.jpg" resize="cover" class="authorImg"></image>-->
                <!--<text class="authorName ml10">大马哥</text>-->
                <!--</div>-->
                <!--<text class="authorName">2017-11-07</text>-->
                <!--</div>-->
                <!--<div class="flex-row">-->
                <!--<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510323330650&di=fccf178eef10385316c8ab3602f76520&imgtype=0&src=http%3A%2F%2Fpic66.nipic.com%2Ffile%2F20150504%2F5624330_144129291000_2.jpg"  resize="cover" class="articleImg"></image>-->
                <!--<div class="articleInfo">-->
                <!--<text class="fz30 articleTitle">立冬(一组几年钱拍的九篇)立冬(一组几年钱拍的九篇)立冬(一组几年钱拍的九篇)</text>-->
                <!--<div class="relevantInfo">-->
                <!--<text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>-->
                <!--<text class="relevantText">121</text>-->
                <!--<text class="relevantImage ml20" style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>-->
                <!--<text class="relevantText">233</text>-->
                <!--<text class="relevantImage ml20" :style="{fontFamily:'iconfont'}">&#xe65c;</text>-->
                <!--<text class="relevantText">3222</text>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
            </div>
            <loading class="loading" @loading="onloading" :display="showLoading ? 'show' : 'hide'">
                <text class="indicator">加载中...</text>
            </loading>
        </scroller>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .deleteText{
        font-size: 32px;color: #fff;
    }
    .deleteBox{
        position: absolute;right: 0px;top: 0px;height: 270px;align-items: center;width: 130px;justify-content: center;;
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
    const event = weex.requireModule('event');
    const modal = weex.requireModule('modal');
    import { POST, GET } from '../../assets/fetch';
    import utils from '../../assets/utils';
    import filters from '../../filters/filters.js';
    import noData from '../../include/noData.vue';
    const animation = weex.requireModule('animation');
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
                listCurrent:0,
                pageSize:15,
                UId:'',
                refreshState:'',
                canScroll:true,
                isSelf:false,
                userName:'我',
                screenHeight:0
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
            this.UId = utils.getUrlParameter('id');
//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(136);
            let selfId = event.getUId();
            if(this.UId == selfId){
                this.isSelf = true;
            }else{
                let name = decodeURI(utils.getUrlParameter('name'));
                this.userName = utils.isNull(name) ? '我' : name;
            }
            let _this = this;
//            获取收藏列表
            GET('weex/favorite/list.jhtml?id=' + this.UId + '&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize,function (data) {
                if(data.type == 'success' && data.data.data != '' ){
                    _this.collectList = data.data.data;
                }else  if(data.type == 'success' && data.data.data == '' ){
                }else{
                    event.toast(data.content);
                }
            },function (err) {
                event.toast(err.content);
            })
        },
        methods:{
            goback(){
                event.closeURL();
            },
            onrefresh:function () {
                var _this = this;
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                }, 50)
            },
            goAuthor(id){
                event.openURL(utils.locate("view/topic/author.js?id=" + id),function (message) {
                });
            },
            goArticle(id){
                event.openURL(utils.locate('view/article/preview.js?articleId=' + id  + '&publish=true' ),
                    function () {}
                )
            },
            onloading:function () {
                var _this = this;
                _this.showLoading = true;
//                _this.loadingState = "正在加载数据";
                setTimeout(() => {
                    this.listCurrent = this.listCurrent + this.pageSize;
                    GET('weex/favorite/list.jhtml?id=' + this.UId +'&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize,function (data) {
                        if(data.type == 'success' && data.data.data != '' ){
                            data.data.data.foreach(function (item) {
                                _this.collectList.push(item);
                            })
                        }else if(data.type == 'success' && data.data.data == '' ){
                        }else{
                            event.toast(data.content);
                        }
                    },function (err) {
                        event.toast(err.content);
                    })
                    _this.showLoading = false;
                }, 1500)

//                GET('weex/member/friends/list.jhtml?pageSize=20&pageStart='+_this.start,
//                    function (data) {
//                        if (data.type == "success") {
//                            let page = data.data;
//                            if (page.data.length>0) {
//                                _this.friendsList.push(page.data);
//                                _this.start = page.start+page.data.length;
//                                _this.loadingState = "加载"+page.data.length+"条数据";
//                            } else {
//                                _this.loadingState = "亲，没有数据了";
//                            }
//                            setTimeout(() => {
//                                _this.showLoading = false;
//                                _this.loadingState = "松开加载更多";
//                            }, 500);
//                        } else {
//                            _this.showLoading = false;
//                            _this.loadingState = "松开加载更多";
//                            event.toast(weex.data.content);
//                        }
//                    },function (err) {
//                        _this.showLoading = false;
//                        _this.loadingState = "松开加载更多";
//                        event.toast("网络不稳定");
//                    }
//                )
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
                            event.toast('取消收藏成功');
                        }else{
                            event.toast(data.content);
                        }
                    },function (err) {
                        event.toast(err.content);
                    }
                )
                event.toast('删除成功');
            },
        }
    }
</script>
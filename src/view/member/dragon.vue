<template>
    <div class="wrapper" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <list  style="background-color: #fff;"  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="reviewList.length == 0">
                <noData :noDataHint="noDataHint" ndBgColor="#fff"></noData>
            </cell>
            <!--导航栏-->
            <cell v-else v-for="(item,index) in reviewList">
                <div class="lineBox">
                    <div class="flexRow"  :style="addBorder(index)" v-if="item.mainId ==''">
                        <image class="headImg" :src="item.logo" ></image>
                        <div class="userInfo">
                            <div style='flex-direction: row;justify-content:space-between;width: 615px;' >
                            <text class="fz32 nameColor" >{{item.nickName }}</text>
                            <text class="infoText" style="margin-top: 5px">（{{item.type | wacthType}}{{item.status | wacthStatus}}）</text>
                            </div>
                            <div style='flex-direction: row;width: 615px;' >
                                <text   style="margin-top: 2px;font-size: 28px" :style="{fontFamily:'iconfont'}">&#xe62e;</text>
                                <text class="fz28 pb15 articleTitle pr30  ml10" style="color: #999">{{item.title}}</text>
                            </div>
                            <div class="delDate" >
                                <text class="sub_date mt20 pb15">{{item.createDate | timeDatefmtMinutes}}</text>
                            </div>
                            <div class="buttonBox">
                                <div class="OnButton"  @click="delReview(item.id,index)"  v-if="item.status == 'closed'"><text class="fz26" style="color: #333" >删除</text></div>
                                <div class="deleteButton" @click="OnDragon(item.id,index)"  v-if="item.status == 'normal'"><text class="fz26" style="color: #333" >关闭</text></div>
                                <div class="shareButton" @click="goShare(item.articleId)"  v-if="item.status == 'normal'"><text class="fz26 primary"  >分享</text></div>
                            </div>
                        </div>
                    </div>
                    <div class="child">
                        <text class="childName">{{item.nickName}}:</text>
                        <text class="childNumber">{{item.orderCount}} 单</text>
                    </div>
                </div>
            </cell>
        </list>
        <div v-if="showShare"  key="share" >
            <div class="maskLayer" @touchstart="maskTouch"></div>
            <share @doShare="doShare"  @doCancel="doCancel"></share>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .deleteButton{
        width: 80px;
        height: 50px;
        border-width: 1px;
        border-color: #444;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        margin-right: 60px;
    }
    .OnButton{
        width: 80px;
        height: 50px;
        border-width: 1px;
        border-color: #444;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
    }
    .shareButton{
        width: 80px;
        height: 50px;
        border-width: 1px;
        border-color: #5eb0fd;
        align-items: center;
        justify-content: center;
        border-radius: 5px;

    }
    .buttonBox{
        flex-direction:row;
        justify-content: flex-end;
        width: 615px;
        padding-right: 20px;
        padding-bottom: 20px;
    }
    .articleTitle{
        flex-direction: row;width: 569px;lines:1;
        text-overflow: ellipsis;
    }
    .delDate{
        flex-direction: row;justify-content: space-between;width: 615px;
    }

    .flexRow{
        flex-direction: row;
        border-color: gainsboro;
        border-top-width:1px;
        padding-top:15px;
        margin-top: 20px;
    }
    .child{
        flex-direction: row;
        align-items: center;
        /*justify-content: space-between;*/
        width: 590px;
        background-color: #eee;
        margin-left: 115px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 10px;
        padding-right: 15px;
    }
    .childName{
        font-size: 28px;
        color: #2C447A;
        max-width: 400px;
        lines:1;
        text-overflow: ellipsis;
    }
    .childNumber{
        font-size: 28px;
        margin-left: 10px;
    }
    .lineBox{
        flex-direction: column;
        padding-right: 20px;
        /*padding-bottom: 15px;*/
        width: 725px;
        margin-left: 25px;
        background-color: #fff;
    }
    .infoText{
        font-size: 26px;
        color: #444;
    }
    .nameColor{
        color: #2C447A;
        margin-bottom: 20px;
    }
    .userInfo{
        margin-left: 20px;
        min-height: 120px;
        justify-content: space-between;
    }
    .headImg{
        height: 90px;
        width: 90px;
        border-radius: 45px;
    }
</style>
<script>
    import share from '../../include/share.vue'
    import navbar from '../../include/navbar.vue';
    import utils from '../../assets/utils';
    import {dom,event,animation} from '../../weex.js';
    const modal = weex.requireModule('modal');
    import { POST, GET } from '../../assets/fetch';
    import filters from '../../filters/filters.js';
    import noData from '../../include/noData.vue';
    export default {
        data:{
            articleId:'',
            reviewList:[],
            refreshing:false,
            pageStart:0,
            pageSize:15,
            reviewNum:0,
            refreshImg:utils.locate('resources/images/loading.png'),
            clicked:false,
            showShare:false,
            loading:false
        },
        props:{
            noDataHint:{default:'暂无接龙'},
            title:{default:'接龙管理'}
        },
        components: {
            navbar,noData,share
        },
        created(){
            utils.initIconFont();
            let _this = this;
//            this.articleId = utils.getUrlParameter('articleId');
            this.getAllReview();

        },
        filters:{
            wacthType:function (val) {
                if(val == 'buying'){
                    return '团购'
                }else{
                    return '报名'
                }
            },
            wacthStatus:function (mes) {
                if(mes == 'normal'){
                    return '进行中'
                }else{
                    return '已结束'
                }
            }
        },
        methods:{
            //            是否添加边框
            addBorder: function (index) {
                if(index != 0 ){
                        return {
                            borderTopWidth:'1px'
                        }

                    }else{
                    return {
                        borderTopWidth:'0px'
                    }
                }
            },
            //            触碰遮罩层
            maskTouch(){
                this.showShare = false;
            },
//            取消分享
            doCancel(){
                this.showShare = false;
            },
            //            打开分享
            goShare(articleId){
                    this.showShare = true;
                    this.articleId = articleId
            },
//            分享
            doShare(id){
                let _this = this;
                var shareType;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                switch(id){
                    case 0 :
                        shareType = 'timeline';
                        break;
                    case 1 :
                        shareType = 'appMessage';
                        break;
                    case 2 :
                        shareType = 'copyHref';
                        break;
                    case 3 :
                        shareType = 'browser';
                        break;
                    default:
                        shareType = '';
                        break;
                }
//                分享到公众号
                if(id == 4){
                    POST('weex/member/share/platform.jhtml?articleId=' + this.articleId).then(
                        function (data) {
                            _this.showShare = false;
                            if(data.type == 'success'){
                                event.toast('已成功分享到公众号');
                            }else{
                                event.toast(data.content);
                            }
                        },
                        function (err) {
                            event.toast(err.content);
                        }
                    )
                    return;
                }
                GET('share/article.jhtml?articleId=' + this.articleId + '&shareType=' +  shareType ,function (data) {

                    if(data.type == 'success' && data.data != ''){
                        var option = {
                            title:data.data.title,
                            text:data.data.descr,
                            imageUrl:data.data.thumbnail,
                            url:data.data.url,
                            type:shareType
                        }
                        _this.showShare = false;
                        event.share(option,function (data) {
                            if(data.type == 'success'){
//                                如果是作者本人就不推送分享。

                                    if(shareType == 'copyHref'){
                                        event.toast('文章链接已复制到剪贴板');
                                    }else if(shareType == 'browser'){
                                    }else{
                                        event.toast('分享成功');
                                    }

                                POST('weex/member/share/add.jhtml?articleId='+ _this.articleId + '&shareType=' + shareType).then(
                                    function (data) {
                                        if(data.type == 'success'){
                                            if(shareType == 'copyHref'){
                                                event.toast('文章链接已复制到剪贴板');
                                            }else if(shareType == 'browser'){
                                            }else{
                                                event.toast('分享成功');
                                            }
                                            _this.shareNum ++ ;
                                        }else{
                                            event.toast(data.content);
                                        }
                                    },
                                    function (err) {
                                        event.toast(err.content);
                                    }
                                )
                            }
                        })
                    }
                },function (err) {
                    event.toast(err.content);
                })

            },
//            获取所有接龙列表
            getAllReview(){
                let _this = this;
                if (this.loading==true) {
                    return
                }
                this.loading = true;
                GET('weex/member/dragon/list.jhtml?pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success'){
                        if (_this.pageStart == 0) {
                            _this.reviewList = data.data.data;
                        }else{
                            data.data.data.forEach(function (item) {
                                _this.reviewList.push(item);
                            })
                        }
                        _this.pageStart = data.data.start + data.data.data.length;
                    }else{
                        event.toast(data.content);
                    }
                    _this.loading = false;

                },function (err) {
                    _this.loading = false;
                    event.toast(err.content);
                })
            },
            onloading:function () {
                this.getAllReview();
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
                    if( _this.pageStart == 0){
                        _this.getAllReview();
                    }
                }, 1000)
            },
            goback(){
                event.closeURL();
            },
//            前往作者专栏
            goAuthor(id){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                    _this.clicked = false;
                });
//                event.openURL(utils.locate('view/member/author.js?id=5'),function () {})
            },
//            删除
            delReview(id,index){
                let _this = this;
                modal.confirm({
                    message: '确定要删除该条接龙记录吗？',
                    duration: 0.3,
                    okTitle:'删除',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '删除'){
                        POST('weex/member/dragon/delete.jhtml?id=' + id).then(
                            function (data) {
                                if(data.type == 'success'){
                                      _this.onrefresh();
//                                    _this.reviewList.splice(index,1);
                                }else{
                                    event.toast(data.content);
                                }
                            },
                            function (err) {
                                event.toast(err.content);
                            }
                        )

                    }
                })
            },
            //            关闭接龙
            OnDragon(id,index){
                let _this = this;
                modal.confirm({
                    message: '确定要关闭该条接龙吗？',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '确定'){
                        POST('weex/member/dragon/ended.jhtml?id=' + id).then(
                            function (data) {
                                if(data.type == 'success'){
                                    event.toast(data.content);
                                    _this.onrefresh();
                                }else{
                                    event.toast(data.content);
                                }
                            },
                            function (err) {
                                event.toast(err.content);
                            }
                        )

                    }
                })
            }
        }
    }
</script>
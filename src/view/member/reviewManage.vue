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
                    <div class="flexRow" >
                        <image class="headImg" :src="item.logo" @click="goAuthor(item.memberId)"></image>
                        <div class="userInfo">
                            <text class="fz32 nameColor" >{{item.nickName}}</text>
                            <text class="infoText">{{item.content}}</text>
                            <div class="delDate" >
                                <text class="sub_date mt20 pb15">{{item.createDate | timefmtOther}}</text>
                                <text class="sub_date pt20 pr30 pl20 pb15" @click="delReview(item.id,index)" >删除</text>
                            </div>
                            <div style='flex-direction: row;width: 615px;' >
                                <text   style="margin-top: 2px;font-size: 26px" :style="{fontFamily:'iconfont'}">&#xe62e;</text>
                                <text class="sub_date pb15 articleTitle pr30  ml10">{{item.title}}</text>
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
    .articleTitle{
        flex-direction: row;width: 569px;lines:1;
        text-overflow: ellipsis;
    }
    .delDate{
        flex-direction: row;justify-content: space-between;width: 615px;
    }

    .flexRow{
        flex-direction: row;
    }
    .lineBox{
        flex-direction: row;
        padding-right: 20px;
        padding-top:15px;
        /*padding-bottom: 15px;*/
        width: 725px;
        margin-left: 25px;
        background-color: #fff;
        border-color: gainsboro;
        border-style: solid;
        border-bottom-width:1px;
    }
    .infoText{
        font-size: 32px;
        color: #444;
        width: 480px;
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
        },
        props:{
            noDataHint:{default:'暂无评论'},
            title:{default:'评论管理'}
        },
        components: {
            navbar,noData
        },
        created(){
            utils.initIconFont();
            let _this = this;
            this.articleId = utils.getUrlParameter('articleId');
            this.getAllReview();

        },
        methods:{
//            获取所以评论列表
            getAllReview(){
                let _this = this;
                GET('weex/member/review/list.jhtml?pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success' && data.data.data != '' ){
                        if (_this.pageStart == 0) {
                            _this.reviewList = data.data.data;
                        }else{
                            data.data.data.forEach(function (item) {
                                _this.reviewList.push(item);
                            })
                        }
                        _this.pageStart = data.data.start + data.data.data.length;
                    }else if(data.type == 'success' && data.data.data == '' ){
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            onloading:function () {
////            获取黑名单列表
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
                    _this.getAllReview();
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
                    message: '确定要删除该条评论吗？',
                    duration: 0.3,
                    okTitle:'删除',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '删除'){
                        POST('weex/member/review/delete.jhtml?id=' + id).then(
                            function (data) {
                                if(data.type == 'success'){
                                    _this.reviewList.splice(index,1);
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
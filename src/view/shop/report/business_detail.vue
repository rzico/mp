<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <div class="goodsTitleBox" v-if="goodsName!=''">
            <text class="goodsTitle">{{goodsName}}</text>
        </div>
        <list >
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-for="item in list">
                <div class="cell"  @click="linkToDetail(item.sn,item.cardId)">
                    <div class="numberBox">
                        <text class="number">{{item.balance}}</text>
                    </div>
                    <div class="content">
                        <text class="fz32">{{item.name}}({{item.mobile}})</text>
                        <text class="address gray">{{item.address}}</text>
                        <text class="descr gray" v-if="item.descr !=null && item.descr!=''">商品描述:{{item.descr}}</text>
                    </div>
                </div>
            </cell>
            <loading @loading="onloading" :display="loadinging ? 'show' : 'hide'"></loading>
            <cell v-if="list.length == 0" >
                <noData > </noData>
            </cell>
        </list>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .goodsTitleBox{
        background-color: #ccc;
        width: 750px;
        height: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .goodsTitle{
        font-size: 32px;
        margin-left: 30px;
    }
    .cell{
        width: 750px;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: #ffffff;
        padding-top:20px;
        padding-bottom: 20px;
        flex-direction: row;
        align-items: center;
    }
    .address{
        font-size:26px;
        max-width: 510px;
        overflow: hidden;
        text-overflow: ellipsis;
        lines:1;
    }
    .numberBox{
        width: 200px;
        align-items: center;
    }
    .number{
        font-size: 36px;
        color: red;
    }
    .descr{
        font-size: 26px;
        max-width: 510px;
        overflow: hidden;
        text-overflow: ellipsis;
        lines:1;
    }
</style>
<script>
    var modal = weex.requireModule('modal')
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import {dom,event,animation} from '../../../weex.js';
    import navbar from '../../../include/navbar.vue'
    import report_header from '../../../widget/report_header.vue';
    import noData from '../../../include/noData.vue'
    import filters from '../../../filters/filters.js'
    var animationPara;//执行动画的消息
    export default {
        data:function(){
            return{
                clicked:false,
                refreshing: false,
                loadinging:false,
                loading: 'hide',
                pageStart:0,
                pageSize:20,
                noLoading:false,
                refreshImg:utils.locate('resources/images/loading.png'),
                hadUpdate:false,
                isIcon:true,
                timeDate:'',
                beginTime:'',
                endTime:'',
                list:[],
                title:'',
                type:'',
                goodsId:'',
                goodsName:''
            }
        },
        components: {
            navbar,noData
        },
        props: {

        },
        created () {
//              页面创建时请求数据
            utils.initIconFont();
            let _this = this;
            this.timeDate = utils.ymdtimefmt(Date.parse(new Date()));
            this.beginTime = this.timeDate+ ' ' +'00:00:00';
            this.endTime = this.timeDate+ ' ' +'23:59:59';
            this.type = utils.getUrlParameter('type');
            var goodsId = utils.getUrlParameter('goodsId')
            if(!utils.isNull(goodsId)){
                this.goodsId = goodsId
            }
            var goodsName = utils.getUrlParameter('goodsName')
            if(!utils.isNull(goodsName)){
                this.goodsName = goodsName
            }
            switch (this.type) {
                case 'point':
                    _this.title = '金币明细';
                    break;
                case 'balance':
                    _this.title = '余额明细';
                    break;
                case 'gift':
                    _this.title = '礼卡明细';
                    break;
                case 'card':
                    _this.title = '套餐明细';
                    break;
                case 'water':
                    _this.title = '水票明细';
                    break;
            }
            this.open();
        },
        methods: {
//            点击减少时间
            deductTime:function (data) {
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;
                this.pageStart = 0 ;
                this.open()
            },
//            点击增加时间
            addTime:function (data) {
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;
                this.pageStart = 0 ;
                this.open()
            },
            iconTime (data) {
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;
                this.pageStart = 0 ;
                this.open()
            },
            //            点击日报
            reportDayClick(data){
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;
                this.pageStart = 0 ;
                this.open()
            },
//            点击月报
            reportMonthClick(data){
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;
                this.pageStart = 0 ;
                this.open()
            },
//            点击年报
            reportYearsClick(data){
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;
                this.pageStart = 0 ;
                this.open()
            },
            goback: function (e) {
                event.closeURL();
            },
            open:function () {
                let _this = this;
                GET('weex/member/report/business_list.jhtml?type='+this.type+'&goodsId='+this.goodsId+'&pageStart='+this.pageStart+'&pageSize='+this.pageSize,function (res) {
                    if (res.type=="success") {
                        if(_this.pageStart == 0){
                            _this.list = res.data.data
                        }else {
                            res.data.data.forEach(function (item) {
                                _this.list.push(item)
                            })
                        }
                        _this.pageStart = _this.list.length
                        setTimeout(() => {
                            _this.loadinging = false;
                        }, 1000)
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                })
            },
            linkToDetail(sn,cardId){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if(utils.isNull(sn)){
                    event.openURL(utils.locate('view/shop/card/view.js?id='+cardId), function (data) {
                        _this.clicked = false;
                    })
                }else {
                    event.openURL(utils.locate('view/shop/order/details.js?sn='+sn), function (data) {
                        _this.clicked = false;
                    })
                }

            },
//            上拉加载
            onloading (event) {
                this.loadinging = true
                this.open();
            },
//            下拉刷新
            onrefresh:function (event) {
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
                    _this.open();
                }, 1000)
            },
        },

    }
</script>
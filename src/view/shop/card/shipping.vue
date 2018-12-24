<template>
    <div class="wrapper">
        <navbar title="送货记录" @goback="goback"> </navbar>
        <div class="classBox">
            <div class="tableOne">
                <text class="tableText">品牌</text>
            </div>
            <div class="tableTwo">
                <text class="tableText">送出</text>
            </div>
            <div class="tableTwo">
                <text class="tableText">回桶</text>
            </div>
            <div class="tableTwo">
                <text class="tableText">押桶</text>
            </div>
            <div class="tableTwo">
                <text class="tableText">退桶</text>
            </div>
            <div class="tableThree">
                <text class="tableText">余桶</text>
            </div>

        </div>
        <list  loadmoreoffset="180">
            <!--<refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">-->
            <!--<image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>-->
            <!--</refresh>-->
            <cell  ref="adoptPull" >
                <div class="contentCell" >
                    <div class="contentSmallCell" v-for="c in list">
                        <text class="number">{{c.name}}</text>
                        <text class="contentCellType">{{c.quantity}}</text>
                        <text class="contentCellType">{{c.returnQuantity}}</text>
                        <text class="contentCellType">{{c.pledgeQuantity}}</text>
                        <text class="contentCellType">{{c.refundsQuantity}}</text>
                        <text class="contentCellType">{{c.stock}}</text>
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
    .list{
        padding-bottom: 140px;
        background-color: white;

    }
    .classBox{
        height: 80px;
        width: 750px;
        flex-direction: row;
        align-items: center;
        background-color: white;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
    }
    .tableOne{
        width:187.5px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-right-width: 1px;
        border-right-color: #777;
    }
    .tableTwo{
        width:112.5px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-right-width: 1px;
        border-right-color: #777;
    }
    .tableThree{
        width:112.5px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .tableText{
        font-size: 28px;
        color: #444;
    }
    .bottomTotal{
        align-items: center;
        width: 750px;
        height: 630px;
        background-color: white;
        position: fixed;
        bottom:-440px;
        left: 0;
        border-top-width: 1px;
        border-color: #ccc;
    }
    .bigIcon{
        font-size: 30px;
        color: #777;
    }
    .iconBox{
        width: 150px;
        align-items: center;
        justify-content: center;
    }
    .bottomCell{
        height: 160px;
        width: 750px;
        background-color: #f5f5f5;
        flex-direction: column;
        border-bottom-width:1px;
        border-color:#cccccc;
    }
    .bottomCellTwo{
        height: 160px;
        width: 750px;
        flex-direction: column;
        border-bottom-width:1px;
        border-color:#cccccc;
    }
    .totalIcon{
        font-size: 80px;
    }
    .titleCell{
        height: 80px;
        width: 750px;
        background-color: #ccc;
        flex-direction: row;
        align-items: center;
    }
    .contentCell{
        width: 750px;
        background-color: white;
        flex-direction: column;
        align-items: center;
    }
    .contentSmallCell{
        height: 80px;
        width: 750px;
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-color: #cccccc;
    }
    .shopName{
        font-size: 32px;
        margin-left: 30px;
        lines:1;
        text-overflow: ellipsis;
    }
    .number{
        font-size: 30px;
        width: 187.5px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .money{
        font-size: 30px;
        width: 112.5px;
        padding-right: 30px;
        text-align: right;
        lines:1;
        text-overflow: ellipsis;
    }
    .returnMoney{
        font-size: 30px;
        width: 112.5px;
        text-align: right;
        lines:1;
        text-overflow: ellipsis;
    }
    .contentCellType{
        font-size: 30px;
        width: 112.5px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .typeName{
        font-size: 28px;
        padding-left: 30px;
        text-align: left;
        lines:1;
        text-overflow: ellipsis;
    }
    .refund{
        font-size: 28px;
        width: 200px;
        text-align: right;
        lines:1;
        text-overflow: ellipsis;
    }
    .amount{
        font-size: 28px;
        width: 200px;
        padding-right: 30px;
        text-align: right;
        lines:1;
        text-overflow: ellipsis;
    }
</style>
<script>
    var modal = weex.requireModule('modal')
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import {dom,event,animation} from '../../../weex.js';
    const picker = weex.requireModule('picker')
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
                noLoading:false,
                loading: 'hide',
                pageStart:0,
                pageSize:20,
                refreshImg:utils.locate('resources/images/loading.png'),
                list:[],
                id:0
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
            this.id = utils.getUrlParameter('id');
            this.open()
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            open:function () {
                var _this = this;
                if (this.noLoading) {
                    return;
                }
                this.noLoading = true;
                GET('weex/member/shippingBarrel/list.jhtml?pageStart=' + _this.pageStart +'&pageSize='+_this.pageSize + '&id=' + this.id,function (res) {
                    if (res.type=="success") {
                        if (_this.pageStart==0) {
                            _this.list = res.data.data
                        } else {
                            res.data.data.forEach(function (item) {
                                _this.list.push(item);
                            })
                        }
                        _this.pageStart = _this.pageStart+res.data.data.length;
                        _this.noLoading = false;
                    } else {
                        _this.noLoading = false;
                        event.toast(res.content);
                    }
                }, function (err) {
                    _this.noLoading = false;
                    event.toast(err.content);
                })
            },
//            上拉加载
            onloading () {
                this.loadinging = true
                this.open()
            },
//            下拉刷新
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
                    this.open()
                    this.refreshing = false
                }, 1000)
            },
        },

    }
</script>
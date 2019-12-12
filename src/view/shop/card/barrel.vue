<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" @goComplete="setting" > </navbar>
        <div class="totalBox">
            <div class="totalBoxLeft">
                <text class="totalNumber">总计:{{total}}（个）</text>
            </div>
            <div class="totalBoxRight" >
                <text class="totalNumber">押金:{{money}}（元）</text>
                <!--<text class="editor" :style="{fontFamily:'iconfont'}">&#xe61d;</text>-->
            </div>
        </div>
        <!--<noData :noDataHint="noDataHint" v-if="lists.length == 0"></noData>-->
        <list  class="list"  loadmoreoffset="50">
            <!--<refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">-->
                <!--<image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>-->
            <!--</refresh>-->
            <cell >
                <div class="" v-for="c in lists">
                    <div class="contentBox" @click="linkToShipping(c.barrelId)">
                        <div class="infoBox">
                            <text class="couponTitle">{{c.name}}</text>
                            <!--<text class="money">押金:{{c.pledge}}</text>-->
                            <text class="stock">余桶:{{c.stock}}   押桶:{{c.mortgage}}  借桶:{{c.borrow}}</text>
                        </div>
                        <text class="fz32 gray" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </cell>
        </list>
        <div class="mask" v-if="isMask" >
            <div class="editorBox">
                <text class="fz40 mt30">期初设置</text>
                <!--<div class="editorCell">-->
                    <!--<text class="fz32">期初押金:</text>-->
                    <!--<input class="editorInput pl20" type="number" placeholder="请输入押金" autofocus="true" v-model="pledge"/>-->
                <!--</div>-->
                <div class="editorCell">
                    <text class="fz32">期初押桶:</text>
                    <input class="editorInput pl20" type="number" placeholder="请输入押桶数量" v-model="mortgage"/>
                </div>
                <div class="editorCellTwo">
                    <text class="fz32">期初借桶:</text>
                    <input class="editorInput pl20" type="number" placeholder="请输入借桶数量" v-model="borrow"/>
                </div>
                <div class="bottomBox">
                    <div class="leftBox" @click="downMask()"><text class="bottomBoxText">取消</text></div>
                    <div class="rightBox" @click="confirm()"><text class="bottomBoxText">确认</text></div>
                </div>
            </div>
        </div>

        <div class="newBottomBox" v-if="!lock">
            <div class="smallBox" @click="showMask(1)">
                <text class="smallText">押桶</text>
            </div>
            <div class="smallBox" @click="showMask(3)">
                <text class="smallText">借桶</text>
            </div>
            <div class="smallBoxTwo" @click="showMask(2)">
                <text class="smallTextTwo">退桶</text>
            </div>
        </div>

        <div class="mask" v-if="hasMask" >
            <div class="editorBox">
                <text class="fz40 mt30">{{type ==1 ?'押桶':type ==2 ?'退桶':'借桶'}}</text>
                <div class="editorCell">
                    <text class="fz32">品牌:</text>
                    <div class="flex-row" style="width: 500px" @click="openPick">
                        <text class="maskCellVal pl20" >{{nowVal}}</text>
                        <text class="maskCellIcon ml20" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="editorCell">
                    <text class="fz32">数量:</text>
                    <input class="editorInput pl20" type="number" :placeholder="placeholder" v-model="quantity"/>
                </div>
                <div class="editorCellTwo" v-if="type < 3">
                    <text class="fz32">押金:</text>
                    <input class="editorInput pl20" type="number" placeholder="请输入押金" v-model="amount"/>
                </div>
                <div class="bottomBox">
                    <div class="leftBox" @click="downBMask()"><text class="bottomBoxText">取消</text></div>
                    <div class="rightBox" @click="confrimMask()"><text class="bottomBoxText">确认</text></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" src="../../../style/wx.less"/>
<style>
    .mask{
        position: fixed;top: 0px;left: 0px;right: 0px;bottom: 0px;background-color:rgba(000,000,000,0.4);
    }
    .editorBox{
        width: 650px;
        align-items: center;
        background-color: white;
        border-radius: 15px;
        position: absolute;
        left:50px;
        top: 200px;
    }
    .editorCell{
        margin-left: 20px;
        margin-right: 20px;
        width: 610px;
        height: 100px;
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-color: #cccccc;
    }
    .editorCellTwo{
        margin-left: 20px;
        margin-right: 20px;
        width: 610px;
        height: 100px;
        flex-direction: row;
        align-items: center;
    }
    .editorInput{
        width: 500px;
        height: 98px;
        line-height: 90px;
        font-size: 32px;
    }
    .bottomBox{
        flex-direction: row;
        align-items: center;
        width: 650px;
        height: 100px;
        border-top-width: 2px;
        border-color: #0088fb;
    }
    .leftBox{
        height: 100px;
        width: 325px;
        border-right-width: 2px;
        border-color: #0088fb;
        align-items: center;
        justify-content: center;
    }
    .leftBox:active{
        background-color: #cccccc;
    }
    .rightBox{
        height: 100px;
        width: 325px;
        align-items: center;
        justify-content: center;
    }
    .rightBox:active{
        background-color: #cccccc;
    }
    .bottomBoxText{
        font-size: 40px;
        color: #0088fb;
    }
    .totalBox{
        height: 150px;
        background-color: white;
        border-radius: 15px;
        margin: 20px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .editor{

        font-size: 40px;
        color: #888888;
    }
    .totalBoxLeft{
        width:355px;
        height:110px;
        align-items: center;
        justify-content: center;
        border-color:#ccc;
        border-style: dashed;
        border-right-width:1px;
    }
    .totalBoxRight{
        width:354px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .totalNumber{
        font-size: 32px;
        margin-left: 20px;
    }
    .contentBox{
        height: 160px;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: white;
        padding-left: 20px;
        padding-right: 20px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-radius: 15px;
    }
    .couponDiv{
        padding-left:20px;
        padding-right:20px;
        border-right-width: 1px;
        border-right-color: #cccccc;
        border-right-style: dashed;
    }
    .couponImg{
        height:120px;
        width: 120px;
    }
    .infoBox{
        flex-direction: column;
        justify-content: space-between;
        height: 120px;
    }
    .couponTitle{
        font-size: 32px;
        width: 400px;
        lines:2;
        text-overflow: ellipsis;
    }
    .money{
        font-size: 28px;
        color: #888888;
    }
    .stock{
        font-size: 28px;
        color: #888888;
    }
    .iconBox{
        width: 100px;
        height: 120px;
        align-items: center;
        justify-content: center;
    }
    .editorIcon{
        font-size: 60px;
        color: #999;
    }
    .newBottomBox{
        width: 750px;
        height: 110px;
        background-color: #ffffff;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-left: 20px;
        padding-right: 20px;
    }
    .smallBox{
        width: 220px;
        height: 70px;
        border-radius: 35px;
        align-items: center;
        justify-content: center;
        border-width: 1px;
        border-color: #888888;
    }
    .smallBoxTwo{
        width: 220px;
        height: 70px;
        border-radius: 35px;
        align-items: center;
        justify-content: center;
        background-color: #EB4E40;
    }
    .smallText{
        font-size: 32px;
    }
    .smallTextTwo{
        font-size: 32px;
        color: #ffffff;
    }
    .maskCellVal{
        font-size: 32px;
        width: 470px;
        overflow: hidden;
        lines:1;
        text-overflow: ellipsis;
    }
    .maskCellIcon{
        font-size: 32px;
        color: #999;
    }
</style>

<script>
    const picker = weex.requireModule('picker')
    var modal = weex.requireModule('modal')
    import { POST, GET ,SCAN} from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import filters from '../../../filters/filters'
    import {dom,event,animation} from '../../../weex.js';
    import navbar from '../../../include/navbar.vue';
    import search from '../../../include/search.vue';
    import noData from '../../../include/noData.vue';
    export default {
        components: {
            navbar,search,noData
        },
        data() {
            return   {
                clicked:false,
                refreshing:false,
                lists:[],
                pageSize:15,
                pageStart:0,
                canScroll:true,
                refreshImg:utils.locate('resources/images/loading.png'),
                cardId:'',
                total:0,
                money:0,
                isMask:false,
                barrelId:'',
                pledge:0,
                mortgage:0,
                borrow:0,
                type:1,
                nowVal:'',
                quantity:'',
                amount:'',
                pickData:[],
                pickIndex:0,
                barrelList:[],
                memberId:'',
                hasMask:false,
                placeholder:'',
                lock:false
            }
        },
        props: {
            title: { default: "空桶押金"},
            noDataHint: { default: "尚未拥有记录"},
        },
        created() {
            utils.initIconFont();
            this.cardId = utils.getUrlParameter('cardId');
            this.memberId = utils.getUrlParameter('memberId');
            if(!utils.isNull(utils.getUrlParameter("lock"))){
                this.lock = true;
            }
            this.open();
            this.openBarrel()
        },
        filters:{

        },
        methods: {
            showMask(type){
                if(type==1){
                    this.type=1;
                    this.placeholder='请输入押桶数量'
                }else if(type==2){
                    this.type = 2;
                    this.placeholder='请输入退桶数量'
                }else if(type==3){
                    this.type = 3;
                    this.placeholder='请输入借桶数量'
                }
                this.pickData = [];
                this.nowVal = '';
                this.quantity = '';
                this.amount = '';
                this.pickIndex = 0;
                this.hasMask = true
            },
            downBMask(){
                this.hasMask = false
            },
            openPick:function () {
                let _this = this;
                _this.pickData = [];
                if(utils.isNull(this.barrelList)){
                    event.toast('暂无品牌');
                    return
                }
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                _this.barrelList.forEach(function (item) {
                    _this.pickData.push(item.name)
                })
                picker.pick({
                    items:_this.pickData
                }, e => {
                    if (e.result == 'success') {
                        _this.pickIndex = e.data;
                        _this.nowVal = _this.barrelList[_this.pickIndex].name;
                    }
                })
                _this.clicked = false;

            },
            confrimMask(){
                let _this = this
                if(utils.isNull(this.nowVal)){
                    event.toast('请选择品牌')
                    return
                }else  if(utils.isNull(this.quantity) || this.quantity<1){
                    event.toast('请输入数量')
                    return
                }else  if(this.type < 3 && utils.isNull(this.amount)){
                    event.toast('请输入押金')
                    return
                }
                if(this.type==1){
                    // 押桶
                    POST('weex/member/shippingBarrel/addB.jhtml?barrelId='+_this.barrelList[_this.pickIndex].id+'&memberId='+this.memberId+'&pledge='+this.amount+'&quantity='+this.quantity).then(
                        function (mes) {
                            if (mes.type == "success") {
                                _this.open();
                                event.toast('押桶成功');
                                _this.hasMask = false
                            } else {
                                event.toast(mes.content);
                                _this.hasMask = false
                            }
                        }, function (err) {
                            event.toast(err.content);
                            _this.hasMask = false
                        }
                    )
                }else  if(this.type==2){
                    // 退桶
                    POST('weex/member/shippingBarrel/useB.jhtml?barrelId='+_this.barrelList[_this.pickIndex].id+'&memberId='+this.memberId+'&pledge='+this.amount+'&quantity='+this.quantity).then(
                        function (mes) {
                            if (mes.type == "success") {
                                _this.open();
                                event.toast('退桶成功');
                                _this.hasMask = false
                            } else {
                                event.toast(mes.content);
                                _this.hasMask = false
                            }
                        }, function (err) {
                            event.toast(err.content);
                            _this.hasMask = false
                        }
                    )
                }else  if(this.type==3){
                    // 借桶
                    POST('weex/member/shippingBarrel/addBorrow.jhtml?barrelId='+_this.barrelList[_this.pickIndex].id+'&memberId='+this.memberId+'&quantity='+this.quantity).then(
                        function (mes) {
                            if (mes.type == "success") {
                                _this.open();
                                event.toast('借桶成功');
                                _this.hasMask = false
                            } else {
                                event.toast(mes.content);
                                _this.hasMask = false
                            }
                        }, function (err) {
                            event.toast(err.content);
                            _this.hasMask = false
                        }
                    )
                }
            },
            downMask(){
              this.isMask = false
            },
            openMask(c){
                this.isMask = true;
                this.barrelId = c.id;
                this.pledge = c.beginningPledge;
                this.borrow = c.beginningBorrow;
                this.mortgage = c.beginning;
            },
            confirm(){
                var _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                if(utils.isNull(this.pledge)){
                    this.pledge = 0
                }if(utils.isNull(this.borrow)){
                    this.borrow = 0
                }if(utils.isNull(this.mortgage)){
                    this.mortgage = 0
                }
                POST('weex/member/barrel_stock/update.jhtml?id='+ this.barrelId+'&pledge='+this.pledge+'&borrow='+this.borrow +'&mortgage='+this.mortgage).then(
                    function (data) {
                        _this.clicked = false;
                        if(data.type == 'success'){
                            _this.isMask = false;
                            event.toast('修改成功');
                            _this.open()
                        }else{
                            event.toast(data.content);
                        }
                    },
                    function (err) {
                        _this.clicked = false;
                        event.toast(err.content);
                    })
            },
            open:function () {
                var _this = this;
                GET('weex/member/barrel_stock/list.jhtml?cardId='+ this.cardId,function (mes) {
                    if (mes.type == 'success') {
                        _this.total = mes.data.stock;
                        _this.money = mes.data.pledge;
                        _this.lists = mes.data.data;
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            openBarrel(){
                var _this = this;
                GET('weex/member/barrel/aList.jhtml',function (mes) {
                    if (mes.type == 'success') {
                        _this.barrelList = mes.data;
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            linkToShipping:function (barrelId) {
                if (this.clicked==true || this.hasMask) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate("view/shop/card/shipping.js?id="+this.cardId+"&barrelId="+barrelId),function (data) {
                    _this.clicked =false
                })
            },
            onloading (event) {
                this.open();
            },
//            下拉刷新
            onrefresh (event) {
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
            goback:function () {
                event.closeURL();
            },

        }
    }
</script>

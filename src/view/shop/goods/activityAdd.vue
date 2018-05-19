<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback"  > </navbar>
        <scroller>
            <div style="background-color: #eee">
                <div class="titleOne">
                    <text class="titleText" style="font-size: 32px;color: #888">填写优惠信息:</text>
                </div>
                <div class="name" @click="typesetting">
                    <text class="nameText" style="font-size: 32px">优惠类型</text>
                    <text class="nameText" style="font-size: 32px;color: #999999;margin-left: 30px" >{{codeName | strainer}}</text>
                </div>
                <div class="scope" @click="scopesetting">
                    <text class="scopeText" style="font-size: 32px">购满数量</text>
                    <input type="number" placeholder="请输入购买数量" class="inputMoneyTwo" v-model="buyNumber" />
                </div>
                <div class="scope">
                    <text class="scopeText" style="font-size: 32px">赠送数量</text>
                    <input type="number" placeholder="请输入赠送数量" class="inputMoneyTwo" v-model="giveNumber"/>
                    <!--<text class="conditionsText" style="font-size: 32px">张</text>-->
                </div>
                <div class="goods"  @click="goGoods()">
                    <div style="flex-direction: row;align-items: center">
                        <text class="moneyText" style="font-size: 32px">赠送商品</text>
                        <text class="goodsName">{{giveGoodsName}}</text>
                    </div>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
            <div style="min-height: 900px"></div>
        </scroller>
        <div class="button bw bottom" @click="complete">
            <text class="bottonText">完成</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .goods{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
        padding-right: 20px;
        margin-bottom: 10px;
    }
    .goodsName{
        font-size: 32px;
        color: #888;
        width: 400px;
        lines:1;
        text-overflow: ellipsis;
        margin-left: 30px;
    }
    .bottom{
        position: absolute;
        bottom: 40px;
    }
    .titleOne{
        background-color: #ddd;
        height: 80px;
        flex-direction: row;
        align-items: center;
        padding-left: 20px;
    }
    .name{
        flex-direction: row;
        align-items: center;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
    }
    .inputMoneyTwo{
        font-size: 32px;
        color: red;
        height: 50px;
        margin-top: 5px;
        margin-left: 30px;
        margin-right: 20px;
        width: 500px;
        text-align: left;
    }
    .scope{
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
    }
    .bw {
        width:650px;
        margin-left:50px;
        margin-top: 30px;
    }
    .bottonText{
        font-size: 40px;
        color:white;
    }
</style>
<script>
    const picker = weex.requireModule('picker');
    const storage = weex.requireModule('storage');
    var event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import filters from '../../../filters/filters'
    import { POST, GET } from '../../../assets/fetch'
    export default {
        data:function () {
            return{
                codeName:'give',
                id:'',
                begin:0,
                goodsId:'',
                giveGoodsId:'',
                giveGoodsName:'',
                buyNumber:'',
                giveNumber:'',
                clicked:false
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "新增优惠"},

        },
        created() {
            utils.initIconFont();
            this.id = utils.getUrlParameter('id');
            this.goodsId = utils.getUrlParameter('goodsId');
            this.giveGoodsName = utils.getUrlParameter('goodsName');
            if(utils.isNull(this.id)){
                this.id = ''
            }else{
                this.title = '修改优惠';
                this.modification()
            }
        },
        filters:{
            strainer:function (data) {
                if(data == 'give'){
                    return '买N赠N'
                }else if(data == 'gift'){
                    return '满A赠B'
                }
            },
        },
        methods: {
            modification:function () {
                var _this = this;
                GET('weex/member/promotion/view.jhtml?id='+_this.id,function (mes) {
                    utils.debug(mes)
                    if (mes.type == 'success') {
                        if(mes.data.type =='give'){
                            _this.begin =0
                        }else if(mes.data.type =='gift'){
                            _this.begin =1
                        }
                        _this.goodsId = mes.data.goodsId;
                        _this.codeName = mes.data.type;
                        _this.buyNumber = mes.data.quantity;
                        _this.giveNumber = mes.data.giftQuantity;
                        _this.giveGoodsName = mes.data.giftName;
                        if(utils.isNull(mes.data.giftId)){
                            _this.giveGoodsId = _this.goodsId
                        }else{
                            _this.giveGoodsId = mes.data.giftId
                        }
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            goback:function () {
                event.closeURL();
            },
//            活动类型选择
            typesetting:function () {
                var _this = this;
                picker.pick({
                    index:_this.begin,
                    items:['买N赠N','满A赠B']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.codeName = 'give';
                            _this.begin =e.data
                        }else if(e.data == 1){
                            _this.codeName = 'gift';
                            _this.begin =e.data
                        }
                    }
                })
            },
            goGoods:function () {
                if(this.codeName =='give'){
                    event.toast('买N赠N不能更改商品')
                    return
                }
                //防止重复点击按钮
                if(this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                event.openURL(utils.locate('view/shop/goods/manage.js?from=active'),function (data) {
                    if(!utils.isNull(data.data)&& data.type == 'success') {
                        _this.giveGoodsId = data.data.id;
                        _this.giveGoodsName = data.data.name;
                        event.toast('选择成功')
                    }
                })
            },
            complete:function () {
                let _this = this;
                if(this.codeName =='give'){
                    _this.giveGoodsId = _this.goodsId
                }
                if(utils.isNull(_this.buyNumber)){
                    event.toast('购买数量未设置')
                    return
                }
                if(utils.isNull(_this.giveNumber)){
                    event.toast('赠送数量未设置')
                    return
                }
                if(utils.isNull(this.id)){
                POST('weex/member/promotion/add.jhtml?type='+_this.codeName+'&quantity='+_this.buyNumber+'&giftQuantity='+_this.giveNumber +'&giftId='+_this.giveGoodsId +'&goodsId='+_this.goodsId).then(
                    function (mes) {
                        utils.debug(mes)
                        if (mes.type == "success") {
                            event.closeURL(mes)
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast(err.content);
                    }
                )}else{
                    utils.debug('weex/member/promotion/update.jhtml?id='+this.id+'&type='+_this.codeName+'&quantity='+_this.buyNumber+'&giftQuantity='+_this.giveNumber +'&giftId='+_this.giveGoodsId +'&goodsId='+_this.goodsId)
                    POST('weex/member/promotion/update.jhtml?id='+this.id+'&type='+_this.codeName+'&quantity='+_this.buyNumber+'&giftQuantity='+_this.giveNumber +'&giftId='+_this.giveGoodsId +'&goodsId='+_this.goodsId).then(
                        function (mes) {
                            utils.debug(mes)
                            if (mes.type == "success") {
                                event.closeURL(mes)
                            } else {
                                event.toast(mes.content);
                            }
                        }, function (err) {
                            event.toast(err.content);
                        }
                    )
                }
            }
        }
    }
</script>
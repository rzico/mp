<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback"  > </navbar>
        <scroller>
        <div style="background-color: #eee">
            <div class="titleOne">
                <text class="titleText" style="font-size: 32px;color: #888">填写优惠券信息:</text>
            </div>
            <div class="name" @click="typesetting">
                <text class="nameText" style="font-size: 32px">优惠类型</text>
                <text class="nameText" style="font-size: 32px;color: #999999;margin-left: 30px" >{{codeName | strainer}}</text>
            </div>
            <div class="scope" @click="scopesetting">
                <text class="scopeText" style="font-size: 32px">适用范围</text>
                <text class="scopeText" style="font-size: 32px;color: #999999;margin-left: 30px" >{{scene | judgment}}</text>
            </div>
            <div class="scope">
                <text class="scopeText" style="font-size: 32px">剩余张数</text>
                <input type="number" placeholder="请输入剩余张数" class="inputMoneyTwo" v-model="number" @change="" @input=""/>
                <text class="conditionsText" style="font-size: 32px">张</text>
            </div>
            <div class="money" v-if="codeName =='fullcut' || codeName =='discount'">
                <div style="flex-direction: row;align-items: center;">
                <text class="moneyText" style="font-size: 32px">{{frontTransfrom}}</text>
                <input type="number" :placeholder="bottomTransform" class="inputMoneyTwo" v-model="money" @change="" @input=""/>
                <text class="conditionsText" style="font-size: 32px">{{transform}}</text>
                </div>
                <!--<text class="inputPromptText">{{}}</text>-->
            </div>
            <div class="goods" v-if="codeName == 'exchange'" @click="goGoods()">
                <div style="flex-direction: row;align-items: center">
                <text class="moneyText" style="font-size: 32px">兑换商品</text>
                <text class="goodsName">{{goodsName}}</text>
                </div>
                <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
            <div class="conditions">
                <text class="conditionsText" style="font-size: 32px">使用条件</text>
                <text class="man" style="padding-left: 30px;font-size: 32px">满</text>
                <input type="number" placeholder="0为无门槛" class="inputconditions" v-model="condition"/>
                <text class="conditionsText" style="font-size: 32px">元使用</text>
            </div>
            <div class="time" >
                <text class="textTime" style="font-size: 32px">使用时间</text>
                <div  style="padding-left: 30px"@click="date" >
                    <text class="begindate" >{{beginDate}}</text>
                </div>
                <text class="textTime" style="font-size: 32px">一</text>
                <div  style="padding-left: 10px"@click="dateTwo" >
                    <text class="enddate" >{{endDate}}</text>
                </div>
            </div>
            <div class="introduced">
                <text class="introducedText" style="font-size: 32px">规则介绍</text>
                <input type="text" placeholder="请输入使用规则(不超过80个汉字)" class="input" v-model="rule" />
            </div>
            <div class="name" @click="activitysetting()">
                <text class="nameText" style="font-size: 32px">活动类型</text>
                <text class="nameText" style="font-size: 32px;color: #999999;margin-left: 30px" >{{activityName | activityWatch}}</text>
            </div>
            <div class="conditions" v-if="activityName == 1">
                <text class="conditionsText" style="font-size: 32px">使用条件</text>
                <text class="man" style="padding-left: 30px;font-size: 32px">满</text>
                <input type="number" placeholder="" class="inputMoney" v-model="activitConditions" />
                <text class="conditionsText" style="font-size: 32px">元,送</text>
                <input type="number" placeholder="" class="inputMoney" v-model="activitynum" />
                <text class="conditionsText" style="font-size: 32px">张</text>
            </div>
            <div class="conditions"  v-if="activityName == 2">
                <text class="conditionsText" style="font-size: 32px">使用条件</text>
                <text class="man" style="padding-left: 30px;font-size: 32px">领卡送</text>
                <input type="number" placeholder="" class="inputMoney" v-model="activitynum"/>
                <text class="conditionsText" style="font-size: 32px">张</text>
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
    .inputPromptText{
        font-size: 25px;
        color: #888;

    }
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
        font-size: 28px;
        color: #888;
        width: 300px;
        lines:1;
        text-overflow: ellipsis;
        margin-left: 30px;
    }
    .bottom{
        position: absolute;
        bottom: 40px;
    }
    .inputPrompt{
        height: 50px;
        background-color:#eeeeee;
        flex-direction: row;
        align-items: center;
        padding-left: 20px;
    }
    .titleOne{
        background-color: #ddd;
        height: 80px;
        flex-direction: row;
        align-items: center;
        padding-left: 20px;
    }
    .begindate{
        font-size: 28px;
        color: #888;
        width:190px;
    }
    .enddate{
        font-size: 28px;
        color: #888;
        width:190px;
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
    .input{
        padding-left: 30px;
        font-size: 32px;
        height: 60px;
        width: 550px;
    }
    .inputconditions{
        font-size: 32px;
        color: red;
        height: 50px;
        margin-left: 20px;
        margin-right: 20px;
        width: 180px;
        margin-top: 5px;
    }
    .inputMoney{
        font-size: 28px;
        color: red;
        height: 50px;
        margin-left: 30px;
        width: 100px;
    }
    .inputMoneyTwo{
        font-size: 32px;
        color: red;
        height: 50px;
        margin-top: 5px;
        margin-left: 10px;
        margin-right: 20px;
        width: 250px;
        text-align: right;
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
    .money{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
        padding-right:20px ;
        margin-bottom: 10px;
    }
    .conditions{
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;

    }
    .time{
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
    }
    .introduced{
        flex-direction: row;
        align-items: center;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-color: #cccccc;
        background-color: white;
        height: 120px;
        padding-left: 20px;
        margin-bottom: 10px;
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
                beginDate:'点击设置',
                endDate:'点击设置',
                scope:'',
                money:'',
                number:'',
                condition:'',
                rule:'',
                type:'满减',
                codeName:'fullcut',
                address:'全场',
                scene:'all',
                id:'',
                transform:'元',
                frontTransfrom:'优惠面额',
                bottomTransform:'请输入优惠金额',
                begin:0,
                beginTwo:0,
                beginThree:0,
                goodsId:'',
                goodsName:'',
                activitConditions:0,
                activitynum:0,
                activityName:0
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "新增优惠券"},

        },
        created() {
            utils.initIconFont();
            this.id = utils.getUrlParameter('id');
            if(utils.isNull(this.id)) {
                this.id = ''
            }else {
                this.modification();
            }
        },
        filters:{

            strainer:function (data) {
                if(data == 'fullcut'){
                    return '满减'
                }if(data == 'discount'){
                    return '满折'
                } else {
                    return '兑换'
                }
            },
            judgment:function (data) {
                if(data == 'all'){
                    return '全场'
                }if(data == 'shop'){
                    return '店内'
                } else {
                    return '商城'
                }
            },
            activityWatch:function (data) {
                if(data == 0){
                    return '无门槛'
                }if(data == 1){
                    return '消费送'
                } else {
                    return '领卡送'
                }
            }
        },
        methods: {
            modification:function () {
                var _this = this;
                GET('weex/member/coupon/view.jhtml?id='+_this.id,function (mes) {
                    if (mes.type == 'success') {
                        if(mes.data.scope =='all'){
                            _this.begin =0
                        }else if(mes.data.scope =='shop'){
                            _this.begin =1
                        }else {
                            _this.begin =2
                        };
                        if(mes.data.type =='fullcut'){
                            _this.beginTwo =0;
                        }else if(mes.data.type =='discount'){
                            _this.beginTwo =1;
                            _this.bottomTransform = '请输入优惠折扣(输入0-10之间自然数)'
                        }else{
                            _this.beginTwo =2;
                            _this.bottomTransform = '请选择兑换商品';
                        };
                        _this.number = mes.data.stock;
                        _this.money = mes.data.amount;
                        _this.rule = mes.data.introduction;
                        _this.endDate = utils.ymdtimefmt(mes.data.endDate);
                        _this.beginDate = utils.ymdtimefmt(mes.data.beginDate);
                        _this.codeName = mes.data.type;
                        _this.scene = mes.data.scope;
                        _this.condition =mes.data.minimumPrice;

                            _this.goodsId = mes.data.goodsId;
                            _this.goodsName = mes.data.name;
                            _this.beginThree = mes.data.activity.atveType;
                        _this.activityName = mes.data.activity.atveType;
                        _this.activitConditions = mes.data.activity.atveMinPrice;
                        _this.activitynum = mes.data.activity.atveAmount;
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
//            适用范围选择
            scopesetting:function () {
                var _this = this;
                picker.pick({
                    index:_this.begin,
                    items:['全场','店内','商城']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.address = '全场';
                            _this.scene = 'all';
                            _this.begin = e.data
                        }else if(e.data == 1){
                            _this.address = '店内';
                            _this.scene = 'shop';
                            _this.begin = e.data
                        }
                        else{
                            _this.address = '商城';
                            _this.scene = 'mall';
                            _this.begin = e.data
                        }
                    }
                })
            },
//            优惠券类型选择
            typesetting:function () {
                var _this = this;
                picker.pick({
                    index:_this.beginTwo,
                    items:['满减','满折','兑换']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.codeName = 'fullcut';
                            _this.transform ='元';
                            _this.frontTransfrom = '优惠面额';
                            _this.bottomTransform = '请输入优惠金额'
                            _this.beginTwo =e.data
                        }else if(e.data == 1){
                            _this.codeName = 'discount';
                            _this.transform = '折';
                            _this.frontTransfrom = '优惠折扣';
                            _this.bottomTransform = '请输入优惠折扣(输入0-10之间自然数)'
                            _this.beginTwo =e.data
                        }else if(e.data == 2){
                            _this.codeName = 'exchange';
                            _this.bottomTransform = '请选择兑换商品';
                            _this.beginTwo =e.data

                        }
                    }
                })
            },
            //            活动类型选择
            activitysetting:function () {
                var _this = this;
                picker.pick({
                    index:_this.beginThree,
                    items:['无门槛','消费送','领卡送','需购买']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.activityName = 0;
                            _this.beginThree =e.data
                        }else if(e.data == 1){
                            _this.activityName = 1;
                            _this.beginThree =e.data
                        }else if(e.data == 2){
                            _this.activityName = 2;
                            _this.beginThree =e.data

                        }else if(e.data == 3){
                            _this.activityName = 3;
                            _this.beginThree =e.data

                        }
                    }
                })
            },
            date:function () {
                var _this = this;
                picker.pickDate({
                    value: _this.beginDate
                }, e => {
                    if (e.result === 'success') {
                        _this.beginDate = e.data
                    }
                })
            },
            dateTwo:function () {
                var _this = this;
                picker.pickDate({
                    value: _this.endDate
                }, e => {
                    if (e.result === 'success') {
                        _this.endDate = e.data

                    }
                })
            },
            goGoods:function () {
                let _this = this
                event.openURL(utils.locate("view/shop/coupon/goodsList.js"),function (data) {
                    if(!utils.isNull(data.data)&& data.type == 'success') {
                        _this.goodsId = data.data;
                        event.toast('选择成功')
                        GET('weex/member/product/view.jhtml?id=' + _this.goodsId, function (mes) {
                            if (mes.type == 'success') {
                                _this.goodsName = mes.data.name
                            } else {
                                event.toast(res.content);
                            }
                        }, function (err) {
                            event.toast(err.content)
                        })
                    }
                })
            },
            complete:function () {
                let _this = this;
                if(utils.isNull(_this.condition)){
                   _this.condition = 0
//                    event.toast('使用条件未设置')
                }
                if(_this.beginDate=='点击设置'){
                    event.toast("开始时间未设置")
                    return
                }
                if(_this.endDate=='点击设置'){
                    event.toast('结束时间未设置')
                    return
                }
                if( _this.codeName =='fullcut' || _this.codeName =='discount'){
                if(_this.money==''){
                    event.toast('优惠面额未设置')
                    return
                }}
                if(_this.codeName =='exchange'){
                    _this.money=0;
                    if(_this.goodsName==''){
                        event.toast('兑换商品未设置')
                        return
                    }
                }
                if(_this.rule==''){
                    event.toast('规则介绍未设置')
                    return
                }
                if(utils.isNull(_this.number)){
                    event.toast('新增数量未设置')
                    return
                }
//                if(_this.activityName == 1){
//                    if(_this.activitConditions == '' || _this.activitynum =='') {
//                        event.toast('活动未设置')
//                        return
//                    }
//                }
//                if(_this.activityName == 2){
//                    if(_this.activitynum =='') {
//                        event.toast('活动未设置')
//                        return
//                    }
//                }
                POST('weex/member/coupon/submit.jhtml?type='+_this.codeName+'&scope='+_this.scene+'&beginDate='+_this.beginDate
                    +'&endDate='+_this.endDate +'&amount='+_this.money+'&minimumPrice='+_this.condition+'&introduction='+encodeURI(_this.rule)+'&id='+_this.id+'&stock='+_this.number +'&goodsId='
                +_this.goodsId+'&atveType='+_this.activityName+'&atveMinPrice='+_this.activitConditions +'&atveAmount='+_this.activitynum).then(
                    function (mes) {
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
</script>
<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback"  > </navbar>
        <div style="background-color: white">
            <div class="titleOne">
                <text class="titleText" style="font-size: 32px">填写优惠券信息:</text>
            </div>
            <div class="name">
                <text class="nameText flex1" style="font-size: 32px">优惠券类型</text>
                <text class="nameText flex3" style="font-size: 32px;padding-left: 60px;color: #999999" @click="typesetting">{{codeName | strainer}}</text>
            </div>
            <div class="scope">
                <text class="scopeText flex1" style="font-size: 32px">适用范围</text>
                <text class="scopeText flex3" style="font-size: 32px;padding-left: 60px;color: #999999" @click="scopesetting">{{scene | judgment}}</text>
            </div>
            <div class="money">
                <text class="moneyText" style="font-size: 32px">满减面额</text>
                <input type="number" placeholder="请输入0-10之间数字" class="inputMoney" v-model="money" @change="" @input=""/>
                <text class="conditionsText" style="font-size: 32px">元/折</text>
            </div>
            <div class="conditions">
                <text class="conditionsText" style="font-size: 32px">使用条件</text>
                <text class="man" style="padding-left: 100px;font-size: 32px">满</text>
                <input type="number" placeholder="0为无门槛" class="inputconditions" v-model="conditions" @change="" @input=""/>
                <text class="conditionsText" style="font-size: 32px">元使用</text>
            </div>
            <div class="time" >
                <text class="textTime" style="font-size: 32px">使用时间</text>
                <div  style="padding-left: 100px"@click="date" >
                    <text class="begindate" >{{beginDate}}</text>
                </div>
                <text class="textTime" style="font-size: 32px">一</text>
                <div  style="padding-left: 10px"@click="dateTwo" >
                    <text class="enddate" >{{endDate}}</text>
                </div>
            </div>
            <div class="introduced">
                <text class="introducedText" style="font-size: 32px">规则介绍</text>
                <input type="text" placeholder="使用规则介绍" class="input" v-model="rule" @change="" @input=""/>
            </div>
        </div>
        <div class="button bw" @click="complete">
            <text class="bottonText">完成</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .titleOne{
        height: 50px;
        border-left-width: 5px;
        flex-direction: row;
        align-items: center;
        background-color: white;
        padding-left: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .begindate{
        color: #888;
        width:190px;
    }
    .enddate{
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
        padding-left: 100px;
        font-size: 28px;
        height: 60px;
        width: 500px;
    }
    .inputconditions{
        font-size: 28px;
        color: red;
        height: 60px;
        margin-left: 20px;
        width: 150px;
    }
    .inputMoney{
        font-size: 28px;
        color: red;
        height: 50px;
        margin-left: 100px;
        width: 200px;
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
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
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
                beginDate:'点击设置',
                endDate:'点击设置',
                scope:'',
                money:'',
                conditions:'',
                rule:'',
                type:'满减',
                codeName:'fullcut',
                address:'全场',
                scene:'all',
                id:''
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
                    return '满减'
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
            }
        },
        methods: {
            // 时间格式化  2017-09-01
            timeDatefmt:function (value) {
            if(value == '' || value == null || value == undefined){
                return value;
            }
            //value 传进来是个整数型，要判断是10位还是13位需要转成字符串。这边的方法是检测13位的时间戳 所以要*1000；并且转回整型。安卓下，时间早了8个小时
            value = value + '';
            if(value.length == 10){
                value = parseInt(value) * 1000;
            }else{
                value = parseInt(value);
            }
            let    date = new Date(value);
            let    tody = new Date();
            let    y = date.getFullYear();
            let    m = date.getMonth() + 1;
            let    d = date.getDate();
            if (m < 10) {
                m = '0' + m;
            }
            if (d < 10) {
                d = '0' + d;
            }
            return y + '-' + m + '-' + d;
        },
            modification:function () {
                var _this = this;
                GET('weex/member/coupon/view.jhtml?id='+_this.id,function (mes) {
                    if (mes.type == 'success') {
                        utils.debug(mes)
                        _this.money = mes.data.amount;
                        _this.rule = mes.data.introduction;
                        _this.endDate = _this.timeDatefmt(mes.data.endDate);
                        _this.beginDate = _this.timeDatefmt(mes.data.beginDate);
                        _this.codeName = mes.data.type;
                        _this.scene = mes.data.scope;
                        _this.conditions =mes.data.minimumPrice

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
                    index:0,
                    items:['全场','店内','商城']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.address = '全场'
                            _this.scene = 'all'

                        }else if(e.data == 1){
                            _this.address = '店内'
                            _this.scene = 'shop'
                        }
                        else{
                            _this.address = '商城'
                            _this.scene = 'mall'
                        }
                    }
                })
            },
//            优惠券类型选择
            typesetting:function () {
                var _this = this;
                picker.pick({
                    index:0,
                    items:['满减','满折']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.type = '满减'
                            _this.codeName = 'fullcut'

                        }else if(e.data == 1){
                            _this.type = '满折'
                            _this.codeName = 'discount'
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
            complete:function () {
                let _this = this;
                POST('weex/member/coupon/submit.jhtml?type='+_this.codeName+'&scope='+_this.scene+'&beginDate='+_this.beginDate
                    +'&endDate='+_this.endDate +'&amount='+_this.money+'&minimumPrice='+_this.conditions+'&introduction='+encodeURI(_this.rule)+'&id='+_this.id).then(
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
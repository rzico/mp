<template>
    <div class="wrapper">
        <navbar :title="title" :complete="complete" @goback="goback"  @goComplete="goComplete"> </navbar>
        <scroller>
            <div class="cell-row cell-line">
            <div class="cell-panel cell-clear ">
                <text class="title">策略名称:</text>
                <input type="text" autofocus="true" v-model="item.name" return-key-type="next" class="lineContent pr20"  placeholder="请输入策略名称" />
            </div>
            </div>
            <div class="cell-row cell-line"  @click="changeType()">
                <div class="cell-panel cell-clear ">
                    <text class="title">策略类型:</text>
                    <text class="title" style="margin-left: 20px">{{typeName}}</text>
                </div>
            </div>
            <!--类型为股东分红时渲染-->
            <div class="cell-row cell-line" v-if="item.type == 'dividend'">
                <div class="cell-panel cell-clear ">
                    <text class="title">利润分红:</text>
                    <input type="number" v-model="item.tota" return-key-type="next" class="lineContent pr20"  placeholder="利润分红比例"/>
                    <text class="title">%</text>
                </div>
            </div>
            <!--类型为股东分红时渲染-->
            <div class="cell-row cell-line" v-if="item.type == 'dividend'">
                <div class="cell-panel ">
                    <text class="title">直接佣金:</text>
                    <input type="number" v-model="item.percent1" return-key-type="next" class="lineContent pr20"  placeholder="直接佣金比例" />
                    <text class="title">%</text>
                </div>
                <div class="cell-panel ">
                    <text class="title">间接佣金:</text>
                    <input type="number" v-model="item.percent2" return-key-type="next" class="lineContent pr20"  placeholder="间接佣金比例" />
                    <text class="title">%</text>
                </div>
                <div class="cell-panel cell-clear ">
                    <text class="title">三级佣金:</text>
                    <input type="number" v-model="item.percent3" return-key-type="next" class="lineContent pr20"  placeholder="三级佣金比例" />
                    <text class="title">%</text>
                </div>
            </div>
            <!--类型为消费返现时渲染-->
            <div class="cell-row cell-line" v-if="item.type == 'global'">
            <div class="cell-panel ">
                <text class="title">返现基数:</text>
                <input type="number" v-model="item.dividend" return-key-type="next" class="lineContent pr20"  placeholder="返现基数比例" />
                <text class="title">%</text>
            </div>
            <div class="cell-panel cell-clear">
                <text class="title">返现比例:</text>
                <input type="number" v-model="item.percent1" return-key-type="next" class="lineContent pr20"  placeholder="返现比例" />
                <text class="title">%</text>
            </div>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel cell-clear " @click="withdrawalsetup()">
                    <text class="title">可提现比例:</text>
                    <text class="title ml20">{{item.percent4}}</text>
                </div>
            </div>
                <div class="info" >
                    <text class="infoText">可提现比例为:{{item.percent4}},转换积分比例为{{pointProp}}%</text>
                </div>
        </scroller>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .cell-rowTwo {
        min-height: 100px;
        flex-direction: column;
        background-color: #ffffff;
        padding-left: 20px;
        margin-bottom: 20px;
    }
    .lineContent{
        height: 80px;
        font-size: 32px;
        width: 250px;
        margin-left: 20px;
        margin-top:5px
    }
    .info{
        height: 80px;
        min-height: 80px;
        padding-left: 20px;
        flex-direction: row;
        align-items: center;
        background-color: #eeeeee;
    }
    .infoText{
        font-size: 28px;
        color: #999999;
    }
</style>
<script>
    import {dom,event,stream,storage} from '../../../weex.js'
    import utils from '../../../assets/utils.js'
    import { POST, GET } from '../../../assets/fetch'
    import navbar from '../../../include/navbar.vue'
    const picker = weex.requireModule('picker');
    const animation = weex.requireModule('animation')
    const modal = weex.requireModule('modal');

    export default {
        data: function () {
            return {
                item: {id: "", name: "",tota:'', percent1: "", percent2: "", percent3: "",percent4: "点击设置",type:'dividend',dividend:'', bgChange: false},
                begin:'',
                typeBegin:'',
                typeName:'股东分红',
                initial:100,
                pointProp:0,
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "添加策略"},
            complete: {default: "完成"},
        },
        created() {
            var _this = this;
            utils.initIconFont();
            this.item.id = utils.getUrlParameter('id');
            this.item.name = utils.getUrlParameter('name');
            if(utils.isNull(this.item.name)){
                _this.item.name = ''
            }
            this.item.percent1 = utils.getUrlParameter('percent1');
            if(utils.isNull(this.item.percent1)){
                _this.item.percent1 = ''
            }
            this.item.percent2 = utils.getUrlParameter('percent2');
            if(utils.isNull(this.item.percent2)){
                _this.item.percent2 = ''
            }
            this.item.percent3 = utils.getUrlParameter('percent3');
            if(utils.isNull(this.item.percent3)){
                _this.item.percent3 = ''
            }
            this.begin = utils.getUrlParameter('point');
            this.item.tota = utils.getUrlParameter('tota');
            if(utils.isNull(this.item.tota)){
                _this.item.tota = ''
            }
            this.item.type = utils.getUrlParameter('type');
            if(utils.isNull(this.item.type)){
                _this.item.type = 'dividend';
                _this.typeName = '股东分红';
                _this.typeBegin =0
            }
            if(this.item.type == 'dividend'){
                _this.typeName = '股东分红';
                _this.typeBegin =0
            }else{
                _this.typeName = '消费返现';
                _this.typeBegin =1;
                _this.item.dividend = _this.item.tota
            }
            if(!utils.isNull(this.begin)) {
                if (_this.begin == 0) {
                    _this.item.percent4 = '0%'
                    _this.pointProp = 100
                } else if (_this.begin == 1) {
                    _this.item.percent4 = '10%'
                    _this.pointProp = 90
                } else if (_this.begin == 2) {
                    _this.item.percent4 = '20%'
                    _this.pointProp = 80
                } else if (_this.begin == 3) {
                    _this.item.percent4 = '30%'
                    _this.pointProp = 70
                } else if (_this.begin == 4) {
                    _this.item.percent4 = '40%'
                    _this.pointProp = 60
                } else if (_this.begin == 5) {
                    _this.item.percent4 = '50%'
                    _this.pointProp = 50
                } else if (_this.begin == 6) {
                    _this.item.percent4 = '60%'
                    _this.pointProp = 40
                } else if (_this.begin == 7) {
                    _this.item.percent4 = '70%'
                    _this.pointProp = 30
                } else if (_this.begin == 8) {
                    _this.item.percent4 = '80%'
                    _this.pointProp = 20
                } else if (_this.begin == 9) {
                    _this.item.percent4 = '90%'
                    _this.pointProp = 10
                }else if (_this.begin == 10) {
                    _this.item.percent4 = '100%'
                    _this.pointProp = 0
                }
            }
        },
        methods: {
//            设置策略类型
            changeType:function () {
                var _this = this;
                picker.pick({
                    index:_this.typeBegin,
                    items:['股东分红','消费返现']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.item.type = 'dividend';
                            _this.typeName = '股东分红';
                            _this.typeBegin = e.data
                        }else if(e.data == 1){
                            _this.item.type = 'global';
                            _this.typeName = '消费返现';
                            _this.typeBegin = e.data
                        }
                    }
                })
            },
            //            设置提现比例
            withdrawalsetup:function () {
                var _this = this;
                picker.pick({
                    index:_this.begin,
                    items:['0','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.item.percent4 = '0%';
                            _this.begin = e.data
                        }else if(e.data == 1){
                            _this.item.percent4 = '10%';
                            _this.begin = e.data
                        }else if(e.data == 2){
                            _this.item.percent4 = '20%';
                            _this.begin = e.data
                        }else if(e.data == 3){
                            _this.item.percent4 = '30%';
                            _this.begin = e.data
                        }else if(e.data == 4){
                            _this.item.percent4 = '40%';
                            _this.begin = e.data
                        }else if(e.data == 5){
                            _this.item.percent4 = '50%';
                            _this.begin = e.data
                        }else if(e.data == 6){
                            _this.item.percent4 = '60%';
                            _this.begin = e.data
                        }else if(e.data == 7){
                            _this.item.percent4 = '70%';
                            _this.begin = e.data
                        }else if(e.data == 8){
                            _this.item.percent4 = '80%';
                            _this.begin = e.data
                        }else if(e.data == 9){
                            _this.item.percent4 = '90%';
                            _this.begin = e.data
                        }else if(e.data == 10){
                            _this.item.percent4 = '100%';
                            _this.begin = e.data
                        }
                        _this.pointProp = _this.initial - _this.begin * 10

                    }
                })
            },
            goComplete:function () {
                var _this = this;
                if (this.item.type == 'dividend') {
                    if (utils.isNull(this.item.name)) {
                        event.toast('请输入名称');
                        return;
                    }
                    if (utils.isNull(this.item.tota)) {
                        event.toast('请输入利润分红比例');
                        return;
                    }
                    if (this.item.percent4 == '点击设置') {
                        event.toast('请设置提现比例');
                        return;
                    }
                    if (utils.isNull(this.item.percent1)) {
                        event.toast('请输入佣金比例');
                        return;
                    }
                    if (utils.isNull(this.item.percent2)) {
                        event.toast('请输入佣金比例');
                        return;
                    }
                    if (utils.isNull(this.item.percent3)) {
                        event.toast('请输入佣金比例');
                        return;
                    }
                    this.item.tota =str.replace("%","");
//                把字符串转换成整型
                    this.item.percent1 = parseInt(this.item.percent1)
                    this.item.percent2 = parseInt(this.item.percent2)
                    this.item.percent3 = parseInt(this.item.percent3)
                    if (this.item.percent1 + this.item.percent2 + this.item.percent3 > this.item.tota) {
                        modal.alert({
                            message: '佣金比例总和不能大于利润分红比例',
                            okTitle: '知道了'
                        })
                        return;
                    }
                    if (utils.isNull(_this.item.id)) {
                        POST('weex/member/distribution/add.jhtml?name=' + encodeURI(_this.item.name) + '&percent1=' + _this.item.percent1 + '&percent2=' + _this.item.percent2 + '&percent3=' + _this.item.percent3 + '&point=' + _this.begin + '&dividend=' + _this.item.tota).then(
                            function (res) {
                                if (res.type == 'success') {
                                    event.toast('添加成功');
                                    event.closeURL();
                                } else {
                                    event.toast(res.content);
                                }
                            }, function (err) {
                                event.toast(err);
                            }
                        )
                    } else {
                        let name = encodeURI(_this.item.name);
                        POST('weex/member/distribution/update.jhtml?id=' + _this.item.id + '&name=' + name + '&percent1=' + _this.item.percent1 + '&percent2=' + _this.item.percent2 + '&percent3=' + _this.item.percent3 + '&point=' + _this.begin + '&dividend=' + _this.item.tota).then(
                            function (data) {
                                if (data.type == 'success') {
                                    event.toast('修改成功');
                                    event.closeURL();

                                } else {
                                    event.toast(data.content);
                                }
                            },
                            function (err) {
                                event.toast(err.content);
                            }
                        )
                    }
                } else {
//                    类型为消费返现时走这接口
                    _this.item.percent2 = 0;
                    _this.item.percent3 = 0;
                    _this.begin = 0;
                    _this.item.tota = 0;
                    if (utils.isNull(_this.item.dividend)) {
                        event.toast('请输入返现基数比例');
                        return;
                    }
                    if (utils.isNull(_this.item.percent1)) {
                        event.toast('请输入返现比例');
                        return;
                    }
                    if (_this.item.percent4 == '点击设置') {
                        event.toast('请设置提现比例');
                        return;
                    }
                    if (utils.isNull(_this.item.id)) {
                        POST('weex/member/distribution/add.jhtml?name=' + encodeURI(_this.item.name) + '&percent1=' + _this.item.percent1 + '&type=' + _this.item.type+ '&percent2=' + _this.item.percent2 + '&percent3=' + _this.item.percent3 + '&point=' + _this.begin + '&dividend=' + _this.item.dividend).then(
                            function (res) {
                                if (res.type == 'success') {
                                    event.toast('添加成功');
                                    event.closeURL();
                                } else {
                                    event.toast(res.content);
                                }
                            }, function (err) {
                                event.toast(err);
                            }
                        )
                    } else {
                        let name = encodeURI(_this.item.name);
                        POST('weex/member/distribution/update.jhtml?id=' + _this.item.id + '&name=' + name + '&percent1=' + _this.item.percent1 + '&type=' + _this.item.type+ '&percent2=' + _this.item.percent2 + '&percent3=' + _this.item.percent3 + '&point=' + _this.begin + '&dividend=' + _this.item.dividend).then(
                            function (data) {
                                if (data.type == 'success') {
                                    event.toast('修改成功');
                                    event.closeURL();
                                } else {
                                    event.toast(data.content);
                                }
                            },
                            function (err) {
                                event.toast(err.content);
                            }
                        )
                    }
                }
            },
            goback(){
                event.closeURL();
            },
        }
    }
</script>
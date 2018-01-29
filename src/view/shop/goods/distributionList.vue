<template>
    <div class="wrapper">
        <navbar :title="title" :complete="complete" @goback="goback"  @goComplete="goComplete"> </navbar>
        <scroller>
            <div class="cell-panel ml30">
                <text class="title">策略名称:</text>
                <input type="text" autofocus="true" v-model="item.name" return-key-type="next" class="lineContent pr20"  placeholder="请输入策略名称" />
            </div>
            <div class="cell-panel ml30" @click="withdrawalsetup()">
                <text class="title">可提现比例:</text>
                <text class="title ml20">{{item.percent4}}</text>
            </div>
            <div class="info ml30" >
                <text class="">可提现比例为:{{item.percent4}},转换积分比例为{{pointProp}}%</text>
            </div>
            <div class="cell-panel ml30">
                <text class="title">直接佣金:</text>
                <input type="number" v-model="item.percent1" return-key-type="next" class="lineContent pr20"  placeholder="直接佣金比例（%）" />
            </div>
            <div class="cell-panel ml30">
                <text class="title">间接佣金:</text>
                <input type="number" v-model="item.percent2" return-key-type="next" class="lineContent pr20"  placeholder="间接佣金比例（%）" />
            </div>
            <div class="cell-panel ml30">
                <text class="title">三级佣金:</text>
                <input type="number" v-model="item.percent3" return-key-type="next" class="lineContent pr20"  placeholder="三级佣金比例（%）" />
            </div>
        </scroller>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .lineContent{
        height: 80px;
        font-size: 32px;
        width: 346px;
        margin-left: 20px;
    }
    .info{
        height: 80px;
        min-height: 80px;
        flex-direction: row;
        align-items: center;
        background-color: #cccccc;
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
                item: {id: "", name: "", percent1: "", percent2: "", percent3: "",percent4: "100%", bgChange: false},
                begin:10,
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
            this.item.percent1 = utils.getUrlParameter('percent1');
            this.item.percent2 = utils.getUrlParameter('percent2');
            this.item.percent3 = utils.getUrlParameter('percent3');
        },
        methods: {
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
                if (utils.isNull(this.item.name)) {
                    event.toast('请输入名称');
                    return;
                }
                if (utils.isNull(this.item.percent4)) {
                    event.toast('请输入提现比例');
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
                if (utils.isNull(this.item.id)) {
                    POST('weex/member/distribution/add.jhtml?name=' +encodeURI(_this.item.name) +'&percent1=' + this.item.percent1+'&percent2=' + this.item.percent2+'&percent3=' + this.item.percent3).then(
                        function (res) {
                            if(res.type == 'success'){
                                event.toast('添加成功');
                                event.closeURL();
                            }else{
                                event.toast(res.content);
                            }
                        },function (err) {
                            event.toast(err);
                        }
                    )
                } else {
                    let name = encodeURI(_this.item.name);
                    POST('weex/member/distribution/update.jhtml?id=' + _this.item.id + '&name=' + name+'&percent1=' + this.item.percent1+'&percent2=' + this.item.percent2+'&percent3=' + this.item.percent3+'&point='+this.begin).then(
                        function (data) {
                            if(data.type == 'success'){
                                event.toast('修改成功');
                                event.closeURL();

                            }else{
                                event.toast(data.content);
                            }
                        },
                        function (err) {
                            event.toast(err.content);
                        }
                    )
                }
            },
            goback(){
                event.closeURL();
            },
        }
    }
</script>
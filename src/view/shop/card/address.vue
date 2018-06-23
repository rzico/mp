<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback"  > </navbar>
        <div class="cell-row cell-line">
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">用户姓名:</text>
                    </div>
                    <div class="flex-row flex-end" >
                        <input class="input" autofocus="true" v-model="name"/>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">联系电话:</text>
                    </div>
                    <div class="flex-row flex-end" >
                        <input class="input" type="tel" v-model="phone"/>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            <div class="cell-panel space-between" @click="chooseFloor()">
                <div class="flex-row">
                    <text class="title ml10">楼层高度:</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title">{{floor | wacthFloor}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
            <!--必须用一个div把区域跟详细地址包住，不能注释，否者渲染时会出现位置错乱-->
            <div class="" v-if="hasAddress">
                <div class="location" @click="location()" >
                    <div class="flex-row">
                        <text class="title ml10">区域地址:</text>
                    </div>
                    <div class="flex-row flex-end" >
                        <text class="sub_title">{{addressName}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">详细地址:</text>
                    </div>
                    <div class="flex-row flex-end" >
                        <input class="input" v-model="detailed"/>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="gpsBox" @click="getGps()" v-if="!hasChange && !hasAddress">
                <text class="gpsIcon" :style="{fontFamily:'iconfont'}">&#xe792;</text>
                <text class="fz28" style="color:#999">点击定位</text>
            </div>
            <div class="changeGpsBox"  v-if="hasChange">
                <text class="gpsIcon" :style="{fontFamily:'iconfont'}">&#xe792;</text>
                <text class="changeAddress">{{detailed}}</text>
                <div class="changeBox" @click="getGps()">
                    <text class="changeIcon" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                    <text class="changeText">修改</text>
                </div>
            </div>
            </div>
        <div class="button mt30 ml30 mr30" @click="complete()">
            <text class="fz40" style="color: white">确认</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .location{
        height: 98px;
        min-height: 98px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
        border-bottom-style: solid;
    }
    .input{
        margin-top: 2px;
        height: 80px;
        line-height: 70px;
        font-size: 32px;
        width: 530px;
    }
    .sub_title{
        font-size: 32px;
        width: 530px;
    }
    .gpsBox{
        align-items: center;
        justify-content:center;
        background-color: white;
        height: 196px;
    }
    .gpsIcon{
        font-size: 80px;
        color: #999;
    }
    .changeGpsBox{
        flex-direction: row;
        align-items: center;
        justify-content:space-between;
        background-color: white;
        height: 196px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .changeAddress{
        width: 500px;
        font-size: 30px;
        color: #999;
    }
    .changeBox{
        flex-direction: column;
        align-items: center;
    }
    .changeIcon{
        font-size: 60px;
        color: #999;
    }
    .changeText{
        font-size: 28px;
        color: #999;
    }
</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    const event = weex.requireModule('event');
    import filters from '../../../filters/filters.js';
    import navbar from '../../../include/navbar.vue'
    const picker = weex.requireModule('picker');
    const modal = weex.requireModule('modal');
    export default {
        components: {
            navbar
        },
        props: {
            title: {default: "我的地址"}
        },
        filters: {

        },
        data() {
            return {
                name:'',
                phone:'',
                addressName:'',
                areaId:'',
                detailed:'',
                lng:0,
                lat:0,
                hasAddress:false,
                hasChange:false,
                cardId:'',
                id:'',
                begin:0,
                floor:0
            }
        },
        created() {
            utils.initIconFont();
            this.cardId = utils.getUrlParameter('cardId');
            this.memberId = utils.getUrlParameter('memberId');
            if(utils.isNull(this.cardId)){
                this.cardId = '';
                this.title = '新增会员'
            }else{
                this.openView()
            }
            if(utils.isNull(this.memberId)){
                this.memberId = '';
            }
        },
        filters: {
            wacthFloor(e){
                if(e == 0){
                    return '有电梯'
                }else{
                    return e
                }
            }
        },
        methods: {
            //            楼层选择
            chooseFloor:function () {
                let _this = this
                picker.pick({
                    index:_this.begin,
                    items:[0,1,2,3,4,5,6,7,8,9]
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.floor = 0 ;
                            _this.begin = e.data;
                        }else if(e.data == 1){
                            _this.floor = 1 ;
                            _this.begin = e.data;
                        }else if(e.data == 2){
                            _this.floor = 2 ;
                            _this.begin = e.data;
                        }else if(e.data == 3){
                            _this.floor = 3 ;
                            _this.begin = e.data;
                        }else if(e.data == 4){
                            _this.floor = 4 ;
                            _this.begin = e.data;
                        }else if(e.data == 5){
                            _this.floor = 5 ;
                            _this.begin = e.data;
                        }else if(e.data == 6){
                            _this.floor = 6 ;
                            _this.begin = e.data;
                        }else if(e.data == 7){
                            _this.floor = 7;
                            _this.begin = e.data;
                        }else if(e.data == 8){
                            _this.floor = 8 ;
                            _this.begin = e.data;
                        }else if(e.data == 9){
                            _this.floor = 9 ;
                            _this.begin = e.data;
                        }
                    }
                })
            },
            goback: function (e) {
                event.closeURL();
            },
            openView(){
                let _this = this;
                GET("weex/member/receiver/view.jhtml?cardId="+this.cardId,function (mes) {
                    if (mes.type == 'success') {
                        if(!utils.isNull(mes.data.id)){
                            _this.id = mes.data.id
                        }
                        if(!utils.isNull(mes.data.consignee)){
                            _this.name = mes.data.consignee
                        }
                        if(!utils.isNull(mes.data.phone)){
                            _this.phone = mes.data.phone
                        }
                        if(!utils.isNull(mes.data.areaName)){
                            _this.addressName = mes.data.areaName
                        }
                        if(!utils.isNull(mes.data.areaId)){
                            _this.areaId = mes.data.areaId
                        }
                        if(!utils.isNull(mes.data.address)){
                            _this.hasChange =true;
                            _this.detailed =  mes.data.address
                        }
                        if(!utils.isNull(mes.data.lng)){
                            _this.lng =  mes.data.lng
                        }
                        if(!utils.isNull(mes.data.lat)){
                            _this.lat =  mes.data.lat
                        }
                        if(!utils.isNull(mes.data.level)){
                            _this.floor = mes.data.level
                        }
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            //            获取经纬度
            getGps:function(){
                let _this = this
                event.getLocation(function (data) {
                    if(data.type == 'success'){
                        _this.lng = data.data.lng;
                        _this.lat = data.data.lat;
                        _this.addressName = data.data.province + data.data.city +data.data.district;
                        _this.detailed = data.data.address;
                        GET("/lbs/get.jhtml?lng=" + data.data.lng + "&lat=" +data.data.lat,function (mes) {
                            if (mes.type == 'success') {
                                _this.areaId = mes.data.areaId;
                            } else {
                                event.toast(mes.content);
                            }
                        }, function (err) {
                            event.toast(err.content)
                        })
                        _this.hasChange = false;
                        _this.hasAddress = true

                    }else {
                        event.toast('定位失败，请开启GPS');
                        _this.hasAddress = false
                    }
                })
            },
//            选择区位
            location:function () {
                var _this = this;
                event.openURL(utils.locate('widget/city.js'), function (data) {
                    if(data.type == 'success' && data.data !='' ) {
                        _this.addressName = data.data.name;
                        _this.areaId = data.data.chooseId
                    }
                })
            },
            complete(){
                let _this = this;
                if(utils.isNull(this.id) && !utils.isNull(this.cardId)){
//                    这个是新增地址
                if(utils.isNull(this.name)){
                    event.toast('请输入用户姓名')
                    return
                }else if(utils.isNull(this.phone)){
                    event.toast('请输入联系电话')
                    return
                }else if(utils.isNull(this.areaId)){
                    event.toast('请选择区域地址')
                    return
                }else if(utils.isNull(this.detailed)){
                    event.toast('请输入详细地址')
                    return
                }
                POST("weex/member/receiver/add.jhtml?isDefault=true&areaId="+this.areaId+'&address='+ encodeURIComponent(this.detailed) +'&consignee='+encodeURIComponent(this.name)+'&phone='+this.phone +"&lat="+ this.lng + "&lat=" +this.lat+'&memberId='+this.memberId+'&level='+this.floor).then(function (mes) {
                    if (mes.type == 'success') {
                        let E = utils.message('success','添加成功','')
                        event.closeURL(E);
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
                }else if(utils.isNull(this.id) && utils.isNull(this.cardId)){
//                    这个时候是新增会员
                    if(utils.isNull(this.name)){
                        event.toast('请输入用户姓名')
                        return
                    }else if(utils.isNull(this.phone)){
                        event.toast('请输入联系电话')
                        return
                    }else if(utils.isNull(this.areaId)){
                        event.toast('请选择区域地址')
                        return
                    }else if(utils.isNull(this.detailed)){
                        event.toast('请输入详细地址')
                        return
                    }
                    POST("weex/member/receiver/addcard.jhtml?isDefault=true&areaId="+this.areaId+'&address='+ encodeURIComponent(this.detailed) +'&consignee='+encodeURIComponent(this.name)+'&phone='+this.phone +"&lat="+ this.lng + "&lat=" +this.lat+'&level='+this.floor).then(function (mes) {
                        if (mes.type == 'success') {
                            let E = utils.message('success','添加成功','')
                            event.closeURL(E);
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast(err.content)
                    })
                }else if(!utils.isNull(this.id) && !utils.isNull(this.cardId)){
                    _this.etidor()
                }
            },
//            修改接口
            etidor(){
                if(utils.isNull(this.name)){
                    event.toast('请输入用户姓名')
                    return
                }else if(utils.isNull(this.phone)){
                    event.toast('请输入联系电话')
                    return
                }else if(utils.isNull(this.areaId)){
                    event.toast('请选择区域地址')
                    return
                }else if(utils.isNull(this.detailed)){
                    event.toast('请输入详细地址')
                    return
                }
                POST("weex/member/receiver/update.jhtml?isDefault=true&areaId="+this.areaId+'&id='+this.id+'&address='+ encodeURIComponent(this.detailed) +'&consignee='+ encodeURIComponent(this.name)+'&phone='+this.phone +"&lat="+ this.lng + "&lat=" +this.lat+'&level='+this.floor).then(function (mes) {
                    if (mes.type == 'success') {
                        let E = utils.message('success','修改成功','')
                        event.closeURL(E);
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            }

        }
    }
</script>
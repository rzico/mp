
<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"></navbar>
        <!--搜索-->
        <div class='search'>
            <text class="searchIcon" :style="{fontFamily:'iconfont'}">&#xe611;</text>
            <input class='searchInput' ref="searchInputRef" return-key-type="search" placeholder='搜索小区/写字楼等' v-model="keyword" @return="searchPoi"/>
            <div class='searchButton'>
                <text class="searchButtonText" @click="searchPoi">搜索</text>
            </div>
        </div>

        <!--地图-->
        <div class="amapBox" :style="{height:amapHeight + 'px'}">
            <weex-amap id="amap" class="amapBox" :style="{height:amapHeight + 'px'}" :center="center" scale="true" zoom="16" @dragend="amapUpdated">

            </weex-amap>
            <image class='amapcover' ref="amapcover" :style="{top:coverTop + 'px'}" :src='dress' v-if="cover==true"></image>
        </div>

        <!--列表-->
        <list show-scrollbar="false" v-if="regeocode!=null" class='list' :style="{height:listHeight + 'px'}">
            <cell v-if="inPolygon==true" v-for="(poi,index) in regeocode.pois">
                <div class='listCell' @click="endedLinkto(index)">
                    <text class='cellTitle'>{{poi.name}}</text>
                    <text class='cellSubTitle'>{{poi.address}}</text>
                </div>
            </cell>
            <cell v-if="inPolygon==false">
                <noData :noDataHint="'不在配送范围内'" :ptNumber="100"></noData>
            </cell>
        </list>
        <wxc-loading :show="showLoading" type="default" loading-text="定位中"></wxc-loading>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>

    @keyframes myfirst {
        0% {
            transform: translate(0px, 0px);
        }
        50% {
            transform: translate(0px, -10px);
        }
        100% {
            transform: translate(0px, 0px);
        }
    }
    .list{
        display: flex;
        flex-direction: column;
        background-color: white;
        width: 750px;
        border-top-width: 1px;
        border-top-color: #cccccc;
    }
    .listCell{
        width: 750px;
        padding-top: 25px;
        padding-bottom: 25px;
        padding-left: 30px;
        padding-right: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
    }
    .listCell:active{
        background-color: #ccc;
    }
    .cellTitle{
        font-size: 28px;
        line-height: 28px;
        color: #333;
    }
    .cellSubTitle{
        font-size: 24px;
        line-height: 24px;
        color: #999;
        margin-top: 20px;
    }

    /* 搜索 */
    .search{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 750px;
        height: 100px;
        border-bottom-width:1px;
        border-bottom-color: #cccccc;
        background-color: white;
    }
    .searchIcon{
        font-size: 30px;
        width: 30px;
        color: #999;
        margin-left: 30px;
    }
    .searchInput{
        padding-left: 10px;
        width: 470px;
        height: 60px;
        font-size: 30px;
    }
    .searchButton{
        width: 220px;
        height: 60px;
        border-left-width:1px;
        border-left-color: #cccccc;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .searchButtonText{
        font-size: 28px;
        color: #999;
    }

    /*地图*/
    .amapBox{
        position: relative;
        width: 750px;
        background-color: #eee;
    }
    .amapcover {
        position: absolute;
        width: 60px;
        height: 60px;
        left:345px;
        animation: myfirst 0.5s 3;
    }

</style>
<script>
    import noData from '../../../include/noData.vue';
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import {dom, event, animation, storage} from '../../../weex.js';
    import {POST, GET, URIEncrypt} from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';

    var globalEvent = weex.requireModule('globalEvent');
    const amap = weex.requireModule('amap');
    const modal = weex.requireModule('modal');
    import { WxcLoading } from 'weex-ui';
    export default {
        data() {
            return {
                title: '配送至···',
                listHeight:0,
                amapHeight:0,
                coverTop:0,
                longitude:0,
                latitude:0,
                regeocode:null,
                center:[116.487, 40.00003],
                keyword:"",
                dress:utils.locate("resources/images/dress.png"),
                cover:true,
                isPolygon:true,
                showLoading:true,
            }
        },
        props: {},
        components: {
            navbar,noData,WxcLoading
        },
        filters: {},
        created() {
            utils.initIconFont();
            let _this = this;
            let title = utils.getUrlParameter('title');
            if(!utils.isNull(title)){
                this.title = title
            }
            let isPolygon = utils.getUrlParameter('isPolygon');
            if(!utils.isNull(isPolygon)){
                this.isPolygon = (isPolygon=='true')
            }
            this.amapHeight = utils.fullScreen(136)/2;
            this.coverTop = this.amapHeight/2-30;
            this.listHeight = utils.fullScreen(utils.getHeaderHeight+100) - this.amapHeight;
            event.getLocation(function (e) {
                if (e.type=='success') {
                    _this.longitude = e.data.lng;
                    _this.latitude = e.data.lat;
                    _this.center = [_this.longitude,_this.latitude];
                    _this.open_lbs();
                    _this.showLoading = false;
                } else {
                    modal.alert({
                        message: '获取位置失败，请开启定位权限',
                        duration: 0.3
                    }, function (value) {

                    })
                    event.closeURL();
                }
            })
        },
        methods: {
            goback: function () {
                event.closeURL();
            },
            amapUpdated:function (e) {
                this.longitude = e.longitude;
                this.latitude = e.latitude;
                this.open_lbs()
            },
            // 接口
            open_lbs: function () {
                var _this = this
                GET("/lbs/regeoCode.jhtml?lat="+this.latitude + '&lng='+this.longitude  +'&isPolygon='+this.isPolygon, function (res) {
                    if (res.type == "success") {
                        _this.regeocode = res.data;
                        _this.inPolygon = res.data.inPolygon;
                        _this.drawlbs();
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            endedLinkto(index) {
                let poi = this.regeocode.pois[index];
                if (!utils.isNull(poi.areaId)) {
                    //不是同一个区域，去获取区域
                    this.regeocode.areaId = poi.areaId;
                    this.regeocode.areaName = poi.areaName;
                }
                let s = poi.location;
                var arr = s.split(",");
                this.longitude = parseFloat(arr[0]);
                this.latitude = parseFloat(arr[1]);

                this.regeocode.longitude = this.longitude;
                this.regeocode.latitude = this.latitude;
                this.regeocode.building = poi.address + poi.name
                let ev = {
                    areaName: this.regeocode.areaName,
                    building: this.regeocode.building,
                    areaId:this.regeocode.areaId,
                    latitude:this.latitude,
                    longitude:this.longitude
                }
                event.closeURL({type:'success',data:ev,content:"success"});
            },
            drawlbs() {

                //画围栏
                var _this = this;
                animation.transition(_this.$refs.amapcover, {
                    styles: {
                        transform: 'translate(0px, -30px)',
                    },
                    duration: 400, //ms
                    timingFunction: 'ease-out',
                    needLayout: false,
                    delay: 0 //ms
                })

                setTimeout(() => {
                    animation.transition(_this.$refs.amapcover, {
                        styles: {
                            transform: 'translate(0px,0px)',
                        },
                        duration: 400, //ms
                        timingFunction: 'ease-in',
                        needLayout: false,
                        delay: 0 //ms
                    })
                }, 500)

            },
            searchPoi() {
                //让input失去焦点
                this.$refs.searchInputRef.blur();
                var _this = this;
                GET("/lbs/geoQuery.jhtml?areaId="+this.regeocode.areaId + '&keyword='+encodeURIComponent(this.keyword) +'&isPolygon='+this.isPolygon, function (res) {
                        if (res.type == 'success') {
                            _this.regeocode.pois = res.data.pois;
                            _this.inPolygon = _this.regeocode.pois.length>0;
                        } else {
                            event.toast(res.content)
                        }
                    },
                    function (err) {
                        event.toast(err.content)
                    })
            },
        }
    }
</script>
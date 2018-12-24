<template>
    <div class="wrapper">
        <navbar title="收货地址" @goback="goback"></navbar>
        <list show-scrollbar="false">
            <cell  v-if="choose.length !=0">
                <div class='chooseAddre-father' v-for="(item,index) in choose">
                    <div @click='information(index)' class='chooseAddre'>
                        <text class='chooseAddre-address'>{{item.areaName}},{{item.address}}</text>
                        <div class='chooseAddre-information'>
                            <text class="fz28"  style="color: #888"> {{item.consignee}}</text>
                            <text class="fz28 pl10"  style="color: #888">{{item.phone}}</text>
                        </div>
                    </div>
                    <div class='chooseAddre-edit'>
                        <div class='default' @click='setDefault(index)' >
                            <div class="chooseAddre-garden" :class="[item.default?'bkg-primary':'chooseAddre-no']"></div>
                            <text class="fz28" style="color: #888">默认</text>
                        </div>
                        <div class="flex-row">
                        <div class='navigatoraddre bd-primary'  @click='edit(index)'>
                            <text class="fz24 primary">编辑</text>
                        </div>
                        <div class='delderess' @click='del(index)'>
                            <text class="delderessText">删除</text>
                        </div>
                        </div>
                    </div>
                </div>
            </cell>
            <cell>
                <noData  :noDataHint="'没有收货地址'" v-if="choose.length==0"></noData>
            </cell>
        </list>
        <div style='height:60px;background:#eee'></div>
        <div class='chooseAddre-new bkg-primary' @click='newaddre'>
            <text class="chooseAddre-newText">+ 新建地址</text>
        </div>

    </div>
</template>
<style lang="less" src="../../../../style/wx.less"/>
<style scoped>
    .chooseAddre-father {
        background-color: white;
        overflow: auto;
        margin-top: 30px;
        padding-top:10px;
        padding-bottom:10px;
    }

    /*个人信息  */

    .chooseAddre-information {
        padding-top:15px;
        padding-bottom:15px;
        flex-direction: row;
        align-items: center;
    }

    .chooseAddre {
        padding-left:30px;
        padding-right:30px;
    }

    .navigatoraddre {
        padding-left:20px;
        padding-right:20px;
        padding-top:5px;
        padding-bottom:5px;
        border-radius: 40px;
        border-width: 1px;
        margin-right: 20px;
    }

    .delderess {
        padding-left:20px;
        padding-right:20px;
        padding-top:5px;
        padding-bottom:5px;
        border-radius: 40px;
        border-width: 1px;
        border-color: #707070;
        margin-right: 30px;
    }
    .delderessText{
        line-height: 30px;
        font-size: 24px;
        color: #707070;
    }

    /*地址信息  */

    .chooseAddre-address {
        font-size: 34px;
        color: #333;
        padding-top: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        lines: 2;
    }

    /*编辑，删除，默认地址  */

    .chooseAddre-edit {
        width:750px;
        height: 70px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        position: relative;
        border-top-width: 1px;
        border-top-color:#eee;
    }

    .default {
        padding-left: 30px;
        flex-direction: row;
        align-items: center;
    }

    .chooseAddre-no {
        border-width: 1px;
        border-bottom-style: solid;
        border-color: #eee;
        background-color: white;
    }

    .chooseAddre-garden {
        width: 40px;
        height: 40px;
        border-radius:100%;
        margin-right: 5px;
    }

    .address {
        display: flex;
        font-size: 20px;
        color: #888;
        padding-bottom: 0px;
    }


    /*新增地址  */

    .chooseAddre-new {
        width: 600px;
        height: 80px;
        border-radius: 10px;
        position: fixed;
        bottom: 20px;
        left: 75px;
        align-items: center;
        justify-content: center;

    }
    .chooseAddre-newText{
        font-size: 40px;
        color: white;
    }

</style>
<script>
    import navbar from '../../../../include/navbar.vue';
    import utils from '../../../../assets/utils';
    import {dom, event, animation, storage} from '../../../../weex.js';
    import {POST, GET,URIEncrypt} from '../../../../assets/fetch';
    import noData from '../../../../include/noData.vue';

    const modal = weex.requireModule('modal');

    export default {
        data() {
            return{
                clicked:false,
                choose:[],
                load:false,
                memberId:0
            }
        },
        props: {},
        components: {
            navbar, noData
        },
        filters: {},
        created() {
            utils.initIconFont();
            this.memberId = utils.getUrlParameter('memberId')
            this.list();
        },
        methods: {
            goback() {
                event.closeURL();
            },
            list: function () {
                var _this = this;
                GET("weex/member/receiver/mlist.jhtml?memberId="+this.memberId,function (res) {
                    if (res.type == 'success') {
                        _this.choose = res.data
                        if (_this.choose.length == 0 && _this.load) {
                            _this.load = false;
                            _this.newaddre();
                        }
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                })
            },

            // 地址列表默认接口
            setDefault(index) {
                var _this = this
                let item = _this.choose[index];
                let ev =  { id: item.id, isDefault: !item.default,memberId: this.memberId};
                POST("weex/member/receiver/default.jhtml?"+URIEncrypt(ev), null).then(function (res) {
                    if (res.type == 'success') {
                        _this.list();
                    } else {
                        event.toast(res.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },

            newaddre: function (e) {
                var _this = this;

                    event.openURL(utils.locate("view/shop/card/receiver/amap-picker/amap-picker.js"),function (e) {
                        if (e.type=='success') {
                            let ev = {
                                areaName: e.data.areaName,
                                address: e.data.building,
                                areaId:e.data.areaId,
                                latitude:e.data.latitude,
                                longitude:e.data.longitude,
                                memberId: _this.memberId
                            }
                            event.openURL(utils.locate("view/shop/card/receiver/add/index.js?"+URIEncrypt(ev)),function (res) {
                                _this.list();
                            });

                        }

                    })


            },

            edit: function (index) {
                var _this = this;
                let item = _this.choose[index];
                let e = {
                    id: item.id,
                    phone: item.phone,
                    consignee: item.consignee,
                    areaName: item.areaName,
                    address: item.address,
                    level:item.level,
                    isDefault:item.default,
                    areaId:item.areaId,
                    latitude:item.lat,
                    longitude:item.lng,
                    memberId: _this.memberId
                }

                event.openURL(utils.locate("view/shop/card/receiver/edit/index.js?"+URIEncrypt(e)),function (res) {
                    _this.list();
                });
            },

            // 地址列表缓存到浏览器
            information: function (index) {
                var _this = this
                let item = _this.choose[index];
                var E = {
                    id: item.id,
                    phone: item.phone,
                    consignee: item.consignee,
                    areaName: item.areaName,
                    address: item.address
                }
                let backData = utils.message('success','成功',E);
                event.closeURL(backData)
            },
            // 点击删除
            del: function (index) {
                var _this = this
                let item = _this.choose[index];
                modal.confirm({
                    message: '是否删除这个地址?',
                    duration: 0.3,
                    okTitle:'删除',
                    cancelTitle:'取消'
                }, function (value) {
                    if (value=='删除') {
                        POST("weex/member/receiver/delete.jhtml?id="+item.id +'&memberId=' + this.memberId,null).then(function (res) {
                            if (res.type == 'success') {
                                _this.list();
                            } else {
                                event.toast(res.content);
                            }
                        },function (err) {
                            event.toast(err.content);
                        })
                    }
                })
            },

        }
    }
</script>
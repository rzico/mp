<template>
    <div style="background-color: #eeeeee">
        <navbar :title="title" :complete="complete" @goback="goback"></navbar>
        <div class="shopstwo">
            <div class="deleteBoxTwo bkg-delete" @click="del()">
                <text class="deleteText">删除</text>
            </div>
            <div  class="messageTwo"  @swipe="onpanmove($event,index)" @touchstart="onFriendtouchstart($event,index)">
                <div class="shopLogo" >
                    <image style="width: 250px;height: 200px;"  class="img" :src="logo"></image>
                </div>
                <div class="shopInformation">
                    <div class="shopNameDiv">
                        <text class="shopName">店铺名：</text>
                        <text class="fullName">{{shopName}}</text>
                    </div>
                    <div class="shopAddressDiv">
                        <text class="shopAddress">姓名：</text>
                        <text class="concretely">{{name}}</text>
                    </div>
                </div>
            </div>
        </div>

        <div class="head" @click="add" >
            <text class="clickAdd" >+点击添加商铺</text>
        </div>
        <noData :noDataHint="noDataHint" v-if="isEmpty()"></noData>
        <list class="list" v-if="isNoEmpty()">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">下拉刷新</text>
            </refresh>
            <cell :style="{minHeight:screenHeight + 'px'}">
        <div class="shops" v-for="(num,index) in lists">
            <div class="deleteBox bkg-delete" @click="del(num.id,index)">
                <text class="deleteText">删除</text>
            </div>
            <div  class="message" @click="modification(num.id)" @swipe="onpanmove($event,index)" @touchstart="onFriendtouchstart($event,index)">
            <div class="shopLogo" >
                <image style="width: 250px;height: 200px;"  class="img" :src="num.thedoor "></image>
            </div>
            <div class="shopInformation">
                <div class="shopNameDiv">
                <text class="shopName">店铺名：</text>
                <text class="fullName">{{num.name}}</text>
                </div>
                <div class="shopAddressDiv">
                <text class="shopAddress">地址：</text>
                <text class="concretely">{{num.address}}</text>
                </div>
            </div>
            </div>
        </div>
            </cell>
            <loading class="loading" @loading="onloading" :display="loading ? 'show' : 'hide'">
                <text class="indicator">加载中..</text>
            </loading>
        </list>
        </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .message{
        flex-direction: row;
        align-items: center;
        width: 750px;
        background-color: white;
    }
    .messageTwo{
        flex-direction: row;
        align-items: center;
        width: 730px;
        border-radius: 10px;
        background-color: white;
    }
    .deleteText{
        font-size: 32px;color: #fff;
    }
    .deleteBox{
        position: absolute;right: 0px;top: 0px;height: 230px;align-items: center;width: 130px;justify-content: center;
    }
    .deleteBoxTwo{
        position: absolute;right: 0px;top: 0px;height: 230px;align-items: center;width: 130px;justify-content: center;border-bottom-right-radius: 10px
    ;border-top-right-radius: 10px;
    }
    .head {
        background-color: white;
        border-width: 0px;
        margin-bottom: 20px;
        margin-top: 20px;
        height: 80px;
        align-items: center;
        justify-content: center;

    }
    .clickAdd{
        font-size: 40px;
    }
    .shops{
        background-color: white;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        height: 230px;
    }
    .shopstwo{
        background-color: white;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        margin-right: 10px;
        margin-left: 10px;
        border-radius: 10px;
        height: 230px;
    }
    .shopLogo{
        margin-left: 20px;
    }
    .shopInformation{
        /*justify-content: space-between;*/
        height: 230px;
        margin-left: 20px;
    }
    .shopName{
        font-weight: bold;
        font-size: 32px;
    }
    .fullName{
        font-size: 32px;
    }
    .shopAddress{
        font-weight: bold;
        font-size: 32px;
    }
    .concretely{
        font-size: 32px;
    }
    .shopNameDiv{
        flex-direction: row;
        margin-top: 20px;
    }
    .shopAddressDiv{
        flex-direction: row;
        margin-top: 30px;
    }
    .concretely{
        width: 350px;
    }
</style>
<script>
import navbar from '../../../include/navbar.vue';
import {POST, GET} from '../../../assets/fetch';
import utils from '../../../assets/utils';
import filters from '../../../filters/filters';
import noData from '../../../include/noData.vue';

var event = weex.requireModule('event');
const modal = weex.requireModule('modal');
var animationPara;//执行动画的消息
const animation = weex.requireModule('animation');

export default {
    data() {
        return {
            loading: false,
            refreshing : false,
            lists: [],
            screenHeight:0,
            run:[],
            isOwner:true,
            name:'',
            shopName:'',
            logo:''
        }
    },
    components: {
        navbar,noData
    },
    props: {
        title: {default: "我的店铺"},
        noDataHint: { default: "尚未添加店铺"},
    },
    created() {
        utils.initIconFont();
        this.open(function () {});
        this.openTwo(function () {});
        this.screenHeight = utils.fullScreen(136);
    },
    filters:{
        filterHead:function (value) {
            return utils.filterHead(value,250,200);
        },

    },
    methods:{
        modification:function (id) {
//            utils.debug('view/shop/shop/newShop.js?'+id)
                    let _this =this;
                    event.openURL(utils.locate('view/shop/shop/newShop.js?shopId='+id),function (message) {
                        if(message.type == 'success'){
                            _this.onrefresh()
                        }
                    })
        },
        open:function () {
            let _this = this;
            GET('weex/member/shop/list.jhtml',function (mes) {
                utils.debug(mes)
                if (mes.type == 'success') {
                    _this.lists = mes.data.data
                } else {
                    event.toast(res.content);
                }
            }, function (err) {
                event.toast(err.content)
            })
        },
        openTwo:function () {
            let _this = this;
            GET('weex/member/enterprise/view.jhtml',function (mes) {
                utils.debug(mes)
                if (mes.type == 'success') {
                    _this.isOwner = mes.data.isOwner;
                    _this.logo = mes.data.logo;
                    _this.shopName =mes.data.shopName;
                    _this.name = mes.data.name;
                } else {
                    event.toast(res.content);
                }
            }, function (err) {
                event.toast(err.content)
            })
        },
        isNoEmpty:function() {
            return this.lists.length!=0;
        },
        isEmpty:function() {
            return this.lists.length==0;
        },
        //            上拉加载
        onloading (event) {
            var _this = this;
            _this.loading = true;
            setTimeout(function () {
                _this.open()
                    _this.loading = false
            }
                ,1000)
        },
//            下拉刷新
        onrefresh (event) {
            var _this = this;
            _this.refreshing = true;
            setTimeout(function () {
                    _this.open()
                    _this.refreshing = false;
            }
                ,1000)
        },

        goback: function () {
            event.closeURL()
        },

        add:function () {
            let _this= this;
            event.openURL(utils.locate('view/shop/shop/newShop.js'),function (message) {
                utils.debug(message)
                if(message.type == 'success'){
                    _this.onrefresh()
                }
            })
        },
        onpanmove:function (e,index) {
//                获取当前点击的元素。
            var _this = this;
            if(e.direction == 'right'){
                _this.canScroll = false;
                animation.transition(animationPara, {
                    styles: {
                        transform: 'translateX(0)',
                    },
                    duration: 350, //ms
                    timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                    needLayout:false,
                    delay: 0 //ms
                },function () {
                    _this.canScroll = true;
                })
            }else if(e.direction == 'left'){
                _this.canScroll = false;
//                  modal.toast({message:distance});
                animation.transition(animationPara, {
                    styles: {
                        transform: 'translateX(-190)',
                    },
                    duration:350, //ms
                    timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                    needLayout:false,
                    delay: 0 //ms
                },function () {
                    _this.canScroll = true;
                })
            }
        },
        //            点击屏幕时
        onFriendtouchstart:function (e,index) {
            var _this = this;
            if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
            }else{
                animation.transition(animationPara, {
                    styles: {
                        transform: 'translateX(0)',
                    },
                    duration: 350, //ms
                    timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                    needLayout:false,
                    delay: 0 //ms
                })
            }
//                获取当前点击的元素。
            animationPara =  e.currentTarget;
        },
//        删除
        del:function (id,index) {
            let _this =this
            POST('weex/member/shop/delete.jhtml?shopId='+id).then(
                function (mes) {
                    if (mes.type == "success") {
                        //                            把动画收回来。
                        if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                        }else{
                            animation.transition(animationPara, {
                                styles: {
                                    transform: 'translateX(0)',
                                },
                                duration: 10, //ms
                                timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                                needLayout:false,
                                delay: 0 //ms
                            })
                        }
                        _this.lists.splice(index,1);
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast("网络不稳定");
                }
            )
        }
    }
}
</script>
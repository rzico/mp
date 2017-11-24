<template>
    <div style="background-color: #eeeeee">
        <navbar :title="title" :complete="complete" @goback="goback"></navbar>
        <div class="head">
            <text class="clickAdd">+点击添加商铺</text>
        </div>
        <list class="list">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">下拉刷新</text>
            </refresh>
            <cell v-for="num in lists">
        <div class="shops">
            <div class="shopLogo" >
                <image style="width: 250px;height: 200px;"  class="img" :src="num.thedoor"></image>
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
            </cell>
            <loading class="loading" @loading="onloading" :display="loading ? 'show' : 'hide'">
                <text class="indicator">加载中..</text>
            </loading>
        </list>
    </div>
</template>
<style>
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
        background-color: white;
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
import navbar from '../../include/navbar.vue';
import {POST, GET} from '../../assets/fetch';
import utils from '../../assets/utils';
import filters from '../../filters/filters';

var event = weex.requireModule('event');
const modal = weex.requireModule('modal');

export default {
    data() {
        return {
            loading: false,
            refreshing : false,
            lists: [],
        }
    },
    components: {
        navbar
    },
    props: {
        title: {default: "我的店铺"},
    },
    created() {
        utils.initIconFont();
        this.open(function () {

        });
    },
    methods:{
        open:function () {
            var _this = this;
            GET('weex/member/shop/list.jhtml',function (mes) {
                if (mes.type == 'success') {
                    _this.lists = mes.data.data
                } else {
                    event.toast(res.content);
                }
            }, function (err) {
                event.toast(err.content)
            })
        },
        //            上拉加载
        onloading (event) {
            var _this = this;
            _this.loading = true;
            setTimeout(
                _this.open(function () {
                    _this.loading = false
                })
                ,1500)
        },
//            下拉刷新
        onrefresh (event) {
            var _this = this;
            _this.refreshing = true;
            setTimeout(
                _this.open(function () {
                    _this.refreshing = false;
                })
                ,1500)
        },

        goback: function () {
            event.closeURL()
        },
    }
}
</script>
<template>
    <scroller class="wrapper">
        <!--导航栏-->
        <navbar :title="title"  @goback="goback" ></navbar>
        <!--关注-->
        <div class="lineBox" >
            <div class="flex-row">
                <image class="headImg" src="https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg" ></image>
                <div class="userInfo">
                    <text class="fz32 nameColor" >阑珊岁月</text>
                    <text class="sub_title">07-19</text>
                </div>
            </div>
        </div>
        <div class="lineBox" >
            <div class="flex-row">
                <image class="headImg" src="https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg"></image>
                <div class="userInfo">
                    <text class="fz32 nameColor" >小白分</text>
                    <text class="sub_title">07-13</text>
                </div>
            </div>
        </div>
        <div class="lineBox" >
            <div class="flex-row">
                <image class="headImg" src="https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg"></image>
                <div class="userInfo">
                    <text class="fz32 nameColor" >小白分</text>
                    <text class="sub_title">07-13</text>
                </div>
            </div>
        </div>
    </scroller>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .lineBox{
        flex-direction: row;
        align-items: center;
        height: 150px;
        padding-right: 20px;
        justify-content: space-between;
        width: 750px;
        padding-left: 25px;
        background-color: #fff;
        border-color: gainsboro;
        border-style: solid;
        border-bottom-width:1px;
    }
    /*.infoText{*/
        /*font-size: 32px;color: #444;*/
        /*width: 480px;*/
        /*lines:1;*/
        /*text-overflow: ellipsis;*/
    /*}*/
    .nameColor{
        margin-bottom: 10px;
    }
    .userInfo{
        margin-left: 20px;
        height: 120px;
        justify-content: center;
    }
    .headImg{
        height: 110px;
        width: 110px;
        border-radius: 55px;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    const event = weex.requireModule('event');
    import { POST, GET } from '../../../assets/fetch';
    export default {
        data:{
          title:'3人点赞'
        },
        components: {
            navbar
        },
        created(){
            let name = utils.getUrlParameter('name');
            if(name == 'laud'){
             this.title = '3人点赞';
            }else if(name == 'share'){
                this.title = '3人分享';
            }
        },
        methods:{
            goback(){
                event.closeURL();
            },
        }
    }
</script>
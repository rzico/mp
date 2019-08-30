<template>
    <div  class="flex-column bt10"  style="background-color: white">
       <div class="hotsTitle" @click="liveIndexLinkTo()">
           <div class="flex-row mt10">
           <text class="titleText">热 门 直 播</text>
           </div>
           <div class="moreButton">
               <text class="more">查看更多</text>
           </div>
       </div>
                <div class="hotsContent">
                    <div class="hotsInfo" v-for="h in lives" @click="goLive(h.liveId)">
                        <image class="img" :src="h.frontcover"></image>
                    </div>
                </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .hotsTitle{
       width: 750px;
        padding-top: 10px;
        background-color: white;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .titleText{
        font-weight: bold;
        font-size: 32px;
    }
    .colorccc{
        color: #ccc;
    }
    .moreButton{
        background-color: yellow;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 30px;
        position: absolute;
        right: 20px;
        top: 20px;
    }
    .more{
        font-size: 20px;
        color:#5eb0fd;
    }
    .hotsContent{
        margin-top: 20px;
        margin-bottom: 20px;
        height:300px ;
        flex-direction: row;
        padding-left: 20px;
        background-color: #fff;
    }
    .hotsInfo{
        width:223.33px;
        height: 300px;
        border-radius: 10px;
        margin-right: 20px;
    }
    .img{
        width:223.33px;
        height: 300px;
        border-radius: 10px;
    }
</style>
<script>
    const livePlayer = weex.requireModule('livePlayer');
    const event = weex.requireModule('event');
    import utils from '../../assets/utils';
    export default {
        data:function () {
            return{
                image:utils.locate('resources/images/loading1.gif'),
                clicked:false,
            }
        },
        created() {
        },
        filters:{
            watchThumbnail(value){
                return utils.thumbnail(value,223,300);
            }
        },
        props:{
            lives:{default:[]}
        },
        methods: {
            //            进入直播
            goLive(liveId){
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                livePlayer.toLookLiveRoom(liveId,function (data) {

                });
            },
            liveIndexLinkTo: function (e) {
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                event.openURL(utils.locate('view/live/index.js'),function (data) {

                });
            },
        }
    }
</script>
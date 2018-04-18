<template>
    <div  class="flex-column bt10"  style="background-color: white">
       <div class="hotsTitle">
           <div class="flex-row">
           <text class="titleText colorccc" style="margin-right: 20px">一</text>
           <text class="titleText">热 门 直 播</text>
           <text class="titleText colorccc" style="margin-left: 20px">一</text>
           </div>
               <text class="more">查看更多</text>
       </div>
                <div class="hotsContent">
                    <div class="hotsInfo" v-for="h in lives">
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
    .more{
        font-size: 24px;
        color: #EB4E40;
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
        border-radius: 15px;
        margin-right: 20px;
    }
    .img{
        width:223.33px;
        height: 300px;
        border-radius: 15px;
    }
</style>
<script>
    const event = weex.requireModule('event');
    import utils from '../../assets/utils';
    export default {
        data:function () {
            return{
                image:utils.locate('resources/images/loading1.gif'),
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

        }
    }
</script>
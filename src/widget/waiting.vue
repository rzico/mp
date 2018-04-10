<template>
    <!--遮罩-->
    <div class="sendMask" @click="maskClick()">
        <div>
            <image class="waitImg" :src="waitImg"></image>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style>
    .waitImg{
        width: 400px;
        height: 200px;
    }
</style>
<script>
    import utils from '../assets/utils';
    export default {
        data(){
            return{
                waitImg:utils.locate('resources/images/waiting.gif'),
            }
        },
        methods:{
            maskClick(){
                return;
            }
        }
    }
</script>
<template>
    <!--遮罩-->
    <!--:class="[maskNoBg ? 'noBgColor' : '']"-->
    <div class="sendMask" :class="[maskNoBg == 'yes' ? 'noBgColor' : '']"  @click="maskClick()">
        <!--进度条-->
        <div class="processBox">
            <text class="processText">正在云同步,请稍候...</text>
            <!--进度条背景-->
            <div class="processStyle processBg"></div>
            <!--进度条进度与颜色-->
            <div :style="{width:processWidth + 'px'}"  class="processStyle bkg-primary"></div>
            <text class="processTotal">{{currentPro}}/{{proTotal}}</text>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<script>
    export default {
        data(){
            return{

            }
        },
        props:{
            currentPro: { default: 0},//当前进度
            proTotal: { default: 0},//总的进度
            processWidth: { default: 0},//进度条宽度
            maskNoBg: { default: 'no'}//后方遮罩颜色。 member/index不要黑色遮罩 因为底部导航栏无法遮住
        },
        methods:{
            maskClick(){
                return;
            }
        }
    }
</script>
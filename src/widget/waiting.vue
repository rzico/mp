<template>
    <!--遮罩-->
    <div class="sendMask" @click="maskClick()">
        <div class="flex-row ballBox">
            <text class="whiteBall" ref="whiteBallOne"></text>
            <text class="whiteBall" ref="whiteBallTwo"></text>
            <text class="whiteBall" ref="whiteBallThree"></text>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style>
    .ballBox{
        width:200px;
        height: 100px;
        justify-content: space-around;
        align-items: center;
    }
    .whiteBall{
        width: 60px;
        height: 60px;
        border-radius: 30px;
        background-color: #ffffff;
    }
</style>
<script>
    import utils from '../assets/utils';
    import {dom,event,animation} from '../weex.js';
    export default {
        data(){
            return{
                waitImg:utils.locate('resources/images/waiting.gif'),
            }
        },
        mounted(){
            let _this = this;
            animation.transition(_this.$refs.whiteBallOne, {
                styles: {
                    transform: 'scale(0.1)',
                },
                duration: 0, //ms
                timingFunction: 'linear',//350 duration配合这个效果目前较好
                needLayout:false,
                delay: 0 //ms
            }, function () {
                _this.oneToBig();
            })
            animation.transition(_this.$refs.whiteBallTwo, {
                styles: {
                    transform: 'scale(0.1)',
                },
                duration: 0, //ms
                timingFunction: 'linear',//350 duration配合这个效果目前较好
                needLayout:false,
                delay: 0 //ms
            }, function () {
                setTimeout(function () {
                    _this.twoToBig();
                },150)
            })
            animation.transition(_this.$refs.whiteBallThree, {
                styles: {
                    transform: 'scale(0.1)',
                },
                duration: 0, //ms
                timingFunction: 'linear',//350 duration配合这个效果目前较好
                needLayout:false,
                delay: 0 //ms
            }, function () {
                setTimeout(function () {
                    _this.threeToBig();
                },300)
            })

        },
        methods:{
            maskClick(){
                return;
            },
            oneToSmall(){
                let _this = this;
                animation.transition(_this.$refs.whiteBallOne, {
                    styles: {
                        transform: 'scale(0.1)',
                    },
                    duration: 600, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout:false,
                    delay: 0 //ms
                }, function () {
                    _this.oneToBig();
                })
            },
            oneToBig(){
                let _this = this;
                animation.transition(_this.$refs.whiteBallOne, {
                    styles: {
                        transform: 'scale(1)',
                    },
                    duration: 600, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout:false,
                    delay: 0 //ms
                }, function () {
                    _this.oneToSmall();
                })
            },
            twoToSmall(){
                let _this = this;
                animation.transition(_this.$refs.whiteBallTwo, {
                    styles: {
                        transform: 'scale(0.1)',
                    },
                    duration: 600, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout:false,
                    delay: 0 //ms
                }, function () {
                    _this.twoToBig();
                })
            },
            twoToBig(){
                let _this = this;
                animation.transition(_this.$refs.whiteBallTwo, {
                    styles: {
                        transform: 'scale(1)',
                    },
                    duration: 600, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout:false,
                    delay: 0 //ms
                }, function () {
                    _this.twoToSmall();
                })
            },
            threeToSmall(){
                let _this = this;
                animation.transition(_this.$refs.whiteBallThree, {
                    styles: {
                        transform: 'scale(0.1)',
                    },
                    duration: 600, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout:false,
                    delay: 0 //ms
                }, function () {
                    _this.threeToBig();
                })
            },
            threeToBig(){
                let _this = this;
                animation.transition(_this.$refs.whiteBallThree, {
                    styles: {
                        transform: 'scale(1)',
                    },
                    duration: 600, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout:false,
                    delay: 0 //ms
                }, function () {
                    _this.threeToSmall();
                })
            },
        },

    }
</script>
<template>
    <div class="wrapper bkg-white">
        <slider class="slider" interval="3000" auto-play="true">
            <div class="frame" v-for="img in imageList">
                <image class="image" resize="cover" :src="img.src"></image>
            </div>
        </slider>
        <div class="register">
            <div class="flex-row">
                <div class="flex1 btn">
                    <text class="ico" :style="{fontFamily:'iconfont'}">&#xe659;</text>
                    <text class="btn-text" value="微信快捷登录">微信快捷登录</text>
                </div>
            </div>
            <div class="flex-row space-between footer">
                <text class="title gray" @click="account('/')">其他方式登录</text>
                <text class="title gray" @click="goback('/')">关闭随便看看</text>
            </div>
        </div>

    </div>

</template>

<style lang="less" src="../style/wx.less"/>

<style scoped>

    .image {
        width: 750px;
        height: 1200px;
    }
    .slider {
        width: 750px;
        height: 800px;
     }
    .frame {
        width: 750px;
        height: 800px;
        position: relative;
    }

    .register {
        position: fixed;
        bottom: 10px;
        left: 0px;
        right: 0px;
        width:750px;
        height: 250px;
        padding-left:60px ;
        padding-right:60px ;
        background-color: white;
    }

    .footer {
        margin-top: 50px;
    }

    .btn {
        background-color:limegreen;
        border-color:limegreen;
        flex-direction: row;
        justify-content: center;
        padding-top: 0px;
        padding-top: 0px;
        height: 80px;
        align-items: center;
        border-radius:12px;
    }

    .ico {
        font-size: 58px;
        color: white;
    }
    .btn-text {
        margin-left: 20px;
        color : white;
        font-size: 34px;
    }

</style>
<script>
    const navigator = weex.requireModule('navigator');
    export default {
        data () {
            return {
                imageList: [
                    { src: 'http://cdn.rzico.com/weex/resources/images/flash1.jpg'},
                    { src: 'http://cdn.rzico.com/weex/resources/images/flash2.jpg'},
                    { src: 'http://cdn.rzico.com/weex/resources/images/flash3.jpg'},
                    { src: 'http://cdn.rzico.com/weex/resources/images/flash4.jpg'}
                ]
            }
        },
        created(){
            var domModule=weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
            })
        },
        methods: {
            account: function (e) {
                navigator.pop({
                    url: 'http://cdn.rzico.com/weex/app/login/account.js',
                    animated: "true"
                },function (msg) {
                    msg = "pop ";
                } )
            },
            goback: function (e) {
                navigator.pop({
                    url: 'http://cdn.rzico.com/weex/app/login/login.js',
                    animated: "true"
                },function (msg) {
                    msg = "pop ";
                } )
            }
        }
    }
</script>
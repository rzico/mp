<template>
  <div class="wrapper bkg-white">
    <slider class="slider" interval="3000" auto-play="true">
      <div class="frame" v-for="img in imageList">
        <image class="image" resize="cover" :src="img.src"></image>
      </div>
    </slider>
    <div class="register">
      <text class="flex1 button btn" value="微信快速登录">微信快速登录</text>

      <div class="flex-row space-between footer">
        <text class="title gray" @click="account">其他方式登录</text>
        <text class="title gray" @click="goback">随便看看</text>
      </div>
    </div>

  </div>

</template>

<style lang="less" src="./style/wx.less"/>

<style scoped>

  .image {
    width: 750px;
    height: 1200px;
  }
  .slider {
    width: 750px;
    height: 1200px;
  }
  .frame {
    width: 750px;
    height: 1200px;
    position: relative;
  }

  .register {
    flex-direction: column;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width:750px;
    height: 200px;
    padding-left: 40px;
    padding-right: 40px;
    background-color: white;
  }

  .footer {
    margin-top: 20px;
  }

  .btn {
    background-color:limegreen;
    color : #ccc;
    width:500px;
  }

</style>
<script>
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
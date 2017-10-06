<template>
    <div class="wrapper card_bg" v-if="isShow">
        <div class="card">
            <div class="card_header">
                    <div class="flex-start">
                        <image class="logo" resize="cover"
                               :src="logo">
                        </image>
                        <div class="name">
                            <text class="title">{{nickName}}</text>
                            <text class="autograph">{{autograph}}</text>
                        </div>
                    </div>
            </div>
            <div class="qrcode_panel">
                <image class="qrcode" resize="cover"
                       :src="qrcode">
                </image>
            </div>
            <div class="close"  @click="close()">
                <text class="close_button" :style="{fontFamily:'iconfont' }">&#xe60a;</text>
            </div>
            <div class="card_footer">
                <text class="hit">扫一扫二维码，加我好友</text>
                <text class="button"> {{copy}}</text>
            </div>

        </div>
    </div>
 </template>
<style lang="less" src="../style/wx.less"/>

<style scoped>
    .card_bg {
        align-items: center;
        justify-content: center;
        background-color:rgba(0,0,0,0.5);
    }
    .card {
        flex-direction: column;
        width: 550px;
        height: 750px;
        background-color: white;
        border: 1px;
        border-color: #eee;
        border-radius:10px;
    }
    .card_header {
        margin-top: 20px;
        margin-left: 20px;
    }
    .logo {
        width:90px;
        height:90px;
        border-radius:10px;
        overflow:hidden;
    }
    .close {
        position:absolute;
        width:60px;
        height: 60px;
        right: 0px;
        top : 10px;
        flex-direction: column;
        justify-content: center;
    }

    .close_button {
        font-size: 48px;
        color:#ccc
    }

    .qrcode_panel {
        width:550px;
        height:400px;
        margin-top:30px;
        align-items: center;
    }

    .qrcode {
        width:450px;
        height:450px;
    }

    .name {
        margin-left:20px;
        flex-direction: column;
        justify-content: center;
        height:120px;
    }

    .autograph {
        font-size: 28px;
        color: #ccc;
        top:5px;
    }

    .card_footer {
        flex-direction: column;
        align-items: center;
        margin-top: 20px;

    }

    .hit {
        color:#ccc;
        font-size: 28px;
    }

    .button {
        margin-top: 20px;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        border-bottom-style: solid;
        border-top-width: 1px;
        border-top-color: #cccccc;
        border-top-style: solid;
        border-left-width: 1px;
        border-left-color: #cccccc;
        border-left-style: solid;
        border-right-width: 1px;
        border-right-color: #cccccc;
        border-right-style: solid;
        height: 60px;
        width:400px;
        font-size: 32px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius:10px;
    }

</style>
<script>
     export default {
        data() {
            return {
                isShow:false,
                nickName:"",
                logo:"",
                autograph:"",
                qrcode:"",
                copy:"点击复制名片"
            }
        },
        methods: {
            goback: function (e) {
                this.$emit('goback');
            },
            close:function (e) {
                this.isShow = false;
            },
            show:function (e) {
                var _this = this;
                GET('weex/member/view.jhtml').then(
                function (data) {
                         if (data.type == "success") {
                            var member = data.data;
                            _this.nickName = member.nickName;
                            _this.logo = member.logo;
                            _this.autograph = member.autograph;
                            _this.copy = "复制(邀请码:"+(member.id+10200)+")";
                            _this.qrcode = "http://pan.baidu.com/share/qrcode?w=450&h=450&url=" +encodeURI(_this.dataURL+"/q/8653800"+(member.id+10200)+'.jhtml');
                            _this.isShow = true;
                        } else {
                            event.toast(data.content);
                        }
                    },function(err) {
                        event.toast("网络不稳定");
                    }
                )
            }
        }
     }
</script>
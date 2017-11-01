<template>
    <div class="">
        <div class="header">
            <navbar :title="title" :complete="complete" @goback="goback" @goComplete="goComplete" > </navbar>
        </div>
        <div class="div">
            <div class="left">
                <div class="image">
                    <image style="width:100px; height:100px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508910587&di=dc58dc10cc1f68ddb174455d5268a474&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.wendangwang.com%2Fpic%2F02630272ae789d35f9ba039f%2F1-810-jpg_6-1080-0-0-1080.jpg"></image>
                </div>
                <div class="div1">
                    <text class="text">中国人民银行</text>

                    <text class="text1">尾号1111 储蓄卡  </text>

                </div>
            </div>
            <div class="left">
                <div class="image">
                    <image style="width:100px; height:100px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508315651625&di=a98f616b6ded1042fc5d9e03298a10d1&imgtype=0&src=http%3A%2F%2Fupload.uschinapress.com%2F2015%2F0922%2F1442954172522.jpg"></image>
                </div>
                <div class="div1">
                    <text class="text">中国工商银行</text>

                    <text class="text1">尾号2222  储蓄卡  </text>

                </div>
            </div>
            <div class="left">
                <div class="image">
                    <image style="width:100px; height:100px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508910519&di=afad3aa3b15aa7ab6bdb97bf124601ee&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.ishuo.cn%2Fdoc%2F1610%2F869-1610140Z924-51.jpg"></image>
                </div>
                <div class="div1">
                    <text class="text">中国建设银行</text>

                    <text class="text1">尾号3333 储蓄卡  </text>

                </div>
            </div>
            <div class="left">
                <div class="image">
                    <image style="width:100px; height:100px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508315700334&di=a04888c64042bb274f495705a88268a3&imgtype=0&src=http%3A%2F%2Fwww.swhaifeng.com%2Ffile%2Fupload%2F201312%2F31%2F17-01-35-43-1.gif"></image>
                </div>
                <div class="div1">
                    <text class="text">中国银行</text>

                    <text class="text1">尾号4444 储蓄卡  </text>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="less" src="../../../style/wx.less"/>

<style>

    .left{
        background-color:#ffffff;
        border-style: solid;
        border-bottom-width:1px;
        border-color:#CCC;
        height: 120px;
    }
    .div{
        background-color:#eee;
    }
    .image{
        width:30px;
        height:30px;
        padding-top:20px;
    }

    .div1{
        width:auto;
        height:120px;
        border-style: solid;

        padding-left:120px;
        flex-direction: column;

    }
    .text{
        font-size:32px;
    }
    .text1{
        padding-top:10px;
        font-size:28px;
        color:#ccc;
    }
</style>
<script>
    var modal = weex.requireModule('modal')
    var event = weex.requireModule('event')
    import navbar from '../../../include/navbar.vue';

    export default {
        components: {
            navbar
        },
        props: {
            title: {default: "我的银行卡"},
            complete: {default: "添加"}
        },
        methods: {
            goback: function () {
                event.closeURL()
            },
            goComplete:function (e) {
                event.openURL('http://192.168.2.241:8081/bank.weex.js', function () {

                })
            }
            }

    }
</script>
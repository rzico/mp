<template>
    <div class="header" :class="[classHeader(),border==true?'':'cb']" >
        <div class="nav_back" @click="goback('/')">
            <text class="nav_ico"  :style="{fontFamily:'iconfont'}">&#xe669;</text>
        </div>
        <div class="nav">
            <text class="nav_title" @click="goback('/')">{{title}}</text>
            <div style="flex-direction: row">
            <div class="navRightBox"  @click="choose('/')" v-if="status != 'returned' && status != 'refunded' && status != 'completed'">
                <text class="nav_CompleteIcon"  :style="{fontFamily:'iconfont'}" v-if="addresschoose != ''">{{address}}</text>
            </div>
            <div class="navRightBox"  @click="goComplete('/')">
                <text class="nav_Complete nav_title" v-if="completeIcon == ''" >{{complete}}</text>
                <text class="nav_CompleteIcon"  :style="{fontFamily:'iconfont'}" v-else>{{getIco}}</text>
            </div>
            </div>
         </div>
    </div>
 </template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
    .cb {
        border-bottom-width: 0px;
    }
    .navRightBox{
        min-width: 92px;
        height: 92px;
        align-items: center;
        justify-content: center;
    }
    .nav_bg {
        width:750px;
        height: 156px;
        background-size: cover;
        position: absolute;
        top:0;
    }
    .nav_ico {
        font-size: 38px;
        color: #fff;
        margin-top: 2px;
    }
    .nav_CompleteIcon{
        /*如果nav_ico的字体大小改变这个值也需要变。 （左边box宽度-back图标宽度)/2 */
        padding-left: 27px;
        padding-right: 27px;
        /*ios识别不出该字体，warn警告。  推测可能隐藏到字体图标的渲染*/
        /*font-family: Verdana, Geneva, sans-serif;*/
        font-size: 44px;
        line-height: 44px;
        color: #FFFFFF;
    }
    .nav_Complete {
        padding-left: 27px;
        padding-right: 27px;
        /*ios识别不出该字体，warn警告。  推测可能隐藏到字体图标的渲染*/
        /*font-family: Verdana, Geneva, sans-serif;*/
    }

</style>
<script>
    import utils from '../assets/utils'
    var he = require('he');
    export default {
        props: {
            title: { default: "navbar" },
            complete:{default:''},
            addresschoose:{default:''},
            completeIcon:{default:''},
            showComplete:{default:true},
            border:{default:true},
            status:{default:"returned"}
        },
        computed: {
            getIco: function() {
                return he.decode(this.completeIcon)
            },
            address:function () {
                return he.decode(this.addresschoose)
            }
        },
        methods: {
            classHeader:function () {
                let dc = utils.device();

                return dc
            },
            goback: function (e) {
                this.$emit('goback');
            },
            goComplete:function (e) {
                this.$emit('goComplete');
            },
            choose:function (e) {
                this.$emit('choose')
            },
        }
     }
</script>

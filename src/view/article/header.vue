<template>
    <div class="header" :class="[classHeader(),border==true?'':'cb']" >
        <!--<image class="nav_bg" :src="'file://resources/images/nav_bg.png'"></image>-->
        <div class="nav_back" @click="goback('/')">
            <text class="nav_ico"  :style="{fontFamily:'iconfont'}">&#xe669;</text>
        </div>
        <div class="nav">
            <text class="nav_title">{{title}}</text>
            <div class="flex-row" v-if="isSelf == 0 ">
                <image :src="authorInfo.logo | watchLogo" class="articleLogo"></image>
                <text class="ml10 mr10 articleAuthorName" >{{authorInfo.nickName | watchNickName}}</text>
                <text class="articleFocus  primary" v-if="!authorInfo.hasFollow" @click="doFocus()">关注</text>
            </div>
            <div class="navRightBox"  v-if="showComplete" @click="goComplete('/')">
                <text class="nav_Complete nav_title" v-if="complete != 'textIcon'">{{complete}}</text>
                <text class="nav_CompleteIcon"  :style="{fontFamily:'iconfont'}" v-else>&#xe72b;</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .articleLogo{
        width: 54px;height: 54px;border-radius: 27px;
    }
    .articleAuthorName{
        color: #fff;font-size: 34px;line-height: 34px;
    }
    .articleFocus{
        border-radius: 5px;
        background-color: #fff;
        font-size: 24px;
        line-height: 24px;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 20px;
        padding-right: 20px;
    }
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
    import utils from '../../assets/utils'
    export default {
        props: {
            title: { default: "" },
            complete:{default:''},
            showComplete:{default:true},
            border:{default:false},
            authorInfo:{
                default: function () {
                    return { title: '', logo:'initLogoDefault',nickName:'initNickDefault', createDate: null,hasFollow:true }
                }
            },
            isSelf:{
                default:0
            }
        },
        filters:{
            watchLogo:function (value) {
                if(utils.isNull(value)){
                    return utils.locate('resources/images/background.png');
                }else {
                    return utils.thumbnail(value,54,54);
                }
            },
            watchNickName:function (value) {
                if(utils.isNull(value)){
                    return 'author';
                }else{
                    //              如果用户名称过长，便截取拼成名字
                    return utils.changeStrLast(value,5);
                }
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
            doFocus:function () {
                this.$emit('doFocus');
            }
        }
    }
</script>
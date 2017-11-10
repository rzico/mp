<template>
    <scroller style="background-color: #fff">
        <navbar :title="title" @goback="goback" > </navbar>
        <div class="collectBox">
            <div class="nameDate">
                <div style="flex-direction: row;align-items: center">
                    <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510323202682&di=b6fdee68edcf56c0aaab3cba73e441dc&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F3801213fb80e7beca9004ec5252eb9389b506b38.jpg" resize="cover" class="authorImg"></image>
                    <text class="authorName ml10">大马哥</text>
                </div>
                <text class="authorName">2017-11-07</text>
            </div>
            <div class="flex-row">
                <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510323330650&di=fccf178eef10385316c8ab3602f76520&imgtype=0&src=http%3A%2F%2Fpic66.nipic.com%2Ffile%2F20150504%2F5624330_144129291000_2.jpg"  resize="cover" class="articleImg"></image>
                <div class="articleInfo">
                    <text class="fz30 articleTitle">立冬(一组几年钱拍的九篇)立冬(一组几年钱拍的九篇)立冬(一组几年钱拍的九篇)</text>
                    <div class="relevantInfo">
                        <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                        <text class="relevantText">121</text>
                        <text class="relevantImage ml20" style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                        <text class="relevantText">233</text>
                        <text class="relevantImage ml20" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                        <text class="relevantText">3222</text>
                    </div>
                </div>
            </div>
        </div>
        <div class="collectBox">
            <div class="nameDate">
                <div style="flex-direction: row;align-items: center">
                    <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510323202682&di=b6fdee68edcf56c0aaab3cba73e441dc&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F3801213fb80e7beca9004ec5252eb9389b506b38.jpg" resize="cover" class="authorImg"></image>
                    <text class="authorName ml10">大马哥</text>
                </div>
                <text class="authorName">2017-11-07</text>
            </div>
            <div class="flex-row">
                <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510323330650&di=fccf178eef10385316c8ab3602f76520&imgtype=0&src=http%3A%2F%2Fpic66.nipic.com%2Ffile%2F20150504%2F5624330_144129291000_2.jpg"  resize="cover" class="articleImg"></image>
                <div class="articleInfo">
                    <text class="fz30 articleTitle">立冬(一组几年钱拍的九篇)立冬(一组几年钱拍的九篇)立冬(一组几年钱拍的九篇)</text>
                    <div class="relevantInfo">
                        <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                        <text class="relevantText">121</text>
                        <text class="relevantImage ml20" style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                        <text class="relevantText">233</text>
                        <text class="relevantImage ml20" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                        <text class="relevantText">3222</text>
                    </div>
                </div>
            </div>
        </div>
    </scroller>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .articleTitle{
        color: #444;
        lines:2;
        text-overflow: ellipsis;
    }
    .authorName {
        font-size: 28px;
        color: #888;
    }
    .authorImg{
        width: 40px;height: 40px;
        border-radius: 20px;
    }
    .relevantImage {
        flex-direction: row;
        font-size: 32px;
        color: #888;
        margin-right: 5px;
        margin-left: 5px;
        align-items: center;
    }
    .relevantText {
        color: #888;
        font-size: 26px;
    }
    .relevantInfo {
        flex-direction: row;
        align-items: center;
    }
    .articleInfo{
        padding-top: 5px;
        padding-bottom: 5px;
        height: 150px;
        width: 400px;
        margin-left: 20px;
        margin-right: 20px;
        justify-content: space-between;
    }
    .articleImg{
        width: 250px;
        height: 150px;
        border-radius: 5px;
    }
    .nameDate{
        flex-direction: row;
        justify-content: space-between;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .collectBox{
        padding-bottom: 20px;
        padding-top: 20px;
        padding-left: 30px;
        padding-right: 30px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color:#ccc;
    }

</style>
<script>
    import navbar from '../../include/navbar.vue';
    const event = weex.requireModule('event');
    const modal = weex.requireModule('modal');
    export default {
        components: {
            navbar
        },
        props:{
            title:{default:'我的收藏'}
        },
        data(){
            return{
                collectList:[{
                    logo:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    nickName:'学校',
                    sign:'的啊我的关注我的关注我的关注我的关注我的关注我的关注',
                    id:3,
                    status:'adopt'
                },{
                    logo:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    nickName:'学校',
                    sign:'的啊我的关注我的关注我的关注我的关注我的关注我的关注',
                    id:3,
                    status:'adopt'
                }]
            }
        },
        methods:{
            goback(){
                event.closeURL();
            }
        }
    }
</script>
<template>
    <div class="corpusBox" :style="{height:heightNum}">
        <scroller scroll-direction="horizontal" class="corpusScroll" show-scrollbar="false"  @scroll="scrollHandler" >
            <div class="articleClass baseNavBg" :style="{height:heightNum}">
                <text @click="corpusChange(index,item.id)" :style="{lineHeight:heightNum}" class="allArticle" v-for="(item,index) in corpusList"  :ref="'corpus'+index"  :class = "[whichCorpus == index && corpusList.length != 0 ? 'corpusActive' : 'noActive']">{{item.name}}</text>
            </div>
        </scroller>
        <image :src="leftMask" v-if="leftMaskShow" resize="cover" class="leftMask"></image>
        <image :src="rightMask" v-if="rightMaskShow" resize="cover" class="rightMask"></image>
        <!--<image :src="dsImg" resize="cover" class="rightMask"></image>-->
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style>
    .leftMask{
        position: absolute;
        left: 0px;
        top: 0;
        width:60px;
        height: 66px;
        bottom:0;
    }
    .rightMask{
        position: absolute;
        width:60px;
        right: 0px;
        top: 0;
        bottom:0;
    }

    .noActive{
        border-bottom-width:0px;
    }
    .corpusBox{
        flex-direction: row;
        /*height:80px;*/
        /*border-bottom-width: 1px;*/
        /*border-style: solid;*/
        /*border-color: gainsboro;*/
        /*background-color: #fff;*/
    }
    .articleClass{
        flex-direction: row;
        padding-left: 10px;
        /*border-bottom-width: 1px;*/
        /*border-bottom-style: solid;*/
        /*border-bottom-color: gainsboro;*/
        /*height:80px;*/
        /*background-color: #fff;*/
    }
    .allArticle{
        font-size: 29px;
        /*line-height: 80px;*/
        padding-left: 20px;
        padding-right: 20px;
        color: #fff;
    }
    .corpusScroll{
         flex-direction: row;width: 750px;
     }
</style>
<script>
    const dom = weex.requireModule('dom');
    import utils from '../assets/utils';
    export default {
        data:function () {
            return{
                corpusIndex :this.whichCorpus,
                arrayList:this.corpusList,
                leftMask:utils.locate('resources/images/444left.png'),
                rightMask:utils.locate('resources/images/444right.png'),
                dsImg:utils.locate('resources/images/background.png'),
                leftMaskShow:false,
                rightMaskShow:true,
            }
        },
        props:{
            corpusList:{default:[]},
            whichCorpus: {default:0},
            heightNum:{default:80}
        },
        methods:{
//            点击导航栏时
            corpusChange:function(index,id){
                let loca = index - 3;
                if(loca < 0){
//                            控制顶部导航的滑动
                    const el = this.$refs['corpus0'][0];
                    dom.scrollToElement(el, { offset: -10 });
                }else {
//                            控制顶部导航的滑动
                    const el = this.$refs['corpus' + loca][0];
                    dom.scrollToElement(el, { offset: 0 });
                }
                this.$emit('corpusChange',index);
            },
            leftShow(){
                this.leftMaskShow = true;
            },
            rightShow(){
                this.rightMaskShow = true;
            },
            leftHide(){
                this.leftMaskShow = false;
            },
            rightHide(){
                this.rightMaskShow = false;
            },
            scrollHandler:function (e) {
                if(e.contentOffset.x < 0){
                    this.leftMaskShow = true;
                    this.rightMaskShow = true;
                }else{
                    this.leftMaskShow = false;
                }
            }
        }

    }
</script>
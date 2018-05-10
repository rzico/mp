<template>
    <div class="corpusBox" :style="{height:heightNum}">
        <scroller scroll-direction="horizontal" class="corpusScroll" show-scrollbar="false">
            <div class="articleClass" :style="{height:heightNum}">
                <text @click="corpusChange(index,item.id)" :style="{lineHeight:heightNum}" class="allArticle" v-for="(item,index) in corpusList"  :ref="'corpus'+index"  :class = "[whichCorpus == index && corpusList.length != 0 ? 'corpusActive' : 'noActive']">{{item.name}}</text>
            </div>
        </scroller>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style>
    .noActive{
        border-bottom-width:0px;
    }
    .corpusBox{
        flex-direction: row;
        /*height:80px;*/
        /*border-bottom-width: 1px;*/
        /*border-style: solid;*/
        /*border-color: gainsboro;*/
        background-color: #fff;
    }
    .articleClass{
        flex-direction: row;
        padding-left: 10px;
        /*border-bottom-width: 1px;*/
        /*border-bottom-style: solid;*/
        /*border-bottom-color: gainsboro;*/
        /*height:80px;*/
        background-color: #fff;
    }
    .allArticle{
        font-size: 29px;
        /*line-height: 80px;*/
        padding-left: 20px;
        padding-right: 20px;
    }
    .corpusScroll{
         flex-direction: row;width: 750px;
     }
</style>
<script>
    const dom = weex.requireModule('dom')
    export default {
        data:function () {
            return{
                corpusIndex :this.whichCorpus,
                arrayList:this.corpusList,
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
                    dom.scrollToElement(el, { offset: 0 });
                }else {
//                            控制顶部导航的滑动
                    const el = this.$refs['corpus' + loca][0];
                    dom.scrollToElement(el, { offset: 0 });
                }
                this.$emit('corpusChange',index);
            }
        }

    }
</script>
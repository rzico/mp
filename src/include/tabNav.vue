<template>
    <div class="corpusBox"  >
        <scroller scroll-direction="horizontal" class="corpusScroll">
            <div class="articleClass">
                <text @click="corpusChange(index,item.id)" class="allArticle" v-for="(item,index) in corpusList" :class = "[whichCorpus == index ? 'active' : 'noActive']">{{item.name}}</text>
            </div>
        </scroller>
    </div>
</template>
<style>
    .active{
        color: #F0AD3C;
        border-color: #F0AD3C;
        border-style: solid;
        border-bottom-width:4px;
    }
    .noActive{
        border-bottom-width:0px;
    }
    .corpusBox{
        flex-direction: row;
        height:80px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
        background-color: #fff;
    }
    .articleClass{
        flex-direction: row;
        padding-left: 10px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
        height:80px;
        background-color: #fff;
    }

    .allArticle{
        font-size: 29px;
        line-height: 80px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .corpusScroll{
         flex-direction: row;width: 750px;
     }
</style>
<script>
    export default {
        props:{
            corpusList:{default:[{id:0,name:"你好"},{id:1,name:"支付宝"},{id:2,name:"钱包余额"},{id:2,name:"钱包余额"},{id:2,name:"钱包余额"},{id:2,name:"钱包余额"},{id:2,name:"钱包余额"}]},
            whichCorpus: {default:0}
        },
        methods:{
            corpusChange:function(index,id){
                var _this = this;
                _this.whichCorpus = index;
            }
        }

    }
</script>
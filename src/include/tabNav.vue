<template>
    <div class="corpusBox"  >
        <scroller scroll-direction="horizontal" class="corpusScroll" show-scrollbar="false">
            <div class="articleClass">
                <text @click="corpusChange(index,item.id)" class="allArticle" v-for="(item,index) in corpusList" :class = "[whichCorpus == index ? 'active' : 'noActive']">{{item.name}}</text>
            </div>
        </scroller>
    </div>
</template>
<style>
    .active{
        /*color: #F0AD3C;*/
        /*border-color: #F0AD3C;*/
        color: #D9141E;
        border-color: #D9141E;
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
        data:function () {
            return{
                corpusIndex :this.whichCorpus,
                arrayList:this.corpusList,
            }
        },
        props:{
            corpusList:{default:[]},
            whichCorpus: {default:0}
        },
        methods:{
            corpusChange:function(index,id){
                this.$emit('corpusChange',index);
            }
        }

    }
</script>
<template>
    <div class="wrapper">
        <headerNav></headerNav>
        <tabNav :corpusList="corpusList"   :whichCorpus="whichCorpus" @corpusChange="corpusChange"></tabNav>
        <div  class="pageBox" :style="{width:pageWidth + 'px'}" ref="contentBox">
            <div v-for="(item,index) in corpusList" :style="{left: index * 750 + 'px'}" class="categoryBox">
                <hotCategory  @onpanmove="onpanmove" :type="item.name" :scrollable="canScroll"></hotCategory>
            </div>
            <!--<div style="left:0" class="categoryBox">-->
                <!--<hotCategory  @onpanmove="onpanmove"  :scrollable="canScroll"></hotCategory>-->
            <!--</div>-->
            <!--<div style="left: 750px;" class="categoryBox">-->
                <!--&lt;!&ndash;<focusCategory class="activeClasss"  ref="ss1" @onpanmove="onpanmove" :scrollable="canScroll"></focusCategory>&ndash;&gt;-->
                <!--<focusCategory  @onpanmove="onpanmove"   :scrollable="canScroll"></focusCategory>-->
            <!--</div>-->
            <!--<focusCategory :class="[whichCorpus == 1 ? 'activeClass' : 'noactive']" ref="ss2" @onpanmove="onpanmove"></focusCategory>-->
            <!--<focusCategory  :class="[whichCorpus == 2 ? 'activeClass' : 'noactive']"></focusCategory>-->
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .pageBox{
        position: fixed;top: 216px;left: 0;bottom: 0;
    }
    .activeClass{
        /*visibility: visible;*/
        top: 0px;
        width: 750px;
        bottom:0;
        position: absolute;
    }
    .categoryBox{
        /*visibility: visible;*/
        width: 750px;
        bottom:0;
        top:0;
        position: absolute;
    }
</style>
<script>
    import headerNav from './header.vue';
    import hotCategory from './hotCategory.vue';
    import focusCategory from './focusCategory.vue';
    import tabNav from '../../include/tabNav.vue';
    import utils from '../../assets/utils';
    const event = weex.requireModule('event');
    const animation = weex.requireModule('animation');
    import { POST, GET } from '../../assets/fetch';
    export default {
        data:function () {
            return{
                canScroll0:true,
                canScroll1:false,
                whichCorpus:0,
                listCurrent:0,
                listPageSize:10,
                canScroll:true,
                pageWidth:750,
            }
        },
        components: {
            headerNav,tabNav,hotCategory,focusCategory
        },
        props:{
            corpusList:{
                default: function () {
                    return [{}]
                }},
//            whichCorpus: {default:0}
        },
        created(){
            var _this = this;
            GET('article_category/list.jhtml',function (data) {
                if(data.type == 'success' && data.data != ''){
                    _this.corpusList = data.data;
                    _this.pageWidth = data.data.length * 750;
                }
            },function (err) {
                event.toast(err.content);
            })

        },
        methods: {
            data:function () {
            },
            back: function () {
            },
//            点击顶部分类时。
            corpusChange(index){
                this.whichCorpus = index;
                let distance = index * 750;
                animation.transition(this.$refs.contentBox, {
                    styles: {
                        transform: 'translateX(-' +distance +')',
                    },
                    duration: 600, //ms
                    timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                    needLayout:false,
                    delay: 0 //ms
                },function () {
                })
            },
//            滑动分类里文章内容时
            onpanmove(e){
                var _this = this;
                if(e == 'left'){
                    if(this.whichCorpus == this.corpusList.length - 1){
                        return;
                    }
                    _this.canScroll = false;
                    _this.whichCorpus ++;
                    let leftDistance = _this.whichCorpus * 750;
                    animation.transition(this.$refs.contentBox, {
                        styles: {
                            transform: 'translateX(-' + leftDistance +')',
                        },
                        duration: 600, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {
                        _this.canScroll = true;
                    })

                }else if(e == 'right'){
                    if(this.whichCorpus == 0){
                        return;
                    }else{
                        _this.canScroll = false;
                        this.whichCorpus --;
                        let rightDistance = _this.whichCorpus * 750;
                        animation.transition(this.$refs.contentBox, {
                            styles: {
                                transform: 'translateX(-' + rightDistance +')',
                            },
                            duration: 600, //ms
                            timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                            needLayout:false,
                            delay: 0 //ms
                        },function () {
                            _this.canScroll = true;
                        })
                    }
                }
            }
        }
    }
</script>



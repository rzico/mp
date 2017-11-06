<template>
    <scroller>
        <div>{{type}}</div>
        <div class="articleBox" v-for="(item,index) in articleList" :key="index" @click="goArticle(item.key)" @swipe="onpanmove($event)">
            <div class="atricleHead">
                <text class="articleTitle">{{item.value.title}}</text>
            </div>
            <!--文章封面-->
            <div style="position: relative">
                <image :src="item.value.thumbnail" resize="cover" class="articleCover"></image>
            </div>
            <!--文章底部-->
            <div class="articleFoot">
                <div>
                    <text class="articleDate">2017-09-01</text>
                </div>
                <div class="relevantInfo" v-if="item.articleSign != '样例'">
                    <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                    <text class="relevantText">{{item.value.hits}}</text>
                    <text class="relevantImage " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                    <text class="relevantText">{{item.value.laud}}</text>
                    <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                    <text class="relevantText">{{item.value.review}}</text>
                </div>
            </div>
        </div>
        <loading class="loading" @loading="onloading" :display="showLoading">
            <text class="indicator">Loading ...</text>
        </loading>
    </scroller>
</template>
<style>

    .activeClass{
        visibility: visible;
    }
    .noactive{
        visibility: hidden;
    }
    /*.wrapper{*/
        /*background-color: #f4f4f4;*/
        /*flex:1;*/
    /*}*/
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

    .articleFoot {
        flex-direction: row;
        justify-content: space-between;
        width: 690px;
        align-items: center;
    }

    .articleDate {
        font-size: 24px;
        color: #888;
    }

    .articleCover {
        height: 300px;
        width:690px;
        border-radius: 5px;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .articleBox {
        background-color: #ffffff;
        padding-left: 30px;
        padding-top: 30px;
        padding-right: 30px;
        padding-bottom: 30px;
        margin-bottom: 10px;
    }

    .atricleHead {
        flex-direction: row;
        align-items: center;
    }

    .articleTitle {
        font-size: 32px;
        margin-left: 10px;
    }

    .articleSign {
        border-radius: 10px;
        padding: 5px;
        color: #888;
        font-size: 26px;
        border-width: 1px;
        border-style: solid;
        border-color: gainsboro;
    }
</style>
<script>
    import utils from '../../assets/utils';
    const event = weex.requireModule('event');
    export default {
        data(){
            return{
                showLoading: 'hide',
                listCurrent:0,
                listPageSize:10,
//                articleList:[]
                articleList:[{
                    value:{
                        key:1,
                        title:'你好',
                        thumbnail:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg'
                    }},{
                    value:{
                        key:1,
                        title:'你好发',
                        thumbnail:'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'
                    }} ,{
                    value:{
                        key:1,
                        title:'你好额',
                        thumbnail:'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'
                    }},{
                    value:{
                        key:1,
                        title:'你好的',
                        thumbnail:'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'
                    }},{
                    value:{
                        key:1,
                        title:'你好啊',
                        thumbnail:'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'
                    }},{
                    value:{
                        key:1,
                        title:'你好a',
                        thumbnail:'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'
                    }
                }]
            }
        },
        props:{
//            whichCorpus:{default:0}
            type:{default:'亲子'}
        },
        created(){
            utils.initIconFont();
            var _this = this;
            let options = {
                type:'article',
                keyword:'',
                orderBy:'desc',
                current:_this.listCurrent,
                pageSize:_this.listPageSize,
            }
            event.findList(options,function (data) {
                if( data.type == "success" && data.data != '' ) {
                    data.data.forEach(function (item) {
//                    将value json化
                        item.value = JSON.parse(item.value);
//                        把读取到的文章push进去文章列表
                        _this.articleList.push(item);
                    })
                }else{
                    return;
                }
            })
        },
        methods:{
            goArticle(){
                event.toast('跳转文章');
            },
            onpanmove(e){
                this.$emit('onpanmove',e.direction);
            },
            onloading (event) {
                this.showLoading = 'show'
                setTimeout(() => {
                    this.articleList.push({
                        value:{
                            key:1,
                            title:'我是新加入的',
                            thumbnail:'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'
                        }
                    })
                    this.showLoading = 'hide'
                }, 1500)
            }
        }
    }
</script>
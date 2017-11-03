<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller" show- show-scrollbar="false">
            <div class="cell-row-row cell-line mt0 cell-bottom-clear" v-for="item in dataList"  @click="checkChange(item.id,item.name)">
                <!--<div class="cell-panel  cell-clear ml10">-->
                    <!--<div class="flex-row" >-->
                        <!--<text class="iconImg" :style="{fontFamily:'iconfont'}">&#xe61a;</text>-->
                    <!--</div>-->
                    <div class="flex-row ml10">
                        <text class="title ml10">{{item.name}}</text>
                    </div>
                <!--</div>-->
                <div v-if="categoryId == item.id" >
                    <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                </div>
            </div>

        </scroller>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
</style>
<script>
    import {dom,event,stream,storage} from '../../../weex.js'
    import navbar from '../../../include/navbar.vue'
    import utils from '../../../assets/utils'
    const modal = weex.requireModule('modal');
    import { POST, GET } from '../../../assets/fetch';
    export default {
        data(){
            return{
                categoryId:7,
                categoryName:'生活',
                dataList:[],
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "文章类别" }
        },
        created(){
            var _this = this;
            this.categoryId = utils.getUrlParameter('categoryId');
            let urlType = utils.getUrlParameter('type');
            GET(urlType + '/list.jhtml',function (data) {
                event.toast(data);
                if(data.type == 'success' && data.data != ''){
                    _this.dataList = data.data;
                    data.data.forEach(function (item) {
                        if(item.id == _this.categoryId){
                            _this.categoryName = item.name;
                        }
                    })
                }
            },function (err) {
                event.toast(err.content);
            })
        },
        methods: {
            goback: function (e) {
                let E = {
                    categoryId : this.categoryId,
                    categoryName : this.categoryName
                }
                let backData = utils.message('success','成功',E);
                event.closeURL(backData);
            },
            setup: function (e) {

            },
//            选择相应数据时触发。
            checkChange:function (id,name) {
                var _this = this;
                    this.categoryId = id;
                    this.categoryName = name;
                    let E = {
                        categoryId : this.categoryId,
                        categoryName : this.categoryName
                    }
                    let backData = utils.message('success','成功',E);
                    event.closeURL(backData);
            }
        }
    }
</script>
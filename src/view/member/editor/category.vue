<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller" show- show-scrollbar="false">
            <div class="cell-row-row cell-line mt0 cell-bottom-clear" @click="checkChange(0)">
                <div class="cell-panel  cell-clear ml10">
                    <div class="flex-row" >
                        <text class="iconImg" :style="{fontFamily:'iconfont'}">&#xe61a;</text>
                    </div>
                    <div class="flex-row ml10">
                        <text class="title ml10">摄影</text>
                    </div>
                </div>
                <div v-if="categoryId == 0" >
                    <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                </div>
            </div>
            <div class="cell-row-row cell-line mt0 cell-bottom-clear" @click="checkChange(1)">
                <div class="cell-panel  cell-clear ml10">
                    <div class="flex-row" >
                        <text class="iconImg" style="color: saddlebrown;" :style="{fontFamily:'iconfont'}">&#xe600;</text>
                    </div>
                    <div class="flex-row ml10">
                        <text class="title ml10">美文</text>
                    </div>
                </div>
                <div v-if="categoryId == 1" >
                    <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                </div>
            </div>
            <div class="cell-row-row cell-line mt0 cell-bottom-clear" @click="checkChange(2)">
                <div class="cell-panel  cell-clear ml10">
                    <div class="flex-row" >
                        <text class="iconImg" style="color: #0088fb;" :style="{fontFamily:'iconfont'}">&#xe82f;</text>
                    </div>
                    <div class="flex-row ml10">
                        <text class="title ml10">旅行</text>
                    </div>
                </div>
                <div v-if="categoryId == 2" >
                    <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                </div>
            </div>
            <div class="cell-row-row cell-line mt0 cell-bottom-clear" @click="checkChange(3)">
                <div class="cell-panel  cell-clear ml10">
                    <div class="flex-row" >
                        <text class="iconImg" style="color: #888;" :style="{fontFamily:'iconfont'}">&#xe687;</text>
                    </div>
                    <div class="flex-row ml10">
                        <text class="title ml10">其他</text>
                    </div>
                </div>
                <div v-if="categoryId == 3" >
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
    export default {
        data(){
            return{
                categoryId:0,
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "文章类别" }
        },
        created(){
            this.categoryId = utils.getUrlParameter('categoryId');
        },
        methods: {
            goback: function (e) {
                let E = {
                    categoryId : this.categoryId
                }
                let backData = utils.message('success','成功',E);
                event.closeURL(backData);
            },
            setup: function (e) {

            },
            checkChange:function (id) {
                var _this = this;
                    this.categoryId = id;
                    let E = {
                        categoryId : this.categoryId
                    }
                    let backData = utils.message('success','成功',E);
                    event.closeURL(backData);
            }
        }
    }
</script>
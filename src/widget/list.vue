<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller" show- show-scrollbar="false">
            <div class="cell-row-row cell-line mt0 cell-bottom-clear active" v-for="item in dataList"  @click="checkChange(item.id,item.name)">
                    <div class="flex-row ml10">
                        <text class="title ml10 sss">{{item.name}}</text>
                    </div>
                <div v-if="listId == item.id" >
                    <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                </div>
            </div>
        </scroller>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>

<style scoped>
    .active:active{
        background-color: #999;
    }
</style>
<script>
    import {dom,event,stream,storage} from '../weex.js'
    import navbar from '../include/navbar.vue'
    import utils from '../assets/utils'
    const modal = weex.requireModule('modal');
    import { POST, GET } from '../assets/fetch';
    export default {
        data(){
            return{
                listId:'',
                listName:'',
                dataList:[],
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "选择" }
        },
        created(){
            var _this = this;
            this.listId = utils.getUrlParameter('listId');
            let urlType = utils.getUrlParameter('type');
            if(urlType == 'article_category'){
                this.title = '文章类别';
            }
            else if(urlType == 'category'){
                this.title = '职业选择';
            }
            else if(urlType == 'template'){
                this.title = '模版选择';
            }
            GET(urlType + '/list.jhtml',function (data) {
                if(data.type == 'success' && data.data != ''){
                    _this.dataList = data.data;
                    data.data.forEach(function (item) {
                        if(item.id == _this.listId){
                            _this.listName = item.name;
                        }
                    })
                }
            },function (err) {
                event.toast(err.content);
            })
        },
        methods: {
            goback: function (e) {
                var E = '';
                if(!utils.isNull(this.listId)){
                     E = {
                        listId : this.listId,
                        listName : this.listName
                    }
                }
                let backData = utils.message('success','成功',E);
                event.closeURL(backData);
            },
            setup: function (e) {

            },
//            选择相应数据时触发。
            checkChange:function (id,name) {
                var _this = this;
                    this.listId = id;
                    this.listName = name;
                    let E = {
                        listId : this.listId,
                        listName : this.listName
                    }
                    let backData = utils.message('success','成功',E);
                    event.closeURL(backData);
            }
        }
    }
</script>
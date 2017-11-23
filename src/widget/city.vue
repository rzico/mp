<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller" show- show-scrollbar="false">
            <!--省份选择-->
            <div v-if="urlType == 'pro'" class="cell-row-row cell-line mt0 cell-bottom-clear active" v-for="item in dataList"  @click="checkChange(item.id,item.name,item.children)">
                <div class="flex-row ml10">
                    <text class="title ml10 sss">{{item.name}}</text>
                </div>
                <!--是否选择行-->
                <div v-if="listId == item.id" >
                    <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                </div>
            </div>
            <!--城市选择-->
            <div  v-if="urlType == 'city'"  v-for="item in dataList">
                <div class="cell-row-row cell-line mt0 cell-bottom-clear active" v-for="city in item.children" @click="checkChange(city.id,city.name,city.children)">
                    <div class="flex-row ml10">
                        <text class="title ml10 sss">{{city.name}}</text>
                    </div>
                    <!--是否选择行-->
                    <div v-if="listId == city.id" >
                        <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                    </div>
                </div>
            </div>
            <!--区县选择-->
            <div  v-if="urlType == 'country'"  v-for="item in dataList">
                <div class="cell-row-row cell-line mt0 cell-bottom-clear active" v-for="city in item.children" @click="checkChange(city.id,city.name,'')">
                    <div class="flex-row ml10">
                        <text class="title ml10 sss">{{city.name}}</text>
                    </div>
                    <!--是否选择行-->
                    <div v-if="listId == city.id" >
                        <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                    </div>
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
    import { getCity } from '../assets/city';
    export default {
        data(){
            return{
//                用来用户返回界面时勾选行
                listId:'',
                dataList:[],
                typeArr:['pro','city','country'],
                typeId:0,
                urlType:'pro'
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
            this.listId = utils.isNull(utils.getUrlParameter('listId')) ? '' : utils.getUrlParameter('listId');
            let a =  utils.getUrlParameter('type');
            if(!utils.isNull(a)){
                this.urlType = this.typeArr[a];
                _this.typeId = a;
            }
//            判断是选择第几级城市。
            switch (this.urlType){
                case 'pro':
                    this.dataList = getCity.getPro();
                    this.title = '省份选择';
                    break;
                case 'city':
                    this.dataList = getCity.getCity(this.listId);
                    this.title = '城市选择';
                    break;
                case 'country':
                    this.dataList = getCity.getCountry(this.listId);
                    this.title = '区县选择';
                    break;
                default:
                    break;
            }
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            setup: function (e) {

            },
//            选择相应数据时触发。
            checkChange:function (id,name,city) {
                var _this = this;
                this.listId = id;
//                判断是否选择到区县或者该省/市没有下一级地区时，结束城市选择。
                if(_this.typeId  == 2 || city == ''){
                    let E = {
                        name : name ,
                        chooseId:id,
                        chooseArea:name
                    }
                    let backData = utils.message('success','成功',E);
                    event.closeURL(backData);
                }else{
                    let typeId = parseInt(this.typeId) + 1;
                        event.openURL(utils.locate('widget/city.js?type=' + typeId + '&listId=' + this.listId),function (data) {
                        if(data.type == 'success' && !utils.isNull(data.data) ){
//                            当选择完毕后，一级一级的把名字拼凑起来返回到页面去，并记录下最后一级的id跟名字 用于传给服务器。
                            let  E = {
                                name:name + ' ' + data.data.name,
                                chooseId:data.data.chooseId,
                                chooseArea:data.data.chooseArea
                            };
                            let backData = utils.message('success','成功',E);
                            event.closeURL(backData);
                        }
                    })
                }

            }
        }
    }
</script>
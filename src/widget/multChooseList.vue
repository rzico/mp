<template>
    <div class="wrapper">
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="goComplete"> </navbar>
        <scroller class="scroller" show- show-scrollbar="false">
            <div class="cell-row-row cell-line mt0 cell-bottom-clear active" v-for="item in dataList"  @click="checkChange(item)">
                <div class="flex-row ml10">
                    <text class="title ml10 sss">{{item.name}}</text>
                </div>
                <div v-if="item.check">
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
                chooseList:[],
                chooseNum:0
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "企业方向" },
            complete:{default:"完成"}
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
            }else{
                urlType = 'article_category'
            }
            GET(urlType + '/list.jhtml',function (data) {
//                event.toast(data);
                if(data.type == 'success' && data.data != ''){
                    data.data.forEach(function (item) {
                        if(item.id == _this.listId){
                            _this.listName = item.name;
                        }
                        item.check = false;
                    })
                    _this.dataList = data.data;
                }
            },function (err) {
                event.toast(err.content);
            })
        },
        methods: {
            goback: function (e) {
                let backData = utils.message('error','失败','');
                event.closeURL(backData);
            },
            setup: function (e) {

            },
            goComplete:function () {
                let _this = this;
              this.dataList.forEach(function (item) {
                  if(item.check){
                      _this.chooseList.push({
                          id:item.id,
                          name:item.name
                      })
                  }
              })
                let backData = utils.message('success','成功',this.chooseList);
                event.closeURL(backData);
            },
//            选择相应数据时触发。
            checkChange:function (item) {
                if(item.check){
                    this.chooseNum --;
                    item.check = !item.check;
                    return;
                }
                if(this.chooseNum >= 3){
                    event.toast('最多只能选择3个')
                    return;
                }
                var _this = this;
                item.check = !item.check;
                if(item.check){
                    this.chooseNum ++;
                }else{
                    this.chooseNum --;
                }
//                this.listId = id;
//                this.listName = name;
//                let E = {
//                    listId : this.listId,
//                    listName : this.listName
//                }
//                let backData = utils.message('success','成功',E);
//                event.closeURL(backData);
            }
        }
    }
</script>
<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <div class="contentBox">
          <div class="infoBox" @click="get()">
              <image class="image"></image>
              <text class="infoText">测试配送员</text>
          </div>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .wrapper{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color:white;
    }
    .contentBox{

    }
    .infoBox{
        flex-direction: row;
        align-items: center;
        width: 750px;
        height: 120px;
        padding-left: 30px;
        border-bottom-width: 1px;
        border-color: #cccccc;
    }
    .image{
        height: 80px;
        width: 80px;
        border-radius: 100%;
        border-width: 5px;
        border-color: #ccc;
    }
    .infoText{
        font-size: 32px;
        margin-left: 20px;
    }
</style>
<script>
    import {dom,event,stream,storage} from '../../../weex.js'
    import utils from '../../../assets/utils.js'
    import { POST, GET } from '../../../assets/fetch'
    import navbar from '../../../include/navbar.vue'
    const picker = weex.requireModule('picker');
    const modal = weex.requireModule('modal');
    export default {
        data: function () {
            return {

            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "配送员列表"},
        },
        created() {
            utils.initIconFont();

        },
        methods: {
            goback(){
                event.closeURL();
            },
            get:function(){
                var data = {
                    name:'测试配送员'
                };
                let E = utils.message('success','返回配送员',data)
                event.closeURL(E);
            }

        }
    }
</script>
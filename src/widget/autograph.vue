<template>
    <div style="background-color: white">
        <div class="header">
            <navbar :title="title" :complete="complete" @goback="goback"  @goComplete="goComplete"> </navbar>
        </div>
        <div class="wrapper" v-if="autotext == 'companyName'">
            <textarea class="textarea" @input="oninput" autofocus="true" maxlength="16" placeholder="不超过16个字" v-model="autograph"></textarea>
        </div>
        <div class="wrapper" v-else>
            <textarea class="textarea" @input="oninput" autofocus="true" maxlength="30" placeholder="不超过30个字" v-model="autograph"></textarea>
        </div>
    </div>
</template>
<style>
    .textarea {
        font-size: 32px;
        width: 750px;
        height: 400px;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
</style>
<script>
    import navbar from '../include/navbar.vue';
    import utils from '../assets/utils'
    const modal = weex.requireModule('modal');
    const storage = weex.requireModule('storage');
    var event = weex.requireModule('event');

    export default {
        data :function(){
            return{
                autograph:'',
                autotext:''
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "修改个性签名"},
            complete: {default: "完成"}
        },
        created() {
            var _this = this ;
            this.autotext = utils.getUrlParameter('name');
            if(this.autotext == 'articleTitle'){
                this.title = '修改标题';
            }else if(this.autotext == 'companyName'){
                this.title = '修改公司名';
            }
            storage.getItem(this.autotext, e => {
//                event.toast(e)
                let textData = JSON.parse(e.data);
                _this.autograph = textData.autograph;
                storage.removeItem(this.autotext);
            })
        },
        methods: {
            oninput (event) {
//                console.log('oninput:', event.value);
                this.autograph = event.value
            },
            goback: function () {
                event.closeURL()
            },
            goComplete:function (e) {
                var E = {
                    text:this.autograph
                }
                let backData = utils.message('success','成功',E);
                event.closeURL(backData);
            }
        }
    }
</script>
<template>
    <div class="header">
        <div class="flex-center flex1">
            <image class="logo" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg" ></image>
        </div>
        <div class="search_box flex4" @click="search()">
            <text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe611;</text>
            <text class="sub_title">搜索</text>
        </div>
        <div class="flex-center flex1" @click="scan()">
            <text class="scan" :style="{fontFamily:'iconfont'}" >&#xe607;</text>
        </div>
    </div>
 </template>

<style scoped>
    .search_box {
        margin-top:55px;
        padding-left: 20px;
        height: 60px;
        border-width: 1px;
        border-color: #ccc;
        border-style: solid;
        border-radius:8px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: white;
    }
    .logo {
        margin-top:35px;
        height:55px;
        width:55px;
        border-radius:6px;
    }
    .scan {
        margin-top:40px;
        font-size: 40px;
        line-height: 60px;
        height:60px;
        width:60px;
        color:white;
    }
</style>
<script>
    const event = weex.requireModule('event');
    const dom=weex.requireModule("dom");
    export default {
        created() {
            var _this = this;
            dom.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('"+_this.locateURL+"/resources/fonts/iconfont.ttf')"
            });
        },
        methods: {
            scan:function (e) {
                event.scan(function (resp) {
                    if (resp.type="success") {
                        event.openURL(resp.data,function (data) {
                            
                        })
                    }

                })
            },
            search:function(w){
                this.$emit('search',this.keyword);
            }
        }
    }
</script>
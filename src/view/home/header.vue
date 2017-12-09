<template>
    <div>
        <div class="header" :class="[classHeader()]">
            <div class="nav" style="width:750px;">
                <div class="flex-center flex1" >
                    <image class="logo" :src="'file://resources/logoWhite.png'" ></image>
                </div>
                <div class="search_box flex4" @click="search()">
                    <text class="ico_small gray mr5" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                    <text class="sub_title ml5">搜索用户和文章</text>
                </div>
                <div class="flex-center flex1" @click="menu()">
                    <text class="scan" :style="{fontFamily:'iconfont'}" >&#xe72b;</text>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .search_box {
        /*padding-left: 20px;*/
        /*margin-left: 20px;*/
        height: 66px;
        border-width: 1px;
        border-color: #ccc;
        border-style: solid;
        /*border-radius:8px;*/
        border-radius:10px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: white;
    }
    .logo {
        /*height:55px;*/
        /*width:55px;*/
        height:66px;
        width:66px;
        border-radius:6px;
    }
    .scan {
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
    import utils from '../../assets/utils';
    export default {
        created() {
        },
        methods: {
            classHeader:function () {
                let dc = utils.device();

                return dc
            },
            menu:function (e) {
//                event.scan(function (resp) {
//                    if (resp.type == "success") {
//                        event.openURL(resp.data,function (data) {
//                        })
//                    }
//
//                })
                this.$emit('menu');
            },
            search:function(w){
                this.$emit('search',this.keyword);
            }
        }
    }
</script>
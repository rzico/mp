<template>
    <div class="search">
        <div class="search_box flex5" @click="gosearch()">
            <div class="flex-start">
               <text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe611;</text>
               <input class="search_input" type="text" return-key-type="done" v-model="keyword" @input="oninput" @return = "search" autofocus="true" :placeholder="searchHint"/>
            </div>
            <text class="clearBuf ico_small gray" :style="{fontFamily:'iconfont'}" @click="clearBuf">&#xe60a;</text>
        </div>
        <div class="flex-center flex1" @click="goback()">
            <text class="primary">取消</text>
        </div>
    </div>
 </template>
<style lang="less" src="../style/wx.less"/>

<style scoped>
    .search {
        position:sticky;
        background:#eee;
        padding-top: 40px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #999;
        height: 136px;
    }
    .search_box {
        margin-top:20px;
        margin-left:20px;
        margin-right:20px;
        margin-bottom:20px;
        padding-left: 20px;
        height: 60px;
        border-width: 1px;
        border-color: #ccc;
        border-style: solid;
        border-radius:8px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
    }
    .clearBuf {
        width:58px;
        height:58px;
        text-align: center;
        padding-top: 10px;
    }
    .search_input {
        margin-left: 20px;
        font-size:32px;
        line-height: 58px;
        height: 58px;
        width:400px;
    }

</style>
<script>
    const event = weex.requireModule('event');
    export default {
        data() {
            return {
                keyword:""
            }
        },
        props: {
            keyword:{default:''},
            searchHint:{default:'搜索'}
        },
        methods: {
            goback:function (e) {
                event.closeURL();
            },
            oninput:function (event) {
                this.keyword = event.value;
                this.$emit('oninput',this.keyword);
            },
            search:function(w){
                this.$emit('search',this.keyword);
            },
            clearBuf:function () {
                this.keyword = "";
            }
        }
    }
</script>
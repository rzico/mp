<!--手机通讯录顶部导航栏。不是导航栏但是又要实现搜索功能。如果用include的searchNav 样式无法完美实现。在搜索过后会导致样式丢失，所以重新扩展一个小组件-->
<template>
    <div class="search"  >
        <div class="search_box flex5" >
            <div class="flex-start">
                <text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                <input class="search_input" type="text" return-key-type="done" v-model="keyword" @input="oninput" @return = "search" autofocus="true" ref="searchBar" :placeholder="searchHint"/>
            </div>
            <text class="clearBuf ico_small gray" style="margin-top: 3px" :style="{fontFamily:'iconfont'}" @click="clearBuf">&#xe60a;</text>
        </div>
        <div class="flex-center flex1" @click="goback()" v-if="showCancel">
            <text class=" fz32" style="color:#fff">取消</text>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>

<style scoped>
    .search {
        position:sticky;
        background:#eee;
        height: 96px;
        flex-direction: row;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-color:#ccc;
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
    import utils from '../assets/utils'
    const event = weex.requireModule('event');
    export default {
        data() {
            return {
                keyword:"",
            }
        },
        props: {
            keyword:{default:''},
            searchHint:{default:'搜索'},
            showCancel:{default:true},
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
                this.$refs['searchBar'].blur();
                this.$emit('search',this.keyword);
            },
            clearBuf:function () {
                this.keyword = "";
            },
        }
    }
</script>
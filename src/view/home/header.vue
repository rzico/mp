<template>
    <div>
        <div class="header">
            <div style="flex-direction: row;margin-top: 40px;height: 96px;align-items: center;flex: 1;">
                <div class="flex-center flex1" >
                    <image class="logo" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg" ></image>
                </div>
                <div class="search_box flex4" @click="search()">
                    <text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                    <text class="sub_title">搜索用户和文章</text>
                </div>
                <div class="flex-center flex1" @click="scan()">
                    <text class="scan" :style="{fontFamily:'iconfont'}" >&#xe607;</text>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .search_box {
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
        height:55px;
        width:55px;
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

            utils.initIconFont();
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
<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <list >
            <cell :style="{minHeight:screenHeight + 'px'}">
                <div class="setting">
                    <div class="titile">
                        <text class="tiele">普通桶</text>
                    </div>
                    <div class="money">
                        <text class="fz32">送</text>
                        <input type="number" placeholder="输入桶数" class="input" v-model="give" />
                        <text class="monyeTextthree fz32">桶，收</text>
                        <input type="number" placeholder="输入桶数" class="input" v-model="take" />
                        <text class="monyeTextthree fz32">桶</text>
                    </div>
                    <div class="note">
                        <text class="fz32">备注:</text>
                        <input class="noteInput" placeholder="请输入备注" v-model="noteInput"/>
                        <div class="chooseBox" @click="pickNote()">
                            <text class="fz26" style="color: #EB4E40">快速话语</text>
                        </div>
                    </div>
                </div>

                <div class="setting">
                    <div class="titile">
                        <text class="tiele">哇哈哈桶</text>
                    </div>
                    <div class="money">
                        <text class="fz32">送</text>
                        <input type="number" placeholder="输入桶数" class="input" v-model="give" />
                        <text class="monyeTextthree fz32">桶，收</text>
                        <input type="number" placeholder="输入桶数" class="input" v-model="take" />
                        <text class="monyeTextthree fz32">桶</text>
                    </div>
                    <div class="note">
                        <text class="fz32">备注:</text>
                        <input class="noteInput" placeholder="请输入备注" v-model="noteInput"/>
                        <div class="chooseBox" @click="pickNote()">
                            <text class="fz26" style="color: #EB4E40">快速话语</text>
                        </div>
                    </div>
                </div>
            </cell>
            <cell>
                <div style="height:400px"></div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .setting{
        background-color: white;
        margin-left: 25px;
        margin-right: 25px;
        margin-top: 25px;
        border-width: 1px;
        border-color: #cccccc;
        border-radius: 15px;
        overflow: hidden;
    }
    .titile{
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        /*border-radius: 15px;*/
        padding-left: 30px;
        padding-right: 30px;
        background-image: linear-gradient(to right, pink,#EB4E40);
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100px;
    }
    .money{
        padding-left: 30px;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
        height: 100px;
    }
    .note{
        padding-left: 30px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
        height: 100px;
    }
    .monyeTextthree{
        padding-left: 20px;
    }

    .input{
        padding-left: 20px;
        width: 150px;
        font-size: 28px;
        color: red;
        height: 100px;
    }
    .noteInput{
        padding-left: 20px;
        width: 430px;
        font-size: 28px;
        color: #999;
        height: 80px;
    }
    .chooseBox{
        height: 50px;
        width: 130px;
        border-width: 1px;
        border-color: #EB4E40;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
    }
</style>
<script>
    const picker = weex.requireModule('picker');
    var event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import { POST, GET, SCAN } from '../../../assets/fetch'
    export default {
        data: function () {
            return{
                screenHeight:0,
                give:0,
                take:0,
                noteInput:'',
                begin:0,
            }
        },
        created: function () {
            utils.initIconFont();
            this.screenHeight = utils.fullScreen(136)+500;
        },
        components: {
            navbar
        },
        props: {
            title: {default: "送达管理"},
        },
        methods: {
            pickNote:function () {
                let _this = this
                picker.pick({
                    index:_this.begin,
                    items:['楼主不在家','电话无人接听','邻居代收']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.noteInput = '楼主不在家';
                            _this.begin = e.data;
                        }else if(e.data == 1){
                            _this.noteInput = '电话无人接听';
                            _this.begin = e.data;
                        }else if(e.data == 2){
                            _this.noteInput = '邻居代收';
                            _this.begin = e.data;
                        }
                    }
                })
            },
        }
    }
</script>
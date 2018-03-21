<template>
    <div class="dropdown" >
        <div class="select" @click="switchView">
            <div class="left">
                <text class="ico" :style="{fontFamily:'iconfont'}">{{getIco}}</text>
                <text class="title ml10">{{title}}</text>
            </div>
            <div class="right">
                <text class="current-text">{{name}}</text>
                <text class="icon-arrow" :style="{fontFamily:'iconfont'}" ref="arrow">&#xe630;</text>
            </div>
        </div>
        <!--添加动画-->
        <transition-group name="paraTransition" tag="div">
        <div class="options" id="options" key="optionsBox" ref="options" v-if="showOptions">
            <div v-for="item in items" class="option-cell"  @click="onItemClick(item.id)">
                <text class="ico" :style="{fontFamily:'iconfont',color:getColor(item.color)}">{{getItemIco(item.ico)}}</text>
                <text class="name ml10" :class = "[item.id==id ? 'current' : '']">{{item.name}}</text>
                <text class="icon-curr-flag" :style="{fontFamily:'iconfont' }" v-if="item.id == id">&#xe64d;</text>
            </div>
            <!--3.20 柯志杰 注释。-->
            <!--<div class="option-cell" style="border-bottom-width: 0px;"></div>-->
        </div>
        </transition-group>

    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style>

     .dropdown{
        flex-direction: column;
        position: relative;
        z-index: 1000;
    }

     .select {
        width:730px;
        height: 98px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-left:0px;
        padding-right:0px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: #ddd;
        background-color: #fff;
        z-index: 1001;
    }

    .left {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .right {
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }

    .current-text {
        color: #bbb;
        font-size: 30px;
        flex: 1;
        margin-right: 10px;
    }

    .icon-arrow {
        font-size: 32px;
        line-height: 40px;
        width: 40px;
        height: 40px;
        color:#ccc;
        margin-bottom: 8px;
        /*10.19加的(柯)*/
    }

    .options {
        width:750px;
        background-color: #fff;
        transform-origin: center center;
    }

    .option-cell {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 750px;
        height: 98px;
        padding-left:0px;
        padding-right:30px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: #ddd;
    }

    .name {
        color: #333;
        font-size: 33px;
        flex: 1;
    }

    .icon-curr-flag{
        width: 32px;
        height: 32px;
    }

</style>
<script>
    const event = weex.requireModule('event');
    const animation = weex.requireModule('animation')
    var he = require('he');
    export default{
        data:function(){
            return{
                styleObject:{
                    visibility: "hidden"
                },
                showOptions:false,
                ico:'&#xe69f;'
            }
        },
        props: {
            title: { default: "dropdown" },
            id: {default:0},
            items:{default:[]}
        },
        computed: {
            name: {
                get: function(){
                    var id = this.id;
                    return this.items.filter(function(s){
                        return s.id == id
                    })[0].name;
                }
            },
            getIco: function() {
                return he.decode(this.ico)
            }
        },
        methods: {
            getItemIco: function(i) {
                return he.decode(i)
            },
            getColor: function(c) {
                return he.decode(c)
            },
           switchView: function() {
                this.showOptions = !this.showOptions;
                this.rotate(this.$refs['arrow']);
            },

            onItemClick: function(id) {
                this.updateStatus(id);
                this.switchView();
            },

            updateStatus: function(id) {
                if(id == 1){
                    event.toast('该方式暂未开通');
                    return;
                }
                this.id = id;
                this.$emit('onchange',this.id);
            },

            rotate: function(ref, callback) {
                var self = this;
                if(!self.current_rotate) {
                    self.current_rotate = 0;
                }
                if (self.current_rotate==0) {
                    self.current_rotate = self.current_rotate + 90;
                } else {
                    self.current_rotate = self.current_rotate - 90;
                }
                self.anim(ref, {
                    transform: 'rotate(' + self.current_rotate + 'deg)'
                }, 'linear', 100, callback);
            },

            anim: function(ref, styles, timingFunction, duration, callback) {
                animation.transition(ref, {
                    styles: styles,
                    timingFunction: timingFunction,
                    duration: duration
                }, callback || function(){});
            }
        }
    }
</script>
<template>
    <div class="dropdown" >
        <div class="select" @click="switchView">
            <div class="left">
                <text class="ico" :style="{fontFamily:'iconfont'}">{{getIco}}</text>
                <text class="title ml10">{{title}}</text>
            </div>
            <div class="right">
                <text class="current-text">{{name}}</text>
                <text class="icon-arrow" :style="{fontFamily:'iconfont' }" ref="arrow">&#xe630;</text>
            </div>
        </div>

        <!--添加动画-->
        <transition-group name="paraTransition" tag="div">
        <div class="options" id="options" key="optionsBox" ref="options" v-if="showOptions">
            <div v-for="item in items" class="cell"  @click="onItemClick(item.id)">
                <text class="name" :class = "[item.id==id ? 'current' : '']">{{item.name}}</text>
                <text class="icon-curr-flag" :style="{fontFamily:'iconfont' }" v-if="item.id == id">&#xe64d;</text>
            </div>
        </div>
        </transition-group>
    </div>
</template>
<style>

    .paraTransition-enter-active, .paraTransition-leave-active {
        transition: all 0.05s;
    }
    .paraTransition-leave-to{
        transform: translateY(-50px);
        opacity: 0;
    }
    .paraTransition-enter{
        transform: translateY(-50px);
        opacity: 1;
    }
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
        font-size: 33px;
        flex: 1;
        margin-right: 20px;
    }

    .icon-arrow {
        font-size: 32px;
        line-height: 40px;
        width: 40px;
        height: 40px;
        color:#ccc;
    }

    .options {
        width:750px;
        background-color: #fff;
        transform-origin: center center;
    }

    .cell {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 750px;
        /*height: 90px;*/
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
    const animation = weex.requireModule('animation')
    var he = require('he');
    export default{
        data:function(){
            return{
                styleObject:{
                    visibility: "hidden"
                },
                showOptions:false,
                droped:false,
                id: '0',
                title: '付款方式',
                name:"all",
                ico:'&#xe69f;',
                items: [
                    {id: '0', name: 'All'},
                    {id: '1', name: 'Doing'},
                    {id: '2', name: 'Done'}
                ]
            }
        },
        computed: {
            name: {
                get: function(){
                    var id = this.id;
                    return this.items.filter(function(s){
                        return s.id == id
                    })[0].name;
                }
            }
        },
        computed: {
            getIco: function() {
                return he.decode(this.ico)
            }
        },
        methods: {
            isDroped : function () {
                return this.droped;
            },
            switchView: function() {
//                this.collapse(this.$refs['options']);
                this.showOptions = !this.showOptions;
                this.rotate(this.$refs['arrow']);
            },

            onItemClick: function(id) {
                this.updateStatus(id);
                this.switchView();
                this.$emit('onchange', {
                    id: this.id,
                    name: this.name
                })
            },

            updateStatus: function(id) {
                this.statusId = id;
            },

            collapse: function(ref, callback) {
                var platform = this.$getConfig().env.platform;
                var translate = 'translate(0%, 100%)'; // Web need % ;
                if(platform == 'iOS') {
                    translate = 'translate(0, 270)'; // ios bug && fixing
                }

                this.current_translate = this.current_translate ? '' : translate;
                this.anim(ref, {
                    transform: this.current_translate
                }, 'ease', 100, callback);
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
<template>
    <div class="select-container" >
        <div class="content">

        </div>
        <div class="mask" id="mask" ref="mask" :style="styleObject" @click="switchView"></div>
        <div class="options" id="options" ref="options">
            <div v-for="item in status" class="cell"  @click="onItemClick(item.id)">
                <text class="name" :class = "[item.id==statusId ? 'current' : '']">{{item.name}}</text>
                <image class="icon-curr-flag" :src="flagSrc" v-if="item.id == statusId"></image>
            </div>
        </div>
        <div class="select" @click="switchView">
            <text class="current-text">{{statusName}}</text>
            <image class="icon-arrow" id="arrow" ref="arrow" :src="arrowSrc"></image>
        </div>
    </div>
</template>
<style>
    .select-container{
        flex-direction: column;
        position: relative;
        z-index: 1000;
    }

    .content{
        width: 750px;
        margin-top: 90px;
    }

    .mask{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        flex: 1;
        width: 750px;
        background-color: rgba(0,0,0, .5);
    }

    .select {
        width: 750px;
        height: 90px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        padding-left:30px;
        padding-right:30px;

        border-bottom-width: 1px;
        border-style: solid;
        border-color: #ddd;
        background-color: #eee;
        z-index: 1001;
        position: absolute;
        top: 0;
    }

    .current-text {
        color: #333;
        font-size: 33px;
        flex: 1;
    }

    .icon-arrow {
        width: 27px;
        height: 23px;
    }



    .options {
        position: absolute;
        top: -181px;
        width: 750px;
        background-color: #fff;
        transform-origin: center center;

    }
    .cell {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 750px;
        height: 90px;
        padding-left:30px;
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

    .current {
        color: #0088FB;
    }
</style>
<script>
    const animation = weex.requireModule('animation')

    export default{
        data:function(){
            return{
                styleObject:{
                    visibility: "hidden"
                },
                statusId: '0',
                status: [
                    {id: '0', name: 'All'},
                    {id: '1', name: 'Doing'},
                    {id: '2', name: 'Done'}
                ],
                flagSrc: 'https://gw.alicdn.com/tps/TB11a2lKFXXXXbVXpXXXXXXXXXX-32-32.png',
                arrowSrc: 'https://gw.alicdn.com/tps/TB1O3_aKFXXXXXdXVXXXXXXXXXX-27-23.png'
            }
        },
        computed: {
            statusName: {
                get: function(){
                    var id = this.statusId;
                    return this.status.filter(function(s){
                        return s.id == id
                    })[0].name;
                }
            }
        },
        methods: {
            switchView: function() {
                this.toggleMaskVisible();

                this.opacity(this.$refs['mask']);
                this.collapse(this.$refs['options']);
                this.rotate(this.$refs['arrow']);

            },

            onItemClick: function(id) {
                this.updateStatus(id);
                this.switchView();
//                this.$dispatch('statuschange', {
                this.$emit('statuschange', {
                    id: this.statusId,
                    name: this.statusName
                })
            },

            updateStatus: function(id) {
                this.statusId = id;
            },

            toggleMaskVisible: function(){
                this.current_showMask = !this.current_showMask;
                var visibility = this.current_showMask? 'visible': 'hidden';
                this.styleObject.visibility = visibility;
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

            opacity: function(ref, callback) {
                var self = this;
                self.current_opacity = self.current_opacity === 1 ? 0.1 : 1;
                self.anim(ref, {
                    opacity: self.current_opacity
                }, 'ease', 100, callback);
            },

            rotate: function(ref, callback) {
                var self = this;
                if(!self.current_rotate) {
                    self.current_rotate = 0;
                }
                self.current_rotate = self.current_rotate + 180;
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
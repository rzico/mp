
<template>
    <div class="captcha">
        <div class="mobile-header">
            <text class="mobile-title">{{title}}</text>
        </div>

        <div class="content">
            <text class="title">我们已向</text><text  class="number">{{mobile}}</text><text class="title">发送验证码短信，请查看短信并输入验证码</text>
        </div>
        <!--6个验证码框-->
        <div class="flex-row inputTextBox mtb50" @click="getFocus()">
            <!--隐藏的输入框-->
            <input type="tel" ref="captchRef" v-model="captcha" maxlength="6" @input="captchaInput" autofocus="true" class="input" />
            <div  v-for="item in textList" class="inputDiv" >
                <text class="inputText">{{item}}</text>
            </div>
        </div>
        <div class="flex-center">
            <text class="status primary" @click="send()" :style="statusStyle()" v-if="retry">{{status}}</text>
            <text class="status gray"  :style="statusStyle()"  v-else> {{time}}秒后重新发送 </text>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
    .mtb50{
        margin-top: 50px;
        margin-bottom: 60px;
    }
    .inputTextBox{
        width:530px;
        position: relative;
    }
    .inputText{
        border-width: 1px;
        border-style: solid;
        border-color: #999;
        width: 80px;
        height:80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
    }
    .inputDiv{
        flex:1;
        align-items: center;
    }
    .input{
        opacity:0;
        width:530px;
        position: absolute;
        height: 80px;
        font-size: 85px;
    }
    .captcha {
        padding-left: 40px;
        padding-right: 40px;
        flex-direction: column;
        align-items: center;
    }

    .number {
        font-size: 48px;
        color: #000;
        font-weight: 600;
    }
    .content {
        flex-wrap: wrap;
    }

    .mobile-title {
        font-size: 48px;
        color: #000;
        flex-wrap: wrap;
    }
    .mobile-header {
        margin-top: 150px;
        height:100px;
        background-color: #fff;
        flex-direction: column;
        align-items: center;
    }
    .status {
        font-size: 32px;
        line-height: 60px;
        border-bottom-width:0px;
    }

</style>
<script>
    var optionIndex = 0;
    var lastCaptchaLength = 0;
    var timer = null;
    import utils from '../assets/utils';
    export default {
        data:function(){
            return{
                time:59,
                textList:['','','','','','']
            }
        },
        props: {
            title: { default: "验证码" },
            captcha: {default:""},
            mobile:{default:""},
            status:{default:"点击重新发送"},
            retry:{default:false},
        },
        beforeDestory() {
            var _this = this;
            if (utils.isNull(timer) == false)  {
                clearInterval(timer);
                _this.time = 59;
                timer = null;
            }
        },
        created(){
            this.beginTimer();
        },
        methods:{
            beginTimer:function () {
                var _this = this;
                _this.retry = false;
                if (utils.isNull(timer) == false)  {
                    clearInterval(timer);
                    _this.time = 59;
                    timer = null;
                }
                timer = setInterval(function () {
                    _this.time = _this.time - 1;
                    if (_this.time < 1) {
                        _this.endTimer();
                    }
                },1000)
            },
            endTimer:function () {
                var _this = this;
                if (utils.isNull(timer) == false)  {
                    clearInterval(timer);
                    _this.time = 59;
                    timer = null;
                }
                this.retry = true;
            },
            statusStyle:function() {
              if (this.retry) {
                  return "";
              } else {
                  return "color:#ccc";
              }
            },
            clear:function () {
                this.captcha = "";
                this.textList = ['','','','','',''];
            },
//            当用户输入数字时触发
            captchaInput:function (event) {
                var _this = this;
//                判断删除还是输入  '大于' --> 删除
                if(lastCaptchaLength > event.value.length){
                    optionIndex --;
                    _this.textList[optionIndex] = '';
                }else{
                    let a = event.value;
                    let b = a.substr(a.length-1,1)
                    console.log(event);
                    _this.textList[optionIndex] = b;
                    optionIndex ++;
                }
                lastCaptchaLength = event.value.length;
//                当用户输完验证码后进行系统验证
                if(lastCaptchaLength == 6){
                    _this.captcha = event.value;
//                    _this.beginTimer();
                    _this.$emit("onEnd",this.captcha);
                }
            },
//            点击验证框时使隐藏的input获取焦点；
            getFocus:function () {
                this.$refs['captchRef'].focus();
            },
            send:function () {
                this.$emit("onSend",this.captcha);
            }

        }
    }
</script>

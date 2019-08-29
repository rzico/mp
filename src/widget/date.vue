<template>
    <div class="mask" v-if="isMask" @click="mask()">
        <div class="content">
            <div class="titleContent">
                <div class="titleBox" v-for="c in titleDate" :class="[titleId == c.id ? 'titleActive':'']" @click="chooseDate(c.id)"><text class="fz32" :class="[titleId == c.id ? 'primary':'']">{{c.time}}</text> </div>
            </div>
            <div class="timeContent">
                <scroller>
                    <div class="timeBox" :class="[timeId == t.id ? 'timeBoxActive':'']" v-for="t in timeData" @click="chooseTime(t.id)">
                        <text class="fz28">{{t.time}}</text>
                        <text class="active" :style="{fontFamily:'iconfont'}" v-if="timeId == t.id">&#xe64d;</text>
                    </div>
                </scroller>
            </div>
            <div class="bottomBox">
                <div class="leftBox" @click="cancel()"><text class="leftBoxText">取消</text> </div>
                <div class="rightBox" @click="confirm()"><text class="leftBoxText">确认</text> </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
    /*遮罩层*/
    .mask{
        position: fixed;top: 0px;left: 0px;right: 0px;bottom: 0px;background-color:rgba(000,000,000,0.4);
        align-items: center;
        justify-content: center;
    }
    .content{
        width: 500px;
        height: 600px;
        background-color: white;
        border-radius: 20px;
        align-items: center;
    }
    .titleContent{
        border-bottom-width: 2px;
        border-color: #0088fb;
        height: 98px;
        width: 500px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .titleBox{
        width: 100px;
        height: 60px;
        align-items: center;
        justify-content: center;
    }
    .titleActive{
        width: 100px;
        height: 60px;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        border-width: 1px;
        border-color:#5eb0fd;
    }
    .timeContent{
        height: 400px;
        width: 500px;
    }
    .timeBox{
        width: 500px;
        height: 50px;
        align-items: center;
        justify-content: center;
    }
    .timeBoxActive{
        background-color: #cccccc;
    }
    .active{
        font-size: 35px;
        color: red;
        position: absolute;
        top: 7px;
        right: 125px;
    }
    .bottomBox{
        border-top-width: 2px;
        border-color: #0088fb;
        height: 98px;
        width: 500px;
        flex-direction: row;
        align-items: center;
    }
    .leftBox{
        border-right-width: 2px;
        border-color: #0088fb;
        width: 248px;
        height: 98px;
        align-items: center;
        justify-content: center;
    }
    .leftBox:active{
        background-color: #cccccc;
    }
    .rightBox{
        width: 250px;
        height: 98px;
        align-items: center;
        justify-content: center;
    }
    .rightBox:active{
        background-color: #cccccc;
    }
    .leftBoxText{
        font-size: 40px;
        color: #0088fb;
    }
</style>
<script>
    import utils from '../assets/utils'
    const modal = weex.requireModule('modal');
    const storage = weex.requireModule('storage');
    var event = weex.requireModule('event');

    export default {
        data :function(){
            return{
                date:'',
                time:'00.00.00',
                dateTime:'',
                titleId:1,
                timeId:0,
                titleDate:[{id:1,time:'今天'},{id:2,time:'明天'},{id:3,time:'后天'},],
                timeData:[
//                    {id:1,time:'00.00-01.00'},
//                    {id:2,time:'01.00-02.00'},
//                    {id:3,time:'02.00-03.00'},
//                    {id:4,time:'03.00-04.00'},
//                    {id:5,time:'04.00-05.00'},
//                    {id:6,time:'05.00-06.00'},
//                    {id:7,time:'06.00-07.00'},
//                    {id:8,time:'07.00-08.00'},
                    {id:9,time:'08.00-09.00'},
                    {id:10,time:'09.00-10.00'},
                    {id:11,time:'10.00-11.00'},
                    {id:12,time:'11.00-12.00'},
                    {id:13,time:'12.00-13.00'},
                    {id:14,time:'13.00-14.00'},
                    {id:15,time:'14.00-15.00'},
                    {id:16,time:'15.00-16.00'},
                    {id:17,time:'16.00-17.00'},
                    {id:18,time:'17.00-18.00'},
                    {id:19,time:'18.00-19.00'},
                    {id:20,time:'19.00-20.00'},
                    {id:21,time:'20.00-21.00'},
                    {id:22,time:'21.00-22.00'},
                    {id:23,time:'22.00-23.00'},
                    {id:24,time:'23.00-24.00'},
                    ]
            }
        },
        components: {

        },
        props: {
            isMask:false
        },
        created() {
            this.date = utils.ymdtimefmt(Date.parse(new Date()));
        },
        methods: {
            chooseTime(id){
                this.timeId = id;
//                if(id == 1){
//                    this.time = '00:00:00'
//                }else if(id == 2){
//                    this.time = '01:00:00'
//                }else if(id == 3){
//                    this.time = '02:00:00'
//                }else if(id == 4){
//                    this.time = '03:00:00'
//                }else if(id == 5){
//                    this.time = '04:00:00'
//                }else if(id == 6){
//                    this.time = '05:00:00'
//                }else if(id == 7){
//                    this.time = '06:00:00'
//                }else if(id == 8){
//                    this.time = '07:00:00'
//                }else
                if(id == 9){
                    this.time = '08:00:00'
                }else if(id == 10){
                    this.time = '09:00:00'
                }else if(id == 11){
                    this.time = '10:00:00'
                }else if(id == 12){
                    this.time = '11:00:00'
                }else if(id == 13){
                    this.time = '12:00:00'
                }else if(id == 14){
                    this.time = '13:00:00'
                }else if(id == 15){
                    this.time = '14:00:00'
                }else if(id == 16){
                    this.time = '15:00:00'
                }else if(id == 17){
                    this.time = '16:00:00'
                }else if(id == 18){
                    this.time = '17:00:00'
                }else if(id == 19){
                    this.time = '18:00:00'
                }else if(id == 20){
                    this.time = '19:00:00'
                }else if(id == 21){
                    this.time = '20:00:00'
                }else if(id == 22){
                    this.time = '21:00:00'
                }else if(id == 23){
                    this.time = '22:00:00'
                }else if(id == 24){
                    this.time = '23:00:00'
                }
            },
            chooseDate(id){
                this.titleId = id;
                if(id == 1){
//                      先重新获取时间
                    this.date = Date.parse(new Date());
                    this.date = utils.ymdtimefmt(this.date);
                }if(id == 2){
//                    先重新获取时间
                    this.date = Date.parse(new Date());
//                    运算增加一天
                    this.date = (this.date/1000+86400)*1000;
//                    把时间戳转换为时间
                    this.date = utils.ymdtimefmt(this.date);

                }else if(id == 3){
//                    先重新获取时间
                    this.date = Date.parse(new Date());
//                    运算增加两天
                    this.date = (this.date/1000+172800)*1000;
//                      把时间戳转换为时间
                    this.date = utils.ymdtimefmt(this.date);
                }
            },
            confirm(){
                if(utils.isNull(this.date) || utils.isNull(this.time)){
                    modal.alert({
                        message: '请选择时间',
                        okTitle: 'OK'
                    });
                    return
                }
                this.dateTime = this.date+ ' ' +this.time;
                this.$emit("confirm",this.dateTime)
            },
            cancel(){
                this.$emit("cancel")
            },
            mask(){
                return
            }
        }
    }
</script>
<template>
    <div class="container">
        <weex-amap class="map" id="map2017" scale="true" geolocation="true" center="pos" sdk-key="keys">
            <!--<weex-amap-marker position="point.position" title="point.title"></weex-amap-marker>-->
        </weex-amap>
    </div>
</template>

<style>
    .container{
        position: relative;
        flex:1;
        background-color: #fff;
    }
    .map{
        flex: 1;
        position: relative;
        background-color: #fff;
        min-height: 600px;
    }
</style>

<script>
    const Amap = require('@weex-module/amap');
    module.exports = {
        data: {
            keys: {
                h5:'f4b99dcd51752142ec0f1bdcb9a8ec02',
                ios: '72e0eed9d55695b21e1ec6639f1387f4',
                android: 'db6a973159cb0c2639ad02c617a786ae'
            },
            pos:[116.487, 40.00003],
            point: {
                position: [112,36],
                title: 'this is a marker'
            }
        },

    }
</script>
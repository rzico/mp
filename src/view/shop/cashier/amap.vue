<template>
    <weex-amap class="map" id="map2017" :center="pos" ></weex-amap>
</template>

<script>
    const amap = weex.requireModule('amap');
    export default {
        data(){
            return {
                pos: [116.487, 40.00003]
            }
        },

        methods: {

        }
    }
</script>
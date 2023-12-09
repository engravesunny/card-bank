<template>
    <div class="layout">
        <Nav></Nav>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import Nav from './Nav.vue'
</script>

<style lang="less" scoped>
.layout {
    width: 100vw;
    height: 100vh;
    background-image: url('../../assets//img//下载.jpg');
    background-size: cover;
    background-position: center center;
}
</style>
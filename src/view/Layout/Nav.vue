<template>
    <div class="nav-container">
        <div class="logo">
            <img style="width: 100%;height: 100%;object-fit: contain;" src="../../assets//img/OIP-C.jpg" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.nav-container {
    width: 100%;
    height: 40px;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 2px solid gray;

    .logo {
        height: 100%;
        float: left;
    }
}
</style>
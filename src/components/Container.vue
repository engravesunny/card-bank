<template>
    <div class="container">
        <slot name="conatiner"></slot>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.container {
    box-sizing: border-box;
    padding: 30px 70px;
    background: rgba(255, 255, 255, .5);
    border: 2px solid gray;
    border-radius: 5px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
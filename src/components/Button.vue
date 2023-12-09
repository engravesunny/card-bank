<template>
    <button plain @click="() => props.callback()">
        {{ title }}
    </button>
</template>

<script setup lang="ts">

const props = defineProps<{
    title: string,
    callback: Function
}>()

</script>

<style lang="less" scoped>
button {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid gray;
    cursor: pointer;

    &:active {
        background-color: #fff;
    }
}
</style>
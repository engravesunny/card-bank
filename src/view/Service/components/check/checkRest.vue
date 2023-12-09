<template>
    <Title>账户余额信息</Title>
    <div class="content">
        <br>
        <div class="content-item">
            <Title>{{ '账户余额： ' + restInfo.rest }}</Title>
        </div>
        <div class="content-item">
            <Title>{{ '可用余额： ' + restInfo.restEnable }}</Title>
        </div>
        <div class="content-item">
            <Title>{{ '当日可用余额： ' + restInfo.restEnableToday }}</Title>
        </div>
    </div>
</template>

<script setup lang="ts">
import Title from '../title.vue';
import { restInfo } from '../../../../store'
</script>

<style lang="less" scoped>
.content {
    width: 100%;

    .content-item {
        width: 100%;
    }
}
</style>
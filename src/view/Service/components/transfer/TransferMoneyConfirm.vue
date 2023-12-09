<template>
    <div>
        <div class="top">
            <Title>{{ "转入账号：" + TransferData.account }}</Title>
            <br>
        </div>
        <div class="content">
            <span class="text">请输入金额:</span><el-input type="number" v-model.number="TransferData.money"></el-input>
        </div>
    </div>
</template>

<script setup lang="ts">
import Title from '../title.vue'
import { TransferData } from '../../../../store'
import { ElInput } from 'element-plus'

</script>

<style lang="less" scoped>
.content {
    display: flex;

    .text {
        box-sizing: border-box;
        margin: 0 5px;
        width: 175px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        font-weight: 700;
        background-color: rgba(255, 255, 255, .5);
        border-radius: 5px;
    }
}
</style>
<template>
    <div class="checkDetail">
        <div class="top">
            <Title>交易明细查询</Title>
            <br>
        </div>
        <div class="table">
            <el-table :data="checkDetailTableData"></el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import Title from '../title.vue'
import { ElTable } from 'element-plus'
import { checkDetailTableData } from '../../../../store';
</script>

<style lang="less" scoped></style>
<template>
    <div class="checkDetail">
        <div class="top">
            <Title>交易明细查询</Title>
            <br>
        </div>
        <div class="table">
            <el-table size="small" :data="checkDetailTableData">
                <el-table-column v-for="item in tableConfig" :key="item.label" :prop="item.prop" :label="item.label"
                    :width="item.width"></el-table-column>
            </el-table>
            <div class="page">{{ "第" + page.page_num + "页/共" + page.totalPage + "页" }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Title from '../title.vue'
import { ElTable, ElTableColumn } from 'element-plus'
import { checkDetailTableData, page } from '../../../../store';
import { tableConfig } from '../../tableConfig';
</script>

<style lang="less" scoped>
.page {
    margin-top: 20px;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
}
</style>
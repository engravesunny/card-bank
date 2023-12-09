<template>
    <div>
        <Title>请再次输入账号</Title>
        <br>
        <el-form :model="TransferData">
            <el-form-item prop="confirmAccount">
                <el-input v-model="TransferData.confirmAccount"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import Title from '../title.vue';
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import { TransferData } from '../../../../store'
</script>

<style lang="less" scoped></style>
<template>
    <div>
        <el-form :model="formData">
            <el-form-item prop="money">
                <el-input type="number" v-model.number="formData.money"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import { formData } from '../Hook/init';
</script>

<style lang="less" scoped></style>
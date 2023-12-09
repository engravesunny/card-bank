<template>
    <div class="changePassword">
        <Title>请输入您的新密码</Title>
        <br>
        <el-input type="password" v-model="passwordData.password"></el-input>
    </div>
</template>

<script setup lang="ts">
import Title from '../title.vue'
import { passwordData } from '../../../../store'
import { ElInput } from 'element-plus'
</script>

<style lang="less" scoped></style>
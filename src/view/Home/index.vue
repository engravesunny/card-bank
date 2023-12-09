<template>
    <div class="home">
        <Container>
            <template #conatiner>
                <div class="title">
                    欢迎使用中国银行ATM
                </div>
                <div class="title">
                    <span style="font-size: 14px;"> {{ state }} </span>
                </div>
                <div class="form">
                    <el-form :model="formData">
                        <el-form-item prop="card">
                            <el-input v-model="formData.card" size="small" placeholder="请输入银行卡号"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="formData.password" size="small"
                                placeholder="请输入密码"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

            </template>
        </Container>
        <div class="buttons">
            <Button title="确认 ->" :callback="onSubmit" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Container from '../../components/Container.vue'
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import { ref } from 'vue';
import Button from '../../components/Button.vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const formData = ref({
    card: '',
    password: ''
})
const state = ref('请登录')

const onSubmit = () => {
    if (formData.value.card === '') {
        state.value = '请输入卡号！！'
    } else if (formData.value.password === '') {
        state.value = '请输入密码！！'
    } else {
        router.push('/service')
    }
}

</script>

<style lang="less" scoped>
.home {
    display: flex;

    .title {
        padding-bottom: 30px;
        width: 100%;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
    }

    .buttons {
        position: fixed;
        bottom: 20px;
        right: 20px;
    }
}
</style>
<template>
    <div class="login-page" v-if="!(islogin === 'true')">
        <div class="title">中国银行后台管理系统</div>
        <div class="form">
            <el-input v-model="formData.id" placeholder="请输入账号"></el-input>
            <el-input v-model="formData.pwd" type="password" placeholder="请输入密码"></el-input>
            <el-button @click="handleLogin" type="primary">登录</el-button>
        </div>
    </div>
    <div class="admin" v-else>
        <div class="top"
            style="box-sizing: border-box;padding: 10px 20px;height: 50px;width: 100vw;display: flex;justify-content: flex-end;">
            <el-button type="primary" @click="handleOpenAddDialog">新增</el-button>
        </div>
        <el-table :data="listData" border max-height="500">
            <el-table-column prop="account_number" label="银行卡号" width="180" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="bank_name" label="银行名" />
            <el-table-column prop="id_card" label="身份证" width="180" />
            <el-table-column prop="phone" label="手机号" />
            <el-table-column prop="balance" label="余额" width="180" />
            <el-table-column prop="daily_limit" label="每日限额" />
            <el-table-column prop="status" label="状态" />
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button type="text" @click="handleOpenEditDialog(row.id)">编辑</el-button>
                    <el-button v-if="row.status === '正常'" type="text"
                        @click="handleClose(row.account_number)">封禁</el-button>
                    <el-button v-if="row.status === '封禁'" type="text" @click="handleOpen(row.account_number)">解封</el-button>
                    <el-button v-if="row.status === ''" type="text" @click="handleOpen(row.account_number)">激活</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 5px;padding: 0 10px;" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" layout="prev, pager, next,->,sizes" small v-model:current-page="pn"
            v-model:page-size="ps" :page-sizes="[5, 10, 20, 30, 50]" :total="total"></el-pagination>
    </div>
    <el-dialog @open="handleEditOpen" title="编辑用户信息" v-model="showUserEditDialog">
        <el-form ref="editFormRef" :model="userFormData" label-width="15%" label-position="left">
            <el-form-item prop="account_number" label="银行卡号" :rules="[{ required: true, message: '请输入银行卡号' }]">
                <el-input v-model="userFormData.account_number" placeholder="请输入银行卡号"></el-input>
            </el-form-item>
            <el-form-item prop="balance" label="余额" :rules="[{ required: true, message: '请输入余额' }]">
                <el-input v-model="userFormData.balance" placeholder="请输入余额"></el-input>
            </el-form-item>
            <el-form-item prop="bank_name" label="银行名称" :rules="[{ required: true, message: '请输入银行名' }]">
                <el-input v-model="userFormData.bank_name" placeholder="请输入银行名称"></el-input>
            </el-form-item>
            <el-form-item prop="daily_limit" label="每日限额" :rules="[{ required: true, message: '请输入每日限额' }]">
                <el-input v-model="userFormData.daily_limit" placeholder="请输入每日限额"></el-input>
            </el-form-item>
            <el-form-item prop="id_card" label="证件号" :rules="[{ required: true, message: '请输入证件号' }]">
                <el-input v-model="userFormData.id_card" placeholder="请输入证件号"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="姓名" :rules="[{ required: true, message: '请输入姓名' }]">
                <el-input v-model="userFormData.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手机号" :rules="[{ required: true, message: '请输入手机号' }]">
                <el-input v-model="userFormData.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
        </el-form>
        <div class="btn" style="display: flex; justify-content: flex-end; width: 100%;">
            <el-button type="primary" @click="handleEdit">确认编辑</el-button>
        </div>
    </el-dialog>
    <el-dialog title="新增用户" v-model="showAddUserDialog">
        <el-form ref="addFormRef" :model="addUserFormData" label-width="15%" label-position="left">
            <el-form-item prop="bank_name" label="银行名" :rules="[{ required: true, message: '请输入银行名' }]">
                <el-input v-model="addUserFormData.bank_name"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="姓名" :rules="[{ required: true, message: '请输入姓名' }]">
                <el-input v-model="addUserFormData.name"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码" :rules="[{ required: true, message: '请输入密码' }]">
                <el-input type="password" v-model="addUserFormData.password"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手机号" :rules="[{ required: true, message: '请输入手机号' }]">
                <el-input v-model="addUserFormData.phone"></el-input>
            </el-form-item>
            <el-form-item prop="id_card" label="证件号" :rules="[{ required: true, message: '请输入银行卡号' }]">
                <el-input v-model="addUserFormData.id_card"></el-input>
            </el-form-item>
        </el-form>
        <div class="btn" style="display: flex; justify-content: flex-end; width: 100%;">
            <el-button type="primary" @click="handleAddUser">确认新增</el-button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ElTable, ElTableColumn, ElButton, ElPagination, ElDialog, ElForm, ElInput, ElFormItem, ElMessage } from 'element-plus'
import { getUserInfo, getUserList, editUserInfo, register, changeStatus } from '../../service/api/index'
import { onMounted, ref } from 'vue';



const pn = ref(1);
const ps = ref(5);
const total = ref(0)
const listData = ref([])
const userFormData = ref<any>({})
const addUserFormData = ref<any>({})
const showAddUserDialog = ref(false)
const showUserEditDialog = ref(false)
const addFormRef = ref()
const editFormRef = ref()
const islogin = ref(localStorage.getItem('LOGIN'))
const formData = ref({
    id: '',
    pwd: ''
})
const handleLogin = () => {
    if (formData.value.id === 'admin' && formData.value.pwd === 'admin') {
        islogin.value = 'true'
        localStorage.setItem('LOGIN', 'true')
    }
}

const curUserId = ref('')
const handleEditOpen = async () => {
    const data = await getUserInfo({
        user_id: curUserId.value
    }) as any
    userFormData.value = data.user
}

const handleSizeChange = () => { updateData() }
const handleCurrentChange = () => { updateData() }

const updateData = async () => {
    const data = await getUserList({
        page_num: pn.value,
        page_size: ps.value
    }) as any
    listData.value = data.users
    total.value = data.total
}
const handleOpenAddDialog = () => {
    showAddUserDialog.value = true
}
const handleOpenEditDialog = (id: any) => {
    curUserId.value = id
    showUserEditDialog.value = true
}
const handleAddUser = () => {
    try {
        addFormRef.value.validate(async (valid: boolean) => {
            if (valid) {
                try {
                    await register({
                        ...addUserFormData.value as any
                    })
                    updateData()
                    showAddUserDialog.value = false
                    addUserFormData.value = {}
                    ElMessage.success('新增成功')
                } catch (error: any) {
                    ElMessage.error(error.message)
                }
            } else {
                console.log('error submit!')
                return false
            }
        })
    } catch (error: any) {
        ElMessage.error(error.message)
    }
}
const handleEdit = () => {
    try {
        editFormRef.value.validate(async (valid: boolean) => {
            if (valid) {
                try {
                    await editUserInfo({
                        ...userFormData.value,
                        daily_limit: Number(userFormData.value.daily_limit),
                        balance: Number(userFormData.value.balance)
                    })
                    updateData()
                    showUserEditDialog.value = false
                    userFormData.value = {}
                    ElMessage.success('编辑成功')
                } catch (error: any) {
                    ElMessage.error(error.message)
                }
            } else {
                console.log('error submit!')
                return false
            }
        })
    } catch (error: any) {
        ElMessage.error(error.message)
    }
}
const handleClose = async (id: string) => {
    await changeStatus({
        account_number: id.toString(),
        status: '封禁'
    })
    updateData()
}
const handleOpen = async (id: string) => {
    await changeStatus({
        account_number: id.toString(),
        status: '正常'
    })
    updateData()
}

onMounted(async () => {
    updateData()
})

</script>

<style lang="less" scoped>
.login-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    .title {
        font-size: 30px;
        font-weight: 700;
        padding: 100px;
    }

    .el-input {
        width: 200px;
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;

        .el-button {
            width: 100px;

        }
    }
}
</style>
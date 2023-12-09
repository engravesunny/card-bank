import { ref, shallowRef, watch } from 'vue';
import { configs } from '../config'
export const resultContent = ref('')
export const curConfig = shallowRef(configs.initState)
import * as store from '../../../store'
export const formData = ref({
    money: '',
    account: ''
})
export const preConfig = shallowRef<any[]>([])

watch(curConfig, (val, oldVal) => {
    if (!oldVal) {
        preConfig.value.push(val)
    } else if (oldVal !== configs.resultState && oldVal !== configs.transferMoneySuccessState && oldVal !== configs.thanksState) {
        preConfig.value.push(oldVal)
    }
    console.log([...preConfig.value])
}, {
    immediate: true,
    deep: true
})

// service 主页面
export const handleService = (type: string) => {
    console.log(type)
    if (type === '取款') {
        curConfig.value = configs.getMoneyState
    }
    if (type === '存款') {
        curConfig.value = configs.setMoneyState
    }
    if (type === '查询') {
        curConfig.value = configs.checkMoneyState
    }
    if (type === '转账') {
        curConfig.value = configs.transferMoneyState
    }
}

// options
export const handleClick = (type: string) => {
    if (type === '返回') {
        curConfig.value = preConfig.value.pop()
        if ((curConfig.value as any).againPage) {
            curConfig.value = preConfig.value.pop()
        }
    }
    if (type === '取消') {
        curConfig.value = configs.initState
    }
    if (type === '改密') {
        curConfig.value = configs.changePasswordState
    }
    if (type === '退卡') {
        curConfig.value = configs.thanksState
        resultContent.value =
            `<h1>感谢您的使用</h1>
            <h1>请取回您的银行卡</h1>`
    }
    if (type.includes('输入')) {
        const input = document.querySelector('input')
        input?.focus()
    }
    if (type === '转账输入确认') {
        if (store.TransferData.value.account === '') {
            curConfig.value = configs.resultState
            resultContent.value = `<h1>请输入账号！！</h1>`
            return
        }
        curConfig.value = configs.transferMoneyConfirmState
    }
    if (type === '转账输入再次确认') {
        if (store.TransferData.value.confirmAccount === '') {
            preConfig.value.push(curConfig.value)
            curConfig.value = configs.resultState
            resultContent.value = `<h1>请再次输入账号！！</h1>`
            return
        } else if (store.TransferData.value.confirmAccount !== store.TransferData.value.account) {
            curConfig.value = configs.resultState
            resultContent.value = `<h1>两次输入不一致！！</h1>`
            store.TransferData.value.confirmAccount = ''
            store.TransferData.value.account = ''
            return
        }
        curConfig.value = configs.transferMoneyDetailState
    }
    if (type === '转账确认') {
        if (store.TransferData.value.money === '') {
            curConfig.value = configs.resultState
            resultContent.value = `<h1>请输入金额</h1>`
            return
        }
        resultContent.value = `
            <h1>交易成功，请选择操作</h1>
        `
        curConfig.value = configs.transferMoneySuccessState
    }
    if (type === '改密再次输入密码确认') {
        if (store.passwordData.value.confirmPassword === '') {
            preConfig.value.push(curConfig.value)
            curConfig.value = configs.resultState
            resultContent.value = `<h1>请再次输入密码！！</h1>`
            return
        } else if (store.passwordData.value.confirmPassword !== store.passwordData.value.password) {
            curConfig.value = configs.resultState
            resultContent.value = `<h1>两次输入不一致！！</h1>`
            store.passwordData.value.confirmPassword = ''
            store.passwordData.value.password = ''
            return
        }
        curConfig.value = configs.changePasswordSuccessState
        resultContent.value = `
            个人密码修改成功
        `
    }
    if (type === '改密输入密码确认') {
        if (store.passwordData.value.password === '') {
            curConfig.value = configs.resultState
            resultContent.value = `<h1>请输入密码！！</h1>`
            return
        }
        curConfig.value = configs.changePasswordConfirmState
    }
    if (type === '打印凭证') {
        curConfig.value = configs.resultState
        resultContent.value = '凭证条已打印好，请收好您的凭证'
    }
    if (type === '退出') {
        location.pathname = '/home'
    }
}

// 取款
export const handleGetMoney = (money: string | number) => {
    if (money === '确认取款') {
        if (formData.value.money === '') {
            curConfig.value = configs.resultState
            resultContent.value = `<h1>请输入金额</h1>`
            return
        }
        curConfig.value = configs.transferMoneySuccessState
        resultContent.value = `
            <h1>成功取款 ${formData.value.money}元<h1/>
            <h1>余额: ${''}<h1/>
        `
    } else {
        curConfig.value = configs.transferMoneySuccessState
        resultContent.value = `
            <h1>成功取款 ${money}元<h1/>
            <h1>余额: ${''}<h1/>
        `
    }
}

// 存款
export const handleSetMoney = (money: string | number) => {
    console.log(money)
    if (money === '确认存款') {
        if (formData.value.money === '') {
            curConfig.value = configs.resultState
            resultContent.value = `<h1>请输入金额</h1>`
            return
        }
        curConfig.value = configs.transferMoneySuccessState
        resultContent.value = `
            <h1>成功存款 ${formData.value.money}元<h1/>
            <h1>余额: ${''}<h1/>
        `
    } else {
        curConfig.value = configs.transferMoneySuccessState
        resultContent.value = `
            <h1>成功存款 ${money}元<h1/>
            <h1>余额: ${''}<h1/>
        `
    }
}

// 查询
export const handleCheckMoney = (type: string) => {
    if (type === '返回') {
        curConfig.value = configs.checkMoneyState
    }
    if (type === '余额查询') {
        curConfig.value = configs.checkMoneyRest
    }
    if (type === '交易明细查询') {
        curConfig.value = configs.checkMoneyDetail
    }
}
// 查询加以明细
export const handleCheckMoneyDetail = (type: string) => {
    console.log(type)
}

// 转账
export const handleTransferMoney = () => {

}
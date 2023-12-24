import { ref, shallowRef, watch } from 'vue';
import { configs } from '../config'
export const resultContent = ref('')
export const curConfig = shallowRef<{
    main: any,
    left: any,
    right: any,
    againPage?: boolean
}>(configs.initState)
import * as store from '../../../store'
import { changePassword, checkMoney, getMoney, setMoney, transferMoney } from '../../../service/api';
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
}, {
    immediate: true,
    deep: true
})

// service 主页面
export const handleService = (type: string) => {
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
export const handleClick = async (type: string) => {
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
        try {
            await transferMoney({
                amount: Number(store.TransferData.value.money),
                to_account_number: store.TransferData.value.confirmAccount
            })
            resultContent.value = `
                <h1>交易成功，请选择操作</h1>
            `
            curConfig.value = configs.transferMoneySuccessState
        } catch (error: any) {
            curConfig.value = configs.transferMoneySuccessState
            resultContent.value = `
                ${error.message}
            `
        } finally {
            store.TransferData.value.account = ''
            store.TransferData.value.confirmAccount = ''
            store.TransferData.value.money = ''
        }
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
        try {
            await changePassword({
                new_password: store.passwordData.value.password
            })
            curConfig.value = configs.changePasswordSuccessState
            resultContent.value = `
                个人密码修改成功
            `
        } catch (error: any) {
            curConfig.value = configs.transferMoneySuccessState
            resultContent.value = `
                ${error.message}
            `
        } finally {
            store.passwordData.value.confirmPassword = ''
            store.passwordData.value.password = ''
        }

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
        store.token.value = ''
        location.reload()
    }
}

// 取款
export const handleGetMoney = async (money: string | number) => {
    if (money === '确认取款') {
        if (formData.value.money === '') {
            curConfig.value = configs.resultState
            resultContent.value = `<h1>请输入金额</h1>`
            return
        }
        try {
            const res = await getMoney({
                amount: Number(formData.value.money)
            })
            store.restInfo.value.rest = res.balance
            curConfig.value = configs.transferMoneySuccessState
            resultContent.value = `
                <h1>成功取款 ${formData.value.money}元<h1/>
                <h1>余额: ${res.balance}<h1/>
            `
        } catch (error: any) {
            curConfig.value = configs.transferMoneySuccessState
            resultContent.value = `
                ${error.message}
            `
        } finally {
            formData.value.money = ''
        }
    } else {
        formData.value.money = money.toString()
        try {
            const res = await getMoney({
                amount: Number(formData.value.money)
            })
            store.restInfo.value.rest = res.balance
            curConfig.value = configs.transferMoneySuccessState
            resultContent.value = `
                <h1>成功取款 ${formData.value.money}元<h1/>
                <h1>余额: ${res.balance}<h1/>
            `
        } catch (error: any) {
            curConfig.value = configs.transferMoneySuccessState
            resultContent.value = `
                ${error.message}
            `
        } finally {
            formData.value.money = ''
        }
    }
}

// 存款
export const handleSetMoney = async (money: string | number) => {
    if (money === '确认存款') {
        if (formData.value.money === '') {
            curConfig.value = configs.resultState
            resultContent.value = `<h1>请输入金额</h1>`
            return
        }
        try {
            const res = await setMoney({
                amount: Number(formData.value.money)
            })
            curConfig.value = configs.transferMoneySuccessState
            resultContent.value = `
                <h1>成功存款 ${formData.value.money}元<h1/>
                <h1>余额: ${res.balance}<h1/>
            `
        } catch (error: any) {
            curConfig.value = configs.transferMoneySuccessState
            resultContent.value = `
                ${error.message}
            `
        } finally {
            formData.value.money = ''
        }
    } else {
        formData.value.money = money.toString()
        try {
            const res = await setMoney({
                amount: Number(formData.value.money)
            })
            curConfig.value = configs.transferMoneySuccessState
            resultContent.value = `
                <h1>成功存款 ${formData.value.money}元<h1/>
                <h1>余额: ${res.balance}<h1/>
            `
        } catch (error: any) {
            curConfig.value = configs.transferMoneySuccessState
            resultContent.value = `
                ${error.message}
            `
        } finally {
            formData.value.money = ''
        }
    }
}

// 查询
export const handleCheckMoney = async (type: string) => {
    if (type === '返回') {
        curConfig.value = configs.checkMoneyState
        preConfig.value = [
            configs.initState
        ]
        return
    }
    if (type === '余额查询') {
        curConfig.value = configs.checkMoneyRest
        console.log(curConfig, preConfig)
        curConfig.value.againPage = true
    }
    if (type === '交易明细查询') {
        await handleCheckMoneyDetail(0)
        curConfig.value = configs.checkMoneyDetail
        curConfig.value.againPage = true
    }
}

// 查询页返回
export const handleCheckMoneyReturn = () => {
    curConfig.value = configs.initState
}

// 查询加以明细
export const handleCheckMoneyDetail = async (nextPage: number) => {
    store.page.value.page_num += Number(nextPage)
    const data = await checkMoney({
        page_num: store.page.value.page_num,
        page_size: store.page.value.page_size
    })
    store.checkDetailTableData.value = data.transactions
    store.page.value.total = data.total
    store.page.value.totalPage = Math.ceil(data.total / 3);
}

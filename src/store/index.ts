import { ref } from 'vue'

export const userId = ref('')
export const token = ref('')
export const restInfo = ref({
    rest: '',
    restEnable: '',
    restEnableToday: ''
})
export const checkDetailTableData = ref<any>()
export const TransferData = ref({
    account: '',
    confirmAccount: '',
    money: ''
})
export const passwordData = ref({
    password: '',
    confirmPassword: ''
})
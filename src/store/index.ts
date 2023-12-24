import { ref } from 'vue'

export const userId = ref('')
export const token = ref('')
export const accountNumber = ref('')
export const restInfo = ref({
    rest: 0,
    restEnable: 0,
    restEnableToday: 0
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
export const page = ref({
    page_num: 1,
    page_size: 3,
    total: 0,
    totalPage: 0
})

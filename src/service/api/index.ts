import request from '../config/request'

export const register = (data: { bank_name: string, id_card: string, name: string, password: string, phone: string }): Promise<{
    account_number: string,
    user_id: string
}> => request({
    url: '/atm/user/register',
    method: 'post',
    data
})

export const login = (data: { account_number: string, password: string }): Promise<{
    account_number: string,
    token: string,
    user_id: string
}> => request({
    url: '/atm/user/login',
    method: 'post',
    data
})

export const info = (data: {
    user_id: string
}): Promise<{
    user: {
        id: number,
        account_number: string,
        name: string,
        phone: string,
        balance: number,
        bank_name: string,
        daily_limit: number
    }
}> => request({
    url: '/atm/user/info',
    method: 'get',
    params: data
})

export const changePassword = (data: { new_password: string }) => request({
    url: "/atm/user/change_password",
    method: "post",
    data
})

export const setMoney = (data: { amount: number }): Promise<{
    balance: number
}> => request({
    url: "/atm/money/put",
    method: "post",
    data
})

export const getMoney = (data: { amount: number }): Promise<{
    balance: number
}> => request({
    url: "/atm/money/take",
    method: "post",
    data
})

export const transferMoney = (data: { amount: number, to_account_number: string }): Promise<{}> => request({
    url: "/atm/money/transfer",
    method: "post",
    data
})

export const checkMoney = (params: { page_num: number, page_size: number }): Promise<{
    total: number,
    transactions: {
        "id": number,
        "user_id": string,
        "amount": number,
        "type": string,
        "description": string,
        "create_time": string
    }[]
}> => request({
    url: "/atm/money/get_transaction",
    method: "get",
    params
})

// admin

// change status
export const changeStatus = (data: { account_number: string, status: string }) => request({
    url: '/atm/user/status',
    method: "post",
    data
})

// get userInfo
export const getUserInfo = (params: { user_id: string }) => request({
    url: "/atm/user/info",
    method: 'get',
    params
})

// edit userInfo
export const editUserInfo = (data: { [index: string]: unknown }) => request({
    url: '/atm/user/update',
    method: 'post',
    data
})

// get userlist
export const getUserList = (params: { page_num: number, page_size: number }) => request({
    url: "/atm/user/list",
    method: 'get',
    params
})

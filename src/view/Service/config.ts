import {
    init,
    getMoneyState,
    Result,
    setMoneyState,
    changePassword,
    changePasswordConfirm,
    transferMoney,
    transferMoneyConfirm,
    transferMoneyDetail,
    checkMoney,
    checkMoneyRest,
    checkMoneyDetail
} from "./components"
import {
    handleClick,
    handleService,
    handleGetMoney,
    handleSetMoney,
    handleCheckMoney,
    handleCheckMoneyDetail,
    handleCheckMoneyReturn
} from "./Hook/init"
import * as store from "../../store"
import { computed } from "vue"

const getPage = computed(() => {
    if (store.page.value.page_num <= 1) {
        return [{ label: '下一页', cb: () => handleCheckMoneyDetail(1) }]
    } else if (store.page.value.page_num >= 1 && store.page.value.page_num < store.page.value.total / store.page.value.page_size) {
        return [{ label: '上一页', cb: () => handleCheckMoneyDetail(-1) }, { label: '下一页', cb: () => handleCheckMoneyDetail(1) }]
    } else {
        return [{ label: '上一页', cb: () => handleCheckMoneyDetail(-1) }]
    }
})

export const configs = {
    // 最初状态
    initState: {
        main: init,
        left: [
            {
                label: '取款',
                cb: () => handleService('取款')
            },
            {
                label: '存款',
                cb: () => handleService('存款')
            },
            {
                label: '查询',
                cb: () => handleService('查询')
            },
            {
                label: '转账',
                cb: () => handleService('转账')
            },
        ],
        right: [
            {
                label: '改密',
                cb: () => handleClick('改密')
            },
            {
                label: '退卡',
                cb: () => handleClick('退卡')
            },
        ]
    },
    // 结果状态
    resultState: {
        main: Result,
        left: [],
        right: [
            {
                label: '返回',
                cb: () => handleClick('返回')
            },
            {
                label: '退卡',
                cb: () => handleClick('退卡')
            },
        ]
    },
    // 取款页
    getMoneyState: {
        main: getMoneyState,
        left: [
            {
                label: '100',
                cb: () => handleGetMoney('100')
            },
            {
                label: '200',
                cb: () => handleGetMoney('200')
            },
            {
                label: '500',
                cb: () => handleGetMoney('500')
            },
            {
                label: '1000',
                cb: () => handleGetMoney('1000')
            },
        ],
        right: [
            {
                label: '输入金额',
                cb: () => handleClick('输入金额')
            },
            {
                label: '确认取款',
                cb: () => handleGetMoney('确认取款')
            },
            {
                label: '返回',
                cb: () => handleClick('返回')
            },
            {
                label: '退卡',
                cb: () => handleClick('退卡')
            },
        ]
    },
    // 存款页
    setMoneyState: {
        main: setMoneyState,
        left: [
            {
                label: '100',
                cb: () => handleSetMoney('100')
            },
            {
                label: '200',
                cb: () => handleSetMoney('200')
            },
            {
                label: '500',
                cb: () => handleSetMoney('500')
            },
            {
                label: '1000',
                cb: () => handleSetMoney('1000')
            },
        ],
        right: [
            {
                label: '输入金额',
                cb: () => handleClick('输入金额')
            },
            {
                label: '确认存款',
                cb: () => handleSetMoney('确认存款')
            },
            {
                label: '返回',
                cb: () => handleClick('返回')
            },
            {
                label: '退卡',
                cb: () => handleClick('退卡')
            },
        ]
    },
    // 查询页
    checkMoneyState: {
        main: checkMoney,
        left: [
            {
                label: '余额查询',
                cb: () => handleCheckMoney('余额查询')
            },
        ],
        right: [
            {
                label: '交易明细查询',
                cb: () => handleCheckMoney('交易明细查询')
            },
            {
                label: '返回',
                cb: () => handleCheckMoneyReturn()
            },
            {
                label: '退卡',
                cb: () => handleClick('退卡')
            }
        ]
    },
    // 查询余额页
    checkMoneyRest: {
        main: checkMoneyRest,
        left: [],
        right: [
            {
                label: '返回',
                cb: () => handleClick('返回')
            },
            {
                label: '退卡',
                cb: () => handleClick('退卡')
            }
        ]
    },
    // 查询交易明细页
    checkMoneyDetail: {
        main: checkMoneyDetail,
        left: getPage,
        right: [
            {
                label: '返回',
                cb: () => handleCheckMoney('返回')
            },
            {
                label: '退卡',
                cb: () => handleClick('退卡')
            }
        ]
    },
    // 转账输入账号页
    transferMoneyState: {
        main: transferMoney,
        left: [],
        right: [
            {
                label: '输入账号',
                cb: () => handleClick('输入账号')
            },
            {
                label: '确认',
                cb: () => handleClick('转账输入确认')
            },
            {
                label: '取消',
                cb: () => handleClick('取消')
            }
        ]
    },
    // 转账输入账号确认页
    transferMoneyConfirmState: {
        againPage: true,
        main: transferMoneyConfirm,
        left: [],
        right: [
            {
                label: '输入账号',
                cb: () => handleClick('输入账号')
            },
            {
                label: '确认',
                cb: () => handleClick('转账输入再次确认')
            },
            {
                label: '取消',
                cb: () => handleClick('取消')
            }
        ]
    },
    // 转账输入金额页
    transferMoneyDetailState: {
        main: transferMoneyDetail,
        left: [],
        right: [
            {
                label: '输入金额',
                cb: () => handleClick('输入金额')
            },
            {
                label: '确认',
                cb: () => handleClick('转账确认')
            },
            {
                label: '取消',
                cb: () => handleClick('取消')
            }
        ]
    },
    // 改密输入密码页
    changePasswordState: {
        main: changePassword,
        left: [],
        right: [
            {
                label: '输入密码',
                cb: () => handleClick('输入密码')
            },
            {
                label: '确认',
                cb: () => handleClick('改密输入密码确认')
            },
            {
                label: '取消',
                cb: () => handleClick('取消')
            }
        ]
    },
    // 改密再次输入密码页
    changePasswordConfirmState: {
        againPage: true,
        main: changePasswordConfirm,
        left: [],
        right: [
            {
                label: '输入密码',
                cb: () => handleClick('输入密码')
            },
            {
                label: '确认',
                cb: () => handleClick('改密再次输入密码确认')
            },
            {
                label: '取消',
                cb: () => handleClick('取消')
            }
        ]
    },
    // 密码修改成功页
    changePasswordSuccessState: {
        main: Result,
        left: [],
        right: [
            {
                label: '返回',
                cb: () => handleClick('取消')
            },
            {
                label: '退卡',
                cb: () => handleClick('退卡')
            }
        ]
    },
    // 交易成功
    transferMoneySuccessState: {
        main: Result,
        left: [
            {
                label: '打印凭证',
                cb: () => handleClick('打印凭证')
            },
        ],
        right: [
            {
                label: '返回',
                cb: () => handleClick('取消')
            },
            {
                label: '退卡',
                cb: () => handleClick('退卡')
            }
        ]
    },
    // 感谢页
    thanksState: {
        main: Result,
        left: [],
        right: [
            {
                label: '退出',
                cb: () => handleClick('退出')
            }
        ]
    }
}
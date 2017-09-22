
// 初始化状态
let initNavList = {
    a: 1,
    b: 2
}

export function home(state = initNavList, action) {
    switch (action.type) {
        case 'RECEIVE_NAV':
            return {
                ...state,   //三个点是展开符
                a: action.a // 或别的值
            }
        case 'RECEIVE_BOOK':
            return Object.assign({}, state, action.value ); // 这样保证传来的 action.value是个对象
        default:
            return state;
    }
}
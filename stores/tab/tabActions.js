export const SET_TRADE_MODAL_VISIBILITY = 'SET_TRADE_MODAL_VISIBILITY'
// export const INCREASE_NUMBER = 'INCREASE_NUMBER'

export const setTradeModalVisibilitySuccess = (isVisible) => {
    return {
        type: SET_TRADE_MODAL_VISIBILITY,
        payload: isVisible
    }
}

export function setTradeModalVisibility(isVisible) {
    return (dispatch) => {
        dispatch(setTradeModalVisibilitySuccess(isVisible))
    }
}

// export const increaseNumber = (number) => {
//     return {
//         type: INCREASE_NUMBER,
//         payload: number
//     }
// }
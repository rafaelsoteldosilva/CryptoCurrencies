import * as marketActions from './market/marketActions';
import * as tabActionsTypes from './tab/tabActions';

const initialState = {
    myHoldings: [],
    coins: [],
    error: null,
    loading: false,
    isTradeModalVisible: false
};

export const superReducer = (state = initialState, action) => {
    switch (action.type) {

        case marketActions.GET_HOLDINGS_BEGIN:
            return {
                ...state,
                loading: true
            };

        case marketActions.GET_HOLDINGS_SUCCESS:
            return {
                ...state,
                myHoldings: action.payload
            };

        case marketActions.GET_HOLDINGS_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        case marketActions.GET_COIN_MARKET_BEGIN:
            return {
                ...state,
                loading: true
            };

        case marketActions.GET_COIN_MARKET_SUCCESS:
            return {
                ...state,
                coins: action.payload
            };

        case marketActions.GET_COIN_MARKET_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        case tabActionsTypes.SET_TRADE_MODAL_VISIBILITY:
            return {
                ...state,
                isTradeModalVisible: action.payload
            };

        default:
            return state;
    }
};


import * as tabActionsTypes from "./tabActions";

const initialState = {
    isTradeModalVisible: false,
    // theNumber: 0,
};

const tabReducer = (state = initialState, action) => {
    switch (action.type) {
        case tabActionsTypes.SET_TRADE_MODAL_VISIBILITY:
            return {
                ...state,
                isTradeModalVisible: action.payload,
            };

        // case tabActionsTypes.INCREASE_NUMBER:
        //     return {
        //         ...state,
        //         theNumber: state.theNumber + action.payload,
        //     };

        default:
            return state;
    }
};

export default tabReducer;

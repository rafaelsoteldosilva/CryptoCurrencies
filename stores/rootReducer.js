import { combineReducers } from 'redux';

import tabReducer from './tab/tabReducer';
import marketReducer from './market/marketReducer';
import logReducer from './log/logReducer';

export default rootReducer = combineReducers({
    tabReducer,
    marketReducer,
    logReducer
});

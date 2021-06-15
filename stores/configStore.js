

import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { superReducer } from './superReducer';

const middleware = [thunk];
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configStore() {
    return createStore(superReducer, composeEnhancers(applyMiddleware(...middleware)))
};

export default configStore
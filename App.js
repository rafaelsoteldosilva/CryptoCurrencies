import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// import { superReducer, initialState } from './stores/superReducer';
import configStore from './stores/configStore';

import Tabs from './navigation/tabs';

// import { composeWithDevTools } from 'redux-devtools-extension';

// const myStore = createStore(
//     superReducer,
//     applyMiddleware(thunk)
// )

const myStore = configStore()

const Stack = createStackNavigator();

const App = () => {
    return (
        <Provider store={myStore}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'MainLayout'}
                >
                    <Stack.Screen name="MainLayout" component={Tabs} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;

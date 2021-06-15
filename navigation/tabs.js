import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';

import {
    setTradeModalVisibility,
} from '../stores/tab/tabActions';

import { Home, Portfolio, Market, Profile } from '../screens';
import { COLORS, icons } from '../constants';
import TabIcon from '../components/TabIcon';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                width: 50,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    );
};

const Tabs = ({ isTradeModalVisible, setTradeModalVisibility }) => {
    function tradeTabButtonOnClickHandler() {
        setTradeModalVisibility(!isTradeModalVisible);
    }

    return (
        <Tab.Navigator
            initialRouteName={"Home"}
            tabBarOptions={{
                showLabel: false,
                style: {
                    height: 70,
                    backgroundColor: COLORS.primary,
                    borderTopColor: 'transparent'
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible)
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.home}
                                    label="Home"
                                    isTrade={false}
                                />
                            );
                    }
                }}
                listeners={{
                    tabPress: (e) => {
                        if (isTradeModalVisible) e.preventDefault();
                    }
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible)
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.briefcase}
                                    label="Portfolio"
                                    isTrade={false}
                                />
                            );
                    }
                }}
                listeners={{
                    tabPress: (e) => {
                        if (isTradeModalVisible) e.preventDefault();
                    }
                }}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon
                                focused={focused}
                                icon={
                                    isTradeModalVisible
                                        ? icons.close
                                        : icons.trade
                                }
                                iconStyle={
                                    isTradeModalVisible
                                        ? {
                                              width: 15,
                                              height: 15
                                          }
                                        : null
                                }
                                label="Trade"
                                isTrade={true}
                            />
                        );
                    },
                    tabBarButton: (props) => {
                        return (
                            <TabBarCustomButton
                                {...props}
                                onPress={() => tradeTabButtonOnClickHandler()}
                            />
                        );
                    }
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible)
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.market}
                                    label="Market"
                                    isTrade={false}
                                />
                            );
                    }
                }}
                listeners={{
                    tabPress: (e) => {
                        if (isTradeModalVisible) e.preventDefault();
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible)
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.profile}
                                    label="Profile"
                                    isTrade={false}
                                />
                            );
                    }
                }}
                listeners={{
                    tabPress: (e) => {
                        if (isTradeModalVisible) e.preventDefault();
                    }
                }}
            />
        </Tab.Navigator>
    );
};

const mapStateToProps = (state, props) => {
    return {
        isTradeModalVisible: state.isTradeModalVisible
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTradeModalVisibility: (isTradeModalVisible) =>
            dispatch(setTradeModalVisibility(isTradeModalVisible))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);

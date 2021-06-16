import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { connect } from 'react-redux';

import MainLayout from './MainLayout';
import BalanceInfo from '../components/BalanceInfo';
import IconTextButton from '../components/IconTextButton';
import HereGoesChart from '../components/HereGoesChart'
import { getHoldings, getCoinMarket } from '../stores/market/marketActions';
import { COLORS, SIZES, FONTS, dummyData, icons } from '../constants';

import * as helper from '../helpers/helperFunctions';

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {
    const [selectedCoin, setSelectedCoin] = React.useState(null);

    useEffect(() => {
        getHoldings();
        getCoinMarket();
    }, [])

    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
    let valueChange = myHoldings.reduce(
        (a, b) => a + (b.holding_value_change_7d || 0),
        0
    );
    let percChange = (valueChange / (totalWallet - valueChange)) * 100;

    function renderWalletInfoSection() {
        return (
            <View
                style={{
                    paddingHorizontal: SIZES.padding,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    backgroundColor: COLORS.gray
                }}
            >
                {/* Balance info */}
                <BalanceInfo
                    title="Your Wallet"
                    displayAmount={totalWallet}
                    changePct={percChange}
                    containerStyle={{
                        marginTop: 20
                    }}
                />

                {/* Buttons */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 15,
                        // marginBottom: -20,
                        paddingHorizontal: SIZES.radius
                    }}
                >
                    <IconTextButton
                        label="Transfer"
                        icon={icons.send}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                            marginRight: SIZES.radius
                        }}
                        onPress={() => console.log('Transfer')}
                    />

                    <IconTextButton
                        label="Withdraw"
                        icon={icons.withdraw}
                        containerStyle={{
                            flex: 1,
                            height: 40
                        }}
                        onPress={() => console.log('Withdraw')}
                    />
                </View>
            </View>
        );
    }

    return (
        <MainLayout>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.black
                }}
            >
                {renderWalletInfoSection()}

                {/* Chart */}
                <HereGoesChart/>

                {/* Top Cryptocurrency */}

                <FlatList
                    data={coins}
                    keyExtractor={(item) => item.id}
                    // style={{
                    //     marginTop: 10
                    // }}
                    contentContainerStyle={{
                        marginTop: 30,
                        paddingHorizontal: SIZES.padding
                    }}
                    ListHeaderComponent={
                        <View
                            style={{
                                marginBottom: SIZES.radius
                                // marginTop: 20
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.h3,
                                    fontSize: 18
                                }}
                            >
                                Top Cryptocurrencies
                            </Text>
                        </View>
                    }
                    renderItem={({ item }) => {
                        let pricePercChangeColor =
                            item.price_change_percentage_7d_in_currency == 0
                                ? COLORS.lightGray3
                                : item.price_change_percentage_7d_in_currency >
                                  0
                                ? COLORS.lightGreen
                                : COLORS.red;

                        return (
                            <TouchableOpacity
                                style={{
                                    height: 55,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={() => setSelectedCoin(item)}
                            >
                                {/* Logo */}
                                <View
                                    style={{
                                        width: 35
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{
                                            height: 20,
                                            width: 20
                                        }}
                                    />
                                </View>

                                {/* Name */}
                                <View
                                    style={{
                                        flex: 1
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: COLORS.white,
                                            ...FONTS.h3
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </View>

                                {/* Figures */}
                                <View>
                                    <Text
                                        style={{
                                            textAlign: 'right',
                                            color: COLORS.white,
                                            ...FONTS.h4
                                        }}
                                    >
                                        ${' '}
                                        {helper.formatToCurrency(
                                            item.current_price
                                        )}
                                    </Text>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                        {item.price_change_percentage_7d_in_currency !=
                                            0 && (
                                            <Image
                                                source={icons.upArrow}
                                                style={{
                                                    height: 10,
                                                    width: 10,
                                                    tintColor: pricePercChangeColor,
                                                    transform:
                                                        item.price_change_percentage_7d_in_currency >
                                                        0
                                                            ? [
                                                                  {
                                                                      rotate: '0deg'
                                                                  }
                                                              ]
                                                            : [
                                                                  {
                                                                      rotate: '180deg'
                                                                  }
                                                              ]
                                                }}
                                            />
                                        )}

                                        <Text
                                            style={{
                                                marginLeft: 5,
                                                color: pricePercChangeColor,
                                                ...FONTS.body5,
                                                lineHeight: 15
                                            }}
                                        >
                                            {item.price_change_percentage_7d_in_currency.toFixed(
                                                2
                                            )}
                                            %
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    // the buttons stripe would cover the list item
                    ListFooterComponent={
                        <View
                            style={{
                                marginBottom: 40
                            }}
                        />
                    }
                />
            </View>
        </MainLayout>
    );
};

const mapStateToProps = (state, props) => {
    // console.log(dummyData.holdings.map((item) => item.id).join(','))
    return {
        myHoldings: state.myHoldings,
        coins: state.coins
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getHoldings: () => {
            return dispatch(getHoldings());
        },

        getCoinMarket: () => {
            return dispatch(getCoinMarket());
        }
    };
};

// export default Home

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { getCoinMarket } from '../stores/market/marketActions';

import { MainLayout } from '.';
import * as helper from '../helpers/helperFunctions';
import HeaderBar from '../components/HeaderBar';
import TextButton from '../components/TextButton';
import { constants, COLORS, FONTS, SIZES, icons } from '../constants';

const Tabs = () => {

    return (
        <View
            style={{
                flexDirection: 'row'
            }}
        >

            {/* Tabs */}
            {constants.marketTabs.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={`MarketTab-${index}`}
                        style={{
                            flex: 1
                        }}
                    >
                        <View
                            ref={item.ref}
                            style={{
                                paddingHorizontal: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 40
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                                {item.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const Market = ({ getCoinMarket, coins }) => {

    React.useEffect(() => {
        getCoinMarket();
    }, []);

    function renderTabBar() {
        return (
            <View
                style={{
                    marginTop: SIZES.radius,
                    marginHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.gray
                }}
            >
                <Tabs />
            </View>
        );
    }

    function renderButtons() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: SIZES.radius,
                    marginHorizontal: SIZES.radius
                }}
            >
                <TextButton label="USD" />

                <TextButton
                    label="% (7d)"
                    containerStyle={{
                        marginLeft: SIZES.base
                    }}
                />

                <TextButton
                    label="Top"
                    containerStyle={{
                        marginLeft: SIZES.base
                    }}
                />
            </View>
        );
    }

    function renderList() {
        return (
            <View
                style={{
                    flex: 1,
                    width: SIZES.width,
                    marginTop: 20,
                }}
            >
                <FlatList
                    data={coins}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        let priceColor =
                            item.price_change_percentage_7d_in_currency == 0
                                ? COLORS.lightGray3
                                : item.price_change_percentage_7d_in_currency >
                                  0
                                ? COLORS.lightGreen
                                : COLORS.red;

                        return (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingHorizontal: SIZES.padding,
                                    marginBottom: SIZES.radius
                                }}
                            >
                                {/* Coins */}
                                <View
                                    style={{
                                        flex: 1.5,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{
                                            height: 20,
                                            width: 20
                                        }}
                                    />

                                    <Text
                                        style={{
                                            marginLeft: SIZES.radius,
                                            color: COLORS.white,
                                            ...FONTS.h3
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </View>

                                {/* Line Chart */}
                                <View>
                                    <Text
                                        style={{
                                            marginTop: 8,
                                            color: COLORS.red
                                        }}
                                    >
                                        LineChart
                                    </Text>
                                </View>

                                {/* Figures */}
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'flex-end',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
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
                                            justifyContent: 'flex-end',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {item.price_change_percentage_7d_in_currency !=
                                            0 && (
                                            <Image
                                                source={icons.upArrow}
                                                style={{
                                                    height: 10,
                                                    width: 10,
                                                    tintColor: priceColor,
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
                                                color: priceColor,
                                                ...FONTS.body5
                                            }}
                                        >
                                            {item.price_change_percentage_7d_in_currency.toFixed(
                                                2
                                            )}
                                            %
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
                />
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
                {/* Header */}
                <HeaderBar title="Market" />

                {/* Tab Bar */}
                {renderTabBar()}

                {/* Buttons */}
                {renderButtons()}

                {/* Market List */}
                {renderList()}
            </View>
        </MainLayout>
    );
};

function mapStateToProps(state) {
    return {
        coins: state.coins
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCoinMarket: () => {
            return dispatch(getCoinMarket());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);

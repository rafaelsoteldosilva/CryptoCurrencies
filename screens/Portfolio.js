import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getHoldings } from '../stores/market/marketActions';

import { MainLayout } from '.';
import BalanceInfo from '../components/BalanceInfo';
import HereGoesChart from '../components/HereGoesChart';
// import { BalanceInfo, Chart } from '../components/';
import { SIZES, COLORS, FONTS, dummyData, icons } from '../constants';

const Portfolio = ({ getHoldings, myHoldings }) => {
    const [selectedCoin, setSelectedCoin] = React.useState(null);
    const [showChart, setShowChart] = React.useState(false);

    React.useEffect(() => {
        setShowChart(true);
        getHoldings();
    }, []);

    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
    let valueChange = myHoldings.reduce(
        (a, b) => a + (b.holding_value_change_7d || 0),
        0
    );
    let percChange = (valueChange / (totalWallet - valueChange)) * 100;

    function renderCurrentBalanceSection() {
        return (
            <View
                style={{
                    paddingHorizontal: SIZES.padding,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    backgroundColor: COLORS.gray
                }}
            >
                <Text
                    style={{
                        marginTop: 20,
                        color: COLORS.white,
                        ...FONTS.largeTitle
                    }}
                >
                    Portfolio
                </Text>

                <BalanceInfo
                    title="Current Balance"
                    displayAmount={totalWallet}
                    changePct={percChange}
                    containerStyle={{
                        marginTop: SIZES.radius,
                        marginBottom: SIZES.padding
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
                {/* Header - Current Balance */}
                {renderCurrentBalanceSection()}

                {/* Chart */}
                {showChart && <HereGoesChart />}

                {/* Your Assets */}
                <FlatList
                    data={myHoldings}
                    keyExtractor={(item) => `${item.id}`}
                    contentContainerStyle={{
                        marginTop: SIZES.padding,
                        paddingHorizontal: SIZES.padding
                    }}
                    ListHeaderComponent={
                        <View>
                            {/* Section Title */}
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                                Your Assets
                            </Text>

                            {/* Header Label */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: SIZES.radius
                                }}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        color: COLORS.lightGray3
                                    }}
                                >
                                    Asset
                                </Text>
                                <Text
                                    style={{
                                        flex: 1,
                                        color: COLORS.lightGray3,
                                        textAlign: 'right'
                                    }}
                                >
                                    Price
                                </Text>
                                <Text
                                    style={{
                                        flex: 1,
                                        color: COLORS.lightGray3,
                                        textAlign: 'right'
                                    }}
                                >
                                    Holdings
                                </Text>
                            </View>
                        </View>
                    }
                    ListFooterComponent={<View style={{ height: 50 }} />}
                    renderItem={({ item }) => {
                        let priceColor =
                            item.price_change_percentage_7d_in_currency == 0
                                ? COLORS.lightGray3
                                : item.price_change_percentage_7d_in_currency >
                                  0
                                ? COLORS.lightGreen
                                : COLORS.red;
                        return (
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    height: 55
                                }}
                                onPress={() => {
                                    setSelectedCoin(item);
                                }}
                            >
                                {/* Asset */}
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                    <Text
                                        style={{
                                            marginLeft: SIZES.radius,
                                            color: COLORS.white,
                                            ...FONTS.h4
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </View>

                                {/* Price */}
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'right',
                                            color: COLORS.white,
                                            ...FONTS.h4,
                                            lineHeight: 15
                                        }}
                                    >
                                        $ {item.current_price.toLocaleString()}
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
                                                ...FONTS.body5,
                                                lineHeight: 15
                                            }}
                                        >
                                            {item.price_change_percentage_7d_in_currency.toFixed(
                                                2
                                            )}{' '}
                                            %
                                        </Text>
                                    </View>
                                </View>

                                {/* Holdings */}
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'right',
                                            color: COLORS.white,
                                            ...FONTS.h4,
                                            lineHeight: 15
                                        }}
                                    >
                                        $ {item.total.toLocaleString()}
                                    </Text>
                                    <Text
                                        style={{
                                            textAlign: 'right',
                                            color: COLORS.lightGray3,
                                            ...FONTS.body5,
                                            lineHeight: 15
                                        }}
                                    >
                                        {item.qty} {item.symbol.toUpperCase()}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </MainLayout>
    );
};

function mapStateToProps(state) {
    return {
        myHoldings: state.myHoldings
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getHoldings: () => {
            return dispatch(getHoldings());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);

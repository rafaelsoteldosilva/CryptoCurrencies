import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

import { COLORS, SIZES, FONTS, icons } from '../constants';

const BalanceInfo = ({ title, displayAmount, changePct, containerStyle }) => {
    return (
        <View style={{ ...containerStyle }}>
            {/* Title */}
            <Text style={{ color: COLORS.white }}>{title}</Text>

            {/* Figures */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}
            >
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>$</Text>
                <Text
                    style={{
                        marginLeft: SIZES.base,
                        ...FONTS.h2,
                        color: COLORS.white
                    }}
                >
                    {/* {displayAmount.toLocaleString('en-US')} */}
                    {parseFloat(displayAmount)
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                </Text>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>
                    {' '}
                    USD
                </Text>
            </View>

            {/* Change percentage */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}
            >
                {changePct != 0 && (
                    <Image
                        source={icons.upArrow}
                        style={{
                            width: 10,
                            height: 10,
                            alignSelf: 'center',
                            tintColor:
                                changePct > 0 ? COLORS.lightGreen : COLORS.red,
                            transform:
                                changePct > 0
                                    ? [{ rotate: '0deg' }]
                                    : [{ rotate: '180deg' }]
                        }}
                    />
                )}
                <Text
                    style={{
                        marginLeft: SIZES.base,
                        alignSelf: 'flex-end',
                        color:
                            changePct === 0
                                ? COLORS.lightGray3
                                : changePct > 0
                                ? COLORS.lightGreen
                                : COLORS.red,
                        ...FONTS.h4
                    }}
                >
                    {changePct.toFixed(2)}%
                </Text>
                <Text
                    style={{
                        marginLeft: SIZES.base,
                        // alignSelf: 'flex-end',
                        color: COLORS.lightGray3,
                        ...FONTS.h5
                    }}
                >
                    7d change
                </Text>
            </View>
        </View>
    );
};

export default BalanceInfo;

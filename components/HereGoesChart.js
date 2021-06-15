import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import { COLORS, SIZES, FONTS } from '../constants';

const HereGoesChart = () => {
    return (
        <View
            style={{
                marginTop: 15
            }}
        >
            <Text
                style={{
                    marginTop: 15,
                    textAlign: 'center',
                    color: COLORS.red
                }}
            >
                -------- HERE GOES THE CHART --------
            </Text>
        </View>
    );
};

export default HereGoesChart;

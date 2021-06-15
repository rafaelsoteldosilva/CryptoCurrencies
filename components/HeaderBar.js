import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import { COLORS, FONTS, SIZES } from "../constants";


const HeaderBar = ({ title }) => {
    return (
        <View
            style={{
                height: 70,
                paddingHorizontal: SIZES.radius,
                justifyContent: 'flex-end'
            }}
        >
            <Text style={{ color: COLORS.white, ...FONTS.largeTitle }}>{title}</Text>
            {/* <Text>HeaderBar</Text> */}
        </View>
    )
}

export default HeaderBar;
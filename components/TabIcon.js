import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import { COLORS, FONTS } from "../constants";

const TabIcon = ({ focused, icon, iconStyle, label, isTrade }) => {
    if (isTrade) {
        return (
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: COLORS.white,
                }}
            >
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.black,
                        ...iconStyle,
                    }}
                />
                <Text style={{ color: COLORS.black, ...FONTS.h4 }}>
                    {label}
                </Text>
            </View>
        );
    }
    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
                source={icon}
                resizeMode="contain"
                style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? COLORS.white : COLORS.secondary,
                    ...iconStyle,
                }}
            />
            <Text
                style={{
                    color: focused ? COLORS.white : COLORS.secondary,
                    ...FONTS.body4,
                }}
            >
                {label}
            </Text>
        </View>
    );
};

export default TabIcon;

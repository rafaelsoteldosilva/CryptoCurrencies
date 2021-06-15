import React, { useState } from "react";
import { Text, TouchableOpacity, Image } from "react-native";

import { COLORS, SIZES, FONTS } from "../constants";

const IconTextButton = ({ label, icon, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...containerStyle,
            }}
            onPress={onPress}
        >
            <Image 
                source={icon}
                resizeMode='contain'
                style={{
                    height: 20,
                    width: 20
                }}
            />
            <Text
                style={{
                    marginLeft: SIZES.base,
                    ...FONTS.h3,
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default IconTextButton;

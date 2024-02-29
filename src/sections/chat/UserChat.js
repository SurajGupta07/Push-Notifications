import React from "react";
import { View, Text } from "native-base";

export const UserChat = ({ route }) => {
    const { recentText } = route.params;
    return (
        <View style={{ flex: 1 }} backgroundColor="white">
            <Text>{recentText}</Text>
        </View>
    );
};

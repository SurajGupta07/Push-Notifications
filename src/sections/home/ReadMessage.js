import React from "react";
import { View, Text } from "native-base";

export const ReadMessage = () => {
    return (
        <View flex={1} justifyContent={"center"} alignItems={"center"}>
            <Text fontWeight={"600"} color={"black"} fontSize={"3xl"}>
                Messages viewed
            </Text>
        </View>
    );
};

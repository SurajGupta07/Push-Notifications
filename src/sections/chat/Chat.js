import React from "react";
import { View, Text, FlatList, Box } from "native-base";
import { userChatData } from "../../helpers/data";
import { Pressable } from "react-native";

export const Chat = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }} backgroundColor="white">
            <FlatList
                data={userChatData}
                renderItem={({ item }) => {
                    console.log(userChatData);
                    return (
                        <Box flex={1}>
                            <Pressable
                                onPress={() =>
                                    navigation.navigate("chat/user-message", {
                                        recentText: item.recentText,
                                    })
                                }
                            >
                                <View>
                                    <Text>UI</Text>
                                    <Text fontWeight={"600"} color={"black"} fontSize={"xl"}>
                                        {item.name}
                                    </Text>
                                    <Text
                                        opacity={"0.8"}
                                        fontWeight={"400"}
                                        color={"black"}
                                        fontSize={"sm"}
                                    >
                                        {item.recentText}
                                    </Text>
                                    <Text fontWeight={"600"} color={"#1976D2"} fontSize={"xs"}>
                                        {item.timeStamp}
                                    </Text>
                                </View>
                            </Pressable>
                        </Box>
                    );
                }}
            />
        </View>
    );
};

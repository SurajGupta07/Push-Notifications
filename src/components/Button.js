import React from "react";
import { Pressable, Text } from "react-native";

export const Button = ({ handlePress, title, buttonDesign, titleDesign }) => {
    return (
        <Pressable style={buttonDesign} onPress={() => handlePress()}>
            <Text style={titleDesign}>{title}</Text>
        </Pressable>
    );
};

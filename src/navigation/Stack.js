import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Applications, Chat, Notify, ReadMessage, UserChat } from "../sections";
import Icon from "react-native-vector-icons/FontAwesome";

const NavigationStack = createNativeStackNavigator();
const NavigationTab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <NavigationStack.Navigator>
            <NavigationStack.Screen
                name="notify"
                component={Notify}
                options={{ title: "Notify Me", headerTitleAlign: "center" }}
            />
            <NavigationStack.Screen
                name="viewed"
                component={ReadMessage}
                options={{
                    title: "View Messages",
                    headerTitleAlign: "center",
                }}
            ></NavigationStack.Screen>
        </NavigationStack.Navigator>
    );
};

const ChatStack = () => {
    return (
        <NavigationStack.Navigator screenOptions={{ headerShown: false }}>
            <NavigationStack.Screen name="chats" component={Chat} />
            <NavigationStack.Screen name="chat/user-message" component={UserChat} />
        </NavigationStack.Navigator>
    );
};

const NavigationTabs = () => {
    return (
        <NavigationTab.Navigator>
            <NavigationTab.Screen
                name="main/home"
                component={HomeStack}
                options={{
                    title: "Home",
                    tabBarIcon: () => <Icon name={"home"} size={30} color="#1976D2" />,
                    headerShown: false,
                }}
            />
            <NavigationTab.Screen
                name="main/chat"
                component={ChatStack}
                options={{
                    title: "Chat",
                    tabBarIcon: () => <Icon name={"comments"} size={30} color="#1976D2" />,
                    headerTitle: "Search Users",
                    headerTitleAlign: "center",
                    headerLeft: () => <Icon name={"bars"} size={25} color="#0f172a" />,
                }}
            />
            <NavigationTab.Screen
                name="main/more"
                component={Applications}
                options={{
                    title: "Applications",
                    tabBarIcon: () => <Icon name={"user"} size={30} color="#1976D2" />,
                }}
            />
        </NavigationTab.Navigator>
    );
};

export const Routes = () => {
    return (
        <NavigationContainer>
            <NavigationTabs />
        </NavigationContainer>
    );
};

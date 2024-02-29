import React, { useState, useEffect } from "react";
import { View } from "native-base";
import { StyleSheet, TextInput } from "react-native";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance, AndroidStyle, EventType } from "@notifee/react-native";
import { palette } from "../../themes/colors";
import { Button } from "../../components/Button";
import { useDispatch } from "react-redux";
import { NOTIFICATION_REQUEST } from "../../redux/types/notification.types";

export const Notify = ({ navigation }) => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const sendNotification = async (showGroupNotifee) => {
        const notifyData = {
            data: {
                title: "Notify Me",
                text,
                showGroupNotifee,
            },
        };
        dispatch({ type: NOTIFICATION_REQUEST, payload: notifyData });
    };

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            if (remoteMessage) {
                const groupMessage = [
                    {
                        text: remoteMessage.notification.body,
                        timestamp: Date.now(),
                    },
                    {
                        text: remoteMessage.data.secondaryUsertext,
                        timestamp: Date.now(),
                        person: {
                            name: remoteMessage.data.userTwo,
                            icon: remoteMessage.data.secondaryUserIcon,
                        },
                    },
                ];
                const individualMessage = [
                    {
                        text: remoteMessage.notification.body,
                        timestamp: Date.now(),
                    },
                ];
                let messages =
                    remoteMessage.data?.showGroupNotifee === "true"
                        ? groupMessage
                        : individualMessage;

                const channelId = await notifee.createChannel({
                    id: "default",
                    name: "Default Channel",
                    importance: AndroidImportance.HIGH,
                });

                // Display a notification on for foreground from firebase response.
                await notifee.displayNotification({
                    title: "Notify Me",
                    android: {
                        channelId,
                        smallIcon: "ic_launcher",
                        pressAction: {
                            id: "default",
                        },
                        actions: [
                            {
                                title: "<b> Reply </b>",
                                input: {
                                    allowFreeFormInput: true,
                                    placeholder: "Reply ...",
                                },
                                pressAction: { id: "reply" },
                            },
                            {
                                title: "<b>Mark as read</b>",
                                pressAction: { id: "read" },
                            },
                        ],
                        style: {
                            type: AndroidStyle.MESSAGING,
                            person: {
                                name: remoteMessage.data.userOne,
                                icon: remoteMessage.notification.android.imageUrl,
                            },
                            messages,
                        },
                    },
                });
                await notifee.incrementBadgeCount();
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        notifee.onForegroundEvent(async ({ type }) => {
            if (type === EventType.ACTION_PRESS) {
                navigation.navigate("main/chat");
                notifee.hideNotificationDrawer();
            }
        });
    }, []);

    return (
        <View flex={1} justifyContent={"center"} ml={"10"} mr={"10"}>
            <TextInput
                style={styles.input}
                onChangeText={(val) => setText(val)}
                value={text}
                placeholder="Enter text"
                keyboardType="default"
            />
            <Button
                handlePress={() => sendNotification(true)}
                title="Notify Group"
                buttonDesign={styles.notifyButton}
                titleDesign={styles.buttonText}
            />
            <Button
                handlePress={() => sendNotification(false)}
                title="Notify Individual"
                buttonDesign={styles.notifyButton}
                titleDesign={styles.buttonText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 42,
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
    },
    notifyButton: {
        backgroundColor: palette.bl100,
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 2,
    },
    buttonText: {
        color: palette.white,
        textAlign: "center",
    },
});

import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance, AndroidStyle } from "@notifee/react-native";

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        return authStatus;
    }
};

const backgroundMessages = async (remoteMessage) => {
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
            remoteMessage.data?.showGroupNotifee === "true" ? groupMessage : individualMessage;
        const channelId = await notifee.createChannel({
            id: "default",
            name: "Default Channel",
            importance: AndroidImportance.HIGH,
        });

        // Display notification on for Background/Quit state.
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
};

//Notification listener for Background and Quit App state
export const notificationListner = async () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
        backgroundMessages(remoteMessage);
    });

    messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
            if (remoteMessage) {
                backgroundMessages(remoteMessage);
            }
        });
};

//Trigger Firebase cloud messaginng
export const triggerNotifications = async ({ data }) => {
    const FIREEBASE_API_KEY =
        "AAAAnO_f0Dw:APA91bG-mouRV96Xb8PQsFryVcsizbr6LjrXudWil-36imm3q83Xa-VpDhbDattcz7XvtN7IzhcBDiEvUyi0IPLUkcD_9bzoodAkpBn4zZwRalmHK-_KimC95mzmVPQRSBJBfqSfae2Y";
    const message = {
        registration_ids: [
            "exkNxHbdTrG1PDPUKb-_s0:APA91bHgHMg1MAfHovo5jv5BU_qySRiSkuphpaAha5rWsUU1vJLBf09_kn1-HXAPoVReRtjfuExzFxht6lI5w7AzuZnFnLa1fjRYymXRAogICnsDth0Xx2tG2qwq1SKWCIGERTiQK21u",
        ],
        notification: {
            title: data?.title,
            body: data?.text,
            image: "https://img.freepik.com/free-vector/coloured-mandala-design_1175-81.jpg?size=338&ext=jpg",
            vibrate: 1,
            sound: 1,
            show_in_foreground: true,
            priority: "high",
            content_available: true,
        },
        data: {
            userOne: "PersonOne",
            userTwo: "PersonTwo",
            secondaryUserIcon: "https://my-cdn.com/avatars/567.png",
            secondaryUsertext: "Hello!",
            showGroupNotifee: data.showGroupNotifee,
        },
    };
    const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: "key=" + FIREEBASE_API_KEY,
    });

    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers,
        body: JSON.stringify(message),
    });

    return await response.json();
};

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { LogBox } from "react-native";
import { NativeBaseProvider } from "native-base";
import { requestUserPermission, notificationListner } from "./utils/notificationService";
import { Routes } from "./navigation/Stack";
import { theme } from "./themes/nativebase";
import store from "./store";

const App = () => {
    useEffect(() => {
        requestUserPermission();
        notificationListner();
    }, []);
    LogBox.ignoreAllLogs();

    return (
        <Provider store={store}>
            <NativeBaseProvider theme={theme}>
                <Routes />
            </NativeBaseProvider>
        </Provider>
    );
};

export default App;

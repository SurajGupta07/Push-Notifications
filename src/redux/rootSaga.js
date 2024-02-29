import { all } from "redux-saga/effects";
import watcherTriggerNotification from "./sagas/notification.saga";

export default function* rootSaga() {
    yield all([watcherTriggerNotification()]);
}

import { put, call, takeEvery } from "redux-saga/effects";
import {
    NOTIFICATION_FAILURE,
    NOTIFICATION_REQUEST,
    NOTIFICATION_SUCCESS,
} from "../types/notification.types";
import { triggerNotifications } from "../../utils/notificationService";

function* triggerNotification(action) {
    try {
        const listner = yield call(triggerNotifications, action.payload);
        yield put({ type: NOTIFICATION_SUCCESS, listner });
    } catch (err) {
        yield put({ type: NOTIFICATION_FAILURE, err: err });
    }
}

export default function* watcherTriggerNotification() {
    yield takeEvery(NOTIFICATION_REQUEST, triggerNotification);
}

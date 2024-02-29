import {
    NOTIFICATION_REQUEST,
    NOTIFICATION_SUCCESS,
    NOTIFICATION_FAILURE,
} from "../types/notification.types";

export const initalState = {
    list: [],
    loading: false,
    error: null,
};

const notificationReducer = (state = initalState, action) => {
    switch (action.type) {
        case NOTIFICATION_REQUEST:
            return { ...state, loading: true };
        case NOTIFICATION_SUCCESS:
            return { ...state, list: action?.listner, loading: false };
        case NOTIFICATION_FAILURE:
            return { ...state, error: action?.err };
        default:
            return state;
    }
};

export default notificationReducer;

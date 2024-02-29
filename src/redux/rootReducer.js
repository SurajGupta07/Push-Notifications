import { combineReducers } from "redux";

import notificationReducer from "./reducers/notification.reducer";

const rootReducer = combineReducers({
    notifications: notificationReducer,
});

export default rootReducer;

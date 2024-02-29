import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../redux/rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../redux/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);

sagaMiddleware.run(rootSaga);

export default store;

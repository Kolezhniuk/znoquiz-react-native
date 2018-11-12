import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers";
import {createReactNavigationReduxMiddleware} from "react-navigation-redux-helpers";

const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
const store = createStore(
    rootReducer,
    applyMiddleware(middleware),
);
export default store;
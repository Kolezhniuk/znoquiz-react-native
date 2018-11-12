import React from "react";
import {Provider} from "react-redux";
import store from "./src/strore/reducers/store";
import AppWithNavigationState from "./src/strore/config";




export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}
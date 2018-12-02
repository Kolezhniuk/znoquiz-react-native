import React from "react";
import { Font } from 'expo';
import {connect, Provider} from "react-redux";
import {StyleSheet, ActivityIndicator, StatusBar, View} from "react-native";
import {createReactNavigationReduxMiddleware, reduxifyNavigator} from "react-navigation-redux-helpers";
import appNavigator from "./src/components/Navigation";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./src/strore/reducers/reducers";



const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const App = reduxifyNavigator(appNavigator, "root");

const mapStateToProps = (state) => ({
    state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(
    rootReducer,
    applyMiddleware(middleware),
);

export default class Root extends React.Component {
    state = {
        fontLoaded: false,
    };
    async componentDidMount() {
        await Font.loadAsync({
            'RobotoCondensed-Regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
            'RobotoCondensed-BoldItalic': require('./assets/fonts/RobotoCondensed-BoldItalic.ttf'),
            'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        });
        this.setState({ fontLoaded: true });
    }
    render() {

            if (this.state.fontLoaded) {
                return (

                    <Provider store={store}>
                        <AppWithNavigationState/>
                    </Provider>
                );
            }
            else {
                return (
                    <View style={styles.container}>
                        <ActivityIndicator />
                        <StatusBar barStyle="default" />
                    </View>
                )
            }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
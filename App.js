import React from "react";
import { Font } from 'expo';
import {Provider} from "react-redux";
import store from "./src/strore/reducers/store";
import AppWithNavigationState from "./src/strore/config";
import {StyleSheet, ActivityIndicator, StatusBar, View} from "react-native";




export default class Root extends React.Component {
    state = {
        fontLoaded: false,
    };
    async componentDidMount() {
        await Font.loadAsync({
            'RobotoCondensed-Regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
            'RobotoCondensed-BoldItalic': require('./assets/fonts/RobotoCondensed-BoldItalic.ttf'),
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
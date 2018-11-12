import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Button,
    ScrollView
} from 'react-native';
import Logo from "./logo";

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Logo/>
                    {/*<Button title="Sign in!" onPress={this._signInAsync} />*/}
                </View>
            </ScrollView>

        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
});
import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    ScrollView
} from 'react-native';
import Logo from "./logo";
import {getOrientation, getPLatform, removeOrientationListener, setOrientationListener} from "../../utils/misc/misc";
import LoinPanel from "./loginPanel";
import LoginForm from "./loginForm";

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            platform: getPLatform(),
            orientation: getOrientation(500),
            logoAnimation: false
        };
        setOrientationListener(this.changeOrientation)
    }

    componentWillUnmount() {
        removeOrientationListener();
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Logo showLogin={this.showLogin.bind(this)}
                          orientation={this.state.orientation}/>
                    {/*<Button title="Sign in!" onPress={this._signInAsync} />*/}
                    <LoinPanel
                        orientation={this.state.orientation}
                        show = { this.state.logoAnimation}
                    />
                    <LoginForm platform = {this.state.platform} />
                </View>
            </ScrollView>

        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };

    showLogin() {
        this.setState({logoAnimation: true});
    }

    changeOrientation() {
        this.setState({orientation: getOrientation(500)})
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
});
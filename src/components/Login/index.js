import React, { Component }from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Login extends Component {
    render() {
        return (
            <View>
                <Text>Увійти</Text>
                <Button
                    title="Login"
                onPress ={ () => { LoadTabs(); } }
                color="white"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import Input from '../../utils/forms/inputs'

export default class LoginForm extends React.Component {

    state = {
        hasErrors: false,
        form: {
            email: {
                value: '',
                valid: false,
                type: 'textinput',
                rules: {
                    isEmail: true
                }
            },
            password: {
                value: '',
                valid: false,
                type: 'password',
                rules: {
                    minLength: 6
                }
            },
            confirmPassword: {
                value: '',
                valid: false,
                type: 'textinput',
                rules: {
                    confirmPass: "password"
                }
            }
        }
    };

    render() {
        return (
            <View style={styles.formInputContainer}>

                <Input
                    placeholder="Email"
                    value={this.state.form.email.value}
                    type={this.state.form.email.type}
                    keyboardType={"email-address"}
                    autoCapitalization={"none"}
                    onChangeText={(value) => this.updateInput('email', value)}
                />

                <Input
                    placeholder="Password"
                    value={this.state.form.password.value}
                    type={this.state.form.password.type}
                    onChangeText={(value) => this.updateInput('password', value)}
                    secureTextEntry
                />
                <View style = {
                    this.props.platform === 'ios' ? styles.buttonStyleIOS : styles.buttonStyleAndroid
                }>
                    <Button
                        title="Login"
                        color="#fd9727"
                        onPress={()=> alert('lert')}
                    />
                </View>

                <View style = {
                    this.props.platform === 'ios' ? styles.buttonStyleIOS : styles.buttonStyleAndroid
                }>
                    <Button
                        title="Register"
                        color="#fd9727"
                        onPress={()=> alert('lert')}
                    />
                </View>

            </View>
        )
    }

    updateInput(name, value) {
        this.setState({hasErrors: false});
        let formCopy = this.state.form;
        formCopy[name].value = value;
        this.setState({form: formCopy});
    }
}
const styles = StyleSheet.create({
    formInputContainer: {
        minHeight: 400,
        // justifyContent: 'center',
    },
    buttonStyleAndroid:{

    },
    buttonStyleIOS:{

    }
});
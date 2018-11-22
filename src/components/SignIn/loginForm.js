import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Input from '../../utils/forms/inputs'
import ValidationRules from '../../utils/forms/validationRules';
import {connect} from 'react-redux';
import {signUp} from '../../strore/actions/user_actions';
import {bindActionCreators} from 'redux';


class LoginForm extends React.Component {

    state = {
        type: 'Login',
        action: 'Login',
        actionMode: 'Not a user, Register',
        hasErrors: false,
        form: {
            email: {
                value: '',
                valid: false,
                type: 'textinput',
                rules: {
                    isRequired: true,
                    isEmail: true
                }
            },
            password: {
                value: '',
                valid: false,
                type: 'textinput',
                rules: {
                    isRequired: true,
                    minLength: 6
                }
            },
            confirmPassword: {
                value: '',
                valid: false,
                type: 'textinput',
                rules: {
                    isRequired: true,
                    confirmPass: 'password'
                }
            }
        }
    };
    onChangeFormType = () => {
        const type = this.state.type;
        this.setState({
            type: type === 'Login' ? 'Register' : 'Login',
            action: type === 'Login' ? 'Register' : 'Login',
            actionMode: type === 'Login' ? 'Not registered Login' : 'Not a user, Register'
        })
    };

    confirmPassword = () => {
        return this.state.type !== 'Login' ?
            (<Input
                placeholder='Confirm password'
                value={this.state.form.confirmPassword.value}
                type={this.state.form.confirmPassword.type}
                keyboardType={'email-address'}
                autoCapitalization={'none'}
                onChangeText={(value) => this.updateInput('confirmPassword', value)}
                secureTextEntry
            />)
            : null;
    };

    formHasErrors = () => {
        return this.state.hasErrors ?
            <View style={styles.errorContainer}>
                <Text style={styles.errorLabel}> PLease check your info </Text>
            </View>
            : null;
    };

    submitUser = () => {
        console.log('submit');
        let isFormValid = true;
        let formToSubmit = {};
        const formCopy = this.state.form;
        for(let key in formCopy){
            if(this.state.type === 'Login'){
                if(key !== 'confirmPassword'){
                    isFormValid = isFormValid && formCopy[key].valid;
                    formToSubmit[key] = formCopy[key].value;
                }
            } else {
                isFormValid = isFormValid && formCopy[key].valid;
                formToSubmit[key] = formCopy[key].value;
            }
        }


        console.log('isFormValid', isFormValid);
        if (isFormValid) {

            if (this.state.type === 'Login') {

            } else {
                this.props.signUp(formToSubmit)
                    .then(() => console.log('succesfull'));
            }
        } else {
            console.log("invalid");
            this.setState({hasErrors: true});
        }

    };

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <View style={styles.formInputContainer}>

                <Input
                    placeholder='Email'
                    value={this.state.form.email.value}
                    type={this.state.form.email.type}
                    keyboardType={'email-address'}
                    autoCapitalization={'none'}
                    onChangeText={(value) => this.updateInput('email', value)}
                />

                <Input
                    placeholder='Password'
                    value={this.state.form.password.value}
                    type={this.state.form.password.type}
                    onChangeText={(value) => this.updateInput('password', value)}
                    secureTextEntry
                />

                {this.confirmPassword()}
                {this.formHasErrors()}


                <View style={
                    this.props.platform === 'ios' ? styles.buttonStyleIOS : styles.buttonStyleAndroid
                }>
                    <Button
                        title={this.state.action}
                        color='#fd9727'
                        onPress={this.submitUser}
                    />
                </View>


                <View style={
                    this.props.platform === 'ios' ? styles.buttonStyleIOS : styles.buttonStyleAndroid
                }>
                    <Button
                        title={this.state.actionMode}
                        color='#fd9727'
                        onPress={this.onChangeFormType}
                    />
                </View>

            </View>
        )
    }

    updateInput(name, value) {
        this.setState({hasErrors: false});
        let formCopy = this.state.form;

        formCopy[name].value = value;

        let rules = formCopy[name].rules;
        let valid = ValidationRules(value, rules, formCopy);
        formCopy[name].valid = valid;
        console.log(valid);

        this.setState({form: formCopy});
    }
}

const styles = StyleSheet.create({
    formInputContainer: {
        minHeight: 400,
        // justifyContent: 'center',
    },
    buttonStyleAndroid: {
        marginBottom: 5,
        marginTop: 15

    },
    buttonStyleIOS: {
        marginBottom: 5,
        marginTop: 15
    },
    errorContainer: {
        marginBottom: 20,
        marginTop: 10
    },
    errorLabel: {
        fontFamily: 'Roboto-Black',
        color: '#f00'
    }
});

function mapStateToProps(state) {
    return {

        User: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signUp}, dispatch);
}

export default connect(mapDispatchToProps, mapDispatchToProps)(LoginForm)


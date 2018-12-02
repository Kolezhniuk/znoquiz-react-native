import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Input from '../../utils/forms/inputs'
import ValidationRules from '../../utils/forms/validationRules';
import {connect} from 'react-redux';
import {signUp, signIn} from '../../strore/actions/user_actions';
import {bindActionCreators} from 'redux';
import {getTokens, setTokens} from "../../utils/misc/misc";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        // this.onChangeFormType = this.onChangeFormType.bind(this);
        // this.confirmPassword = this.confirmPassword.bind(this);
        // this.submitUser = this.submitUser.bind(this);
        this.state = {
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
    }

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
                <Text style={styles.errorLabel}> Please check your info </Text>
            </View>
            : null;
    };
    manageAccess = () => {
        if (!this.props.User.userData.uid) {
            this.setState({hasErrors: true});
        } else {
            //store data in phone
            setTokens(this.props.User.userData, () => {
                console.log("works");
                this.setState({hasErrors: false});
                console.log(this.props, 'props');
                this.props.navigation.navigate('App');
            });
        }
    };
    submitUser = () => {
        console.log('submit');
        let isFormValid = true;
        let formToSubmit = {};
        const formCopy = this.state.form;
        for (let key in formCopy) {
            if (this.state.type === 'Login') {
                if (key !== 'confirmPassword') {
                    isFormValid = isFormValid && formCopy[key].valid;
                    formToSubmit[key] = formCopy[key].value;
                }
            } else {
                isFormValid = isFormValid && formCopy[key].valid;
                formToSubmit[key] = formCopy[key].value;
            }
        }

        if (isFormValid) {
            if (this.state.type === 'Login') {
                this.props.signIn(formToSubmit).payload
                    .then((data) => {
                            this.mapDataToUser(data);
                            this.manageAccess();
                            console.log(this.props.User, 'sign in User');
                        }
                    );
            } else {
                this.props.signUp(formToSubmit).then((data) => {
                        this.mapDataToUser(data);
                        console.log(this.props.User, 'Register User');
                    }
                );
            }
        } else {
            console.log("invalid");
            this.setState({hasErrors: true});
        }

    };

    componentDidMount() {
        getTokens((values) => {
            console.log(values, 'values');
        });
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
        this.setState({form: formCopy});
    }

    mapDataToUser(data) {
        this.props.User.userData.uid = data.localId;
        this.props.User.userData.token = data.idToken;
        this.props.User.userData.refToken = data.refreshToken;
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

//needed for redux


function mapStateToProps(state) {
    return {
        User: state.User,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signUp, signIn}, dispatch);
}

// export default LoginForm;
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);


import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {WIDTH} from "../misc/misc";

const input = (props) => {
    let template = null;
    switch (props.type) {
        case 'textinput':
            return (<TextInput
                {...props}
                style={[styles.input, props.overrideStyles]}
            />);
        case 'password':
            return (<TextInput
                {...props}
                style={[styles.input, props.overrideStyles]}
            />);
        default:
            return template;
    }

};

const styles = StyleSheet.create({
    input: {
        width: WIDTH()*.75,
        // alignSelf:'stretch',
        // textAlign: 'center',
        // flex:1,
        borderBottomWidth: 2,
        borderBottomColor: '#eaeaea',
        fontSize: 18,
        padding: 5,
        marginTop: 10
    }

});

export default input;
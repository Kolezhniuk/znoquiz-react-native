import React, {Component} from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';
import {QUIZ_DATA} from "../Quiz/data";

export default class HistoryQuiz extends Component {
    questions = {};
    correctAnswers = {};
    static navigationOptions = {
        headerTitle: "History Quiz"
    };

    constructor(props) {
        super(props);
        Object.assign(this.questions, QUIZ_DATA.history.questions);
        console.log(this.questions);
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text> Hi there</Text>
            </View>
        );
    }

    startQuiz() {
        this.props.navigation.navigate('HistoryQuiz');
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

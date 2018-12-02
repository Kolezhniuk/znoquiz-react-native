import React, {Component} from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';
import {withNavigation} from "react-navigation";


class Home extends Component {
    constructor(props) {
        super(props);
        this.startQuiz = this.startQuiz.bind(this);
        this.startHistoryQuiz = this.startHistoryQuiz.bind(this);
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button
                    title='Start'
                    color='#00ADA9'
                    onPress={this.startQuiz}
                />
                <Button
                    title='Start History Quiz'
                    color='#00ADA0'
                    onPress={this.startHistoryQuiz}
                />
            </View>
        );
    }

    startQuiz() {
        this.props.navigation.navigate('HistoryQuiz');
    }

    startHistoryQuiz() {
        this.props.navigation.navigate('HistoryQuiz1');
    }
}

export default withNavigation(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

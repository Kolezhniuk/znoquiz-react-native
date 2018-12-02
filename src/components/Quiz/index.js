import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Animbutton from '../Animbutton'
import {QUIZ_DATA} from "../Quiz/data";

const {width, height} = Dimensions.get('window');

export default class Quiz extends Component {
    arrnew = [];

    jdata =  QUIZ_DATA.history.questions;

    constructor(props) {
        super(props);
        this.qno = 0;
        this.score = 0;
        this.arrnew = Object.keys(this.jdata).map((i) => this.jdata[i]);
        this.state = {
            question: this.arrnew[this.qno].question,
            options: this.arrnew[this.qno].options,
            correctoption: this.arrnew[this.qno].correctoption,
            countCheck: 0
        };
        this._answer = this._answer.bind(this);

    }

    prev() {
        if (this.qno > 0) {
            this.qno--
            this.setState({
                question: this.arrnew[this.qno].question,
                options: this.arrnew[this.qno].options,
                correctoption: this.arrnew[this.qno].correctoption
            })
        }
    }

    next() {
        if (this.qno < arrnew.length - 1) {
            this.qno++;
            this.setState({
                countCheck: 0,
                question: this.arrnew[this.qno].question,
                options: this.arrnew[this.qno].options,
                correctoption: this.arrnew[this.qno].correctoption
            })
        } else {
            this.props.quizFinish(this.score * 100 / 5)
        }
    }

    _answer(status, ans) {
        if (status) {
            const count = this.state.countCheck + 1;
            this.setState({countCheck: count});
            if (ans === this.state.correctoption) {
                this.score += 1
            }
        } else {
            const count = this.state.countCheck - 1;
            this.setState({countCheck: count});
            if (this.state.countCheck < 1 || ans === this.state.correctoption) {
                this.score -= 1
            }
        }

    }

    render() {
        let _this = this;
        const currentOptions = this.state.options;
        const options = Object.keys(currentOptions).map(function (k) {
            return (<View key={k} style={{margin: 10}}>

                <Animbutton countCheck={_this.state.countCheck} onColor={"green"} effect={"tada"}
                            _onPress={(status) => _this._answer(status, k)} text={currentOptions[k]}/>

            </View>)
        });

        return (
            <ScrollView style={{backgroundColor: '#F5FCFF', paddingTop: 10}}>
                <View style={styles.container}>

                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: "space-between",
                        alignItems: 'center',
                    }}>

                        <View style={styles.oval}>
                            <Text style={styles.welcome}>
                                {this.state.question}
                            </Text>
                        </View>
                        <View>
                            {options}
                        </View>
                        <View style={{flexDirection: "row"}}>
                            {/*   <Button
          onPress={() => this.prev()}
          title="Prev"
          color="#841584"
        />
        <View style={{margin:15}} />*/}

                            <TouchableOpacity onPress={() => this.next()}>
                                <View style={{
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    paddingRight: 20,
                                    paddingLeft: 20,
                                    borderRadius: 10,
                                    backgroundColor: "green"
                                }}>
                                    <Ionicons name="ios-arrow-forward" size={30} color="white"/>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    oval: {
        width: width * 90 / 100,
        borderRadius: 20,
        backgroundColor: 'green'
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        margin: 15,
        color: "white"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
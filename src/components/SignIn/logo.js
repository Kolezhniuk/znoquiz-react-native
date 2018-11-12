import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    Animated,
    Button,
    Easing,
    ScrollView
} from 'react-native';

export default class Logo extends React.Component {

    state = {
        sellAnim: new Animated.Value(0),
        itAnim: new Animated.Value(0)
    };


    componentWillMount() {
        Animated.sequence([
            Animated.timing(this.state.sellAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.poly(3)
            }),
            Animated.timing(this.state.itAnim, {
                toValue: 1,
                duration: 500,
                easing: Easing.poly(3)
            })
        ]).start(() => alert('done'))
    }

    render() {
        return (
            <View>
                <View style={styles.logo}>
                    <Animated.View
                    style={{ opacity: this.state.sellAnim, top: this.state.sellAnim.interpolate({
                            inputRange: [0,1],
                            outputRange: [100,0]
                        })
                    }}
                    >
                        <Text style={styles.zno}>200</Text>

                    </Animated.View>
                    <Animated.View
                        style={{ opacity: this.state.itAnim, top: this.state.sellAnim.interpolate({
                                inputRange: [0,1],
                                outputRange: [100,0]
                            })
                        }} >
                        <Text style={styles.baliv}>baliv</Text>

                    </Animated.View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    logo: {
        marginTop: 50,
        flex: 1,
        flexDirection: 'row',
        maxHeight: 100,
        // justifyContent: 'center',
    },
    zno:{
        fontSize: 40,
        fontFamily: 'RobotoCondensed-Regular',
        color: '#555'
    },
    baliv: {
        fontSize: 40,
        fontFamily: 'RobotoCondensed-Regular',
        color: '#00ADA9'
    }
});
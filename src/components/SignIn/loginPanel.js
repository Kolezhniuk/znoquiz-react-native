import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    Image,
    View,
    Animated,
    Button,
    Easing,
    ScrollView
} from 'react-native';
import BackImage from '../../../assets/logo2.png';
export default class LoinPanel extends React.Component {

    state = {
        animFinished: false,
        backImage: new Animated.Value(0),
        inputForm: new Animated.Value(0)
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.show && !this.state.animFinished) {
            Animated.parallel([
                Animated.timing(this.state.backImage, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.poly(3)
                }),
                Animated.timing(this.state.inputForm, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.poly(3)
                })
            ]).start(() => {
                this.setState({animFinished: true})
            })
        }
    }

    // componentWillMount() {
    //     Animated.sequence([
    //         Animated.timing(this.state.sellAnim, {
    //             toValue: 1,
    //             duration: 1000,
    //             easing: Easing.poly(3)
    //         }),
    //         Animated.timing(this.state.itAnim, {
    //             toValue: 1,
    //             duration: 500,
    //             easing: Easing.poly(3)
    //         })
    //     ]).start()
    // }

    render() {
        return (
            <View>
                <Animated.View
                    style={{
                        opacity: this.state.backImage
                    }} >
                    <Image source={BackImage}
                           resizeMode={'contain'}
                           style={this.props.orientation === 'portrait'
                                   ? styles.imageStylePortrait : styles.imageStyleLandscape}
                     />
                </Animated.View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    imageStylePortrait: {
        width: 270,
        height: 150
    } ,imageStyleLandscape: {
        width: 270,
        height: 0
    }
});
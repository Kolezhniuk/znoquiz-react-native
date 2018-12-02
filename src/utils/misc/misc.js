import {Dimensions, Platform, AsyncStorage} from 'react-native'

export const WIDTH = () => Dimensions.get('window').width;

export const HEIGHT = () => Dimensions.get('window').height;


export const API_KEY = "AIzaSyDHZESHf4tMdk9AnCyYi0qazBE-gEV72J4";
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
export const FIREBASEURL = 'https://sellitup-beca2.firebaseio.com/';


export const getOrientation = (value) => {
    return Dimensions.get("window").height > value ? "portrait" : "landscape";
};

export const setOrientationListener = (cb) => {
    return Dimensions.addEventListener("change", cb);
};

export const removeOrientationListener = () => {
    return Dimensions.removeEventListener("change");
};

export const getPlatform = () => {
    if (Platform.OS === 'ios') {
        return "ios"
    } else {
        return "android"
    }
};

export const getTokens = (cb) => {
    AsyncStorage.multiGet([
        '@znoApp@token',
        '@znoApp@refreshToken',
        '@znoApp@expireToken',
        '@znoApp@uid'
    ]).then(value => {
        cb(value);
    });
};

export const setTokens = (values, cb) => {

    const dateNow = new Date();
    //3600 * 1000 miliseconds
    const expiration = dateNow.getTime() + (900 * 1000);

    AsyncStorage.multiSet([
        ['@znoApp@token', values.token],
        ['@znoApp@refreshToken', values.refToken],
        ['@znoApp@expireToken', expiration.toString()],
        ['@znoApp@uid', values.uid]
    ]).then(response => {
        cb();
    });
};

export const navigatorDrawer = (event, $this) => {
    if (event.type === "NavBarButtonPress" && event.id === "DrawerButton") {
        $this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        })
    }
};

export const navigatorDeepLink = (event, $this) => {
    if (event.type === "DeepLink") {
        $this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        });

        if (event.payload.typeLink === 'tab') {
            $this.props.navigator.switchToTab({
                tabIndex: event.payload.indexLink
            })
        } else {
            $this.props.navigator.showModal({
                screen: event.link,
                animationType: 'slide-horizontal',
                //for android only
                navigatorStyle: {
                    navBarBackgroundColor: '#00ADA9',
                    screenBackgroundColor: '#ffffff',
                    backButtonHidden: false
                }
            })
        }
    }
};

export const gridTwoColumns = (list) => {
    let newArticles = [];
    let articles = list;

    let count = 1;
    let vessel = {};

    if (articles) {
        articles.forEach(element => {
            if (count === 1) {
                vessel["blockOne"] = element;
                count++;
            } else {
                vessel["blockTwo"] = element;
                newArticles.push(vessel);

                count = 1;
                vessel = {};
            }
        });
    }

    return newArticles;
};
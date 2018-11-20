import {Dimensions, Platform} from 'react-native'

export const getOrientation = (value) => {
    return Dimensions.get('window').height > value ? 'portrait' : 'landscape';
};

export const setOrientationListener = (cb) => {
    return Dimensions.addEventListener("change", cb);
};

export const removeOrientationListener = (cb) => {
    return Dimensions.removeEventListener("change", cb);
};

export const WIDTH = () => Dimensions.get('window').width;
export const HEIGHT = () => Dimensions.get('window').height;

export const getPlatform = () => {
    if (Platform.OS === "ios") {
        return 'ios';
    }
    return 'android';
};
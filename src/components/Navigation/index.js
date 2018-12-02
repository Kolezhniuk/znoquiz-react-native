import React from "react";
import Admin from "../Admin";
import Home from "../Home";
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from "react-navigation";
import {Ionicons} from "@expo/vector-icons";
import SignInScreen from "../SignIn";
import AuthLoadingScreen from "../AuthLoading";
import HistoryQuiz from "../HistoryQuiz";
import PlayQuiz from "../PlayQuiz"; // 6.2.2

const AuthStack = createStackNavigator({SignIn: SignInScreen});
const HistoryStack = createStackNavigator({
    HistoryQuiz: HistoryQuiz,
});

const HistoryStack1 = createStackNavigator({
    HistoryQuiz1: PlayQuiz,
});


const BottomNavigator = createBottomTabNavigator({
        Home: Home,
        Admin: Admin,
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === "Home") {
                    iconName = `ios-home${focused ? '' : "-outline"}`;
                } else if (routeName === "Admin") {
                    iconName = `ios-person${focused ? '' : "-outline"}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor}/>;
            },
        }),
        tabBarOptions: {
            activeTintColor: "#3cc473",
            inactiveTintColor: "gray",
        },
        animationEnabled: false,
        swipeEnabled: false,
    }
);

const appNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: BottomNavigator,
        Auth: AuthStack,
        HistoryQuiz: HistoryStack,
        HistoryQuiz1: HistoryStack1
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default appNavigator;
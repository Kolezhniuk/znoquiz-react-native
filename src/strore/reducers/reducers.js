import {combineReducers} from 'redux'
import {createNavigationReducer} from "react-navigation-redux-helpers";
import appNavigator from "../../components/Navigation";

const navReducer = createNavigationReducer(appNavigator);
const rootReducer = combineReducers({
    nav: navReducer,
    // User
});
export default rootReducer;
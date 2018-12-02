import {combineReducers} from 'redux'
import {createNavigationReducer} from "react-navigation-redux-helpers";
import appNavigator from "../../components/Navigation";
import User from './user_reducer';

const navReducer = createNavigationReducer(appNavigator);
const rootReducer = combineReducers({
    nav: navReducer,
    User: User
});
export default rootReducer;
import {reduxifyNavigator} from "react-navigation-redux-helpers";
import appNavigator from "../components/Navigation";
import {connect} from "react-redux";

const App = reduxifyNavigator(appNavigator, "root");
const mapStateToProps = (state) => ({
    state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;

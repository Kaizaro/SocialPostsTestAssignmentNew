/**
 * App navigation component
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';

import Settings from './screens/Settings';
import PostsList from './screens/PostsList';
import LoadingScreen from './screens/LoadingScreen';


import colors from './components/colors';

const LOG_TAG = '>>> AppNavigator ';

const SetupStack = createStackNavigator({
    Settings: Settings,
    PostsList: PostsList
}, {
    initialRouteName: 'Settings',
    headerMode: 'none'

});
const AppStack = createStackNavigator({
    PostsList: PostsList,
    Settings: Settings
}, {
    initialRouteName: 'PostsList',
    headerMode: 'none'
});


const AppContainer = createAppContainer(createSwitchNavigator(
    {
        LoadingScreen: LoadingScreen,
        App: AppStack,
        Setup: SetupStack
    },
    {
        initialRouteName: 'LoadingScreen'
    }
));

class AppNavContainer extends Component {

    constructor() {
        super();
    }
    

    render() {
        return (
            <AppContainer
                style={styles.container}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE
    }
});

export default AppNavContainer;

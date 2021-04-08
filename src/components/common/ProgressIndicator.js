import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

import colors from '../colors';

class ProgressIndicator extends Component {


    render() {
        return (
            <ActivityIndicator
                style={styles.activityIndicator}
                animating={true}
                size={48}
                color={colors.CETACEAN_BLUE}/>
        );
    }
}

const styles = StyleSheet.create({
    activityIndicator: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.WHITE,
        opacity: 0.85
    }
});


export default ProgressIndicator;

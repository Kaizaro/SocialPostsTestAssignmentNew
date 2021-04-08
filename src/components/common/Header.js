import React, {PureComponent} from 'react';

import {Platform, StyleSheet, Text, View} from 'react-native';


import colors from '../colors';
import fontSizes from '../fontSizes';

class Header extends PureComponent {

    render() {
        return (
            <View
                style={{
                    ...Platform.select({ios: {height: 44}, android: {height: 56}}),
                    ...styles.headerContainer,
                }}>
                <Text style={styles.headerText}>
                    {this.props.header}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 0,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 16,
        borderStyle: 'dashed',
        borderBottomWidth: 1,
        borderBottomColor: colors.BLACK,
        borderBottomStartRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    },
    headerText: {
        flex: 1,
        color: colors.BLACK_TEXT,
        fontSize: fontSizes.HEADER,
        alignItems: 'center',
        fontWeight: 'bold',
    }
});


export default Header;

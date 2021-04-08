import React, {PureComponent} from 'react';

import {StyleSheet, Text, View} from 'react-native';


import colors from '../colors';
import fontSizes from '../fontSizes';

const LOG_TAG = '>>> PostsListItem ';


class PostsListItem extends PureComponent {
    

    render() {
        const postData = this.props.post;

        const {created_at} = postData;
        const {user} = postData;
        const {text} = postData;

        const date = new Date(created_at);
        const time = date.toLocaleString();


        return (
            <View
                style={styles.container}>
                <View style={styles.detailsItemWrapper}>
                    <View style={styles.textWrapper}>
                        <Text style={styles.titleText}>
                            {time}
                        </Text>
                        <Text style={styles.titleText}>
                            {user.name}
                        </Text>
                    </View>
                        <Text style={styles.text}>
                            {text}
                        </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: colors.CETACEAN_BLUE,
        borderWidth: 1,
        marginVertical: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    detailsItemWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    textWrapper: {
        marginHorizontal: 8,
        marginTop: 8,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    titleText: {
        flex: 1,
        marginHorizontal: 8,
        color: colors.BLACK,
        fontSize: fontSizes.SUBTITLE
    },
    text: {
        marginHorizontal: 16,
        marginVertical: 8,
        color: colors.BLACK_TEXT,
        fontSize: fontSizes.SUBTITLE
    }
});


export default PostsListItem;

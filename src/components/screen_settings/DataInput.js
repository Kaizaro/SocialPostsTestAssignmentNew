import React, {Component} from 'react';

import {StyleSheet, Text, TextInput, View} from 'react-native';

const locale = require('../../assets/langs/en.json');
const errorLabel = locale.data.value_blank_or_incorrect;

import colors from '../colors';
import fontSizes from '../fontSizes';

export default class DataInput extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataFilled: false,

            userDataItem: ''
        };
    }

    handleInput(text) {
        this.props.handleInput(text);
    }

    render() {
        const {dataIsIncorrect, label, keyboardType, value} = this.props;
        let dataItemLabel = label;
        let dataItemLabelColor = colors.BLACK;
        if (dataIsIncorrect) {
            dataItemLabel = errorLabel;
            dataItemLabelColor = colors.CRIMSON;
        } else {
            dataItemLabel = label;
            dataItemLabelColor = colors.BLACK;
        }
        let keyboardTypeValue = 'default';
        if (keyboardType) {
            keyboardTypeValue = keyboardType;
        }

        return (
            <View
                style={styles.container}>
                <View
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        alignSelf: 'stretch'
                    }}>
                    <View
                        style={{
                            flex: 1,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.CETACEAN_BLUE,
                            alignSelf: 'stretch'
                        }}>
                        <TextInput
                            value={value}
                            keyboardType={keyboardTypeValue}
                            style={styles.textInputStyle}
                            underlineColorAndroid={'transparent'}
                            editable={true}
                            returnKeyType={'next'}
                            placeholder={this.props.placeholder}
                            onChangeText={(text) => this.handleInput(text)}/>
                    </View>
                </View>
                <View
                    style={{
                        flex: 0,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        paddingTop: 4
                    }}>
                    <Text style={{color: dataItemLabelColor, fontSize: fontSizes.TEXT}}>
                        {dataItemLabel}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        marginBottom: 8
    },
    textInputStyle: {
        height: 30,
        padding: 4,
        alignSelf: 'stretch'
    }
});

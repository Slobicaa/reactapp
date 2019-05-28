import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, text, style }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={ onPress } style = {[buttonStyle, style]}>
          <Text style = {textStyle}>
            {text}
          </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },

    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#818482',//'#077aff',
        marginLeft: 5,
        marginRight: 5
    }
}

export { Button };
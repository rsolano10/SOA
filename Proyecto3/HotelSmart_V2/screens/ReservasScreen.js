import React from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import { SocialIcon } from 'react-native-elements'

import i18n from '../src/i18n';

export default class ReservasScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    _linkPress() {
        Linking.openURL('https://www.google.com');
    }

    render() {
        return (
            <View style={styles.columnContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1}>{i18n.t('EnlacesReservas')}</Text>
                </View>
                <View style={styles.columnContainer}>
                    <Text style={{ color: 'blue' }}
                        onPress={() => Linking.openURL('https://www.google.com')}>
                        Reservas
                    </Text>
                </View>
                <View style={styles.separator} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center'
    },

    thumbnail: {
        width: 200,
        height: 200,
        marginRight: 20
    },
    separator: {
        height: 1,
        backgroundColor: '#dddd'
    },

    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#4BBB'
    },

    title: {
        fontSize: 30,
        color: '#FF5722'
    },

    description: {
        fontSize: 20,
        color: 'black'
    },

    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },

    columnContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10
    }

});

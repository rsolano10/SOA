import React from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import { SocialIcon } from 'react-native-elements'

import i18n from '../src/i18n';

export default class SocialScreen extends React.Component {
    static navigationOptions = {
        header: null,
      };

    _twitterPress(){
        Linking.openURL('https://www.twitter.com');
    }

    _fbPress(){
        Linking.openURL('https://www.facebook.com');
    }

    _instaPress(){
        Linking.openURL('https://www.instagram.com');
    }

    render() {
        return (
            <View style={styles.columnContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={1}>{i18n.t('EnlacesSociales')}</Text>
                    </View>
                    <View style={styles.columnContainer}>
                        <SocialIcon
                            onPress={this._twitterPress}
                            type='twitter'
                        />
                        <SocialIcon
                            onPress={this._fbPress}
                            type='facebook'
                        />
                        <SocialIcon
                            onPress={this._instaPress}
                            type='instagram'
                        />
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
        fontSize: 40,
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

import * as React from 'react';
import { StyleSheet, View, Image, TouchableOpacity,Text } from 'react-native';

import Home from '../assets/images/home.png';
import Login from '../assets/images/login.png';
import Weather from '../assets/images/weather.png';
import Location from '../assets/images/location.png';
import Info from '../assets/images/info.png';
import Social from '../assets/images/social.png';

import i18n from '../src/i18n';

export default class MainMenuScreen extends React.Component {
    static navigationOptions = {
        title: i18n.t('MainMenu'),
        headerStyle: {
            backgroundColor: 'red',
        },
        headerTintColor: 'white',
    };

    constructor() {
        super();
        this.state = {
            dataSource: {},
        };
    }

    _onClickListener = data => {
        if (data == 1) {
            this.props.navigation.navigate('Main');
        } 
        else if (data == 2) {
            this.props.navigation.navigate('Login');
        }
        else if (data == 3) {
            this.props.navigation.navigate('Weather');
        }
        else if (data == 4) {
            this.props.navigation.navigate('Zone');
        }
        else if (data == 5) {
            this.props.navigation.navigate('Config');
        }
        else if (data == 6) {
            this.props.navigation.navigate('Socialnavigator');
        }
    };

    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.rowContainer}>
                    <View style={styles.box}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => this._onClickListener(1)}>
                            <Image source={Home} style={styles.ImageIconStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => this._onClickListener(2)}>
                            <Image source={Login} style={styles.ImageIconStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => this._onClickListener(5)}>
                            <Image source={Info} style={styles.ImageIconStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.box}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => this._onClickListener(3)}>
                            <Image source={Weather} style={styles.ImageIconStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => this._onClickListener(4)}>
                            <Image source={Location} style={styles.ImageIconStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => this._onClickListener(6)}>
                            <Image source={Social} style={styles.ImageIconStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00b5ec',
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        height: 110,
        margin: 5,
        width: 110,
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#CDEDFF',
        borderWidth: 1.5,
        borderColor: '#2D6484',
        borderRadius: 5,
        margin: 5,
        width: 110,
        height: 110,
    },
    ImageIconStyle: {
        padding: 10,
        margin: 12,
        height: 80,
        width: 80,
        resizeMode: 'stretch',
    },
});

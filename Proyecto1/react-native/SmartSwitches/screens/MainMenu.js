import * as React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

import Switch from '../assets/images/switch.png'
import Settings from '../assets/images/settings.png'

export default class MainMenu extends React.Component {
    static navigationOptions = {
        title: 'Main Menu',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
    };

    constructor() {
        super();
        this.state = {
            dataSource: {},
        };
    }
    componentDidMount() {
        var that = this;
        let items = [
            { id: 1, src: Switch }, { id: 2, src: Settings }
        ];
        that.setState({
            dataSource: items,
        });
    }

    _onClickListener = (data) => {
        if (data == 1) {
            this.props.navigation.navigate('Switches');

        } else {
            this.props.navigation.navigate('Settings');
        }
    }


    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={() => this._onClickListener(1)}>
                        <Image
                            source={Switch}
                            style={styles.ImageIconStyle}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={() => this._onClickListener(2)}>
                        <Image
                            source={Settings}
                            style={styles.ImageIconStyle}
                        />
                    </TouchableOpacity>
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
        backgroundColor: '#2080B7',
    },
    box: {
        height: 110,
        margin: 5,
        width: 110
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
    }
});
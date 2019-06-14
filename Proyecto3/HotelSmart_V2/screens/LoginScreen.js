import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert,
    AsyncStorage
} from 'react-native';
import * as firebase from 'firebase';

import i18n from '../src/i18n';

export default class LoginScreen extends React.Component {

    static navigationOptions = () => ({
        title: i18n.t('Auth'),
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'red'
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    onClickListener = async (viewId) => {
        if (this.state.fullName != '' && this.state.email != '' && this.state.password != '') {
            //await AsyncStorage.setItem('user', this.state.fullName);
            //this.props.navigation.navigate('Main');
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => this.props.navigation.navigate('MainMenu'))
                .catch(error => alert(error))
        }
        else {
            Alert.alert("Error!", i18n.t('Obligatorios'));
        }
    }

    signout = async () => {
        firebase.auth().signOut().then(function () {
            alert(i18n.t("signedout"));
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }

    sign_in = async () => {
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder={i18n.t('Correo')}
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({ email })} />
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder={i18n.t('Contraseña')}
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                </View>
                <TouchableHighlight onPress={() => this.sign_in()}>
                    <Text style={styles.signUpText}>{i18n.t('Registrarse')}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('sign_up')}>
                    <Text style={styles.signUpText}>{i18n.t('Autenticar')}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.buttonContainer, styles.signoutButton]} onPress={() => this.signout()}>
                    <Text style={styles.signUpText}>{i18n.t('Logout')}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00b5ec',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        marginTop: 20,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    signupButton: {
        backgroundColor: "#B39292",
    },
    signoutButton: {
        backgroundColor: "red",
    },
    signUpText: {
        color: 'white',
    }
});

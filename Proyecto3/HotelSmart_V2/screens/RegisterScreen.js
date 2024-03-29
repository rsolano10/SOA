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

export default class RegisterScreen extends React.Component {

    static navigationOptions = () => ({
        title: i18n.t('Registro'),
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'red'
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
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
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => this.props.navigation.navigate('Login'))
                .catch(error => alert(error))
        }
        else {
            Alert.alert("Error!", i18n.t('Obligatorios'));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder={i18n.t('Nombre')}
                        keyboardType="default"
                        underlineColorAndroid='transparent'
                        onChangeText={(fullName) => this.setState({ fullName })} />
                </View>

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

                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('sign_up')}>
                    <Text style={styles.signUpText}>{i18n.t('Registrarse')}</Text>
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
    signUpText: {
        color: 'white',
    }
});

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    FlatList,
    TouchableHighlight,
    TextInput,
    Alert,
    ScrollView
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import Environment from '../config/environment';
import firebase from '../config/firebase';

import User from '../assets/images/user.png';

import i18n from '../src/i18n';

class ListItem extends React.PureComponent {
    _onPress = () => {
        //this.props._onPressItem(this.props.index)
        //alert("entre en index: ",this.props.index)
    }

    render() {
        const { item } = this.props
        return (
            <TouchableHighlight
                onPress={this._onPress}
                underlayColor='#dddd'
            >
                <View style={styles.rowContainer}>
                    <Image style={styles.thumbnail} source={{ uri: item.Imagen }} />

                    <View style={styles.textContainer}>
                        <Text style={styles.title} numberOfLines={1}>{item.Usuario}</Text>
                        <Text style={styles.description}>{item.Comentario}</Text>
                        <Text style={styles.price}>{i18n.t("Calificacion")}:{item.calificacion}</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        )
    }
}

export default class CommentsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            image: "https://firebasestorage.googleapis.com/v0/b/adtech-web.appspot.com/o/noimage.png?alt=media&token=c5cd7883-27c4-4e7f-9147-f80aae817c4d",
            uploading: false,
            data: {},
            googleResponse:{}
        }
    }

    _keyExtractor = (item, index) => index.toString()

    async componentDidMount() {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);

        fetch("https://soa.adtechcr.me/api/Comentarios", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    data: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _handleImagePicked = async pickerResult => {
        try {
            this.setState({ uploading: true });

            if (!pickerResult.cancelled) {
                uploadUrl = await uploadImageAsync(pickerResult.uri);
                this.setState({ image: uploadUrl });
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };

    _renderItem = ({ item, index }) => {
        return (
            <ListItem
                item={item}
                index={index}
                onPressItem={this._onPressItem}
            />

        )
    }
    onClickListener = async () => {
        var user = firebase.auth().currentUser;

        if (user) {
            await this.submitToGoogle();
            fetch('https://soa.adtechcr.me/dynamic', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: "INSERT INTO Comentarios (Usuario,Comentario,Imagen,calificacion) VALUES (?,?,?,?)",
                    params: [user.email, this.state.comment, this.state.image,this.state.googleResponse],
                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    fetch("https://soa.adtechcr.me/api/Comentarios", {
                        method: 'GET'
                    })
                        .then((response2) => response2.json())
                        .then((responseJson2) => {
                            console.log(responseJson2);
                            this.textInput.clear();
                            this.setState({
                                data: responseJson2,
                                Image: "https://firebasestorage.googleapis.com/v0/b/adtech-web.appspot.com/o/noimage.png?alt=media&token=c5cd7883-27c4-4e7f-9147-f80aae817c4d",
                                comment: ""
                            })
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });;
        } else {
            Alert.alert(
                i18n.t('Alerta'),
                i18n.t('AlertaMensaje'),
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
                ],
                { cancelable: false },
            );
        }
    }

    _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3]
        });

        this._handleImagePicked(pickerResult);
    };

    submitToGoogle = async () => {
        try {
            this.setState({ uploading: true });
            let { image } = this.state;
            let body = JSON.stringify({
                requests: [
                    {
                        features: [
                            { type: 'FACE_DETECTION', maxResults: 5 },
                            { type: 'WEB_DETECTION', maxResults: 5 }
                        ],
                        image: {
                            source: {
                                imageUri: image
                            }
                        }
                    }
                ]
            });
            let response = await fetch(
                'https://vision.googleapis.com/v1/images:annotate?key=' +
                Environment['GOOGLE_CLOUD_VISION_API_KEY'],
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: body
                }
            );
            let responseJson = await response.json();
            try{
            let tempsent = responseJson.responses[0].faceAnnotations[0];
            var sentiment = 0;
            if(tempsent.angerLikelihood == "VERY_LIKELY" || tempsent.angerLikelihood == "LIKELY"){
                sentiment = 1;
            }
            else if(tempsent.sorrowLikelihood == "VERY_LIKELY" || tempsent.sorrowLikelihood == "LIKELY"){
                sentiment = 5;
            }
            else if(tempsent.surpriseLikelihood == "VERY_LIKELY" || tempsent.surpriseLikelihood == "LIKELY"){
                sentiment = 8;
            }
            else if(tempsent.joyLikelihood == "VERY_LIKELY" || tempsent.joyLikelihood == "LIKELY"){
                sentiment = 10;
            }

            this.setState({
                googleResponse: sentiment,
                uploading: false
            });
            }catch(err){
                alert(i18n.t("noFace"));
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.rowContainer}>
                        <TouchableHighlight onPress={() => this._takePhoto()}>
                            <Image style={styles.thumbnail} source={{ uri: this.state.image }} />
                        </TouchableHighlight>
                        <TextInput style={styles.inputs}
                            placeholder={i18n.t('Comentario')}
                            multiline={true}
                            numberOfLines={4}
                            value={this.state.text}
                            ref={input => { this.textInput = input }}
                            underlineColorAndroid='transparent'
                            onChangeText={(comment) => this.setState({ comment })} />

                        <View style={styles.separator} />
                    </View>

                    <View style={styles.center}>
                        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener()}>
                            <Text style={styles.signUpText}>{i18n.t('Comentar')}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.center}>
                    <Text style={styles.titleMain}>{i18n.t('CommentarioTitulo')}</Text>
                    </View>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                </ScrollView>
            </View>

        );
    }
}

async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const ref = firebase
        .storage()
        .ref()
        .child(uuid.v4());
    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center'
    },
    thumbnail: {
        width: 80,
        height: 80,
        marginRight: 18
    },

    textContainer: {
        flex: 1
    },

    separator: {
        height: 1,
        backgroundColor: '#dddd'
    },

    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#4BBB'
    },

    title: {
        fontSize: 20,
        color: '#6565'
    },
    titleMain: {
        fontSize: 40,
        color: 'black'
    },

    description: {
        fontSize: 15,
        color: '#6565'
    },

    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
    inputs: {
        borderRadius: 20,
        borderColor: '#FF5722',
        borderWidth: 2,
        width: 200
    },

    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },

    signupButton: {
        backgroundColor: "#FF5722",
    },

    signUpText: {
        color: 'white',
    }

});
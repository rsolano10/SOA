import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native';

import Marriot from '../assets/images/marriot.png';

import i18n from '../src/i18n';

export default class ContactoScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
          isLoading: true,
          data: {},
          img:"https://cdn.sanity.io/images/365az4et/production/4983f13f99291ca01793086eeb4f83481d567a62-362x139.jpg"
        };
      }
    
      componentDidMount() {
        fetch(i18n.t('urlContacto'), {
             method: 'GET'
          })
          .then((response) => response.json())
          .then((responseJson) => {
             //console.log(responseJson.result[0].Nombre);
             console.log(responseJson.result[0].logo.asset._ref);
             let refImg = responseJson.result[0].logo.asset._ref.split('-');
             let imgUrl = "https://cdn.sanity.io/images/365az4et/production/"+refImg[1]+"-"+refImg[2]+"."+refImg[3];
             this.setState({
                data: responseJson.result[0],
                img: imgUrl
             })
          })
          .catch((error) => {
             console.error(error);
          });
      }
    render() { 
        return (
            <View style={styles.rowContainer}>
                <View style={styles.imageContainer}>
                <Image style={styles.thumbnail} source={{uri:this.state.img}} />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={1}>{this.state.data.Nombre}</Text>
                    </View>
                    <Text style={styles.description}>{this.state.data.descripcion}</Text>
                    <Text style={styles.price}>{i18n.t('Telefono')} {this.state.data.Telefono}</Text>
                </View>
                <View style={styles.separator} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center'
    },

    titleContainer: {
        alignItems: 'center'
    },

    thumbnail: {
        width: 200,
        height: 200,
        marginRight: 20
    },

    textContainer: {
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
        flexDirection: 'column',
        padding: 10
    }

});
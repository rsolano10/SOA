import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableHighlight,
  Alert
} from 'react-native';
import Room from '../assets/images/room1.jpg';

import i18n from '../src/i18n';

class ListItem extends React.PureComponent {

  insertEventAttendace(item) {
    fetch('https://soa.adtechcr.me/dynamic', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: "INSERT INTO ActivitiesAttendance (eventRelated) VALUES (?)",
        params: [item.Nombre],
      }),
    }).then((response) => response.json())
      .then((responseJson) => { 
        alert(i18n.t('evento'));
      });
  }

  _onPress = (item) => {
    Alert.alert(
      i18n.t('UnirseTitle'),
      i18n.t('UnirseMsg'),
      [
        {
          text: i18n.t('Cancelar'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: i18n.t('Confirmar'), onPress: () => this.insertEventAttendace(item) },
      ],
      { cancelable: false },
    );
  }

  render() {
    const { item } = this.props
    return (
      <TouchableHighlight
        onPress={() => this._onPress(item)}
        underlayColor='#dddd'
      >
        <View style={styles.rowContainer}>
          <Image style={styles.thumbnail} source={{ uri: item.img }} />

          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{item.Nombre}</Text>
            <Text style={styles.description}>{item.descripcion}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    )
  }
}

export default class HotelActividadesScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _keyExtractor = (item, index) => index.toString()

  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: []
    };
  }

  componentDidMount() {
    fetch(i18n.t('urlActividadesHotel'), {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.result);
        for (let i = 0; i < responseJson.result.length; i++) {
          let refImg = responseJson.result[i].logo.asset._ref.split('-');
          let imgUrl = "https://cdn.sanity.io/images/365az4et/production/" + refImg[1] + "-" + refImg[2] + "." + refImg[3];
          responseJson.result[i].img = imgUrl;
        } this.setState({
          data: responseJson.result
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }


  _renderItem = ({ item, index }) => {
    return (
      <ListItem
        item={item}
        index={index}
        onPressItem={this._onPressItem}
      />
    )
  }
  render() {
    return (
      <FlatList
        data={this.state.data}//{[{price:this.state.data.Precio,title:this.state.data.Nombre,description:this.state.data.Amenidades,source:this.state.img}]}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4BBB'
  },

  title: {
    fontSize: 20,
    color: '#FF5722'
  },

  description: {
    fontSize: 16,
    color: '#6565'
  },

  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  colContainer: {
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center'
  }

});
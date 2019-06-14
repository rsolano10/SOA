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
        <View style={styles.colContainer}>
        <Image style={styles.thumbnail} source={{uri:item.source}} />
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <View style={styles.separator} />
        </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default class LinkScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  /*onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      console.log(doc);
      const { nombre } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        nombre,
      });
    });
    this.setState({
      boards,
      isLoading: false,
   });
  }

  constructor() {
    super();
    this.ref = db.collection('coleccionTest');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      boards: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }*/

  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: {},
      img:"https://cdn.sanity.io/images/365az4et/production/4983f13f99291ca01793086eeb4f83481d567a62-362x139.jpg"
    };
  }

  componentDidMount() {
    fetch(i18n.t('urlInfoHotel'), {
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

  _keyExtractor = (item, index) => index.toString()

  _onPressItem = () => {

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
        data={[{ title: this.state.data.Nombre, description: this.state.data.descripcion, source: this.state.img }]}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 200,
    height: 200,
    marginRight: 18,
  },

  textContainer: {
    flex: 1
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
    color: '#6565'
  },

  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  colContainer: {
    flexDirection: 'column',
    padding: 10,
    alignItems:'center'
  }

});
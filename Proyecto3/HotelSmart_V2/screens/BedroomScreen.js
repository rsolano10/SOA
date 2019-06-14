import React, {Component} from 'react';
import { Text, 
          View, 
          StyleSheet,
          Image,
          FlatList,
          TouchableHighlight,
          Alert,
        } from 'react-native';
import Room from '../assets/images/room1.jpg';

import i18n from '../src/i18n';

class ListItem extends React.PureComponent {
  _onPress=()=>{
    //this.props._onPressItem(this.props.index)
    //alert("entre en index: ",this.props.index)
  }

  render (){
    const {item} =this.props
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#dddd'
      >
        <View style={styles.colContainer}>
          <Image style={styles.thumbnail} source={{uri:item.img}} />
          <Text style={styles.title} numberOfLines={1}>{item.Nombre}</Text>
        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.description}>{item.Amenidades}</Text>
          </View>
          <View style={styles.separator} />
        </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default class BedroomScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _keyExtractor=(item, index)=>index.toString()

  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: []
    };
  }

  componentDidMount() {
    fetch(i18n.t('urlHabitaciones'), {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson.result);
         for(let i = 0; i < responseJson.result.length ; i++){
          let refImg = responseJson.result[i].logo.asset._ref.split('-');
          let imgUrl = "https://cdn.sanity.io/images/365az4et/production/"+refImg[1]+"-"+refImg[2]+"."+refImg[3]; 
          responseJson.result[i].img = imgUrl;
        }this.setState({
            data: responseJson.result
         })
      })
      .catch((error) => {
         console.error(error);
      });
  }


  _renderItem=({item, index})=>{
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
  thumbnail:{
    width:150,
    height:150,
    marginRight:18
  },

  textContainer:{
    flex:1
  },

  separator:{
    height:1,
    backgroundColor: '#dddd'
  }, 

  price:{
    fontSize:16,
    fontWeight: 'bold',
    color: '#4BBB'
  },

  title:{
    fontSize:20,
    color:'#FF5722'
  },

  description:{
    fontSize:16,
    color:'#6565'
  },

  rowContainer:{
    flexDirection:'row',
    padding:10
  },
  colContainer: {
    flexDirection: 'column',
    padding: 10,
    alignItems:'center'
  }

});
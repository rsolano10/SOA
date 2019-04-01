import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { ListItem } from 'react-native-elements'

export default class LinkScreen extends React.Component {
  static navigationOptions = {
    title: "Rutinas",
    header:null,
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Amy Farha",
          avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          subtitle: "Vice President"
        },
        {
          name: "Amy Farha",
          avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          subtitle: "Vice President"
        },
      ],
    };
  }

  renderRightElement() {
    return (
      <View>
        <TouchableHighlight style = {[styles.buttonContainer, styles.loginButton]} onPress = {this._onClickListener}>
                    <Text style={styles.loginText}>Edit</Text>
                </TouchableHighlight>
      </View>
    );
  }
  render() {
    return (
      <View style = {styles.container}>
      <FlatList      
        data = {[
          {
            name: "Switch 1",
            subtitle: "Activado L y M - 7 am a 8am"
          },
          {
            name: "Switch 2",
            subtitle: "Activado L y M - 7 am a 8am"
          },
          {
            name: "Switch 3",
            subtitle: "Activado L y M - 7 am a 8am"
          },
          {
            name: "Switch 4",
            subtitle: "Activado L y M - 7 am a 8am"
          },
          {
            name: "Switch 5",
            subtitle: "Activado L y M - 7 am a 8am"
          },
          {
            name: "Switch 6",
            subtitle: "Activado L y M - 7 am a 8am"
          }
        ]}          
        renderItem = {({ item }) => ( 
          <ListItem               
            title={item.name}
            subtitle={item.subtitle}            
            containerStyle={{ borderBottomWidth: 0 }} 
            rightElement={this.renderRightElement()}
           /> 
                    
         )}      
             
         keyExtractor={item => item.name}  
         ItemSeparatorComponent={this.renderSeparator} 
         ListHeaderComponent={this.renderHeader}  
                                    
      /> 
      </View>     
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2080B7',
  },

  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 60,
    borderRadius: 30,
},
loginButton: {
    backgroundColor: "#00b5ec",
},

loginText: {
  color: 'white',
},
});
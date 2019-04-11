import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';

import { ListItem } from 'react-native-elements'

export default class LinkScreen extends React.Component {
  static navigationOptions = {
    title: "Rutinas",
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        name: "Switch 1",
        subtitle: "Activado L y M - 7 am a 8am"
      },
      {
        name: "Switch 2",
        subtitle: "Activado L y M - 7 am a 8am"
      }],
    };
  }

  renderRightElement() {
    return (
      <View>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._onClickListener}>
          <Text style={styles.loginText}>Edit</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onAddPressed () {
    alert('Hola Mundo');
  }
  
  render() {
    return (
      <View style={{ flex: 1, marginTop: 0 }}>
      <View style={{
          backgroundColor: '#2080B7',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: 50
        }}>
          <TouchableHighlight 
            style={{marginRight: 10 }}
            underlayColor='#2080B7'
            onPress={this._onAddPressed}
          >
            <Image style={{
              width: 30, height: 30
            }}
              source={require('../assets/images/add.png')}
            />

          </TouchableHighlight>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
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
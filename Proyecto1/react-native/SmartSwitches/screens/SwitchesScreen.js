import React, { Component } from 'react';
import {
  AppRegistry,
  Switch,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';

import { List, ListItem } from 'react-native-elements'
import SwitchesModal from './SwitchesModal'

class FlatListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      switchValue: this.props.item.active,
    }
  }

  _onSwitchClicked = () => {
    this.setState({
      switchValue: !this.state.switchValue
    })
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column", paddingTop: 10, paddingBottom: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={styles.title}>{this.props.item.name}</Text>
            <Text style={styles.subtitle}>{this.props.item.subtitle}</Text>
          </View>
          <View>
            <Switch onValueChange={this._onSwitchClicked}
              value={this.state.switchValue} />
          </View>

        </View>
        <View style={{ height: 1, backgroundColor: 'gray' }}>
        </View>
      </View>
    )
  }
}

export default class SwitchesScreen extends Component {

  static navigationOptions = {
    title: "Switches",
    header: null,
  };


  constructor(props) {
    super(props);
    this._onAddPressed = this._onAddPressed.bind(this); // bind SwitchesScreen
    this.state = {
      data: [
        {
          key: "a",
          name: "Switch 1",
          subtitle: "Ubicado en la sala",
          active: true
        },
        {
          key: "b",
          name: "Switch 2",
          subtitle: "Ubicado en el cuarto principal",
          active: false
        }
      ],
    };
  }

  _onAddPressed() {
    this.refs.SwitchesModal.showModal();
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
            style={{ marginRight: 10 }}
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
          renderItem={({ item, index }) => {
            return (
              <FlatListItem item={item} index={index}>
              </FlatListItem>
            );
          }}
        >
        </FlatList>
        <SwitchesModal ref={'SwitchesModal'} parentFlatList={this}>

        </SwitchesModal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2080B7',
  },
  title: {
    fontSize: 18,
    paddingLeft: 10,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    padding: 10,
    color: 'gray'
  }
});
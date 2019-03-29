import React from 'react';
import {
  Platform,
  Switch,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { List, ListItem } from 'react-native-elements'

export default class SwitchesScreen extends React.Component {
  
  static navigationOptions = {
    title: "Switches",
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
        <Switch
          value={false}/>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
      <FlatList          
        data={[
          {
            name: "Switch 1",
            subtitle: "Ubicado en la sala"
          },
          {
            name: "Switch 2",
            subtitle: "Ubicado en el cuarto principal"
          },
          {
            name: "Switch 3",
            subtitle: "Ubicado en la cocina"
          },
          {
            name: "Switch 4",
            subtitle: "Ubicado en el patio"
          },
          {
            name: "Switch 5",
            subtitle: "Refrigeradora"
          },
          {
            name: "Switch 6",
            subtitle: "Sensores"
          }
        ]}          
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
  }
});
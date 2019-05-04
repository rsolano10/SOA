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

export default class StatsScreen extends React.Component {

  static navigationOptions = {
    title: "Statistics",
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Switch 1",
          current: "100 W",
          subtitle: "March 12"
        },
        {
          name: "Switch 2",
          current: "25 W",
          subtitle: "March 31"
        },
      ],
    };
  }

  renderRightElement(data) {
    return (
      <View>
        <Text style={styles.headerText}>{data}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subtitle={item.subtitle}
              containerStyle={{ borderBottomWidth: 0 }}
              rightElement={this.renderRightElement(item.current)}
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

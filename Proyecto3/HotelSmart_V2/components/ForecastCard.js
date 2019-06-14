import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';

import Weather from '../assets/images/weatherset.png';

export default class ForecastCard extends Component {

	render() {
		const {item} =this.props;

		return (
			<Card containerStyle={styles.card}>
				<Text style={styles.notes}>{this.props.location}</Text>
				
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Image style={{width:100, height:100}} source={Weather} />
					<Text style={styles.time}>{item.summary}</Text>
				</View>

				<Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20}} />
				
				<View style={{flexDirection:'row', justifyContent:'space-between'}}>
					<Text style={styles.notes}>{Math.round( item.temperature * 10) / 10 }F</Text>
				</View>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	card:{
		backgroundColor:'rgba(56, 172, 236, 1)',
		borderWidth:0,
		borderRadius:20
	},
	time:{
		fontSize:18,
		color:'#fff'
	},
	notes: {
		fontSize: 18,
		color:'#fff',
		textTransform:'capitalize'
	}
});
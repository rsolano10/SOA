import React from 'react';
import { ScrollView, StyleSheet, Alert, View } from 'react-native';
import { FlatList } from 'react-native';
import ForecastCard from '../components/ForecastCard';
import DatePicker from 'react-native-datepicker';

import i18n from '../src/i18n';

export default class WeatherScreen extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			forecast: {summary:"-",temperature:0},
			date:"2019-06-01",
			error: ''
		};
	}

	static navigationOptions = () => ({
		title: i18n.t('Clima'),
		headerTintColor: 'white',
		headerStyle: {
			backgroundColor: 'red'
		},
	});

	getWeather(unixDate) {
		let url = 'https://api.darksky.net/forecast/5ba64c7788ba99f521dfe3e7c7b650c0/9.934739, -84.087502,'+unixDate+'?exclude=daily&lang=es';
		// Call the API, and set the state of the weather forecast
		fetch(url)
			.then(response => response.json())
			.then(data => {
				this.setState((prevState, props) => ({
					forecast: data.currently
				}));
			})
	}

	consult(date){
		let unixDate = new Date(date).getTime() / 1000;
		console.log("unix Dtae: ",unixDate);
		this.setState({date: date});
		this.getWeather(unixDate);
	}

	_renderItem = ({ item }) => {
		return (
			<ForecastCard item={item} location="Cartago" />
		)
	}

	render() {
		console.log(this.state.forecast);
		return (
			<View>
			<FlatList data={[this.state.forecast]} style={{ marginTop: 20 }} keyExtractor={(item, index) => index.toString()} renderItem={this._renderItem} />
			<View style={styles.center}>
			<DatePicker
          style={{width: 200}}
          date={this.state.date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2019-01-01"
          maxDate="2029-01-01"
          confirmBtnText={i18n.t('Confirmar')}
          cancelBtnText={i18n.t('Cancelar')}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {this.consult(date)}}
        />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	center: {
		marginTop:20,
		alignItems:'center',
	}
})

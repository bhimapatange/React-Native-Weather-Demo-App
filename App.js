import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ForecastCard from './components/ForecastCard';
import Geolocation from '@react-native-community/geolocation';

export default class App extends React.Component {

	constructor(props){
		super(props);
		
		this.state = {
			latitude: 0,
			longitude: 0,
			forecast: [],
			error:''
		};
	}

	componentDidMount(){
		// Get the user's location
		this.getLocation();
	}

	getLocation(){

    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          //getting the Latitude from the location json
          		this.setState(
					(prevState) => ({
					latitude: currentLatitude, 
					longitude: currentLongitude
					}), () => { this.getWeather(); });
          
      },
      (error) => alert(error.message),
      { 
         enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
      }
   );
    //this.getWeather();
	}

	getWeather(){

		// Construct the API url to call
		let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=b7919725eb819452e152c35f5c5d2bda';

		// Call the API, and set the state of the weather forecast
		fetch(url)
		.then(response => response.json())
		.then(data => {
      console.log(data);
      
			this.setState((prevState, props) => ({
				forecast: data
			}));
		})
	}

	render() {
		return (
			<FlatList data={this.state.forecast.list} style={{marginTop:40}} keyExtractor={item => item.dt_txt} renderItem={({item}) => <ForecastCard detail={item} location={this.state.forecast.city.name} />} />
		);
	}
}
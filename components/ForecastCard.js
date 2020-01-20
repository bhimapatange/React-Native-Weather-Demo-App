import React, {Component} from 'react';
import { StyleSheet, View,TouchableOpacity } from 'react-native';
import { Text} from 'react-native-elements';


export default class ForecastCard extends Component {

	render() {
		let time;

		// Create a new date from the passed date time
		var date = new Date(this.props.detail.dt*1000);

		// Hours part from the timestamp
		var hours = date.getHours();
		
		// Minutes part from the timestamp
		var minutes = "0" + date.getMinutes();

		time = hours + ':' + minutes.substr(-2);

		return (
			<View style={styles.mainViewBackground} >
				<Text style={styles.notes}>{this.props.location}</Text>
				
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.time}>{time}</Text>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-between'}}>
					<Text style={styles.notes}>{this.props.detail.weather[0].description}</Text>
					<Text style={styles.notes}>{Math.round( this.props.detail.main.temp * 10) / 10 }&#8451;</Text>
				</View>
            
			</View>
		);
    }
    
}

const styles = StyleSheet.create({
	mainViewBackground:{
        backgroundColor:'#29f',
        marginTop:10,
        marginLeft:16,
        marginRight:16,
        borderRadius:10
        
	},
	time:{
		fontSize:30,
		color:'#fff',
        marginLeft:16
	},
	notes: {
		fontSize: 18,
        color:'#fff',
        marginLeft:16,
        marginRight:16,
        marginBottom:10,
        marginTop:10
	}
});
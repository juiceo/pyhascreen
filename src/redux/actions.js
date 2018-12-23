import * as ActionTypes from './actionTypes';

const APP_ID = '791fab78';
const APP_KEY = '7cf16343a0795614ebe6eee81846b72c';
const RESORT_ID = '54883819'; //Pyhä
const SNOWREPORT = `https://api.weatherunlocked.com/api/snowreport/${RESORT_ID}?app_id=${APP_ID}&app_key=${APP_KEY}`;
const RESORTFORECAST = `https://api.weatherunlocked.com/api/resortforecast/${RESORT_ID}?app_id=${APP_ID}&app_key=${APP_KEY}`;

export const updateSnowReport = () => async dispatch => {
	fetch(SNOWREPORT)
		.then(res => res.json())
		.then(data => {
			dispatch({
				type: ActionTypes.SET_SNOW_REPORT,
				payload: data,
			});
		})
		.catch(err => {
			console.log('ERR', err);
		});
};

export const updateForecast = () => async dispatch => {
	fetch(RESORTFORECAST)
		.then(res => res.json())
		.then(data => {
			dispatch({
				type: ActionTypes.SET_FORECAST,
				payload: data,
			});
		})
		.catch(err => {
			console.log('ERR', err);
		});
}
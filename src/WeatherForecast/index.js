import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment-timezone';
import './style.css';

class WeatherForecast extends Component {

	static propTypes = {
		forecast: PropTypes.object,
	};

	getSnowForecast(date) {
		const { forecast } = this.props;

		const forDate = _.filter(forecast.forecast, (f) => {
			return f.date === date;
		});

		const snowMm = _.sumBy(forDate, (forecast) => {
			return forecast.snow_mm;
		});

		return Math.round(snowMm / 10);
	}

	getDates() {

		return [
			{
				label: 'Today',
				date: moment().format('DD/MM/YYYY'),
				dateFormatted: moment().format('DD.MM'),
			},
			{
				label: 'Tomorrow',
				date: moment().add(1, 'days').format('DD/MM/YYYY'),
				dateFormatted: moment().add(1, 'days').format('DD.MM'),
			},
			{
				label: moment().add(2, 'days').format('dddd'),
				date: moment().add(2, 'days').format('DD/MM/YYYY'),
				dateFormatted: moment().add(2, 'days').format('DD.MM'),
			},
			{
				label: moment().add(3, 'days').format('dddd'),
				date: moment().add(3, 'days').format('DD/MM/YYYY'),
				dateFormatted: moment().add(3, 'days').format('DD.MM'),
			},
			{
				label: moment().add(4, 'days').format('dddd'),
				date: moment().add(4, 'days').format('DD/MM/YYYY'),
				dateFormatted: moment().add(4, 'days').format('DD.MM'),
			}
		];
	}

	getForecasts(date, times) {
		return _.filter(this.props.forecast.forecast, f => {
			return f.date === date && times.indexOf(f.time) !== -1;
		});
	}

	renderBlock(date, label) {

		const forecasts = this.getForecasts(date, ['08:00', '11:00', '14:00', '17:00']);

		console.log('FC', forecasts[1]);

		return (
			<div className="WeatherForecast--Block" >
				<h3 className="WeatherForecast--Block_day">{label}</h3>
				<p className="WeatherForecast--Block_desc">{}</p>
				<div className="WeatherForecast--Block_main">
					<img src={require('../assets/weather/' + forecasts[1].upper.wx_icon)} />
					<span>{forecasts[1].upper.wx_desc}</span>
				</div>
				<table className="WeatherForecast--Table" border="1">
					<thead>
						<tr>
							<th></th>
							<th>{forecasts[0].time}</th>
							<th>{forecasts[1].time}</th>
							<th>{forecasts[2].time}</th>
							<th>{forecasts[3].time}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>TOP°C</td>
							<td>{forecasts[0].upper.temp_c || '?'}</td>
							<td>{forecasts[1].upper.temp_c || '?'}</td>
							<td>{forecasts[2].upper.temp_c || '?'}</td>
							<td>{forecasts[3].upper.temp_c || '?'}</td>
						</tr>
						<tr>
							<td>BASE°C</td>
							<td>{forecasts[0].base.temp_c || '?'}</td>
							<td>{forecasts[1].base.temp_c || '?'}</td>
							<td>{forecasts[2].base.temp_c || '?'}</td>
							<td>{forecasts[3].base.temp_c || '?'}</td>
						</tr>
						<tr>
							<td><i className="fa fa-wind"></i></td>
							<td>{forecasts[0].upper.windspd_ms || '?'}</td>
							<td>{forecasts[1].upper.windspd_ms || '?'}</td>
							<td>{forecasts[2].upper.windspd_ms || '?'}</td>
							<td>{forecasts[3].upper.windspd_ms || '?'}</td>
						</tr>
						<tr>
							<td><i className="fa fa-cloud"></i></td>
							<td>{forecasts[0].totalcloud_pct || '?'}%</td>
							<td>{forecasts[1].totalcloud_pct || '?'}%</td>
							<td>{forecasts[2].totalcloud_pct || '?'}%</td>
							<td>{forecasts[3].totalcloud_pct || '?'}%</td>
						</tr>
						<tr>
							<td><i className="fa fa-snowflake"></i></td>
							<td>{Math.round(forecasts[0].snow_mm / 10)}</td>
							<td>{Math.round(forecasts[1].snow_mm / 10)}</td>
							<td>{Math.round(forecasts[2].snow_mm / 10)}</td>
							<td>{Math.round(forecasts[3].snow_mm / 10)}</td>
						</tr>
					</tbody>
				</table>
			</div >
		);
	}

	render() {

		if (!this.props.forecast || _.isEmpty(this.props.forecast)) {
			return null;
		}
		console.log(this.props.forecast);


		return (
			<div className="WeatherForecast">
				<h3 className="WeatherForecast--Title">WEATHER FORECAST</h3>
				<div className="WeatherForecast--Content">
					{this.renderBlock(moment().format('DD/MM/YYYY'), 'TODAY')}
					{this.renderBlock(moment().add(1, 'd').format('DD/MM/YYYY'), 'TOMORROW')}
					{this.renderBlock(moment().add(2, 'd').format('DD/MM/YYYY'), moment().add(2, 'days').format('dddd'))}
				</div >
			</div>
		);
	}
};

export default WeatherForecast;
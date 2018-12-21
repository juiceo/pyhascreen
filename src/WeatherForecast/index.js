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

	renderForecast() {
		const dates = this.getDates();

		return _.map(dates, (date) => {
			const forecast = this.getSnowForecast(date.date);
			return (
				<div className="SnowReport--Forecast_Row">
					<div className="SnowReport--Forecast_Row-label">
						<span><strong>{date.label}</strong>{date.dateFormatted}</span>
					</div>
					<div className="SnowReport--Forecast_Row-value">
						<span>+ {forecast}cm</span>
					</div>
				</div>
			);
		})
	}

	render() {

		console.log(this.props.forecast);

		return (
			<div className="WeatherForecast">
				<h3 className="WeatherForecast--Title">WEATHER FORECAST</h3>
				<div className="WeatherForecast--Header">
					<div className="WeatherForecast--Column flex"></div>
					<div className="WeatherForecast--Column">°C Top</div>
					<div className="WeatherForecast--Column">°C Base</div>
					<div className="WeatherForecast--Column">Wind</div>
					<div className="WeatherForecast--Column">Visibility</div>
					<div className="WeatherForecast--Column">Cloud %</div>
				</div>
				<div className="WeatherForecast--Rows">
					<div className="WeatherForecast--Row">
						<div className="WeatherForecast--Column flex">Now</div>
						<div className="WeatherForecast--Column">-12</div>
						<div className="WeatherForecast--Column">-11</div>
						<div className="WeatherForecast--Column">23 m/s</div>
						<div className="WeatherForecast--Column">1km</div>
						<div className="WeatherForecast--Column">46%</div>
					</div>
				</div>
			</div >
		);
	}
};

export default WeatherForecast;
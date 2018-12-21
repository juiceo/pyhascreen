import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment-timezone';
import './style.css';

class SnowForecast extends Component {

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

		return (
			<div className="SnowReport">
				<div className="SnowReport--Forecast">
					<h3 className="SnowReport--Forecast_Title">SNOW FORECAST</h3>
					{this.renderForecast()}
				</div>

			</div >
		);
	}
};

export default SnowForecast;
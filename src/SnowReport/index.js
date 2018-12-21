import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment-timezone';
import './style.css';

const PEAK_HEIGHT = '380m';
const VALLEY_HEIGHT = '170m';

class SnowReport extends Component {

	static propTypes = {
		snowReport: PropTypes.object,
	};

	render() {

		const { snowReport } = this.props;


		return (
			<div className="SnowReport">
				<div className="SnowReport--Current">
					<h3 className="SnowReport--Current_Title">SNOW DEPTH</h3>
					<div className="SnowReport--Current_Content">
						<div className="SnowReport--Current_section align-left">
							<span className="SnowReport--Current_section-label"><strong>PEAK</strong> {PEAK_HEIGHT}</span>
							<span className="SnowReport--Current_section-value">{snowReport.uppersnow_cm}cm</span>
						</div>
						<i className="SnowReport--Current_icon fas fa-mountain fa-5x"></i>
						<div className="SnowReport--Current_section align-right">
							<span className="SnowReport--Current_section-label"><strong>VALLEY</strong> {VALLEY_HEIGHT}</span>
							<span className="SnowReport--Current_section-value">{snowReport.lowersnow_cm}cm</span>
						</div>
					</div>
					<div className="SnowReport--Current_Extras">
						<div className="SnowReport--Current_Extras-item">
							<span className="SnowReport--Current_Extras-item_label">CONDITIONS</span>
							<span className="SnowReport--Current_Extras-item_value">{snowReport.conditions}</span>
						</div>
					</div>
					<div className="SnowReport--Current_Extras">
						<div className="SnowReport--Current_Extras-item">
							<span className="SnowReport--Current_Extras-item_label">NEW SNOW</span>
							<span className="SnowReport--Current_Extras-item_value">{snowReport.newsnow_cm}cm</span>
						</div>
						<div className="SnowReport--Current_Extras-item">
							<span className="SnowReport--Current_Extras-item_label">LAST SNOW</span>
							<span className="SnowReport--Current_Extras-item_value">{snowReport.lastsnow}</span>
						</div>
						<div className="SnowReport--Current_Extras-item">
							<span className="SnowReport--Current_Extras-item_label">REPORT DATE</span>
							<span className="SnowReport--Current_Extras-item_value">{snowReport.reportdate}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default SnowReport;
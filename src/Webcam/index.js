import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment-timezone';
import './style.css';

class Webcam extends Component {

	static propTypes = {
		url: PropTypes.string,
		updated: PropTypes.string,
	};

	render() {

		return (
			<div className="Webcam">
				<h3 className="Webcam--Title">WEBCAM</h3>
				<div className="Webcam--CamWrapper">
					<img
						className="Webcam--Cam"
						data-src={this.props.url + '?' + this.props.updated}
						alt={this.props.url + '?' + this.props.updated}
						src={this.props.url + '?' + this.props.updated}
					/>
				</div>
			</div >
		);
	}
};

export default Webcam;
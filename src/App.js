import React, { Component } from 'react';
import Promise from 'bluebird';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import logo from './logo.svg';
import './App.css';

import SnowReport from './SnowReport';
import SnowForecast from './SnowForecast';
import WeatherForecast from './WeatherForecast';
import Webcam from './Webcam';

import * as Actions from './redux/actions';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: true,
    };

    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.updateData();

    setTimeout(function () {
      this.updateData();
    }.bind(this), 1000 * 60 * 5);
  }

  delay(ms = 1000) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, ms);
    })
  }

  updateData() {

    this.setState({
      loading: true,
      error: false,
    }, () => {
      Promise.all([
        this.props.updateSnowReport(),
        this.props.updateForecast(),
        this.delay(1000),
      ]).then(data => {
        this.setState({
          loading: false,
        });

      }).catch(err => {
        console.log('Error fetching data', err);
        this.setState({
          loading: false,
          error: true,
        });
      });
    });
  }

  render() {

    const { forecast, snowReport } = this.props;

    if (this.state.loading && (!forecast || !snowReport)) {
      return (
        <div className="App">
          <div className="App--Loading">
            <i className="fas fa-snowflake fa-spin fa-3x"></i>
          </div>
        </div>
      );
    }

    if (this.state.error) {
      return (
        <div className="App">
          <div className="App--Error">
            <i className="far fa-frown fa-3x"></i>
            <h3>Oops, something went wrong...</h3>
            <button className="App--Error_reload" onClick={this.updateData}>Try again</button>
          </div>
        </div>
      );
    }

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      centerMode: false,
      arrows: false,
    };

    return (
      <div className="App">
        <div className="App--Header">
          <img className="App--Header_logo" src={require('./assets/pyha.jpg')} />
          <span className="App--Header_updated"><strong>Updated: </strong>{moment(this.props.updated).fromNow()}</span>
        </div>
        <div className="App--Content">
          <Slider {...settings} className="Slider">
            <div className="Slide">
              <div className="Slide--Content">
                <div className="Slide--Content_inner">
                  <SnowReport snowReport={snowReport} />
                </div>
              </div>
            </div>
            <div className="Slide">
              <div className="Slide--Content">
                <div className="Slide--Content_inner">
                  <SnowForecast forecast={forecast} />
                </div>
              </div>
            </div>
            <div className="Slide">
              <div className="Slide--Content">
                <div className="Slide--Content_inner">
                  <WeatherForecast forecast={forecast} />
                </div>
              </div>
            </div>
            <div className="Slide">
              <div className="Slide--Content">
                <div className="Slide--Content_inner">
                  <Webcam url="http://www3.ruka.fi/webcampyha1.jpg" updated={this.props.updated} />
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  snowReport: state.data.snowReport,
  forecast: state.data.forecast,
  updated: Date.now(),
});

const mapDispatchToProps = dispatch => ({
  updateSnowReport: () => dispatch(Actions.updateSnowReport()),
  updateForecast: () => dispatch(Actions.updateForecast()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

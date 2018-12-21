import React, { Component } from 'react';
import Promise from 'bluebird';
import Slider from 'react-slick';
import logo from './logo.svg';
import './App.css';

import SnowReport from './SnowReport';
import SnowForecast from './SnowForecast';
import WeatherForecast from './WeatherForecast';

const APP_ID = '791fab78';
const APP_KEY = '7cf16343a0795614ebe6eee81846b72c';
const RESORT_ID = '54883819'; //Pyhä
const SNOWREPORT = `https://api.weatherunlocked.com/api/snowreport/${RESORT_ID}?app_id=${APP_ID}&app_key=${APP_KEY}`;
const RESORTFORECAST = `https://api.weatherunlocked.com/api/resortforecast/${RESORT_ID}?app_id=${APP_ID}&app_key=${APP_KEY}`;


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: true,
      snowReport: null,
      forecast: null,
    };

    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }

  delay(ms = 1000) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, ms);
    })
  }

  getSnowReport() {
    return fetch(SNOWREPORT)
      .then(res => res.json());
  }

  getForecast() {
    return fetch(RESORTFORECAST)
      .then(res => res.json());
  }

  updateData() {

    this.setState({
      loading: true,
      error: false,
    }, () => {
      Promise.all([
        this.getSnowReport(),
        this.getForecast(),
        this.delay(1000),
      ]).then(data => {
        this.setState({
          loading: false,
          snowReport: data[0],
          forecast: data[1]
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

    const { forecast, snowReport } = this.state;

    if (this.state.loading && (!this.state.forecast || !this.state.snowReport)) {
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
      centerMode: true,
      arrows: false,
    };

    return (
      <div className="App">
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
          </Slider>
        </div>
      </div>
    );
  }
}

export default App;

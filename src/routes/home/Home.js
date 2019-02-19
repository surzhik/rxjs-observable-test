/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { monitorOn } from '../../epics/display';
import Loader from '../../components/Loader';
import BoxInfo from '../../components/BoxInfo';
import s from './Home.css';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        monitorOn,
      },
      dispatch,
    ),
  };
}

function mapStateToProps({
  display: { monitor, history, init },
  modeSwitch: { nightMode },
}) {
  return {
    monitor,
    history,
    init,
    nightMode,
  };
}

const optionsCharts = {
  hAxis: {
    viewWindow: { min: 0, max: 100 },
    textPosition: 'none',
    gridlines: {
      color: 'transparent',
    },
  },
  vAxis: {
    viewWindow: {
      min: 0,
      max: 0,
    },
    textPosition: 'none',
    gridlines: {
      color: 'transparent',
    },
  },
  legend: 'none',
  chartArea: { width: '100%', height: '80%' },
  backgroundColor: 'transparent',
  tooltip: { trigger: 'none' },
  enableInteractivity: false,
};

export class Home extends React.Component {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    monitor: PropTypes.object.isRequired,
    init: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    nightMode: PropTypes.bool.isRequired,
  };

  state = {};

  componentDidMount() {
    const { actions } = this.props;
    actions.monitorOn();
  }

  getMinMax = targetRange => {
    const { history } = this.props;

    const filteredRange = history[targetRange].filter(value => value > 0);
    return {
      min: Math.min.apply(null, filteredRange),
      max: Math.max.apply(null, filteredRange),
    };
  };

  getOptions = targetRange => {
    const { nightMode } = this.props;
    const colors = {
      temperature: nightMode ? '#eb6841' : '#556270',
      airPressure: nightMode ? '#eb6841' : '#00a0b0',
      humidity: nightMode ? '#eb6841' : '#4ecdc4',
    };
    const targetOptions = JSON.parse(JSON.stringify(optionsCharts));
    targetOptions.vAxis.viewWindow = this.getMinMax(targetRange);
    targetOptions.colors = [colors[targetRange]];
    return targetOptions;
  };

  render() {
    /* eslint-disable no-nested-ternary */
    const { monitor, history, init, nightMode } = this.props;

    const optionsChartsTemperature = this.getOptions('temperature');
    const optionsChartsAirPressure = this.getOptions('airPressure');
    const optionsChartsHumidity = this.getOptions('humidity');

    const dataTemperature = history.temperature.map((value, index) => [
      index,
      value,
    ]);
    dataTemperature.unshift(['Time', '°C']);
    const dataAirPressure = history.airPressure.map((value, index) => [
      index,
      value,
    ]);
    dataAirPressure.unshift(['Time', 'mm']);

    const dataHumidity = history.humidity.map((value, index) => [index, value]);
    dataHumidity.unshift(['Time', '%']);

    return (
      <div className={`${s.mainCol} ${nightMode && s.nightMode}`}>
        {init ? (
          <div className={s.boxHolder}>
            <BoxInfo
              title="Temperature"
              units="°C"
              data={dataTemperature}
              options={optionsChartsTemperature}
              value={monitor.temperature.toString()}
              color="color_1"
              nightMode={nightMode}
            />
            <BoxInfo
              title="Air pressure"
              units="mm"
              data={dataAirPressure}
              options={optionsChartsAirPressure}
              value={monitor.airPressure.toString()}
              color="color_2"
              nightMode={nightMode}
            />
            <BoxInfo
              title="Humidity"
              units="%"
              data={dataHumidity}
              options={optionsChartsHumidity}
              value={monitor.humidity.toString()}
              color="color_3"
              nightMode={nightMode}
            />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(s)(Home));

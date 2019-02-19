import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
/* eslint-disable css-modules/no-unused-class */
import s from './BoxInfo.css';

class BoxInfo extends Component<{
  /* eslint-disable react/forbid-prop-types */
  title: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  nightMode: PropTypes.bool.isRequired,
}> {
  render() {
    const { title, units, data, options, value, color, nightMode } = this.props;
    return (
      <div className={`${s.boxInfo} ${nightMode && s.nightMode}`}>
        <div className="row">
          <div className="col-xs-8">{title}</div>
          <div className="col-xs-4">{units}</div>
        </div>
        <div className="row">
          <div className="col-xs-8">
            <div className={s.chartHolder}>
              <Chart
                chartType="LineChart"
                data={data}
                options={options}
                width="100%"
                height="50px"
                legendToggle
                className={s.chart}
              />
            </div>
          </div>
          <div className="col-xs-4">
            <div className={s.valueHolder}>
              <span className={s[color]}>{value}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BoxInfo.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  title: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  nightMode: PropTypes.bool.isRequired,
};

export default withStyles(s)(BoxInfo);

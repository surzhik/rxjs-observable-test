/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Switch from 'rc-switch';
import rc from 'rc-switch/assets/index.css';
import { setModeSwitch } from '../../actions/modeSwitch';
import s from './Header.css';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setModeSwitch,
      },
      dispatch,
    ),
  };
}

function mapStateToProps({ modeSwitch: { nightMode } }) {
  return {
    nightMode,
  };
}

export class Header extends React.PureComponent {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    nightMode: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleSwitch = () => {
    const { actions, nightMode } = this.props;
    actions.setModeSwitch(!nightMode);
  };

  render() {
    const { nightMode } = this.props;
    return (
      <div className={s.headerHolder}>
        <div className={s.switchHolder}>
          <Switch checked={nightMode} onChange={this.handleSwitch} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(s, rc)(Header));

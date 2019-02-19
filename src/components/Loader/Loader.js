/* eslint-disable react/no-array-index-key */
/* eslint-disable css-modules/no-unused-class */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Loader.css';

class Loader extends React.PureComponent {
  render() {
    return (
      <div className={s.preloaderHolder}>
        <div className={s.preloader}>
          {[...Array(8)].map((el, index) => (
            <span
              className={`${s.line} ${s[`line-${index}`]}`}
              key={`line_${index}`}
            />
          ))}
          <div>Loading</div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Loader);

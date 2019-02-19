/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../App';
import Layout from './Layout';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  display: {
    isPinging: false,
    init: false,
    monitor: {
      temperature: null,
      airPressure: null,
      humidity: null,
    },
    history: {
      temperature: null,
      airPressure: null,
      humidity: null,
    },
  },
  modeSwitch: {
    nightMode: false,
  },
};

describe('Layout', () => {
  test('renders children correctly', () => {
    const store = mockStore(initialState);
    const wrapper = renderer
      .create(
        <App
          context={{
            insertCss: () => {},
            fetch: () => {},
            pathname: '',
            store,
          }}
        >
          <Layout>
            <div />
            <div />
            <div />
          </Layout>
        </App>,
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});

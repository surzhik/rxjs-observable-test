/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-duplicates */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Loader from '../../components/Loader';
import BoxInfo from '../../components/BoxInfo';
import { Home } from './Home';

configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Home container', () => {
  const store = mockStore({
    modeSwitch: {
      nightMode: false,
    },
    display: {
      init: true,
      monitor: {
        temperature: 0,
        airPressure: 0,
        humidity: 0,
      },
      history: {
        temperature: [0],
        airPressure: [0],
        humidity: [0],
      },
    },
  });
  const props = {
    init: true,
    nightMode: false,
    actions: { monitorOn: () => {} },
    monitor: {
      temperature: 0,
      airPressure: 0,
      humidity: 0,
    },
    history: {
      temperature: [0],
      airPressure: [0],
      humidity: [0],
    },
    store,
  };

  describe('Home ready', () => {
    const homeContainer = shallow(<Home {...props} />);
    it('Home data bars', () => {
      expect(homeContainer.find(BoxInfo)).toHaveLength(3);
    });
  });
});

describe('Home container', () => {
  const props = {
    init: false,
    nightMode: false,
    actions: { monitorOn: () => {} },
    monitor: {
      temperature: null,
      airPressure: null,
      humidity: null,
    },
    history: {
      temperature: [],
      airPressure: [],
      humidity: [],
    },
  };
  describe('Home initial', () => {
    const homeContainer = shallow(<Home {...props} />);
    it('Home loader', () => {
      expect(homeContainer.find(Loader)).toHaveLength(1);
    });
  });
});

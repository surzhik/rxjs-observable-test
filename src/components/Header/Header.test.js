/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Switch from 'rc-switch';
import { Header } from './Header';

configure({ adapter: new Adapter() });

describe('Header container', () => {
  const props = {
    nightMode: false,
    actions: {},
  };

  describe('Header structure', () => {
    test('renders children correctly', () => {
      const wrapper = renderer.create(<Header {...props} />).toJSON();

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Header initial', () => {
    const headerContainer = shallow(<Header {...props} />);

    it('Render switch', () => {
      expect(headerContainer.find(Switch)).toHaveLength(1);
    });
  });
});

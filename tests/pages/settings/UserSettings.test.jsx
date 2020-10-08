import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import UserSettings from '../../../src/pages/settings/UserSettings';

function getComponent(props) {
  return renderer.create(
    <BrowserRouter>
      <UserSettings {...props} />
    </BrowserRouter>
  );
}

describe('User settings', () => {
  const props = {
    location: {
      pathname: '/path'
    }
  };
  it('render correctly', () => {
    expect(getComponent(props).toJSON()).toMatchSnapshot();
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from '../../src/pages/Dashboard';

describe('dashboard', () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

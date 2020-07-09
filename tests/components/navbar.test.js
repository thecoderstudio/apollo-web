import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import NavBar from '../../src/components/NavBar';
import waitForExpect from 'wait-for-expect';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { toggleOptions as toggleOptionsAction } from '../../src/actions/navbar';
import { logout as logoutAction } from '../../src/actions/auth';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore([]);

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <NavBar />
    </Provider>
  );
}

describe('login', () => {
  let store;
  let spy;

  beforeEach(() => {
    store = mockStore({});
    spy = jest.spyOn(store, 'dispatch');
  });

  it("renders correctly", () => {
    let tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles successful logout", async () => {
    const component = mount(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );

    component.find("Logout").filterWhere((n) =>
      n.text() === "Logout"
    ).prop('onClick')();

    await waitForExpect(() => {
      expect(spy).toHaveBeenCalledWith(logoutAction());
    });
  });
});

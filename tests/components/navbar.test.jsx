import React from 'react';
import configureStore from 'redux-mock-store';
import waitForExpect from 'wait-for-expect';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import NavBar from '../../src/components/NavBar';
import { logout as logoutAction } from '../../src/actions/auth';

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
    store = mockStore({
      addAgent: {
        modalVisible: false,
        selectedArchitecture: "amd64",
        selectedOperatingSystem: "linux"
      },
    });
    spy = jest.spyOn(store, 'dispatch');
  });

  it("renders correctly", () => {
    let tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles successful logout", async () => {
    let component = getComponent(store);
    const instance = component.root;
    instance.findByProps({ id: 'logoutButton' }).props.onClick();
    expect(component.toJSON()).toMatchSnapshot();

    await waitForExpect(() => {
      expect(spy).toHaveBeenCalledWith(logoutAction());
    });
  });
});


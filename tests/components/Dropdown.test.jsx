import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import DropDown from "../../src/components/Drowdown";

const mockStore = configureStore([]);



function getComponent(store, props) {
  return renderer.create(
    <Provider  store={store}>
      <DropDown {...props} />
    </Provider>
  );
};

describe('Dropdown', () => {
  let store;
  const spy = jest.fn();
  let props;

  beforeEach(() => {
    store = mockStore({})
    props = {
      options: ['1', '2'],
      optionSelectedAction: spy,
      selected: '1'
    };
  });

  it("renders correctly", () => {
    expect(getComponent(store, props).toJSON()).toMatchSnapshot();
  });

  it("opens dropdown correctly", () => {
    let component = getComponent(store);
    const instance = component.root;
    instance.findByProps({ id: 'dropdown' }).props.onClick();
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("closes dropdown correctly", () => {

  });

  it("correctly calls options selected action", () => {

  });

  it("correctly renders multiple items", () => {
    const newProps = {
      ...props,
      options: ['1', '2', '3']
    }
    const tree = getComponent(store, newProps).toJSON();

  })

});

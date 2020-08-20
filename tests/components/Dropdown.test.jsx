import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import waitForExpect from 'wait-for-expect';
import { selectArchitecture } from "../../src/actions/add-agent";
import renderer from 'react-test-renderer';
import DropDown from "../../src/components/Dropdown";

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
  let spy;
  let props;


  beforeEach(() => {
    store = mockStore({})
    props = {
      options: ['1', '2'],
      optionSelectedAction: selectArchitecture,
      selected: '1'
    };
    spy = jest.spyOn(store, 'dispatch');
  });

  it("renders correctly", () => {
    expect(getComponent(store, props).toJSON()).toMatchSnapshot();
  });

  it("opens dropdown correctly", () => {
    let component = getComponent(store, props);
    const instance = component.root;
    instance.findByProps({ id: 'dropdown' }).props.onClick();

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("correctly calls optionSelectedAction on option click", async () => {
    const component = getComponent(store, props);
    component.root.findByType('ul').children[0].props.onClick();

    await waitForExpect(() => {
      expect(spy).toHaveBeenCalledWith(selectArchitecture('2'));
    });
  });

  it("correctly renders multiple items", () => {
    const newProps = {
      ...props,
      options: ['1', '2', '3']
    };
    const component = getComponent(store, newProps);
    expect(component.root.findByType('ul').children).toHaveLength(2);
  })
});

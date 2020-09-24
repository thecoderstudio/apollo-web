import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import waitForExpect from 'wait-for-expect';
import renderer from 'react-test-renderer';
import DropDown, { DropDown as PlainDropDown } from "../../src/components/Dropdown";

const mockStore = configureStore([]);

function getComponent(store, props, mockReturnValue=false) {
  return renderer.create(
    <Provider  store={store}>
      <DropDown {...props} />
    </Provider>, {
      createNodeMock: (_) => {
        return {
          contains: (_) => {
            return mockReturnValue;
          }
        };
      }
    }
  );
}

describe('Dropdown', () => {
  let store;
  let spy;
  let props;

  beforeEach(() => {
    spy = jest.fn()
    store = mockStore({});
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
    const component = getComponent(store, props);
    const root = component.root;
    root.findByProps({ id: 'dropdown' }).props.onClick();

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("closes dropdown correctly", () => {
    const component = getComponent(store, props);
    const root = component.root;
    root.findByProps({ id: 'dropdown' }).props.onClick();
    component.toJSON();
    root.findByType(PlainDropDown).instance.closeDropdown({ target: "test" });
    component.toJSON();
    expect(root.findAllByProps({ collapsed: true }).length).toBe(2);
  });

  it("does set collapsed to true when node contains target", () => {
    const component = getComponent(store, props, true);
    const root = component.root;
    root.findByProps({ id: 'dropdown' }).props.onClick();
    component.toJSON();
    root.findByType(PlainDropDown).instance.closeDropdown({ target: "test" });
    component.toJSON();
    expect(root.findAllByProps({ collapsed: true }).length).toBe(0);
  });

  it("does set correct value when item is selected", () => {
    const component = getComponent(store, props, true);
    const root = component.root;
    const dropDown = root.findByProps({ id: 'dropdown' })
    dropDown.props.onClick();
    component.toJSON();
    root.findByType(PlainDropDown).instance.closeDropdown({ target: "test" });

    component.toJSON();
    expect(root.findAllByProps({ collapsed: true }).length).toBe(0);
  });

  it("correctly calls optionSelectedAction on option click", async () => {
    const component = getComponent(store, props);

    component.root.findByType('ul').children[0].props.onClick();

    await waitForExpect(() => {
      expect(spy).toHaveBeenCalled('2');
    });
  });

  it("correctly renders multiple items", () => {
    const newProps = {
      ...props,
      options: ['1', '2', '3']
    };
    const component = getComponent(store, newProps);
    expect(component.root.findByType('ul').children).toHaveLength(2);
  });
});

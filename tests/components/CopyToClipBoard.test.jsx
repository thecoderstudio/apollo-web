import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import CopyToClipboard from "../../src/components/CopyToClipboard";

const mockStore = configureStore([]);

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

function getComponent(store, props) {
  return renderer.create(
    <Provider store={store}>
      <CopyToClipboard {...props} />
    </Provider>
  );
}

describe('copy to clipboard', () => {
  let store = mockStore({});

  it("renders correctly", () => {
    const tree = getComponent(store, { text: 'test'}).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('onClick copies to clipboard', () => {
  const spy = spyOn(navigator.clipboard, 'writeText');
    const component= getComponent(store, { text: 'test'});
    const instance = component.root;

    instance.findByProps({ id: 'copyToClipboardButton' }).props.onClick();
    expect(spy).toBeCalledWith('test');
  });
});
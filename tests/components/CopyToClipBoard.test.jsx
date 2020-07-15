import React from 'raect';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import waitForExpect from "wait-for-expect";
import CopyToClipboard from "../../src/components/CopyToClipboard";

const mockStore = configureStore([]);

function getComponent(store, props) {
  renderer.create(
    <Provider store={store}>
      <CopyToClipboard {...props} />
    </Provider>
  )
}

describe('copy to clipboard', () => {
  let store = mockStore({});

  it("renders correctly", () => {
    const tree = getComponent(store, { text: 'test'}).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('onClick copies to clipboard', () => {

  })
});
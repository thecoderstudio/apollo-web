import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import PathAwareLink from '../../../src/components/links/PathAwareLink';

function getComponent(props) {
  return renderer.create(
    <BrowserRouter>
      <PathAwareLink to='/path' {...props} />
    </BrowserRouter>
  );
}

describe('Settings side navigation', () => {
  let props;

  beforeEach(() => {
    props = {
      location: { pathname: '/path' }
    };
  });

  it('renders correctly', () => {
    let tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();

    tree = getComponent({
      location: { pathname: '/settings/user_settings' }
    }).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('correctly check if path matches', () => {
    const tree = getComponent(props);
    const instance = tree.root;
    const nav = instance.findByType(PathAwareLink);

    expect(nav.instance.checkIfPathIsActive('/path')).toBe(true);
    expect(nav.instance.checkIfPathIsActive('/something_else')).toBe(false);
  });
});

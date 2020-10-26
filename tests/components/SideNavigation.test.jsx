import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import SideNavigation from '../../src/components/SideNavigation';
import PathAwareLink from '../../src/components/links/PathAwareLink';

function getComponent(props) {
  return renderer.create(
    <BrowserRouter>
      <SideNavigation {...props}>
        <PathAwareLink
          location={props.location}
          to='/settings/test'
          iconClassName='fas fa-user-cog'
        >
          Settings
        </PathAwareLink>
      </SideNavigation>
    </BrowserRouter>
  );
}

describe('Settings side navigation', () => {
  let props;

  beforeEach(() => {
    props = {
      location: {
        pathname: '/path'
      }
    };
  });

  it('renders correctly', () => {
    let tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();

    tree = getComponent({
      location: {
        pathname: '/path'
      }
    }).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

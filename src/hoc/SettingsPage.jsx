import React from 'react';
import SettingsSideNavigation from '../pages/settings/SettingsSideNavigation';


function WithSettingsNavigation(Component) {
  return function wrap(props) {
    return (
      <div>
        <SettingsSideNavigation />
        <Component />
      </div>
    );
  }
}

export default WithSettingsNavigation;
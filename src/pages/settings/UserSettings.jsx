import React from 'react';
import withSettingsNavigation from '../../hoc/SettingsPage';

function UserSettings(props) {
  const { className } = props;
  return (
    <div className={className} />
  );
}

export default withSettingsNavigation(UserSettings, 'User settings');

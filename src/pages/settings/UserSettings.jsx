import React from 'react';
import WithSettingsNavigation from '../../hoc/SettingsPage';

function UserSettings(props) {
  const { className } = props;
  return (
    <div className={className}>asd</div>
  );
}

export default WithSettingsNavigation(UserSettings);

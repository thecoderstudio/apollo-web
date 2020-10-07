import React from 'react';
import styled from 'styled-components';

const Navigation = styled.div`
  max-width: 300px;
  width: 100%;
  background-color: ${(props) => props.theme.lightBlack};
`;

function SettingsSideNavigation(props) {
  return (
    <Navigation className={props.className}>
      hahahahha
    </Navigation>
  );
}

export default SettingsSideNavigation;

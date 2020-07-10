import React from 'react'
import styled from 'styled-components'

const DropDownWrapper = styled.div``;
const DropDownButton = styled.button``;
const DropDownContent = styled.ul``;
const DropDownItem = styled.li``;
const DropDownIcon = styled.div``;

class DropDown extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <DropDownWrapper>
        <DropDownButton><DropDownIcon /></DropDownButton>
        <DropDownContent>
          <DropDownItem>item</DropDownItem>
        </DropDownContent>
      </DropDownWrapper>
    );
  }
}

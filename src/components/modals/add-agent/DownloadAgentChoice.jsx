import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import media from '../../../util/media';
import DescriptionButton from '../../buttons/DescriptionButton';

const propTypes = {
  setManualUploadCallback: PropTypes.func.isRequired
};

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: [column-one] 50% [column-two] 50%;
  gap: 20px;

  ${media.phone`
    grid-template-columns: [column-one] 100%;
    grid-template-rows: [row-one] 1fr [row-two] 1fr;
  `}
`;

const ColumnOne = styled.div`
  grid-column: column-one;

  ${media.phone`
    grid-row: row-one;
  `}
`;

const ColumnTwo = styled.div`
  grid-column: column-two;
  margin-right: 20px;

  ${media.phone`
    grid-column: column-one;
    grid-row: row-two;
    margin-right: 0px;
  `}
`;

const StyledDescriptionButton = styled(DescriptionButton)`
  width: 100%;
`;

export default function DownloadAgentChoice(props) {
  const directly = 'Directly on target machine.';
  const manual = 'Manual upload';

  return (
    <TwoColumnGrid>
      <ColumnOne>
        <StyledDescriptionButton id="directlyButton" onClick={() => props.setManualUploadCallback(false)} title={directly}>
          You have the correct permissions to download the binary directly on the target machine.
        </StyledDescriptionButton>
      </ColumnOne>
      <ColumnTwo>
        <StyledDescriptionButton id="manualButton" onClick={() => props.setManualUploadCallback(true)} title={manual}>
          You download and upload the binary yourself.
        </StyledDescriptionButton>
      </ColumnTwo>
    </TwoColumnGrid>
  );
}

DownloadAgentChoice.propTypes = propTypes;

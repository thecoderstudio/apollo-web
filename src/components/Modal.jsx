import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './Card';
import { closeAddAgentModal } from '../actions/add-agent';

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool
};

const defaultProps = {
  visible: false
}

const ModalOverlay = styled.div`
  display: ${props => props.visible ? 'inline' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  
  background-color: ${props => props.theme.overlay};
`;

const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: [title] 50px [content] 1fr;
  
  position:fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  width: 600px;
  height: auto;
  
  background-color: ${props => props.theme.black}
`;

const Title = styled.h2`
  grid-row: title;
  width: 75%;
  margin: 0 auto;
  text-align: center;
`;

const Content = styled.div`
  grid-row: content;
  padding: 20px;
`;

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }
  closeModal(e) {
    if (!this.node.contains(e.target)) {
      const { dispatch } = this.props;
      dispatch(closeAddAgentModal());
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.closeModal, false);
  }

  render() {
    return (
      <ModalOverlay visible={this.props.visible} >
        <StyledCard ref={node => this.node = node}>
          <Title>{this.props.title}</Title>
          <Content>{this.props.children}</Content>
        </StyledCard>
      </ModalOverlay>
    );
  }
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default connect()(Modal)
import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
  component: PropTypes.any.isRequired,
  fallbackComponent: PropTypes.any.isRequired,
  role: PropTypes.string
};

const defaultProps = {
  role: ''
}


class ProtectedRoute extends React.PureComponent {
  constructor(props) {
    super(props); 
    const { role, currentUser } = props;
    this.state = {
      correctRole: this.checkIfCorrectRole(role, currentUser)
    }
  }

  checkIfCorrectRole(role, currentUser) {
    if (role === '' || (currentUser.role && role === currentUser.role.name)) {
      return true;
    }

    return false
  }

  render() {
    const {
      component: Component,
      fallbackComponent: FallbackComponent,
      authenticated: authenticated,
      ...rest
    } = this.props;
    const { correctRole } = this.state;

    return (
      <Route
        {...rest}
        render={ (props) =>
            authenticated && correctRole ? <Component {...props} /> : <FallbackComponent {...props} />
        }
      />
    );
  }
}

ProtectedRoute.propTypes = propTypes;
ProtectedRoute.defaultProps = defaultProps;


export default connect(
  state => ({
    authenticated: state.authenticated,
    currentUser: state.currentUser
  })
)(ProtectedRoute);

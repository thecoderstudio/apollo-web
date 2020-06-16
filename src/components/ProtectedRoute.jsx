import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

function ProtectedRoute ({
  component: Component,
  fallbackComponent: FallbackComponent,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={ (props) =>
          rest.authenticated ? <Component {...props} /> : <FallbackComponent {...props} />
      }
    />
  );
}


export default connect(
  state => ({ authenticated: state.authenticated })
)(ProtectedRoute);

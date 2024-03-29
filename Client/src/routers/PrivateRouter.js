import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => {
      return (
      isAuthenticated ? (
        <div style={{height: 'inherit'}}>
          <Component {...props} /> 
        </div>
      ) : (
          <Redirect to="/" />
        )
    )}
    } />
  );

  const mapStateToProps = (state) => ({
        isAuthenticated: !!state.auth.uToken,
        userInfo: state.auth
    }
  );

export default connect(mapStateToProps)(PrivateRoute);
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? 
        <Redirect to="/home" />
      : 
        <Component {...props} />
    )} />
  );

  const mapStateToProps = (state) => ({
        isAuthenticated: !!state.auth.uToken,
        userInfo: state.auth
    }
  );

export default connect(mapStateToProps)(PublicRoute);
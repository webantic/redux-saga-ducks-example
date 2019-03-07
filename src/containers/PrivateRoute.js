import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    loggedIn: !!state.auth.currentUser
  }
}

const PrivateRoute = ({ loggedIn, location, ...otherProps }) => loggedIn
  ? <Route {...otherProps} />
  : <Redirect to={{
    pathname: '/login',
    state: { from: location }
   }} />


export default connect(mapStateToProps)(PrivateRoute)

import React from 'react'
import { Redirect } from 'react-router-dom'

export default ({ handleLogin, loggingIn, loggedIn, location }) => (
  <form onSubmit={e => {
                  e.preventDefault()
                  const email = e.target.email.value
                  const password = e.target.password.value
                  handleLogin({ email, password})
                }}>
    <input type='email' placeholder='Email Address' name='email' />
    <input type='password' placeholder='Password' name='password' />
    <button type='submit' disabled={loggingIn}>
      Log In
    </button>
    {loggedIn && <Redirect to={location.state && location.state.from && location.state.from.pathname
                     ? location.state.from.pathname
                     : '/'} />}
  </form>
)

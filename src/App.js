import React from 'react'
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { LOGIN_RESTORED } from './ducks/auth'

import PrivateRoute from './containers/PrivateRoute'
import Login from './containers/Login'

const mapDispatchToProps = dispatch => {
  return {
    restoreSession: ({ id, token }) => dispatch(LOGIN_RESTORED({ id, token}))
  }
}

function Index () {
  return <h2>Home</h2>
}

function About () {
  return <h2>About</h2>
}

class App extends React.Component {
  constructor (props) {
    super(props)
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      this.props.restoreSession(JSON.parse(currentUser))
    }
  }
  render () {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'> Home
                </Link>
              </li>
              <li>
                <Link to='/about'> About
                </Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path='/' exact component={Index} />
            <Route path='/login' exact component={Login} />
            <PrivateRoute
              path='/about'
              exact
              component={About}
              loggedIn={false} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect(null, mapDispatchToProps)(App)

import React from 'react'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { LOGIN_RESTORED } from '../ducks/auth'

const mapDispatchToProps = dispatch => {
  return {
    restoreSession: ({ id, token }) => dispatch(LOGIN_RESTORED({ id, token}))
  }
}

class Layout extends React.Component {
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
          {this.props.children}
        </div>
      </Router>
    )
  }
}

export default connect(null, mapDispatchToProps)(Layout)

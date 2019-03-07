import { connect } from 'react-redux'
import { LOGIN_ATTEMPT } from '../ducks/auth'
import LoginForm from '../components/LoginForm'

const mapStateToProps = state => {
  return {
    loggedIn: !!state.auth.currentUser,
    loggingIn: state.auth.loggingIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: ({ email, password }) => dispatch(LOGIN_ATTEMPT({ email, password}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

import { createSlice } from 'redux-starter-kit'
import { call, put, takeLatest } from 'redux-saga/effects'
import API, { updateToken } from '../api'

const { actions, reducer } = createSlice({
  initialState: {
    currentUser: false,
    loggingIn: false,
    itemsById: {}
  },
  reducers: {
    LOGIN_ATTEMPT(state, { payload }) {
      state.loggingIn = true
    },
    LOGIN_SUCCESS(state, { payload }) {
      state.currentUser = payload.id
      state.loggingIn = false
      state.itemsById[payload.id] = payload
    },
    LOGIN_FAILED(state, { payload }) {
      state.currentUser = null
      state.loggingIn = false
      state.auth = null
    },
    LOGOUT(state, { payload }) {
      state.currentUser = null
    },
    LOGIN_RESTORED(state, { payload }) {
      state.currentUser = payload.id
      state.itemsById[payload.id] = payload
    }
  }
})

// we lose our context when trying to call localStorage.X
// inside these functions if we don't do this
const setItem = window.localStorage.setItem.bind(localStorage)
const removeItem = window.localStorage.removeItem.bind(localStorage)

function * handleLoginAttempt ({ payload }) {
  try {
    const { data } = yield call(
      API.post, '/auth/login', {
        email: payload.email,
        password: payload.password
      }
    )
    // assume login successful
    yield put(actions.LOGIN_SUCCESS(data))
  } catch (err) {
    yield put(actions.LOGIN_FAILED({ message: err.message }))
  }
}

function * handleLoginSuccess ({ payload }) {
  yield call(updateToken, payload.token)
  yield call(setItem, 'currentUser', JSON.stringify(payload))
}

function * handleLogout ({ payload }) {
  yield call(removeItem, 'currentUser')
}

function * handleLoginRestored ({ payload }) {
  yield call(updateToken, payload.token)
}

export function * saga () {
  yield takeLatest('LOGIN_ATTEMPT', handleLoginAttempt)
  yield takeLatest('LOGIN_SUCCESS', handleLoginSuccess)
  yield takeLatest('LOGIN_RESTORED', handleLoginRestored)
  yield takeLatest('LOGOUT', handleLogout)
}

export const { LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, LOGIN_RESTORED } = actions

export default reducer

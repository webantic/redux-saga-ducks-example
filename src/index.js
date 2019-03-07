import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import logger from 'redux-logger'

import App from './App'
import authReducer, { saga as authSaga } from './ducks/auth'
import * as serviceWorker from './serviceWorker'

// Redux/Saga

const sagaMiddleware = createSagaMiddleware()

function * rootSaga () {
  yield all([
    authSaga()
  ])
}

const middleware = [
  ...getDefaultMiddleware(),
  sagaMiddleware
]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}
const store = configureStore({
  reducer: {
    auth: authReducer
  },
middleware})

sagaMiddleware.run(rootSaga)

// End Redux/Saga

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))

serviceWorker.unregister()

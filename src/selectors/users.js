import { createSelector as cs } from 'redux-starter-kit'

// returns usersById object
export const getUsers = cs(
  ['auth.itemsById'],
  items => items
)

// returns array of users
export const listUsers = cs(
  ['auth.itemsById'],
  items => Object.values(items)
)

// returns user ID
export const getLoggedInUserId = cs(
  ['auth.currentUser'],
  user => user
)

// returns user object
export const getLoggedInUser = cs(
  [getUsers, getLoggedInUserId],
  (users, userId) => users[userId]
)

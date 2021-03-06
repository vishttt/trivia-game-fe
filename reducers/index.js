import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';

import game from './gameReducer'
import setup from './setupReducer'

// import login from './loginReducer'
// import signUp from './signUpReducer'
// import process from './processReducer'
// import users from './usersReducer'

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Home');
const initialNavState = AppNavigator.router.getStateForAction(
  tempNavState
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    case 'SignUp':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'SignUp' }),
        state
      );
      break;
    case 'Home':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.init());
      nextState.routes[0].routeName = 'Home'
      break;
    case 'Chat':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Chat' }),
        NavigationActions.back(),
        state
      );
      break;
    case 'Difficulty':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.init());
      nextState.routes[0].routeName = 'Difficulty'
      break;
    case 'Game':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.init());
      nextState.routes[0].routeName = 'Game'
      break;
    case 'GameEnd':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.init());
      nextState.routes[0].routeName = 'GameEnd'
      break;
    case 'Review':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.init());
      nextState.routes[0].routeName = 'Review'
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav,
  auth,
  game,
  setup,
});

export default AppReducer;

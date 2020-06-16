import Cookies from 'js-cookie';

function logout() {
  Cookies.remove('session', {path: '/'});
}

export default function authReducer(state = { authenticated: false }, action) {
  switch(action.type) {
    case 'LOGOUT':
      logout();
    case 'LOGIN':
      break;
    default:
      return state;
  }

  return { authenticated: Boolean(Cookies.get('session', { path: '/' })) };
}

import Cookies from 'js-cookie';

function logout() {
  Cookies.remove('session', {path: '/'});
}

export default function authReducer(state = { authenticated: false }, action) {
  if (action.type == 'LOGOUT') {
    logout();
  }
  return { authenticated: Boolean(Cookies.get('session', { path: '/' })) };
}

import Cookies from 'js-cookie';

function logout() {
  Cookies.remove('AIOHTTP_SESSION', {path: '/'});
}

export default function authReducer(state = { authenticated: false }, action) {
  if (action.type == 'LOGOUT') {
    logout();
  }
  return { authenticated: Boolean(Cookies.get('AIOHTTP_SESSION', { path: '/' })) };
}

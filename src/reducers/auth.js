import Cookies from 'js-cookie';

function logout() {
  Cookies.remove('session', {path: '/'});
}

export default function authReducer(state = false, action) {
  switch(action.type) {
    case 'LOGOUT':
      logout();
      break;
    default:
      break;
  }

  return Boolean(Cookies.get('session', { path: '/' }));
}

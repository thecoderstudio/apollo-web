export const CACHE_CURRENT_USER = 'CACHE';
export const REMOVE_CURRENT_USER = 'REMOVE';

function removeCurrentUser() {
  return {
    type: REMOVE_CURRENT_USER
  };
}

function cacheCurrentUser(user) {
  return {
    type: CACHE_CURRENT_USER,
    user
  };
}

export { removeCurrentUser, cacheCurrentUser }; 

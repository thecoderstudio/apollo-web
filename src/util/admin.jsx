export default function checkIfAdmin(currentUser) {
  if (currentUser && currentUser.role) {
    return currentUser.role.name === 'admin';
  }

  return false;
}


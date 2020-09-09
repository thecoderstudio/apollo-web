export default function checkIfAdmin(user) {
  if (user && user.role) {
    return user.role.name === 'admin';
  }

  return false;
}

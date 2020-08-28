const requiredError = "Required";

export default function validateLoginCreds(credentials) {
  let errors = {}

  if (!credentials.username) {
    errors.username = requiredError;
  }
  if (!credentials.password) {
    errors.password = requiredError;
  }

  return errors
}

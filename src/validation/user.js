import * as Yup from 'yup';

const requiredError = "Required";
const minimalEightCharacters = "Min 8 characters";
const passwordsDontMatch = "Passwords must match";
const passwordCantMatchOldValue = "Password can't match old password";
const confirmPasswordRequired = "Confirm password is required when password is given";

const basePasswordValidation = Yup.string()
  .min(8, minimalEightCharacters)
  .trim()
  .required(requiredError);

const createUserSchema = Yup.object().shape({
  username: Yup.string()
    .max(36, "Max 36 characters")
    .trim()
    .required(requiredError),
  password: basePasswordValidation,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], passwordsDontMatch)
    .trim()
    .required(requiredError)
});

const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .trim()
    .required(requiredError),
  password: basePasswordValidation
    .test("don't match", passwordCantMatchOldValue, function (value) {
      const { oldPassword } = this.parent;
      return oldPassword !== value;
    }),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], passwordsDontMatch)
    .min(8, minimalEightCharacters)
    .trim()
    .required(requiredError)
});

const UpdateUserSchema = Yup.object().shape({
  username: Yup.string()
    .max(36, "Max 36 characters")
    .trim(),
  oldPassword: Yup.string()
    .trim(),
  password: Yup.string()
    .min(8, minimalEightCharacters)
    .trim()
    .test("don't match", passwordCantMatchOldValue, function (value) {
      if (!value) {
        return true;
      }
      const { oldPassword } = this.parent;
      return oldPassword !== value;
    }),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], passwordsDontMatch)
    .min(8, minimalEightCharacters)
    .trim()
    .test("required", confirmPasswordRequired, function (value) {
      const { password } = this.parent;
      if (password && !value) {
        return false;
      }

      return true;
    })
});

export { changePasswordSchema, createUserSchema, UpdateUserSchema };

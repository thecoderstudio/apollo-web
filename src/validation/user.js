import * as Yup from 'yup';

const requiredError = "Required";
const minimalEightCharacters = "Min 8 characters";

Yup.match = function (key, message, func) {
  message = message || "Values can't be the same";
  func = func || function (value) {
    return value !== this.options.context[key];
  }

  return Yup.mixed().test('match', message, func);
};

const createUserSchema = Yup.object().shape({
  username: Yup.string()
    .max(36, "Max 36 characters")
    .trim()
    .required(requiredError),
  password: Yup.string()
    .min(8, minimalEightCharacters)
    .trim()
    .required(requiredError),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .trim()
    .required(requiredError)
});

const changePasswordSchema = Yup.object().shape({
	oldPassword: Yup.string()
    .trim()
    .required(requiredError),
  password: Yup.string()
    .min(8, minimalEightCharacters)
    .trim()
    .required(requiredError)
    .test("don't match", "Password can't match old password", function (value) {
      const { oldPassword } = this.parent;
      return oldPassword !== value;
    }),
  passwordConfirm: Yup.string()
		.oneOf([Yup.ref('password'), null], "Passwords don't match")
    .min(8, minimalEightCharacters)
    .trim()
    .required(requiredError)
});

export { changePasswordSchema, createUserSchema };

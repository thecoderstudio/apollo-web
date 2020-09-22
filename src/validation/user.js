import * as Yup from 'yup';

const requiredError = "Required";
const minimalEightCharacters = "Min 8 characters";

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
    .required(requiredError),
  passwordConfirm: Yup.string()
		.oneOf([Yup.ref('password'), null], "Passwords don't match")
    .min(8, minimalEightCharacters)
    .trim()
    .required(requiredError)
});

export { changePasswordSchema, createUserSchema };

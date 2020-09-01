import * as Yup from 'yup';

const requiredError = "Required";

const createUserSchema = Yup.object().shape({
  username: Yup.string()
    .max(36, "Max 36 characters")
    .trim()
    .required(requiredError),
  password: Yup.string()
    .min(8, "Min 8 characters")
    .trim()
    .required(requiredError),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .trim()
    .required(requiredError)
});

export { createUserSchema };

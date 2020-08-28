import * as Yup from 'yup';

const requiredError = "Required";

const loginSchema = Yup.object().shape({
  username: Yup.string().trim().required(requiredError),
  password: Yup.string().trim().required(requiredError)
});

export default loginSchema;

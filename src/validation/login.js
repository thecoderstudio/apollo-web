import * as Yup from 'yup';

const requiredError = "Required";

const loginSchema = Yup.object().shape({
  username: Yup.string().required(requiredError),
  password: Yup.string().required(requiredError)
});

export default loginSchema;

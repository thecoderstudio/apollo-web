import * as Yup from 'yup';

const createAgentSchema = Yup.object().shape({
  name: Yup.string()
    .max(100, "Max 100 charactes")
    .trim()
    .required("Required")
});

export { createAgentSchema };
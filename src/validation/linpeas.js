import * as Yup from 'yup';

const exportLinpeasSchema = Yup.object().shape({
  filename: Yup.string()
    .max(100, "Max 100 characters")
    .trim()
});

export { exportLinpeasSchema };

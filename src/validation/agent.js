import * as Yup from 'yup';

const createAgentSchema = Yup.object.shape({
  agentName: Yup.string()
    .max(100, "Max 100 charactes")
    .trim()
    .isRequired(Required)
});

export { createAgentSchema }
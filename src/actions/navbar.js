export const TOGGLE_OPTIONS = 'toggleOptions'

export const toggleOptions = (collapsed) => {
  return {
    type: TOGGLE_OPTIONS,
    collapsed
  };
}
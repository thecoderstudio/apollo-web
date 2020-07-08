export const TOGGLE_OPTIONS = 'toggleOptions';

export const toggleOptions = (collapsed) => (
  {
    type: TOGGLE_OPTIONS,
    collapsed
  }
);
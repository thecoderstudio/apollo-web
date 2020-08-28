import { createTransform } from 'redux-persist';

const mapTransformer = config =>
  createTransform(
    map => JSON.stringify(Array.from(map)),
    arrayString => new Map(JSON.parse(arrayString)),
    config,
  );

export default mapTransformer;

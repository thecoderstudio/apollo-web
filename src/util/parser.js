export function parseSnakeCaseArray(arr) {
  arr.forEach(item => {
    parseSnakeCaseObj(item);
  });
  return arr
}

export function parseSnakeCaseObj(obj) {
  Object.keys(obj).forEach(key => {
    const newKey = key.replace(/(\_\w)/g, (m) => m[1].toUpperCase());
    if (newKey != key) {
      obj[newKey] = obj[key];
      delete obj[key];
    }
  });
  return obj
}

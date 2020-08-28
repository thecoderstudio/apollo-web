export function parseSnakeCaseObj(obj) {
  let newObj = {};
  Object.keys(obj).forEach(key => {
    const newKey = key.replace(/(\_\w)/g, (m) => m[1].toUpperCase());
    newObj[newKey] = obj[key];
  });
  return newObj;
}

export function parseSnakeCaseArray(arr) {
  return arr.map(item => (
    parseSnakeCaseObj(item)
  ));
}

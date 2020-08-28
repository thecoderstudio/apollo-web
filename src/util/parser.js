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

export function parseHTTPErrors(errorBody, httpToLocalMapping={}) {
  let parsed = {};
  if (Object.keys(httpToLocalMapping).length === 0) {
    httpToLocalMapping = Object.keys(errorBody).reduce((map, key) => {
      map[key] = key;
      return map;
    }, {});
  }

  for (const [httpKey, localKey] of Object.entries(httpToLocalMapping)) {
    const error = errorBody[httpKey];
    if (error) {
      parsed[localKey] = error.msg
    }
  }

  return parsed;
}

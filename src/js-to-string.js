function objectToString(object, space = 0, nested = 0) {
  const string = `{${jsToString(object, space, true, nested)}}`;

  return string;
}

function arrayToString(array, space = 0, nested = 0) {
  const string = `[${jsToString(array, space, false, nested)}]`;

  return string;
}

function jsToString(target, space = 0, showKey = true, nested = 0) {
  const keys = Object.keys(target);
  const theSpace = spacer(space * (nested + 1));
  const tailSpace = spacer(space * nested);
  let result;

  result = keys.reduce((string, key, index) => {
    const value = target[key];
    const keyString = /\W/g.test(key) ? JSON.stringify(key) : key;

    string += theSpace ? "\n" : "";
    string += showKey
      ? `${theSpace}${keyString}:${theSpace ? " " : ""}`
      : theSpace;

    if (value !== null && value.constructor === Object) {
      string += objectToString(value, space, nested + 1);
    } else if (typeof value === "string") {
      string += JSON.stringify(value);
    } else if (Array.isArray(value)) {
      string += arrayToString(value, space, nested + 1);
    } else {
      string += value;
    }

    if (keys.length - 1 > index) {
      string += ",";
    }

    return string;
  }, "");

  // Do not create new line and tail space
  // if result string is empty
  if (result) {
    result += theSpace ? "\n" : "";
    result += tailSpace;
  }

  return result;
}

function spacer(num) {
  if (num <= 0) {
    return "";
  }

  if (num === 1) {
    return " ";
  }

  let space = "";

  for (let i = 0; i < num; i++) {
    space += " ";
  }

  return space;
}

export { jsToString, objectToString, arrayToString };
export default jsToString;

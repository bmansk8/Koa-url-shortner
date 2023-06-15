const chars = "abcdefghijklmnopqrstuvwxyz1234567890_";

const rand = (min = 0, max = 1000) => Math.floor(Math.random() * (max - min) + min);

const randChar = (length = 8) => {
  let randchars = '';
  for (let i = 0; i < length; i++) {
    randchars += chars[rand(0, chars.length)];
  }

  return randchars;
};

const keygen = (prefix = '', suffix = '', length = 8) => {
  return `${prefix}${randChar(length)}${suffix}`;
}

export { keygen, randChar, rand };

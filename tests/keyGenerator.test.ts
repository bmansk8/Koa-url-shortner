const { keygen } = require('../functions/keyGenerator'); // Replace 'yourKeygenFile' with the actual file name

describe('Keygen', () => {
  test('Generates a key with default prefix and suffix', () => {
    const key = keygen();
    expect(key).toMatch(/^\w{8}$/); // Matches a string of exactly 8 alphanumeric characters
  });

  test('Generates a key with custom prefix and suffix', () => {
    const key = keygen('pre-', '-suf');
    expect(key).toMatch(/^pre-\w{8}-suf$/); // Matches a string starting with 'pre-', followed by 8 alphanumeric characters, and ending with '-suf'
  });

  test('Generates a key with custom length', () => {
    const key = keygen('', '', 12);
    expect(key).toMatch(/^\w{12}$/); // Matches a string of exactly 12 alphanumeric characters
  });

  test('Generates multiple keys', () => {
    const keys = [];
    for (let i = 0; i < 5; i++) {
      keys.push(keygen());
    }
    expect(keys).toHaveLength(5); // Checks if 5 keys are generated
    keys.forEach(key => {
      expect(key).toMatch(/^\w{8}$/); // Matches a string of exactly 8 alphanumeric characters
    });
  });
});
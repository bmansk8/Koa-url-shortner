import { isValidHttpUrl } from "../functions/isValidHttpUrl";

describe('isValidHttpUrl', () => {
  test('Valid HTTP URL', () => {
    const url = 'http://www.example.com';
    expect(isValidHttpUrl(url)).toBe(true);
  });

  test('Valid HTTPS URL', () => {
    const url = 'https://www.example.com';
    expect(isValidHttpUrl(url)).toBe(true);
  });

  test('Invalid URL', () => {
    const url = 'invalid-url';
    expect(isValidHttpUrl(url)).toBe(false);
  });

  test('Missing protocol', () => {
    const url = 'www.example.com';
    expect(isValidHttpUrl(url)).toBe(false);
  });
});

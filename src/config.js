import 'dotenv/config';

export const BASE_URL = process.env.BASE_URL || 'https://thinking-tester-contact-list.herokuapp.com';
export const TEST_PASSWORD = process.env.TEST_PASSWORD || 'Prueba123!';

function makeRandomEmail() {
  const ts = Date.now();
  return `test_${ts}_${Math.floor(Math.random()*1000)}@example.com`;
}
export const TEST_EMAIL = process.env.TEST_EMAIL && process.env.TEST_EMAIL.toLowerCase() !== 'random'
  ? process.env.TEST_EMAIL
  : makeRandomEmail();

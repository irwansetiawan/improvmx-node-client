import { HelloWorld } from '../index';
test('My HelloWorld', () => {
  expect(HelloWorld('Carl')).toBe('Hello Carl');
});
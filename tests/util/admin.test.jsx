import checkIfAdmin from '../../src/util/admin';

it('checks if admin correctly', () => {
  expect(checkIfAdmin( { role: { name: 'admin' } })).toBe(true);
  expect(checkIfAdmin(undefined)).toBe(false);
  expect(checkIfAdmin( { role: { name: 'not admin' } })).toBe(false);
});


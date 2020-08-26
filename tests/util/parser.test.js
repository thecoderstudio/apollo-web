import { parseSnakeCaseArray, parseSnakeCaseObj } from '../../src/util/parser';

test('parseSnakeCaseObj', () => {
  const test = {
    snake_case: 'abc',
    camelCase: 'cba'
  };
  const parsed = parseSnakeCaseObj(test);

  expect(parsed.snake_case).not.toBeDefined();
  expect(parsed.snakeCase).toBe('abc');
  expect(parsed.camelCase).toBe('cba');

  // Original obj not modified
  expect(test.snake_case).toBe('abc');
});

test('parseSnakeCaseArray', () => {
  const test = [
    {
      snake_case: 123,
      camelCase: 456
    },
    {
      snake_case: 'abc',
      camelCase: 'cba'
    }
  ];
  const parsed = parseSnakeCaseArray(test);

  parsed.forEach((item, index) => {
    expect(item.snake_case).not.toBeDefined();
    expect(item.snakeCase).toBe(test[index].snake_case);
    expect(item.camelCase).toBe(test[index].camelCase);
  });
});

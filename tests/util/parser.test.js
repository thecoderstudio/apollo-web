import { parseSnakeCaseArray, parseSnakeCaseObj, parseHTTPErrors } from '../../src/util/parser';

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

describe('parseHTTPErrors', () => {
  it("parses all errors if no mapping is given", () => {
    const unparsed = {
      details: "Test error",
      username: {
        msg: "Test username error"
      }
    };
    const parsed = parseHTTPErrors(unparsed);
    expect(parsed).toMatchObject({
      details: "Test error",
      username: "Test username error"
    });
  });

  it("handle custom mapping correctly", () => {
    const unparsed = {
      username: {
        msg: "Test username error"
      },
      password: {
        msg: "Test password error"
      }
    };
    const parsed = parseHTTPErrors(unparsed, { username: "test" });
    expect(parsed).toMatchObject({
      test: "Test username error"
    });
  });
});

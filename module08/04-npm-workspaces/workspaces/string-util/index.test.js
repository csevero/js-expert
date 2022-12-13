import { deepStrictEqual } from 'assert'
import StringUtil from './index.js';

{
  const expected = true;
  const data = '';
  const result = StringUtil.isEmpty(data)

  deepStrictEqual(result, expected)
}

{
  const expected = false;
  const data = 'String Cool';
  const result = StringUtil.isEmpty(data)

  deepStrictEqual(result, expected)
}

{
  const expected = "StringCool";
  const data = 'S t r i n g C o o l';
  const result = StringUtil.removeEmptySpaces(data);

  deepStrictEqual(result, expected)
}
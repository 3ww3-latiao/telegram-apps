import { expect, it } from 'vitest';

import { mergeClassNames } from '../mergeClassNames';

it('should ignore non-object values', () => {
  expect(mergeClassNames({}, null, undefined, false, true, {}));
});

it('should merge objects keys by values applying classNames function', () => {
  expect(mergeClassNames(
    { a: 'hey there', b: 'space' },
    { a: 'John', b: 'station' },
    { c: 'wowow' },
    { f: { mod: true, ignore: false, add: 'non empty string' } },
  )).toStrictEqual({
    a: 'hey there John',
    b: 'space station',
    c: 'wowow',
    f: 'mod add',
  });
});

// @flow

import { string, optional, number, shape, constant } from '..';
import validate from '../validate';

const Tweet = shape(
  Object.freeze({
    text: string,
    quote: optional(shape(Object.freeze({ id: string })))
  })
);

validate(Tweet, { text: '4', quote: { id: 'bar' } });

validate(Tweet, { text: '4', quote: undefined });

// $ExpectError
validate(Tweet, { text: '4', quote: { id: 3 } });

// $ExpectError
validate(Tweet, { text: 'hello', quote: {} });

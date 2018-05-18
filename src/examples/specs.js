// @flow

import type { Spec } from '../spec';
import { optional, string, shape, constant } from '../spec';
import validate from '../spec/validate';

// const OptionalString = optional(string);

const Tweet = shape({ text: string, quote: optional(shape({ id: string })) });

const Number3 = constant('3');

// validate(OptionalString, undefined);
// validate(Tweet, { text: 'hello', quote: {} });

// $ExpectError
validate(Number3, '4');

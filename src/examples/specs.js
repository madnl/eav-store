// @flow

import type { Spec } from '../spec';
import { optional, string, shape } from '../spec';
import validate from '../spec/validate';

// const OptionalString = optional(string);

const Tweet = shape({ text: string, quote: optional(shape({ id: string })) });

// validate(OptionalString, undefined);
validate(Tweet, { text: 'hello', quote: {} });

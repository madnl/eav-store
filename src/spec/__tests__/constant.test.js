// @flow

import { string, optional, number, shape, constant } from '..';
import validate from '../validate';

const FooString = constant('foo');

validate(FooString, 'foo');

// $ExpectError
validate(FooString, 'bar');

// $ExpectError
validate(FooString, 3);

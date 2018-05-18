// @flow

import { defineEntity } from '../api';
import { optional, shape, string } from '../spec';
import Store from '../Store';

const Tweet = defineEntity({ name: 'core/tweet' });

const CoreData = Tweet.defineAttribute({
  spec: optional(
    shape({
      text: string,
      quotedTweetId: optional(string)
    })
  ),
  initialValue: undefined
});

const User = defineEntity({ name: 'core/user' });

const CoreUser = Tweet.defineAttribute({
  spec: optional(shape({ screenName: string, bio: string })),
  initialValue: undefined
});

const store = Store();

store.set(Tweet.id('1'), CoreData, { text: 'foo', quotedTweetId: '3' });

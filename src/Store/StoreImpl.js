// @flow

import type {
  Store,
  EntityId,
  AttributeSet,
  Metadata,
  Attribute
} from '../api';

import type ObservableState from '../observable';

export default class StoreImpl implements Store {
  constructor() {}

  get<E, V>(entityId: EntityId<E>, attribute: Attribute<E, V>): V {
    throw new Error('Not implemented');
  }

  set<E, V>(entityId: EntityId<E>, attribute: Attribute<E, V>, value: V) {
    throw new Error('Not implemented');
  }

  observeValue<E, V>(
    entityId: EntityId<E>,
    attribute: Attribute<E, V>
  ): ObservableState<V> {
    throw new Error('Not implemented');
  }

  observeAll<E, V>(
    attribute: Attribute<E, V>
  ): ObservableState<AttributeSet<E, V>> {
    throw new Error('Not implemented');
  }

  metadata(): Metadata {
    throw new Error('Not implemented');
  }
}

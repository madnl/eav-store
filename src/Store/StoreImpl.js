// @flow

import type {
  Store,
  EntityId,
  AttributeSet,
  Metadata,
  Attribute
} from '../api';

import type ObservableState from '../observable';
import AttributeStore from './AttributeStore';
import { uniqueAttributeIdentifier, defaultValue } from '../api';

export default class StoreImpl implements Store {
  _stores: Map<string, AttributeStore<any, any>> = new Map();

  constructor() {}

  get<E, V>(entityId: EntityId<E>, attribute: Attribute<E, V>): V {
    const store: ?AttributeStore<E, V> = this._getAttributeStore(attribute);
    return store ? store.get(entityId) : defaultValue(attribute);
  }

  set<E, V>(entityId: EntityId<E>, attribute: Attribute<E, V>, value: V) {
    const store = this._getAttributeStore(attribute);
    if (store) {
      store.set(entityId, value);
    }
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

  _getAttributeStore<E, V>(
    attribute: Attribute<E, V>
  ): AttributeStore<E, V> | void {
    return this._stores.get(uniqueAttributeIdentifier(attribute));
  }
}

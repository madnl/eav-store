// @flow

import type { EntityId, Attribute } from '../api';
import { defaultValue } from '../api';

export default class AttributeStore<E, V> {
  _values: Map<EntityId<E>, V> = new Map();
  _attribute: Attribute<E, V>;

  constructor(attribute: Attribute<E, V>) {
    this._attribute = attribute;
  }

  get(entityId: EntityId<E>): V {
    const value = this._values.get(entityId);
    return value || defaultValue(this._attribute);
  }

  set(entityId: EntityId<E>, value: V) {
    this._values.set(entityId, value);
  }
}

// @flow

import NameGenerator from '../modules/NameGenerator';
import type { ObservableState } from '../observable';
import type { Spec } from '../spec';

export opaque type EntityId<E> = string;

export opaque type Attribute<E, V> = {
  propertyId: string,
  entity: Entity<E>,
  defaultValue: V
};

type AttributeOptions<V> = {
  spec: Spec<V>,
  defaultValue: V
};

export interface Entity<E> {
  id(value: string): EntityId<E>;

  defineAttribute<V>(options: AttributeOptions<V>): Attribute<E, V>;
}

type EntityOptions<E> = { name: E };

export const defineEntity = <E: $Subtype<string>>(
  options: EntityOptions<E>
): Entity<E> => new EntityImpl(options);

export const uniqueAttributeIdentifier = <E, V>(
  attribute: Attribute<E, V>
): string => attribute.propertyId;

const entityIdGen = NameGenerator('entity-');
class EntityImpl<E: string> implements Entity<E> {
  _nameGenerator: () => string;

  constructor(options: EntityOptions<E>) {
    const entityId = entityIdGen(options.name);
    this._nameGenerator = NameGenerator(`${entityId}-property-`);
  }

  id(value: string): EntityId<E> {
    return value;
  }

  defineAttribute<V>(options: AttributeOptions<V>): Attribute<E, V> {
    return {
      propertyId: this._nameGenerator(),
      entity: this,
      defaultValue: options.defaultValue
    };
  }
}

export const defaultValue = <E, V>(attribute: Attribute<E, V>): V =>
  attribute.defaultValue;

export interface Store {
  get<E, V>(entityId: EntityId<E>, attribute: Attribute<E, V>): V;
  set<E, V>(entityId: EntityId<E>, attribute: Attribute<E, V>, value: V): void;
  observeValue<E, V>(
    entityId: EntityId<E>,
    attribute: Attribute<E, V>
  ): ObservableState<V>;

  observeAll<E, V>(
    attribute: Attribute<E, V>
  ): ObservableState<AttributeSet<E, V>>;

  metadata(): Metadata;
}

export interface AttributeSet<E, V> {
  entities: Array<EntityId<E>>;
  get(entityId: EntityId<E>): V;
}

export interface Metadata {
  entitySet: Array<Entity<mixed>>;
  attributeSet: Array<Attribute<mixed, mixed>>;
  attributeFamily<E>(entity: Entity<E>): Array<Attribute<E, mixed>>;
}

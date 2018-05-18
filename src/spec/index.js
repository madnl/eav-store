// @flow

type Descriptor =
  | { type: 'string' }
  | { type: 'number' }
  | { type: 'boolean' }
  | { type: 'array', item: Descriptor }
  | { type: 'shape', fields: { [fieldName: string]: Descriptor } }
  | { type: 'objectMap', key: Descriptor, value: Descriptor }
  | { type: 'constant', value: mixed }
  | { type: 'union', branches: Array<Descriptor> }
  | { type: 'nothing' };

export opaque type Spec<T> = Descriptor;

export const string: Spec<string> = { type: 'string' };
export const number: Spec<number> = { type: 'number' };
export const boolean: Spec<boolean> = { type: 'boolean' };
export const arrayOf = <ItemT>(itemType: Spec<ItemT>): Spec<Array<ItemT>> => ({
  type: 'array',
  item: itemType
});

type TypeOfSpec = <T>(spec: Spec<T>) => T;

export const shape = <Shape: { [fieldName: string]: Spec<any> }>(
  fields: Shape
): Spec<$Exact<$ObjMap<Shape, TypeOfSpec>>> => ({
  type: 'shape',
  fields
});

export const objectMap = <K, V>(
  key: Spec<K>,
  value: Spec<V>
): Spec<{ [K]: V }> => ({
  type: 'objectMap',
  key,
  value
});

export const constant = <T: string | number | boolean, X: $Subtype<T>>(
  value: X
): Spec<X> => ({
  type: 'constant',
  value
});

declare type UnionBuilder = {
  <T1, T2>(branch1: Spec<T1>, branch2: Spec<T2>): Spec<T1 | T2>,
  <T1, T2, T3>(
    branch1: Spec<T1>,
    branch2: Spec<T2>,
    branch3: Spec<T3>
  ): Spec<T1 | T2 | T3>,
  <T1, T2, T3, T4>(
    branch1: Spec<T1>,
    branch2: Spec<T2>,
    branch3: Spec<T3>,
    branch4: Spec<T4>
  ): Spec<T1 | T2 | T3 | T4>
};
const union: UnionBuilder = (...branches) => ({ type: 'union', branches });

export const nothing: Spec<void> = { type: 'nothing' };

export const optional = <T>(spec: Spec<T>): Spec<T | void> =>
  union(spec, nothing);

// @flow

export interface ObservableState<T> {
  current: T;
  subscribe(onChange: (T) => void): Unsubscriber;
}

export type Unsubscriber = () => void;

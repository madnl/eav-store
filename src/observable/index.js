// flow

export interface ObservableState<V> {
  current(): V;
  subscribe(onChange: () => void): Unsubscribe;
}

type Unsubscribe = () => void;

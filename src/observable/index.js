// flow

export interface ObservableState<V> {
  initial: V;
  subscribe(onChange: (V) => void): Unsubscribe;
}

type Unsubscribe = () => void;

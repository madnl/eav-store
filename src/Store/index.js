// @flow

import type { Store } from '../api';
import StoreImpl from './StoreImpl';

export default (): Store => new StoreImpl();

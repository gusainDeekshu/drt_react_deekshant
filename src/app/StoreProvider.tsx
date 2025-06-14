"use client";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/app/store/store';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {/* PersistGate delays rendering until the persisted state is retrieved */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
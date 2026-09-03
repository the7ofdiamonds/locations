import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook } from 'react-redux';

import { locationSlice } from '../controllers/locationSlice';

export const store = configureStore({
    reducer: {
        location: locationSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSelectorHook = TypedUseSelectorHook<RootState>;
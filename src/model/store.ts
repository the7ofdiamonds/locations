import { configureStore } from '@reduxjs/toolkit';

import { locationSlice } from '../controllers/locationSlice';

export const store = configureStore({
    reducer: {
        location: locationSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
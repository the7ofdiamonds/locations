import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface LocationState {
  locationLoading: boolean;
  locationError: Error | null;
  locationErrorMessage: string | null;
  locations: string;
  headquarters: string;
}

const initialState: LocationState = {
  locationLoading: false,
  locationError: null,
  locationErrorMessage: null,
  locations: '',
  headquarters: '',
};

export const getLocations = createAsyncThunk(
  'location/getLocations',
  async () => {
    try {
      const response = await fetch(`/wp-json/seven-tech/locations/v1/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  }
);

export const getHeadquarters = createAsyncThunk(
  'location/getHeadquarters',
  async () => {
    try {
      const response = await fetch(
        `/wp-json/seven-tech/locations/v1/headquarters`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  }
);

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocations.pending, (state) => {
        state.locationLoading = true;
        state.locationError = null;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.locationLoading = false;
        state.locationError = null;
        state.locations = action.payload;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.locationLoading = false;
        state.locationErrorMessage =
          action.error.message ?? 'Unknown error occurred';
      })
      .addCase(getHeadquarters.pending, (state) => {
        state.locationLoading = true;
        state.locationErrorMessage = '';
      })
      .addCase(getHeadquarters.fulfilled, (state, action) => {
        state.locationLoading = false;
        state.locationError = null;
        state.headquarters = action.payload;
      })
      .addCase(getHeadquarters.rejected, (state, action) => {
        state.locationLoading = false;
        state.locationErrorMessage =
          action.error.message ?? 'Unknown error occurred';
      });
  },
});

export default locationSlice;

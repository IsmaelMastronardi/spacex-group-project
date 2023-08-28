import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async () => {
  const response = await axios.get('https://api.spacexdata.com/v4/rockets');
  return response.data;
});

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState: [],
  reducers: {
    bookRocket: (state, action) => {
      const rocketToBook = state.find((rocket) => rocket.id === action.payload);
      if (rocketToBook) {
        rocketToBook.reserved = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRockets.fulfilled, (state, action) => action.payload);
  },
});

export const { bookRocket } = rocketsSlice.actions;
export default rocketsSlice.reducer;
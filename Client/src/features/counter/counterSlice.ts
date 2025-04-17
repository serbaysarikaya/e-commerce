import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ICounterState {
  value: number;
}

const initialState: ICounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {  
      state.value += action.payload;
    },
  },
});

// Doğru action isimleri
export const { increment, decrement, incrementByAmount } = counterSlice.actions;


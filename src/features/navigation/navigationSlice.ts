import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NavigationState {
  pages: JSX.Element[],
}

const initialState: NavigationState = {
  pages: [],
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: initialState,
  reducers: {
    pushPage: (state, action: PayloadAction<JSX.Element>) => {
      console.log("pushed");
      state.pages = [...state.pages, action.payload];
    },
    popPage: (state) => {
      if (state.pages.length > 1) {
        let newValue = [...state.pages]
        newValue.pop()
        state.pages = newValue
      }
    },
    setBasePage: (state, action: PayloadAction<JSX.Element>) => {
      state.pages = [action.payload]
    }
  },
})

export const { pushPage, popPage, setBasePage } = navigationSlice.actions

export default navigationSlice.reducer
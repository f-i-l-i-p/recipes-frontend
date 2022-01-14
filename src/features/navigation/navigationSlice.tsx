import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import React from 'react';
import CreateRecipePage from '../../components/pages/CreateRecipePage';
import LoginPage from '../../components/pages/LoginPage';
import RecipeListPage from '../../components/pages/RecipeListPage';

export enum BasePage {
  Login,
  RecipeList,
  CreateRecipe,
}

function createBasePage(page: BasePage): JSX.Element {
  switch (page) {
    case BasePage.Login:
      return <LoginPage />
    case BasePage.RecipeList:
      return <RecipeListPage />
    case BasePage.CreateRecipe:
      return <CreateRecipePage />
    default:
      return <React.Fragment />
  }
}

interface NavigationState {
  pages: JSX.Element[],
  showNavigation: boolean,
}

const initialState: NavigationState = {
  pages: [createBasePage(BasePage.Login)],
  showNavigation: false,
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: initialState,
  reducers: {
    pushPage: (state, action: PayloadAction<JSX.Element>) => {
      console.log("pushed")
      state.pages = [...state.pages, action.payload]
      window.scrollTo(0, 0)
    },
    popPage: (state) => {
      if (state.pages.length > 1) {
        let newValue = [...state.pages]
        newValue.pop()
        state.pages = newValue
        window.scrollTo(0, 0)
      }
    },
    setBasePage: (state, action: PayloadAction<BasePage>) => {
      if (action.payload === BasePage.Login)
        state.showNavigation = false
      else
        state.showNavigation = true

      state.pages = [createBasePage(action.payload)]
      window.scrollTo(0, 0)
    }
  },
})

export const { pushPage, popPage, setBasePage } = navigationSlice.actions

export default navigationSlice.reducer
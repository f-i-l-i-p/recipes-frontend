import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import LoginPage from '../../components/pages/LoginPage'

interface PageData {
  page: JSX.Element,
  id: number,
  name: string,
}

interface NewPageData {
  page: JSX.Element,
  name: string,
}

interface NavigationState {
  pages: PageData[],
  currentPageIndex: number,
  idCounter: number,
  showNavigation: boolean,
}

const initialState: NavigationState = {
  pages: [{ page: <LoginPage />, id: 0, name: "" }],
  currentPageIndex: 0,
  idCounter: 1,
  showNavigation: false,
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: initialState,
  reducers: {
    /**
     * Handles PopStateEvents from the browser to go back or forward in history.
     */
    historyEvent: (state, action: PayloadAction<PopStateEvent>) => {
      let eventPageId: number

      // The state of the root page will be 'null' and should have id 0.
      if (action.payload.state === null) {
        eventPageId = 0
      } else {
        eventPageId = action.payload.state
      }

      let eventPageIndex = 0

      // Find index of page with matching id
      const pages = state.pages
      for (let i = 0; i < pages.length; i++) {
        if (pages[i].id === eventPageId) {
          eventPageIndex = i
          break
        }
      }

      state.currentPageIndex = eventPageIndex
    },
    /**
     * Pushes a new page and opens it. Removes forward history.
     */
    pushPage: (state, action: PayloadAction<NewPageData>) => {
      const id = state.idCounter;
      window.history.pushState(id, "", window.location.href)

      let newPages = [...state.pages]

      // Remove forward history if it should be removed.
      const index = state.currentPageIndex;
      if (index + 1 < newPages.length) { // If not last index
        newPages.splice(index + 1, newPages.length - index - 1)
      }

      newPages.push({ page: action.payload.page, id: id, name: action.payload.name })

      state.idCounter += 1
      state.pages = newPages
      state.currentPageIndex += 1

      window.scrollTo(0, 0)
    },
    /**
     * Replaces the current page. Does not affect forward or backwards history.
     */
    replacePage: (state, action: PayloadAction<NewPageData>) => {
      const id = state.pages[state.currentPageIndex].id
      window.history.replaceState(id, "", window.location.href)

      state.pages[state.currentPageIndex] = { page: action.payload.page, id: id, name: action.payload.name }

      window.scrollTo(0, 0)
    },
    setShowNavigation: (state, action: PayloadAction<boolean>) => {
      state.showNavigation = action.payload
    }
  },
})

export const { historyEvent, pushPage, replacePage, setShowNavigation } = navigationSlice.actions

export default navigationSlice.reducer
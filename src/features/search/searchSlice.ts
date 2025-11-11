import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../../app/store'

export interface SearchState {
  query: string
  page: number
  pageSize: number
}

const initialState: SearchState = {
  query: '',
  page: 1,
  pageSize: 10,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload
      state.page = 1
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
      state.page = 1
    },
    resetSearch() {
      return initialState
    },
  },
})

export const { setQuery, setPage, setPageSize, resetSearch } = searchSlice.actions

export const selectSearchState = (state: RootState) => state.search

export default searchSlice.reducer

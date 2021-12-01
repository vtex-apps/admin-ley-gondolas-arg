import React, { createContext, useReducer } from 'react';
import { PaginationReducer } from './../reducers/PaginationReducer';

const initialState = {
  from: 1,
  to: 5,
  currentPage: 1,
  totalPages: 1,
  totalItems: 1,
  limit: 5
}

export const PaginationContext = createContext<{
  state: PaginationContext;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

export const PaginationProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(PaginationReducer, initialState);
  return (
    <PaginationContext.Provider value={{ state, dispatch }}>
      {children}
    </PaginationContext.Provider>
  )
}

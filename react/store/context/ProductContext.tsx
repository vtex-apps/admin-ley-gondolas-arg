import React, { createContext, useReducer } from 'react';
import { ProductReducer } from './../reducers/ProductReducer';

const initialState = {
  from: 1,
  to: 5,
  currentPage: 1,
  totalPages: 1,
  totalItems: 1,
  limit: 5,
  params: "",
  statements: []
}

export const ProductContext = createContext<{
  state: ProductContext;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

export const ProductProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  )
}

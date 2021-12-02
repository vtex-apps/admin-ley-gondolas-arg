export const ProductReducer = (state: ProductContext, action: any) => {

  switch (action.type) {
    case 'INCREASE_PAGE':
      return {
        ...state,
        from: state.from + state.limit,
        to: state.to + state.limit,
        currentPage: state.currentPage + 1,
      }
    case 'DECREASE_PAGE':
      return {
        ...state,
        from: state.from - state.limit,
        currentPage: state.currentPage - 1,
      }
    case 'SET_LIMIT':
      return {
        ...state,
        limit: action.payload,
        from: 1,
        to: action.payload,
      }
    case 'SET_TOTAL_ITEMS':
      return {
        ...state,
        totalItems: action.payload,
      }
    case 'SET_TOTAL_PAGES':
      return {
        ...state,
        totalPages: action.payload,
      }
    case 'SET_PARAMS':
      return {
        ...state,
        params: action.payload,
        currentPage: 1,
        from: 1,
        to: state.limit
      }
    case 'RESET_PAGINATION':
      return {
        ...state,
        params: "",
        from: 1,
        to: state.limit,
        currentPage: 1,
      }
    case 'SET_STATEMENTS':
      return {
        ...state,
        statements: action.payload,
      }
    default:
      return state;
  }
}

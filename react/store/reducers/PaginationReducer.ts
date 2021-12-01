export const PaginationReducer = (state: PaginationContext, action: any) => {
  console.log("action----", action)

  switch (action.type) {
    case 'INCREASE_PAGE':
      return {
        ...state,
        from: state.from + state.limit,
        to: state.to + state.limit,
        currentPage: state.currentPage + 1,
        // totalPages: Math.ceil(state.totalItems / state.limit),
      }
    case 'DECREASE_PAGE':
      return {
        ...state,
        from: state.from - state.limit,
        currentPage: state.currentPage - 1,
        // totalPages: Math.ceil(state.totalItems / state.limit),
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
    default:
      return state;
  }
}

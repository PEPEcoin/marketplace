import { FETCH_MORTGAGES_REQUEST, FETCH_MORTGAGES_SUCCESS } from './actions'

const INITIAL_STATE = {
  data: {
    parcels: []
  },
  loading: [],
  error: null
}

export function mortgageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_MORTGAGES_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case FETCH_MORTGAGES_SUCCESS: {
      return {
        ...state,
        data: Object.assign({}, state.data, { parcels: action.payload }),
        loading: false
      }
    }
    default:
      return state
  }
}

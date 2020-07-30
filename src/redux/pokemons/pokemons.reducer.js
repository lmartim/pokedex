// Estado inicial dos quadrinhos
export const INITIAL_STATE_POKEMONS = {
  selected: [],
  favorites: [],
  pokemons: [],
  status: 'loading',
  next: null
}

// Reducer responsável por atualizar o estado dos quadrinhos
export function pokemonsReducer(state = INITIAL_STATE_POKEMONS, action) {
  switch (action.type) {
    case 'GET_POKEMONS_SUCCESS':
      return {
        ...state,
        pokemons: action.payload,
        status: 'success',
        next: action.next
      }
    case 'GET_POKEMONS_FAIL':
      return {
        ...state,
        pokemons: [],
        status: 'fail',
        next: null,
      }
    case 'LOAD_POKEMONS':
      return {
        ...state,
        status: 'loading'
      }
    case 'SAVE_POKEMON':
      return {
        ...state,
        selected: action.payload
      }
    default:
      return state;
  }
}
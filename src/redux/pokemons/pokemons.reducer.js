// Estado inicial dos Pokémons
export const INITIAL_STATE_POKEMONS = {
  selected: [],
  favorites: [],
  pokemons: [],
  status: 'loading',
  next: null
}

// Reducer responsável por atualizar o estado dos Pokémons
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
    case 'GET_POKEMON_SUCCESS':
      return {
        ...state,
        selected: action.payload,
      }
    case 'GET_POKEMON_FAIL':
      return {
        ...state,
        selected: null,
      }
    case 'PUT_FAVORITE_SUCCESS':
      return {
        ...state,
        favorites: action.payload
      }
    case 'LOAD_POKEMONS':
      return {
        ...state,
        status: 'loading'
      }
    default:
      return state;
  }
}
import axios from 'axios';

// Recebendo variáveis de gateway e key do ambiente
const apiGateway = process.env.REACT_APP_API_URL;
// const apiGateway = 'https://pokeapi.co/api/v2'

// Action responsável os primeiros 16 Pokémons
// Cada listagem é salva em um array, para ser possível fazer um efeito de paginação, similar a uma Pokédex
export function getInitialPokemons() {
  return function (dispatch) {
    axios.get(`${apiGateway}/pokemon?limit=16`)
      .then(res => {
        const pokemonList = [res.data.results]
        dispatch({
          type: 'GET_POKEMONS_SUCCESS',
          payload: pokemonList,
          next: res.data.next
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_POKEMONS_FAIL'
        })
      })
  }
}

// Action responsável por retornar os Pokémons, buscando a quantidade
// de monstrinhos, de acordo com a quantidade necessário pela paginação
export function getPokemons(next) {
  return function (dispatch, getState) {
    const { pokemons : {pokemons}  } = getState()
    axios.get(`${next}`)
      .then(res => {
        const pokemonList = [res.data.results]
        const updatedPokemonList = [...pokemons, ...pokemonList]
        console.log('!!!!!!!!!!!', updatedPokemonList)

        dispatch({
          type: 'GET_POKEMONS_SUCCESS',
          payload: updatedPokemonList,
          next: res.data.next
        })
      })
      .catch(err => {
        dispatch({
          type: 'GET_POKEMONS_FAIL'
        })
      })
  }
}

// Funções responsáveis por atualizar o status da página de Pokémons
export const loadPokemons = () => ({
  type: 'LOAD_POKEMONS'
})

export const savePokemons = (pokemon) => ({
  type: 'SAVE_POKEMONS',
  payload: pokemon
})

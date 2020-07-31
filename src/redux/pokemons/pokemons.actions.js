import axios from 'axios';

// Recebendo variáveis de gateway e key do ambiente
const apiGateway = process.env.REACT_APP_API_URL;

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

// Action responsável por retornar os detalhes do Pokémon selecionado
export function getPokemon(name) {
  return function (dispatch) {
    axios.get(`${apiGateway}/pokemon/${name}`)
      .then(res => {
        axios.get(res.data.species.url)
          .then(response => {
            axios.get(response.data.evolution_chain.url)
            .then(res_evolution => {
              dispatch({
                type: 'GET_POKEMON_SUCCESS',
                payload: {...res.data, ...res_evolution.data},
              })
            })
          })
      })
      .catch(err => {
        dispatch({
          type: 'GET_POKEMON_FAIL'
        })
      })
  }
}

// Action responsável por salvar/remover um Pokémon da listagem de favoritos
export function putFavorite(pokemon) {
  return function (dispatch, getState) {
    let { pokemons: {favorites}} = getState()

    // Verifica se Pokémon já foi favoritado antes
    const isFavorited = favorites.find(favorited => favorited.name === pokemon.name)
    if (isFavorited) {
      // Remove Pokémon, se ele já tiver sido favoritado
      favorites = favorites.filter(favorited => favorited.name !== pokemon.name)
    } else {
      // Adicione Pokémon aos favoritos
      favorites.push(pokemon)
    }
    dispatch({
      type: 'PUT_FAVORITE_SUCCESS',
      payload: favorites,
    })
  }
}

// Funções responsáveis por atualizar o status da página de Pokémons
export const loadPokemons = () => ({
  type: 'LOAD_POKEMONS'
})
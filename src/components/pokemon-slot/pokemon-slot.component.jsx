import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import styled from "styled-components";

import { getPokemon } from '../../redux/pokemons/pokemons.actions';

// Componente responsável pelos slots dos Pokémons, exibidos na listagem
// Recebe uma prop com as informações dos monstrinhos
class PokemonSlot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemon: props.pokemon,
      index: props.index
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      pokemon: props.pokemon,
      index: props.index
    }
  }

  // Função para levar até página de detalhes
  // Recebe o nome do Pokémon, para buscar seus respectivos dados na API
  pokemonDetails(pokemon) {
    this.props.getPokemon(pokemon)
    this.props.history.push({ pathname: '/detalhes' });
  }

  render() {
    const pokemon = this.state.pokemon
    const index = this.state.index
    return (
      <PokemonSlotBox onClick={() => this.pokemonDetails(pokemon.name)}>
        {/* Exibe a imagem do Pokémon */}
        <PokemonSlotImage src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
        {/* Exibe o nome do Pokémon */}
        <PokemonSlotName>#{index+1} - {pokemon.name}</PokemonSlotName>
      </PokemonSlotBox>
    )
  }
}

// Funções do Redux, para chamar as actions
const mapDispatchToProps = dispatch => {
  return {
    getPokemon: (name) => dispatch(getPokemon(name)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(PokemonSlot));

//CSS-in-JS
const PokemonSlotBox = styled.div`
  padding: 20px;
  border-radius: 5px;
  background-color: rgba(255,255,255, 0.4);
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all .3s;
  &:hover {
    cursor: pointer;
    background-color: rgba(255,255,255, 0.8);
  }
`

const PokemonSlotImage = styled.img`
  width: fit-content;
  @media(max-width: 1024px) {
    margin: 0 auto;
    width: 100%;
  }
`

const PokemonSlotName = styled.div`
  text-align: center;
  color: white;
  font-weight: 800;
  margin-top: 5px;
  text-transform: capitalize;
`


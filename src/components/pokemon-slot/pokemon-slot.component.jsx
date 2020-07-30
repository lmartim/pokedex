import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import styled from "styled-components";

// Componente responsável pelos boxes dos personagens, exibidos na listagem
// Recebe uma prop com as informações do personagem
class PokemonSlot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemon: props.pokemon,
      index: props.index
    }
  }

  render() {
    const pokemon = this.state.pokemon
    const index = this.state.index
    return (
      <PokemonSlotBox>
        {/* Exibe a imagem do personagem */}
        <PokemonSlotImage src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
        {/* Exibe o nome do personagem */}
        <PokemonSlotName>#{index} - {pokemon.name}</PokemonSlotName>
      </PokemonSlotBox>
    )
  }
}

export default withRouter((PokemonSlot));

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


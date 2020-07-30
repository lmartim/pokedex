import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { faCaretLeft, faCaretRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PokemonSlot from '../pokemon-slot/pokemon-slot.component';

import { getPokemons } from '../../redux/pokemons/pokemons.actions';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Columns } from 'react-bulma-components/dist';

// Componente responsável pela listagem de quadrinhos
class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: props.pokemons,
      translate: 0,
      slot: 1,
      lastSlot: 1
    }
  }

  // Atualizando o estado sempre que alguma informação por atualizada
  UNSAFE_componentWillReceiveProps(props) {
    console.log('0', props.pokemons)
    this.setState({
      pokemons: props.pokemons,
    })
  }

  // static getDerivedStateFromProps(props) {
  //   return {
  //     pokemons: props.pokemons,
  //   }
  // }

  // Função responsável por carregar mais quadrinhos. 
  // Ele ativa o ícone de carregamento e dispara uma action, 
  // para chamar os próximos 16 Pokémons
  movePokemonListing(range) {
    const updatedSlot = this.state.slot + (range * -1)
    let translate = 0

    if (updatedSlot > this.state.lastSlot)
      this.props.getPokemons(this.state.pokemons.next)

    if (updatedSlot >= 2) {
      console.log('!!!!', updatedSlot)
      translate = this.state.translate + 835 * range
    }

    this.setState({
      translate: translate,
      slot: updatedSlot >= 1 ? updatedSlot : 1,
      lastSlot: updatedSlot > this.state.lastSlot ? updatedSlot : this.state.lastSlot
    })
    
  }

  render() {
    return (
      <PokemonListBlock data-testid="pokemonList">
        <PokemonListContent translate={this.state.translate}>
            {
              // Faz a listagem dos Pokémons, chamando o componete PokemonSlot e passando suas respectivas informações como prop
              // Na hora de chamar o componente PokemonSlot, é feito um cálculo, a partir do array atual, para ser enviado o número
              // do Pokémon atual, como prop
              this.state.pokemons.pokemons.map((pokemonList, key) => (
                <PokemonListListing key={key}>
                  <Columns>
                    {
                      pokemonList.length > 0 ? pokemonList.map((pokemon, index) => (
                        <Columns.Column key={index} size="one-quarter">
                          <PokemonSlot pokemon={pokemon} index={index+(16*key)} />
                        </Columns.Column>
                      )) : null
                    }
                  </Columns>
                </PokemonListListing>
              ))
            }
        </PokemonListContent>
        <PokemonListFooter>
          <PokemonListButtonBoxes>
              {/* // Este bloco irá exibir os botões responsáveis por trocar os boxes, assim realizando a paginação */}
              { this.state.slot > 1 ? <FontAwesomeIcon icon={faCaretLeft} onClick={() => this.movePokemonListing(1)} /> : null } 
              Box #{this.state.slot}
              <FontAwesomeIcon icon={faCaretRight} onClick={() => this.movePokemonListing(-1)} />
          </PokemonListButtonBoxes>
          <PokemonListButtonSearch>
            <FontAwesomeIcon icon={faSearch} onClick={() => this.loadMorePokemons()} />
            <input type="text" placeholder="Pesquisar" />
          </PokemonListButtonSearch>
        </PokemonListFooter>
      </PokemonListBlock>
    )
  }
};

// Funções do Redux, para obter o estado e chamar as actions
const mapStateToProps = state => ({
  pokemons: state.pokemons
})

const mapDispatchToProps = dispatch => {
  return {
    getPokemons: (limit) => dispatch(getPokemons(limit)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);

// CSS-in-JS
const PokemonListBlock = styled.section``

const PokemonListContent = styled.div`
  display: box;
  display: -webkit-box;
  white-space: nowrap;
  transition: .3s;
  transform: translateX(${props => props.translate}px);
`

const PokemonListListing = styled.div`
  &:not(:first-child) {
    margin-left: 1.50rem;
  }
`

const PokemonListFooter = styled.section`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
`

const PokemonListButtonBoxes = styled.div`
  background: white;
  -webkit-box-shadow: 0px 5px 7px 4px #d6d6d6;
  -moz-box-shadow: 0px 5px 7px 4px #d6d6d6;
  box-shadow: 0px 5px 7px 4px #d6d6d6;
  padding: 10px;
  border-radius: 100px;
  width: 250px;
  position: relative;
  text-align: center;
  svg {
    transform: scale(2.5);
    position: absolute;
    top: 30%;
    color: #797979;
    &:hover {
      cursor: pointer;
    }
    &[data-icon="caret-left"] {
      left: 5%;
    }
    &[data-icon="caret-right"] {
      right: 5%;
    }
  }
`

const PokemonListButtonSearch = styled.div`
  background: white;
  -webkit-box-shadow: 0px 5px 7px 4px #d6d6d6;
  -moz-box-shadow: 0px 5px 7px 4px #d6d6d6;
  box-shadow: 0px 5px 7px 4px #d6d6d6;
  padding: 10px 50px 10px 15px;
  border-radius: 100px;
  width: 250px;
  position: relative;
  input {
    font-size: 15px;
    border: 0;
    &:focus {
      outline: none;
    }
  }
  svg {
    transform: scale(1.5);
    position: absolute;
    top: 30%;
    color: #797979;
    right: 7%;
    &:hover {
      cursor: pointer;
    }
  }
`
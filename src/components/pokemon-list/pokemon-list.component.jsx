import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import styled from "styled-components";
import { faCaretLeft, faCaretRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PokemonSlot from '../pokemon-slot/pokemon-slot.component';

import { getPokemons, getPokemon } from '../../redux/pokemons/pokemons.actions';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Columns } from 'react-bulma-components/dist';

// Componente responsável pela listagem de Pokémons
class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: props.pokemons,
      pokemonList: props.pokemons.pokemons[0],
      slot: 1,
      lastSlot: 1,
      searchInput: ""
    }
  }

  // Atualizando o estado sempre que alguma informação por atualizada
  static getDerivedStateFromProps(props, state) {
    return {
      pokemons: props.pokemons,
      pokemonList: props.pokemons.pokemons[state.slot-1],
    }
  }

  // Função responsável por carregar mais Pokémon e fazer a movimentação da listagem
  movePokemonListing(range) {
    const updatedSlot = this.state.slot + (range * -1)

    if (updatedSlot > this.state.lastSlot)
      this.props.getPokemons(this.state.pokemons.next)

    this.setState({
      slot: updatedSlot >= 1 ? updatedSlot : 1,
      lastSlot: updatedSlot > this.state.lastSlot ? updatedSlot : this.state.lastSlot,
      pokemonList: this.state.pokemons.pokemons[updatedSlot - 1],
    })
  }

  searchPokemon() {
    this.props.getPokemon(this.state.searchInput)
    this.props.history.push({ pathname: '/detalhes' });
  }

  render() {
    const pokemons = this.state.pokemonList
    return (
      <PokemonListBlock data-testid="pokemonList">
        <PokemonListContent>
            {
              // Faz a listagem dos Pokémons, chamando o componete PokemonSlot e passando suas respectivas informações como prop
              <PokemonListListing>
                <Columns>
                  {
                  pokemons && pokemons.length > 0 ? pokemons.map((pokemon, index) => (
                      <Columns.Column key={index} size="one-quarter">
                        <PokemonSlot pokemon={pokemon} index={index+(16*(this.state.slot-1))} />
                      </Columns.Column>
                    )) : null
                  }
                </Columns>
              </PokemonListListing>
            }
        </PokemonListContent>
        <PokemonListFooter>
          <PokemonListButtonBoxes>
              {/* Este bloco irá exibir os botões responsáveis por trocar os boxes, assim realizando a paginação */}
              { this.state.slot > 1 ? <FontAwesomeIcon icon={faCaretLeft} onClick={() => this.movePokemonListing(1)} /> : null } 
              Box #{this.state.slot}
              <FontAwesomeIcon icon={faCaretRight} onClick={() => this.movePokemonListing(-1)} />
          </PokemonListButtonBoxes>
          <PokemonListButtonSearch>
            {/* Exibir o input de pesquisa */}
            <FontAwesomeIcon icon={faSearch} onClick={() => this.searchPokemon()} />
            <input type="text" placeholder="Pesquisar" onChange={(e) => this.setState({ searchInput: e.target.value })} />
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
    getPokemons: (next) => dispatch(getPokemons(next)),
    getPokemon: (name) => dispatch(getPokemon(name))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PokemonList));

// CSS-in-JS
const PokemonListBlock = styled.section`
  overflow: hidden;
`

const PokemonListContent = styled.div`
  display: box;
  display: -webkit-box;
  white-space: nowrap;
  transition: .3s;
`

const PokemonListListing = styled.div`
  &:not(:first-child) {
    margin-left: 1.50rem;
  }
  @media (max-width: 992px) {
    width: 100%;
  }
`

const PokemonListFooter = styled.section`
  margin-top: 35px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 992px) {
    flex-direction: column;
  }
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
  @media (max-width: 992px) {
    width: 100%;
  }
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
  @media (max-width: 992px) {
    width: 100%;
    margin-top: 30px;
  }
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
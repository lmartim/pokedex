import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import styled from "styled-components";

import { getPokemon } from '../../redux/pokemons/pokemons.actions';

class FavoritesBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      favorites: []
    }
  }

  // Atualiza estado quando houver alteração nas props
  static getDerivedStateFromProps(props) {
    return {
      favorites: props.pokemons.favorites
    }
  }

  // Função para levar até página de detalhes
  // Recebe o nome do Pokémon, para buscar seus respectivos dados na API
  pokemonDetails(pokemon) {
    this.props.getPokemon(pokemon)
    this.props.history.push({ pathname: '/detalhes' });
  }

  render() {
    const favorites = this.state.favorites
    return (
      <FavoritesContentBar>
        <FavoriteItem data-testid="title">
          <b>FAVORITOS</b>
        </FavoriteItem>
        {
          // Renderiza a listagem de Pokémon favoritos
          favorites.map((favorite, index) => (
            <FavoriteItem key={index} onClick={() => this.pokemonDetails(favorite.name)} data-testid="character">
              <img src={favorite.sprites.front_default} alt={favorite.name} />
              <div>
                {favorite.name}
              </div>
            </FavoriteItem>
          ))
        }
      </FavoritesContentBar>
    )
  }
}

// Funções do Redux, para obter o estado e chamar as actions
const mapStateToProps = state => ({
  pokemons: state.pokemons
})

const mapDispatchToProps = dispatch => {
  return {
    getPokemon: (name) => dispatch(getPokemon(name)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FavoritesBar));

// CSS-in-JS
const FavoritesContentBar = styled.section``;

const FavoriteItem = styled.div`
  background: white;
  -webkit-box-shadow: 0px 5px 7px 4px #d6d6d6;
  -moz-box-shadow: 0px 5px 7px 4px #d6d6d6;
  box-shadow: 0px 5px 7px 4px #d6d6d6;
  padding: 10px;
  border-radius: 100px;
  width: 100%;
  position: relative;
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  b {
    margin: 0 auto;
  }
  img {
    width: 50px;
  }
  div {
    margin-left: 30px;
    text-transform: capitalize;
  }
`;
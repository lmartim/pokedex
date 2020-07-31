import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import styled from "styled-components";
import { faArrowRight, faArrowLeft, faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getPokemon, putFavorite } from '../../redux/pokemons/pokemons.actions';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container, Columns } from 'react-bulma-components/dist';

// Página responsável por exibir os detalhes do Pokémon selecionado
class Details extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      isFavorited: null,
      searchInput: ""
    }
  }

  // Atualizando o estado sempre que alguma informação por atualizada
  static getDerivedStateFromProps(props) {
    let isFavorited = null
    if (props.pokemons.selected)
      isFavorited = props.pokemons.favorites.find(favorited => favorited.name === props.pokemons.selected.name)

    return {
      selected: props.pokemons.selected,
      isFavorited: isFavorited
    }
  }

  // Função para alterar o Pokémon exibido
  pokemonDetails(pokemon) {
    this.props.getPokemon(pokemon)
  }

  // Função para favoritar/remover um Pokémon
  favoritingPokemon(pokemon) {
    this.props.putFavorite(pokemon)
  }

  render() {
    const selected = this.state.selected
    const isFavorited = this.state.isFavorited
    return (
      <section>
      {

        selected ? (
          <Container>
            <DetailsBlock>
              <Columns>
                <Columns.Column size="half">

                  {/* Renderiza os detalhes do Pokémon exibido */}
                  <DetailsLeftBlockContent data-testid="pokemonDetailBlock">
                    {/* NOME */}
                    <h2>
                      {selected.name}
                    </h2>
                    {/* TIPOS */}
                    <div className="line">
                      <div className="line-title">
                        Tipos
                      </div>
                      <div className="line-content">
                        {
                          selected.types ? selected.types.map((typeList, index) => (
                            <div key={index}>{typeList.type.name}</div>
                          ))
                          : null
                        }
                      </div>
                    </div>
                    <div className="line">
                      <div className="line-title">
                        Altura
                      </div>
                      <div className="line-content">
                        {selected.height}
                      </div>
                    </div>
                    {/* SEPARADOR DOS ATRIBUTOS */}
                    <h2>
                      Atributos
                    </h2>
                    {
                      // LOOP ATRIBUTOS
                      selected.stats.map((stat, index) => (
                        <div className="line" key={index}>
                          <div className="line-title">{stat.stat.name}</div>
                          <div className="line-content">{stat.base_stat}</div>
                        </div>
                      ))
                    }
                  </DetailsLeftBlockContent>
                </Columns.Column>
                <Columns.Column >
                  {/* Renderiza a imagem e cadeira evolutiva do Pokémon */}
                  <DetailsRightBlockContent>
                    {/* ÍCONE DE FAVORITO */}
                    <div className={`favorite-icon ${isFavorited ? "is-favorited" : ""}`}>
                      <FontAwesomeIcon icon={faHeart} onClick={() => this.favoritingPokemon(selected)} />
                    </div>
                    {/* SPRITE */}
                    <img src={selected.sprites.front_default} alt={selected.name} />
                    {/* LISTAGEM DE EVOLUÇÕES */}
                    <EvolutionBlock>
                      <h2>Cadeia Evolutiva</h2>
                      <div className="evolution-block-list">
                        <div onClick={() => this.pokemonDetails(selected.chain.species.name)}>
                          <span>{selected.chain.species.name}</span>
                        </div>
                        {
                          selected.chain.evolves_to && selected.chain.evolves_to.length > 0 ? 
                            <div onClick={() => this.pokemonDetails(selected.chain.evolves_to[0].species.name)}>
                              <FontAwesomeIcon icon={faArrowRight} />
                              <span>{selected.chain.evolves_to[0].species.name}</span>
                            </div> 
                          : null
                        }
                        {
                          selected.chain.evolves_to && selected.chain.evolves_to.length > 0 && selected.chain.evolves_to[0].evolves_to.length > 0 ?
                            <div onClick={() => this.pokemonDetails(selected.chain.evolves_to[0].evolves_to[0].species.name)}>
                              <FontAwesomeIcon icon={faArrowRight} />
                              <span>{selected.chain.evolves_to[0].evolves_to[0].species.name}</span>
                            </div>
                            : null
                        }
                      </div>
                    </EvolutionBlock>
                  </DetailsRightBlockContent>
                </Columns.Column>
              </Columns>
            </DetailsBlock>
          </Container>
        ) : (
          // Caso não encontre nenhuma informação
          <DetailsBlock>
            Nenhum Pokémon encontrado
          </DetailsBlock>
        )
      }  
      <PokemonListFooter>
        <PokemonListButtonBack onClick={() => this.props.history.push({ pathname: '/' })} >
          {/* Botão para voltar para a listagem */}
          <FontAwesomeIcon icon={faArrowLeft} />
          Voltar
        </PokemonListButtonBack>
        <PokemonListButtonSearch>
          {/* Input de pesquisa */}
          <FontAwesomeIcon icon={faSearch} onClick={() => this.pokemonDetails(this.state.searchInput.toLowerCase())} />
          <input type="text" placeholder="Pesquisar" onChange={(e) => this.setState({ searchInput: e.target.value })} />
        </PokemonListButtonSearch>
      </PokemonListFooter>
      </section>
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
    putFavorite: (pokemon) => dispatch(putFavorite(pokemon))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Details));

// CSS-in-JS
const DetailsBlock = styled.section`
  width: 100%;
  background-color: rgba(255,255,255, 0.4);
  padding: 20px;
  border-radius: 5px;
  display: flex;
  .columns {
    width: 100%;
  }
`;

const DetailsLeftBlockContent = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  h2 {
    text-transform: capitalize;
    text-align: center;
    padding: 5px 0;
    font-weight: 900;
    background: #a2a2a2;
  }
  .line {
    display: flex;
    border-bottom: 1px solid #a2a2a2;
    .line-title {
      width: 300px;
      text-align: center;
      font-weight: 900;
      background: white;
      text-transform: capitalize;
    }
    .line-content {
      display: flex;
      width: 100%;
      justify-content: space-evenly;
      background: #e8e8e8;
      text-transform: capitalize;
    }
  }
`

const DetailsRightBlockContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  .favorite-icon {
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
    &.is-favorited svg {
      color: red;
    }
  }
  img {
    height: 115px;
  }
`

const EvolutionBlock = styled.div`
  border: 1px solid black;
  width: 100%;
  border-radius: 5px;
  h2 {
    text-transform: capitalize;
    text-align: center;
    padding: 5px 0;
    font-weight: 900;
    background: #a2a2a2;
  }
  .evolution-block-list {
    background: white;
    padding: 5px 0;
    display: flex;
    justify-content: center;
    div {
      text-transform: capitalize;
      span {
        cursor: pointer;
        color: blue;
        &:hover {
          text-decoration: underline
        }
      }
    }
  }
  svg {
    margin: 0 10px;
  }
`

const PokemonListFooter = styled.section`
  margin-top: 35px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
`

const PokemonListButtonBack = styled.div`
  background: white;
  -webkit-box-shadow: 0px 5px 7px 4px #d6d6d6;
  -moz-box-shadow: 0px 5px 7px 4px #d6d6d6;
  box-shadow: 0px 5px 7px 4px #d6d6d6;
  padding: 10px;
  border-radius: 100px;
  width: 250px;
  position: relative;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
  svg {
    transform: scale(1.2);
    position: absolute;
    top: 30%;
    left: 5%;
    color: #797979;
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
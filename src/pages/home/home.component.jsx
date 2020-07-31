import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";

import PokemonList from '../../components/pokemon-list/pokemon-list.component';
import LoaderIcon from '../../components/loader-icon/loader-icon.component';

import { getInitialPokemons, getPokemons, loadPokemons } from '../../redux/pokemons/pokemons.actions';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Container } from 'react-bulma-components/dist';

// Page responsável pela primeira página do app
// Ela irá exibir uma lista de Pokémons
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: props.pokemons
    }
  }

  componentDidMount() {
    // Buscando os 16 primeiros Pokémons da API
    this.props.getInitialPokemons()
  }

  // Atualizando o estado sempre que alguma informação por atualizada
  static getDerivedStateFromProps(props, state) {
    if (props.pokemons.status === 'loading') {
      // Buscando os 16 primeiros Pokémons da API
      props.getInitialPokemons()
      return null
    }

    return {
      pokemons: props.pokemons
    }
  }

  render() {
    return (
      <HomeContentBlock>
        <Container>
          {(() => {
            switch (this.state.pokemons.status) {
              case 'loading':
                // Caso status seja loading, exiber ícone de carregamento
                return (
                  <HomeContentBlockLoader>
                    <LoaderIcon />
                  </HomeContentBlockLoader>
                )
              case 'success':
                // Rendereza listagem de Pokémons, em caso de status sucesso
                return <PokemonList />;
              case 'fail':
                // Em caso de falha, exibe mensagem e botão para tentar novamente
                return (
                  <HomeContentBlockFail>
                    Não foi possível obter os dados
                    <Button className='failcontentblock__button--state-fail' color="primary" onClick={() => this.props.getInitialPokemons()}>
                      Tentar novamente
                    </Button>
                  </HomeContentBlockFail>
                )
              default:
                return null;
            }
          })()}
        </Container>
      </HomeContentBlock>
    )
  }
};

// Funções do Redux, para obter o estado e chamar as actions
const mapStateToProps = state => ({
  pokemons: state.pokemons
})

const mapDispatchToProps = dispatch => {
  return {
    getInitialPokemons: () => dispatch(getInitialPokemons()),
    getPokemons: (limit) => dispatch(getPokemons(limit)),
    loadPokemons: () => dispatch(loadPokemons())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// CSS-in-JS
const HomeContentBlock = styled.section``;

const HomeContentBlockLoader = styled.div``;

const HomeContentBlockFail = styled.div``;
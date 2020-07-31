import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Columns } from 'react-bulma-components/dist';
import styled from "styled-components";

import FavoritesBar from './components/favorites-bar/favorites-bar.component';
import Home from './pages/home/home.component';
import Details from './pages/details/details.component';

import bg from './assets/images/pokeball-wallpaper.jpg';

// Configurado as rotas do projeto e seus respectivos componentes
// Também é adicionado o Header no topo da aplicação
function App() {
  return (
    <AppBlock>
      <AppBlockContent>
        <Columns>
          <Columns.Column size="one-third">
            <FavoritesBar />
          </Columns.Column>
          <Columns.Column size="two-thirds">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/detalhes' component={Details} />
            </Switch>
          </Columns.Column>
        </Columns>
      </AppBlockContent>
      <AppBlockBg bg={bg} />
    </AppBlock>
  );
}

export default App;

const AppBlock = styled.section `
  min-height: 100vh;
  position: relative;
  padding: 20px;
`

const AppBlockBg = styled.div `
  background-image: url(${props => props.bg});
  background-size: cover;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: -10;
  @media (max-width: 992px) {
    background-position: right;
  }
`

const AppBlockContent = styled.div `
  ::before {
    content: "";
    position: absolute;
    top: 0; 
    left: 0;
    border-style: solid;
    border-width: 100vh 40vh 0 0;
    border-color: #91C702 transparent transparent transparent;
    width: 40vw; 
    height: 100vh;
    z-index -1;
  }
  ::after {
    content: "";
    position: absolute;
    top: 0; 
    left: 0;
    border-style: solid;
    border-width: 90vh 40vh 0 0;
    border-color: #B4E637 transparent transparent transparent;
    width: 20vw; 
    height: 100vh;
    z-index -1;
  }
`;


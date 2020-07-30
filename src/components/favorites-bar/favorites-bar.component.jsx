import React from 'react';
import { withRouter } from 'react-router-dom'
import styled from "styled-components";

// Componente com o header da aplicação
// Exibe um logo e um menu com duas opções
const FavoritesBar = () => {
  return (
    <FavoritesContentBar>
      FAVORITES
    </FavoritesContentBar>
  )
}

export default withRouter(FavoritesBar);

// CSS-in-JS
const FavoritesContentBar = styled.section`
  background: cyan;
`;
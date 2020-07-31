import React from 'react';
import { render, cleanup } from '../../utils/test/test-utils';

import Home from './home.component';

afterEach(cleanup)

// Testes relacionados ao componente Home

// Verifica se a listagem de Pokémons foi realizada
test('verify if pokémons list is rendered', () => {
  const { getByTestId  } = render(<Home />)
    
  expect(getByTestId('pokemonList')).toBeTruthy()
});
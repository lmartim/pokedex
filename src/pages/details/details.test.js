import React from 'react';
import { render, cleanup } from '../../utils/test/test-utils';

import Details from './details.component';

afterEach(cleanup)

// Testes relacionados ao componente Details

// Verificar se o box com informações foi exibido
test('render character detail', () => {
  const { getByTestId  } = render(<Details />)
    
  expect(getByTestId('pokemonDetailBlock')).toBeTruthy()
});